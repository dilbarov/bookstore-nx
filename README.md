# Project Setup

This project consists of multiple microservices, each serving a specific purpose within the system. The services include `api-gateway`, `client`, `identity`, `favorites`, and `library`. Below are the instructions for setting up and running the entire system.

## Prerequisites

Before running the project, ensure that you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [NX CLI](https://nx.dev/getting-started/intro)

## Recommended Development Environment

For an optimal development experience, it's recommended to use the NX Console extension. NX Console provides an intuitive graphical interface for running NX commands, managing your workspace, and generating code.

### NX Console for Visual Studio Code

If you're using Visual Studio Code, you can install the NX Console extension from the Visual Studio Marketplace:

- [Download NX Console for VS Code](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)

### NX Console for JetBrains IDEs

For JetBrains IDEs like WebStorm, IntelliJ IDEA, and others, you can also install the NX Console plugin:

- [Download NX Console for JetBrains](https://plugins.jetbrains.com/plugin/18093-nx-console)

These tools provide a powerful way to interact with your NX workspace without having to remember complex commands.


## Running the Databases with Docker Compose

To start the required databases for the microservices, use the following command to run `docker-compose`:

```bash
docker-compose up
```

This command will start all the necessary databases, such as PostgreSQL, Redis, and MongoDB, as defined in the docker-compose.yml file.

## Running the Applications

Once the databases are up and running, you can start each microservice individually using the following commands:

### 1. API Gateway

Start the API Gateway, which serves as the central point of entry to the system:

```bash
nx run api-gateway:serve:development
```

### 2. Identity Service

Start the Identity Service, which manages user authentication and authorization:

```bash
nx run identity:serve:development
```

### 3. Favorites Service

Start the Favorites Service, which handles user favorites across different entities:

```bash
nx run favorites:serve:development
```

### 4. Library Service

Start the Library Service, which manages books and authors:

```bash
nx run library:serve:development
```

### 5. Client

Start the frontend client application:

```bash
nx run client:serve
```

## Summary of Commands

1. Start Databases: `docker-compose up`
2. Start API Gateway: `nx run api-gateway:serve:development`
3. Start Identity Service: `nx run identity:serve:development`
4. Start Favorites Service: `nx run favorites:serve:development`
5. Start Library Service: `nx run library:serve:development`
6. Start Client: `nx run client:serve`

## Additional Information

- Ensure that the databases are fully initialized before starting the microservices to avoid connection errors.
- You can use docker-compose down to stop the databases when they are no longer needed.
