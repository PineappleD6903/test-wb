## Context

The application, "Monster Hunter Wilds Build Crafter," is currently a local project that has been containerized using Docker and Docker Compose. To allow public access, we need to deploy these containers to a cloud provider. AWS EC2 offers a straightforward Virtual Machine approach which is sufficient for running our existing Docker Compose setup without the overhead of learning or managing complex container orchestration systems like ECS or Kubernetes.

## Goals / Non-Goals

**Goals:**
- Provision and configure an AWS EC2 instance to host the application.
- Successfully run the application's Docker containers on the instance.
- Ensure the application is accessible from the public internet via HTTP (port 80).
- Provide a secure method for the developer to administer the server via SSH (port 22).

**Non-Goals:**
- Setting up HTTPS/SSL certificates (can be added in a subsequent iteration).
- Setting up automated CI/CD pipelines (manual git pull and docker-compose is sufficient for this phase).
- High availability or auto-scaling (a single instance is sufficient for the current scope).

## Decisions

- **Instance Type**: Use `t2.micro` or `t3.micro` (free tier eligible) running Ubuntu Server 24.04 LTS. It provides sufficient resources to run a simple React web app via Docker.
- **Networking**: Map the Docker container's internal web port directly to port 80 on the EC2 host. This avoids the immediate need to configure a reverse proxy like Nginx for the initial deployment.
- **Code Transfer Strategy**: Clone the project's Git repository directly onto the EC2 instance to fetch the code and `docker-compose.yml`, rather than pushing Docker images to a registry like Docker Hub or AWS ECR. This keeps the deployment architecture as simple as possible.

## Risks / Trade-offs

- **Risk**: Manual deployment means updates require SSHing into the server to pull new code and restart containers. → **Mitigation**: Document the deployment steps clearly. Once the process is verified, it can be easily automated with a bash script or GitHub Actions.
- **Risk**: Lack of HTTPS might cause modern browsers to show security warnings. → **Mitigation**: Explicitly out of scope for this change, but can be addressed quickly in a future change by adding Nginx and Certbot to the Docker setup.
