## Context

The application is currently run locally, requiring Node.js for the Vite server and Python if scripts are run. It uses an SQLite database `mh_wilds.db`. We want to package the application into a Docker container so that the entire app, including source code and data, can be built into an image and run consistently across different environments without local dependency setup.

## Goals / Non-Goals

**Goals:**
- Create a `Dockerfile` that packages the application.
- The image must contain all necessary source files and data (`mh_wilds.db`).
- Set up the container to serve the application correctly (using Node.js, `npm run dev` or a production build server depending on the user's setup, but for simplicity we will run it via `npm run dev` or a simple static server. We'll stick to a standard Node environment).
- Keep Docker-related files organized in a `docker` folder.

**Non-Goals:**
- Complex CI/CD pipelines.
- Production-grade multi-stage builds (unless trivially simple). For now, a straightforward container is sufficient.
- Orchestration with Docker Compose (unless needed for a database, but SQLite is a file so we don't need Compose).

## Decisions

- **Base Image:** Use `node:18-alpine` (or similar LTS version) to keep the image lightweight while supporting the Vite app.
- **Docker file location:** Place the `Dockerfile` inside a `docker/` directory to fulfill the requirement "place it in a docker folder". Since the build context needs to be the root folder, the build command will be `docker build -t app-name -f docker/Dockerfile .`.
- **Including Data:** `mh_wilds.db` and other source directories (`src`, `public`, etc.) will be copied over via `COPY . .`.
- **Command:** The container will start the app using `npm run dev` (with `--host` configured so it's accessible outside the container) or `npm run build` and `npm run preview`. We will modify the start command or vite config if necessary to bind to `0.0.0.0`.

## Risks / Trade-offs

- [Risk] SQLite database will be ephemeral in the container if modified, meaning changes are lost on restart.
  - Mitigation: For this requirement, it specifically says "with all its source and data", implying we are bundling the static state of the app into an image. If data persistence is needed, users can map a volume when running.
- [Risk] `npm run dev` in Vite binds to `localhost` by default, making it inaccessible from outside the Docker container.
  - Mitigation: Ensure the Dockerfile specifies `--host 0.0.0.0` or vite config is updated.
