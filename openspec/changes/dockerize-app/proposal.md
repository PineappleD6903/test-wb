## Why

To simplify deployment and environment consistency, we need to containerize the application. This allows developers and users to easily spin up the app with all its dependencies, source code, and data (including the SQLite database `mh_wilds.db`) without having to manually install Node.js, Python, or configure the environment.

## What Changes

- Create a new `docker` directory to house Docker-related configuration files.
- Add a `Dockerfile` inside the `docker` directory (or root if standard, but user specifically asked to place it in a "docker folder").
- The Dockerfile will define the environment needed to run the app (Node.js for Vite app, and possibly Python if the app runs python scripts at runtime). Based on standard Vite apps, we likely just need Node.js to serve the static built files or run the dev server. Since "data" is mentioned, we ensure `mh_wilds.db` and source code are copied into the image.
- Create a `.dockerignore` file to exclude unnecessary files like `node_modules`.
- Provide a clear instruction on how to build and run the Docker image.

## Capabilities

### New Capabilities
- `docker-containerization`: Supports building and running the app via Docker, ensuring all source code and data are packaged together.

### Modified Capabilities
- None

## Impact

- **Infrastructure**: Introduces Docker as a standard deployment and execution mechanism.
- **Codebase**: Adds `docker/Dockerfile` and `.dockerignore`.
- **Dependencies**: No new runtime dependencies, just Docker required for execution.
