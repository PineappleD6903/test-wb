## Context

The repository contains a `Dockerfile` that builds the application using `node:18-alpine` and serves it via Vite on port 5173. Currently, developers have to manually run `docker build` and `docker run` with the correct port mappings to start the application. A `docker-compose.yml` file is needed to streamline this process.

## Goals / Non-Goals

**Goals:**
- Provide a `docker-compose.yml` file that builds the application using the existing `Dockerfile`.
- Expose the application on port 5173.
- Allow developers to start the application with a single command (`docker compose up`).

**Non-Goals:**
- Modifying the existing `Dockerfile`.
- Setting up a production-ready container orchestration (e.g., Kubernetes, Swarm).
- Adding additional services (like a separate database container) at this time.

## Decisions

- **Compose File Format**: We will use the modern compose specification (without the legacy `version` attribute) which is recommended for newer Docker Compose setups.
- **Service Configuration**: 
  - Name: `app`
  - Build context: `.` (current directory)
  - Port mapping: `"5173:5173"` to match Vite's default port exposed in the Dockerfile.
- **Volume Mounting**: We will not mount the local directory to avoid overriding the container's `node_modules` and to simply run the "builded image" as requested by the user. If live-reloading is desired later, volume mounts can be added.

## Risks / Trade-offs

- **Risk**: Without volume mounting, changes to local code won't reflect in the running container without a rebuild (`docker compose build`).
  - **Mitigation**: This fulfills the request of running the built image. If live-reloading is needed, the user can be advised to add specific volume mounts for `src` and `public`.
