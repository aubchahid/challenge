# Wiggle Challenge

## Overview

The Wiggle Challenge is a web application built with Vue.js for the frontend and Laravel for the backend, leveraging a RESTful architecture. This project aims to showcase a practical implementation of these technologies to solve a specific challenge. The choice of Vue.js and Laravel was driven by their ease of use and the developer's familiarity with them, which was crucial given the project's tight timeline.

## Technologies

- **Frontend:** Vue.js
- **Backend:** Laravel (RESTful API)

## Features

List the key features of your project. For example:
- Create groups
- Create users
- Attach users to a group

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:

- PHP >= 8.1.27 
- Composer
- Node.js and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aubchahid/challenge.git

2. Open the backend folder
    ```bash 
    CD backend

3. Install Laravel dependencies
    ```bash 
    composer install

4. Running Database Migrations with Laravel
   ```bash 
    php artisan migrate

5. Start the Laravel backend server
    ```bash 
    php artisan serve

6. Open the frontend folder
     ```bash 
    CD ../frontend

7. Install Vue.js dependencies
     ```bash 
     npm i

8. Run the Vue.js frontend (in a new terminal)
     ```bash 
     npm run dev

### Note 
All the logging for the action on Users or Groups has made via the observers 


### What to Do If I Have More Time?
#### Improve Project Structure for Better Maintainability

Optimizing the project structure is crucial for enhancing maintainability, making it easier for new developers to understand the codebase, and facilitating future expansions or modifications. This involves organizing files and directories logically, following best practices for Vue.js and Laravel

#### Create Unit Tests for All Components and Scenarios

Writing comprehensive unit tests for every component and scenario in the application is essential for ensuring code reliability, reducing bugs, and facilitating future updates with confidence