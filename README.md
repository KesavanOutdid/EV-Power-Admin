# EV Charger Application Admin 

Welcome to the EV Charger Application! This application is designed to provide a seamless experience for users and administrators in managing electric vehicle charging sessions.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)

## Features

- User Authentication: Secure login, registration, and session management.
- Wallet Management: Users can manage their wallets within the application.
- Charger Search: Users can search for available chargers.
- Charging Sessions: Initiate and stop charging sessions seamlessly.
- Admin Panel: Admins have access to user details, charger management, and revenue tracking.

## Technologies Used

- **Client:** ReactJS
- **Database:** MongoDB with Mongoose
- **Server:** Node.js with Express.js
- **Authentication:** JSON Web Tokens (JWT)
- **Payment Gateway:** Razorpay (Example - replace with your chosen provider)
- **UI Components:** Chakra UI, Material-UI

## Getting Started

To get started with the EV Charger Application, follow the steps below:

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Razorpay API keys (or your chosen payment gateway)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KesavanOutdid/EV-Power-Admin.git
   cd EV-Power-Admin

2. Install dependencies for both the Frontent and backend:
      ```bash
    cd frontend
    npm run custom-install
    cd backend
    npm install  //if node_modules does not present in the backend directry

3. Run the application:
      ```bash
     # In the client directory
     npm start
     # In the server directory
     npm run dev
## Usage

  Access the application at https://localhost:4244 (or your specified port).
  Users can log in, search for chargers, manage wallets, and initiate charging sessions.
  Admins can access the admin panel to manage users, chargers, and track revenue.

## Development

  To contribute to the development of the EV Charger Application, follow these steps:
  Fork the repository.
  
  Create a new branch for your feature/bugfix: git checkout -b feature-name
  Make your changes and commit them: git commit -m 'Your message'
  Push the changes to your fork: git push origin feature-name
  Create a pull request to the main repository.


