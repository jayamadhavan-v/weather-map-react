# Weather Map React

A React weather map application with interactive Leaflet layers, OpenWeather-powered weather overlays, city search, current-location detection, and a live weather details panel.

## Features

- Interactive base map with OpenWeather layers for temperature, wind, rain, clouds, and pressure.
- City search and current-location weather lookup.
- Adjustable weather overlay opacity.
- Dynamic legend and location marker popup.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add your OpenWeather API key to `.env`:

   ```bash
   VITE_OPENWEATHER_API_KEY=your_api_key
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` starts the Vite development server.
- `npm run build` builds the production bundle.
- `npm run lint` runs ESLint.
