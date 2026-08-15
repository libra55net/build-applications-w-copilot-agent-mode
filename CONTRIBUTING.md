# Contributing to Octofit Tracker

Thank you for your interest in contributing! This document explains how to set up the project, propose changes, run tests, and the expectations for participation.

## Setting Up the Project

### Prerequisites

- Node.js (LTS)
- MongoDB (`mongodb-org`)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/libra55net/build-applications-w-copilot-agent-mode.git
   cd build-applications-w-copilot-agent-mode/octofit-tracker
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start MongoDB:**
   Ensure `mongod` is running on its default port (`27017`).

5. **Start the backend (port 8000):**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend (port 5173):**
   ```bash
   cd frontend
   npm run dev
   ```

## Proposing Changes

1. Fork the repository and create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes with clear, focused commits.
3. Push your branch and open a Pull Request against `main`.
4. Describe what your change does and why, and link any related issues.
5. Be responsive to review feedback — a maintainer will review your PR as soon as possible.

## Running Tests

### Backend

```bash
cd octofit-tracker/backend
npm test
```

### Frontend

```bash
cd octofit-tracker/frontend
npm test
```

Run tests before submitting a PR to make sure nothing is broken.

## Code of Conduct

We are committed to providing a welcoming and respectful environment for everyone.

- **Be kind and respectful.** Treat all contributors with courtesy.
- **Be constructive.** Offer helpful feedback and assume good intent.
- **Be inclusive.** Welcome contributors of all backgrounds and experience levels.
- **No harassment or discrimination** of any kind will be tolerated.

Violations may result in removal from the project. If you experience or witness unacceptable behavior, please open an issue or contact a maintainer directly.
