# Group 18 CS370 Term Project Fall 2020

### Authors: Hayden Dachel, Michael Egues, Frank Gansukh

## Description

The purpose of our project is to provide an easy way to track the flow (in CFS) of rivers that the user has recently visited and kayaked. A user can submit a Date visited, a name of the river visited, and the flow measurement in CFS recorded. This information will be stored, with the ability for the user to retrieve it later by submitting a date to query.

### API usage (Work in progress)
*  API endpoint:
        
        /api
    * I.e. *http://localhost:3000/api* 

## Usage

### <a name="buildRun"></a>To build and run this project:
* Ensure that you have npm and nodejs [installed](https://nodejs.org/en/download/) in your local development environment.
* Build the project and dependencies by running the following command:

       npm install
* Run the project and start the server by running the following command:

        npm start

### Check your work
* Give the API a go
    * Make sure you've started the server (see [Build and run this project](#buildRun)), then run the following command to send a  HTTP GET request to the server with the parameter "key" = "value"

            curl -d "key=value" http://localhost:3000/api
    * You should see a response:

            {"key":"value"}
    * Try other request types, e.g. PUT:
            
            curl -d "key=value" -X PUT http://localhost:3000/api

## Docker

### To build local docker image named *testimage*
* Change into project directory
* Run the following command:
        
        docker build -t testimage .
* *testimage* will now be in the local docker repository.

### To pull latest docker image for this project from Docker Hub
* Run the following command:

        docker pull hjdachel/cs370proj:latest

### To run the local docker image named *testimage*
* Run the following command to run the image as an interactive container, forwarding host port 8080 to container port 3000:
        
        docker run -p 8080:3000 testimage

* Or try the following command to do the same, but this time as a detached conatiner:

        docker run -d -p 8080:3000 testimage

### To run the latest image from Docker Hub
* Run the following command to run the latest image for this project from docker hub as a detached container, forwarding host port 8080 to container port 3000:

        docker run -d -p 8080:3000 hjdachel/cs370proj:latest

### Check your work
* Run the following command to view active containers:

        docker ps -a

