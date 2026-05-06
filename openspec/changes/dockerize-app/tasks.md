## 1. Directory Structure Setup

- [x] 1.1 Create `docker` directory in the root of the workspace.

## 2. Docker Configuration

- [x] 2.1 Create a `.dockerignore` file in the root to exclude `node_modules`, `.git`, `.agent`, and other unnecessary directories from the Docker context.
- [x] 2.2 Create `docker/Dockerfile` with a Node 18 base image, copy source files (including `mh_wilds.db`), run `npm install`, and set the startup command to serve the Vite app (e.g. `npm run dev -- --host`).
- [x] 2.3 Ensure package.json scripts allow Vite to bind to `0.0.0.0` if necessary (e.g., updating the dev script or just using `--host` in the Dockerfile command).
- [x] 2.4 Verify that `mh_wilds.db` and Python script data are correctly included in the build context so the image has all its source and data.
