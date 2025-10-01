# TravelAppFrontend

---

## Project Overview
TravelAppFrontend is the client-side application for the TravelApp platform, built with Angular 18. It allows users to search, book, and manage trips, hotels, and cabs, with secure authentication and payment integration. The frontend communicates with a Spring Boot backend via REST APIs.

## Tech Stack
- Angular 18
- REST API integration
- JWT Authentication

## Features
- User authentication (login/signup)
- Trip management (create, view, update, delete)
- Hotel and cab booking
- Payment processing
- Itinerary planning
- Admin dashboard
- Responsive UI

## How to Use
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   ng serve
   ```
3. Open [http://localhost:4200](http://localhost:4200) in your browser.

## Folder Structure
- `src/app/core/` - Core services, guards, interceptors
- `src/app/features/` - Feature modules (auth, trip, booking, payment, etc.)
- `src/app/shared/` - Shared components, models, services
- `src/app/environments/` - Environment configs
- `public/` - Static assets

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


TravelAppBackend

---

## Project Overview
TravelAppBackend is the server-side application for the TravelApp platform, built with Spring Boot. It exposes RESTful APIs for trip, booking, payment, user, and admin management, and handles authentication, authorization, and data persistence using MySQL.

## Tech Stack
- Spring Boot
- Java
- MySQL
- Spring Security (JWT Authentication)
- Maven

## Features
- RESTful API endpoints for all business domains
- JWT-based authentication and role-based access control
- Trip, hotel, cab, and itinerary management
- Payment processing
- Admin dashboard
- Exception handling and validation

## How to Run
1. Install dependencies:
   - Use Maven: `mvn install`
2. Configure database connection in `src/main/resources/application.properties`
3. Start the backend server:
   - Use Maven: `mvn spring-boot:run`
   - Or run the main class: `TravelappApplication.java`

## Folder Structure
- `src/main/java/com/travel/travelapp/controller/` - REST controllers
- `src/main/java/com/travel/travelapp/service/` - Business logic
- `src/main/java/com/travel/travelapp/model/` - Data models/entities
- `src/main/java/com/travel/travelapp/repository/` - Data access layer
- `src/main/resources/` - Configs and templates

---

