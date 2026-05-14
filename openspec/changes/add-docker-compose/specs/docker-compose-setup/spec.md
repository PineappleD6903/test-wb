## ADDED Requirements

### Requirement: Docker Compose Configuration
The repository SHALL include a `docker-compose.yml` file to orchestrate the application. The compose file SHALL define a service named `app` that builds from the current directory and maps the container port 5173 to the host port 5173.

#### Scenario: Running the application
- **WHEN** a user executes `docker compose up` in the repository root
- **THEN** the application container builds and starts, exposing the web interface on `localhost:5173`
