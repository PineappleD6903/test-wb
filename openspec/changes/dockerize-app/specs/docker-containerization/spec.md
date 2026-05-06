## ADDED Requirements

### Requirement: Docker build configuration
The application MUST include a `docker/Dockerfile` and `.dockerignore` file to enable building a self-contained image with all source code and data dependencies (such as `mh_wilds.db`).

#### Scenario: Dockerfile exists
- **WHEN** a user navigates to the project
- **THEN** they find a `docker/Dockerfile` that successfully builds the project image

#### Scenario: Application code and data is bundled
- **WHEN** the Docker image is built
- **THEN** it contains the source code, Python scripts, `mh_wilds.db` data file, and Node.js environment required to run the Vite server

### Requirement: Expose application port
The Docker container MUST expose the application port and correctly bind the Vite development server so it can be accessed from the host machine.

#### Scenario: Container is run
- **WHEN** the container is started mapping port 5173
- **THEN** the Vite application is accessible via `http://localhost:5173` on the host machine
