# Vite React Project with Clean Architecture, TypeScript, Tailwind CSS, and Jest

This project is a minimal setup for a React application using Vite, TypeScript, Tailwind CSS, and Jest for testing. The
application follows **Clean Architecture** principles for better scalability and maintainability.

## Features

- **Vite** for fast build and development process
- **React** for the frontend UI
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for utility-first CSS
- **Jest** for unit and integration testing
- Follows **Clean Architecture** principles

## Requirements

Before getting started, make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://npmjs.com/)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/StrahinjaWebDev/the-unit-color-picker

# Go to folder
cd the-unit-color-picker

# Install dependencies
npm install

# Run the development server
npm run dev

The app will be running on http://localhost:5173 by default.

Project Structure
The project follows Clean Architecture principles, and its directory structure is organized as follows:

/src
  /core                    # Core business logic, entities, use cases, etc.
  /config                  # Configuration files
  /entities                # Business entities
  /interfaces              # TypeScript interfaces
  /use-cases               # Application-specific use cases
  /app                     # Application-specific logic
  /components              # React components
  /hooks                   # Custom React hooks
  /pages                   # Page components
  /tests                   # Unit and integration tests

Core
Contains business entities and use cases.

    Entities: The fundamental objects or concepts within the application domain.
    Use Cases: Application-specific business logic, which should not depend on UI or infrastructure.

Data
Contains repositories and services for data storage and fetching. This includes interacting with APIs, local storage, and any other external services.

App
The application layer, which contains hooks, services, and any logic that ties together the business layer and the UI layer.

Components
Contains reusable React components that make up the UI of the application.

Pages
Contains top-level page components that represent views in your application.

Styles
Tailwind CSS files and any other styles for the project.

Tests
Contains Jest tests for unit and integration testing.

Utils
Utility functions to help with common tasks, such as date formatting, etc.

Testing
This project uses Jest for testing.

Running tests
npm run test

This project uses ESLint for linting and Prettier for code formatting. To ensure your code is properly formatted and follows best practices, you can run the following command:
npm run lint

Scripts
Development
