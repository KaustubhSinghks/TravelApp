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
