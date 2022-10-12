# ACIT3495-Project
2022 (C) BCIT

## Project Scope
**Open Weather Service API** is meant for weather services to compute raw data into a user-friendly API for frontend applications: 

-  Data is sent over HTTP to a frontend with API calls.
-  Users and administrators must authenticate. 
-  Services are loosely coupled and scalable.

## Architecture
Open Weather Service works in the following steps: 

1.  Weather data of temperatures is deposited by an administrator..
2.  The temperature data is saved to a relational database.
3.  The data is divided into chunks by datetime.
4.  The minimum value, maximum value, and average value is computed.
5.  The computed values are saved in a non-relational database
6.  The computed data is served over HTTP to a frontend with REST API calls.

### Databases
Uses two different databases.
1.  MySQL for raw data
2.  NoSQL(MongoDB) for computed data
Raw data is computed for minimum, maximum, and average values.

### User Interfaces
**Admin Client**
-  Weather Service portal for uploading raw temperature data.
-  Saves raw data and computed data separately in containers
-  Requires Admin Authorisation


**User Client**
-  Weather application
-  Presents organised temperature information with useful summary
-  User account required for authorisation

### Microservices Design
The application is divided into 5 services:
1.  **Express.js** webclient
2.  **MySQL** for raw data
3.  **Node.js** analytics service
4.  **MongoDB** for computed data
5.  **Python-flask** application for API service

Authorisation is managed by a JWT service

## Repository
GitHub: https://github.com/xXDamoonXx/ACIT3495-Project

Docker Hub:
-  mysql image: damoun1380/mysql-project:tagname
-  mongo image: damoun1380/mongo:tagname

