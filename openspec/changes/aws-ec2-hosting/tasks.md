## 1. AWS Infrastructure Setup

- [ ] 1.1 Navigate to the AWS EC2 Dashboard and launch a new instance.
- [ ] 1.2 Select the Ubuntu Server 24.04 LTS AMI and a `t2.micro` or `t3.micro` instance type.
- [ ] 1.3 Configure the Security Group to allow inbound SSH (port 22) and HTTP (port 80) traffic from anywhere.
- [ ] 1.4 Download the SSH key pair (`.pem` file) securely and launch the instance.

## 2. Server Configuration

- [ ] 2.1 SSH into the newly created EC2 instance using the downloaded key pair.
- [ ] 2.2 Update system packages and install Docker on the Ubuntu instance.
- [ ] 2.3 Install Docker Compose plugin and verify the installation.

## 3. Application Deployment

- [ ] 3.1 Clone the project repository onto the EC2 instance or transfer the code via `scp`.
- [ ] 3.2 Adjust `docker-compose.yml` if necessary to ensure the web container's port maps directly to host port 80 (e.g., `"80:80"`).
- [ ] 3.3 Run `docker-compose up -d --build` to build the image and start the application containers in the background.

## 4. Verification

- [ ] 4.1 Run `docker ps` to verify that the containers are running and healthy.
- [ ] 4.2 Access the application via a web browser using the EC2 instance's public IPv4 address or DNS name to verify it loads correctly.
