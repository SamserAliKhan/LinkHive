<div align="center">

# 🐝 LinkHive

**A scalable microservices system with a custom-built Node.js API Gateway.**  
_Easily route, manage, and secure API requests via a single entry point. Designed for extensibility, learning, and control._

[![GitHub Stars](https://img.shields.io/github/stars/SamserAliKhan/LinkHive?style=flat-square&color=yellow)](https://github.com/SamserAliKhan/LinkHive/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/SamserAliKhan/LinkHive?style=flat-square&color=orange)](https://github.com/SamserAliKhan/LinkHive/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/SamserAliKhan/LinkHive?style=flat-square&color=critical)](https://github.com/SamserAliKhan/LinkHive/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
![Node.js](https://img.shields.io/badge/Node.js-16%2B-brightgreen?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.x-blue?style=flat-square&logo=express)
![Microservices](https://img.shields.io/badge/Architecture-Microservices-blueviolet?style=flat-square)
![Custom Gateway](https://img.shields.io/badge/API%20Gateway-Custom%20Proxy-yellow?style=flat-square)

---

</div>
## Overview

**LinkHive** is a microservices-based system featuring a custom-built API Gateway for routing and managing requests between client applications and backend services. It offers a scalable, modular architecture where services are decoupled but accessible via a single entry point—simplifying client interactions and improving maintainability.

> **Unique Selling Point:** Unlike typical setups that use prebuilt tools (e.g., Nginx, Kong, Traefik), LinkHive demonstrates a from-scratch API gateway implementation in Node.js, showcasing deeper understanding of networking and request flow.

---

## Architecture

_LinkHive consists of the following services:_

- **API Gateway**  
  Single entry point for all client requests. Handles proxy routing to backend microservices.

- **User Service**  
  Handles user-related requests (profile, /me, etc.).

- **Post Service**  
  Manages core logic for LinkHive (network link management, data processing).

- **Authentication Server**  
  Manages user authentication, signup, login, and token validation.

_Placeholder for architecture diagram:_
```
Client → [API Gateway] → [User Service / Post Service / Auth Service]
```

---

## Key Features

- **Microservices architecture** – Modular, scalable design.
- **Custom API Gateway** – Node.js-based, forwards requests via proxy.
- **Proxy-based request routing** – Transparent redirection to services.
- **Centralized entry point** – Clients only interact with the gateway.
- **Extensible design** – Plug in new services with minimal changes.

---

## Tech Stack

- **Languages:** JavaScript (Node.js)
- **Frameworks/Libraries:** Express.js, http-proxy/custom proxy logic
- **Architecture:** Microservices + API Gateway
- **Networking:** Proxy-based API call routing

---

## Installation & Setup

**Prerequisites:**
- Node.js (>= 16)
- npm or yarn

**Steps:**
```bash
# Clone the repository
git clone https://github.com/SamserAliKhan/LinkHive.git
cd LinkHive

# Install dependencies for each service
cd backend/API && npm install
cd ../Auth && npm install
cd ../User && npm install
cd ../Post && npm install
```

**Configure environment variables** (see Configuration section below).

**Start the services and gateway:**

```bash
# Start API Gateway
cd backend/API
node APIServer.js        # Deployment
nodemon APIServer.js     # Development

# Start Auth Server
cd ../Auth
node AuthServer.js
nodemon AuthServer.js

# Start User Server
cd ../User
node ./src/index.js
nodemon ./src/index.js

# Start Post Server
cd ../Post
node ./src/index.js
nodemon ./src/index.js
```

---

## Usage

Clients interact with LinkHive via the API Gateway:

### Example Requests

```bash
# Login via Auth Service
curl -X POST http://localhost:5000/auth/login -d '{"username":"samser","password":"123"}' -H "Content-Type: application/json"

# Get user profile via User Service
curl http://localhost:5000/user/me

# Get all links via Post Service
curl http://localhost:5000/link/

# Add a new link
curl -X POST http://localhost:5000/link/addLink -d '{"url":"https://example.com"}' -H "Content-Type: application/json"
```

---

## Configuration

Configure the API Gateway using a `.env` file:

```
PORT=5000
USER_SERVICE_URL=http://localhost:5002
POST_SERVICE_URL=http://localhost:5003
AUTH_SERVICE_URL=http://localhost:5001
```

To add more services, update the gateway routing configuration and environment variables.

---

## Contributing

Contributions are welcome! 🎉

1. Fork the repo & create a feature branch.
2. Submit a pull request describing your changes.

**Areas for help:**
- Load balancing across services
- Monitoring/logging improvements
- Enhanced fault tolerance

---

## License

MIT License

---

## Credits & Acknowledgements

- Built from scratch in Node.js by Samser Ali Khan
- Inspired by API Gateway and microservices design patterns

---

## Contact & Support

- **GitHub:** [SamserAliKhan](https://github.com/SamserAliKhan)
- **Email:** samseralikhan0448@gmail.com
- **Official Email:** samseralikhanOfficial9339@gmail.com
- **Issues:** [LinkHive Issues](https://github.com/SamserAliKhan/LinkHive/issues)

---

## Roadmap

- Implement load balancing across service instances
- Add centralized logging & monitoring
- Secure gateway with JWT authentication
- Add health check endpoints for services
- Deploy services via Docker containers

---

## FAQ

**Q:** Why build a custom API Gateway instead of using Nginx or Kong?  
**A:** To learn and demonstrate deeper understanding of proxy routing and microservices architecture.

**Q:** Can I add more services?  
**A:** Yes, just define the new service in `.env` and update gateway routes.

**Q:** Does LinkHive support load balancing?  
**A:** Not yet, but it’s on the roadmap.

---

## Changelog

### [0.1.0] - 2025-09-09
- Initial release of LinkHive
- Added API Gateway with proxy routing
- Added User, Post, and Auth services with basic endpoints

---

**_Add screenshots, demo links, and architecture diagrams here when available!_**
