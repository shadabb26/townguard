# TownGuard Local Issue Reporting Platform

TownGuard is a local issue reporting platform designed to streamline the process of reporting and managing community issues. This platform allows residents to submit various types of issues, such as potholes, graffiti, streetlight outages, and more, empowering local authorities to address these concerns efficiently.

## Introduction

TownGuard consists of three main components:

- **Admin**: Contains administrative tools and scripts for managing the issue reporting platform.
- **Backend**: Manages the server-side logic and API endpoints for handling issue submissions and data management.
- **Frontend**: Implements the user interface (UI) for residents to report issues and track their status.

## Prerequisites

Before setting up the TownGuard platform, ensure you have the following software installed:

- Node.js and npm (Node Package Manager): [Download and install Node.js](https://nodejs.org/)

## MongoDB Installation

- **[MongoDB Community Edition Installation Guide](https://docs.mongodb.com/manual/administration/install-community/)**

Choose the appropriate link for your operating system to install MongoDB:

- **[Install MongoDB on macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)**
- **[Install MongoDB on Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)**
- **[Install MongoDB on Ubuntu Linux](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)**

Follow the instructions provided in the MongoDB documentation for your specific operating system to complete the installation.


## Getting Started

Follow these steps to set up and run TownGuard locally on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your/townguard.git
cd townguard
```
### 2. Install Dependencies
Backend Setup
```
cd Backend
npm install
```
Frontend Setup
```
cd Frontend
npm install
```
Admin Setup
```
cd Admin
npm install
```

### 3. Set Environment Variables
#### Backend :
Create a .env file in the Backend directory and define necessary variables (e.g., database connection string, API keys).

### 4. Start the Backend Server

```
cd Backend
npm start
```

### 5. Start the Frontend Application

```
cd Frontend
npm run dev
```
### 6. Start the Admin Application

```
cd Admin
npm run dev
```
### 7. Access the Platform
Open a web browser and navigate to http://localhost:5173 to use the TownGuard local issue reporting platform.

### 8. Access the Admin Platform
Open a web browser and navigate to http://localhost:5175 to use the TownGuard local issue reporting platform.

