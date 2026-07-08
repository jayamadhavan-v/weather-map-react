const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const OPENWEATHER_API_URL = "https://api.openweathermap.org";
const REQUEST_TIMEOUT_MS = 8000;
const GEO_CACHE_TTL_MS = 10 * 60 * 1000;
const WEATHER_CACHE_TTL_MS = 2 * 60 * 1000;

const responseCache = new Map();

const getCachedResponse = (key) => {
  const cached = responseCache.get(key);

  if (!cached || cached.expiresAt < Date.now()) {
    responseCache.delete(key);
    return null;
  }

  return cached.data;
};

const setCachedResponse = (key, data, ttl) => {
  responseCache.set(key, {
    data,
    expiresAt: Date.now() + ttl,
  });
};

const createRequestSignal = (externalSignal) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  const abortRequest = () => {
    controller.abort();
  };

  if (externalSignal) {
    if (externalSignal.aborted) {
      controller.abort();
    } else {
      externalSignal.addEventListener("abort", abortRequest, {
        once: true,
      });
    }
  }

  return {
    signal: controller.signal,
    cleanup: () => {
      window.clearTimeout(timeoutId);
      externalSignal?.removeEventListener("abort", abortRequest);
    },
  };
};

const requestOpenWeather = async (path, params, signal) => {
  const url = new URL(path, OPENWEATHER_API_URL);

  Object.entries({
    ...params,
    appid: API_KEY,
  }).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const request = createRequestSignal(signal);

  try {
    const response = await fetch(url, {
      signal: request.signal,
    });

    if (!response.ok) {
      throw new Error(`OpenWeather request failed with ${response.status}`);
    }

    return response.json();
  } finally {
    request.cleanup();
  }
};

export const getCoordinatesByCity = async (city, options = {}) => {
  const normalizedCity = city.trim().toLowerCase();
  const cacheKey = `geo:${normalizedCity}`;
  const cached = getCachedResponse(cacheKey);

  if (cached) return cached;

  const data = await requestOpenWeather(
    "/geo/1.0/direct",
    {
      q: normalizedCity,
      limit: 1,
    },
    options.signal,
  );

  setCachedResponse(cacheKey, data, GEO_CACHE_TTL_MS);
  return data;
};

export const getCurrentWeather = async (lat, lon, options = {}) => {
  const roundedLat = Number(lat).toFixed(3);
  const roundedLon = Number(lon).toFixed(3);
  const cacheKey = `weather:${roundedLat}:${roundedLon}`;
  const cached = getCachedResponse(cacheKey);

  if (cached) return cached;

  const data = await requestOpenWeather(
    "/data/2.5/weather",
    {
      lat,
      lon,
      units: "metric",
    },
    options.signal,
  );

  setCachedResponse(cacheKey, data, WEATHER_CACHE_TTL_MS);
  return data;
};
