# Backend Delivery Application
---
This is the backend side of Deliveries and Bots Web Application.

## Config-environment
Thecnologies used to build and run this project.

- Node.js
- Express.js
- Firebase

## Getting Started

If you like to run this amazing app in you local machine. These are the steps you should follow:
### Prerequisites
In order to execute the project, it is necessary the latest version of npm and Node.js.

```sh
npm install npm@latest -g
```

## Installation
Perfect! Let's clone the repo, and install the dependencies of the project.

1. Clone the repo
    ```sh
    git clone git@github.com:LilianaRestrepoTorres/BE-delivery-app.git
    ```
2. Install NPM packages
    ```sh
    npm install 
    ```
3. Run the project
    ```sh
    npm run dev
    ```


## Data Persistence
Firebase provides 'Firestore Database' as a DataBase as a service which is being used to persist data in this project.
Therefore, in order to have access to that DB it is required ```credentials-firebase.json``` file.
You could either ask me to share it or create you own database and download the ```sh Firebase Admin SDK file```.


## Endpoints Created - Queries
Theses can be found in ```test.rest``` file as well. 
1. API 
    ```sh
    http://localhost:9393
    ```
2. Deliveries
   * Get all deliveries:
        ```sh
        GET http://localhost:9393/deliveries
        ```
   * Get delivery by id
        ```sh
        GET http://localhost:9393/deliveries/${id}
        ```
    * Add delivery
        ```sh
        POST http://localhost:9393/adddelivery
        Content-Type: application/json

        {
            "id": string,
            "creation_date": Date,
            "state": "pending" | "assigned" | "in_transit" | "delivered",
            "pickup_lat": number,
            "pickup_lon": number,
            "dropoff_lat": number,
            "dropoff_lon": number,
            "zone_id": string
        }
        ```
    * Update delivery state
        ```sh
        PATCH http://localhost:9393/changestatedelivery
        Content-Type: application/json

        {
            "id": string,
            "newState": "pending" | "assigned" | "in_transit" | "delivered"
        }
        ```
        
   
3. Bots
   * Get all bots:
        ```sh
        GET http://localhost:9393/bots
        ```
   * Get bot by id
        ```sh
        GET http://localhost:9393/bots/${id}
        ```
    * Add bot
        ```sh
        POST http://localhost:9393/addbot
        Content-Type: application/json

        {
            "id": string,
            "status": "available" | "busy" | "reserved",
            "dropoff_lat": number,
            "dropoff_lon": number,
            "zone_id": string
        }
        ```
    * Update bot state
        ```sh
        PATCH http://localhost:9393/changebotstatus
        Content-Type: application/json

        {
            "id": string,
            "newStatus": "available" | "busy" | "reserved"
        }
        ```
 
 ## Preview
 
 

https://user-images.githubusercontent.com/17114826/178789104-50d85964-ca39-4a62-a66b-3e3eefa3c81d.mov

## Diagram

![DeliveriesApp](https://user-images.githubusercontent.com/17114826/178791164-619e4f59-a3c7-4d40-b1ea-7311231d5d42.png)


---
 This project was built with 💚 by me.
