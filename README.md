# Gateway Web

Static frontend pages live in `Front end/`, and the Express + MongoDB backend lives in `Backend/`.

## Updated Structure

- `Backend/app.js`: Express app setup, static frontend serving, and route mounting.
- `Backend/config/appConfig.js`: shared runtime config for MongoDB, JWT, ports, and key paths.
- `Backend/routes/index.js`: central API router with route aliases.
- `Backend/utils/uploads.js`: shared upload directory creation and multer setup.
- `Front end/assets/js/site-config.js`: shared API/asset base URL helpers.
- `Front end/assets/js/load-nav.js`: shared navbar loader and dynamic internship menu setup.

## Run Locally

1. Install backend dependencies in `Backend/`.
2. Start MongoDB and set `MONGODB_URI` if needed.
3. Run `npm start` inside `Backend/`.
4. Open `http://localhost:5000/`.

## Notes

- Admin pages are served from `/admin` and `/admin/login`.
- Upload directories are created automatically when files are submitted.
- You can override the frontend API base with `localStorage.setItem("gatewayApiBase", "https://your-api-host")`.
