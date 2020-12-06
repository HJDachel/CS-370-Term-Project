# Group 18 CS370 Term Project Fall 2020

### Authors: Hayden Dachel, Michael Egues, Frank Gansukh

## Description

The purpose of our project is to provide an easy way to track the flow (in CFS) of rivers that the user has recently visited and kayaked. A user can submit a Date visited, a name of the river visited, and the flow measurement in CFS recorded. This information will be stored, with the ability for the user to retrieve it later by submitting a date to query.

### API usage
*  API endpoint:
        
        /api
    * I.e. *http://localhost:3000/api* 
*  Supports GET, POST, PUT, and DELETE requests.
    * GET requests require a request body with a date in the form MDDYYYY, and return the corresponding record. e.g { "date": "12062020"}
    * POST requests require a request body with a date (MMDDYYYY), a Name (string), and a Flow (int). e.g. { "date": "7022000", "Name": "Poudre", "Flow": "200" }. POST request insert a new record into the database.
    * PUT requests require the same request body parameters as  POST request, but their function is to modify the existing record at the provided date with the new Name and Flow provided.
    * DELETE requests require a request body like that of a GET request, but their function is to delete the record corresponding to the provided date. 

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

## Kubernetes

### To run this application as a Kubernetes service
* Run the following to apply the service spec:

        kubectl apply -f cs370Pod.yml
* This command will apply the spec and start the service `cs370svc`
* Run the following to check if both containers have started:

        kubectl get all
* Once both the mysql DB container and the application container have started, you will see something like the following:

        NAME            READY   STATUS
        pod/cs370pod    2/2     Running
### To make API requests to the kubernetes service
* Determine the IP address of the minikube instance by running the following command:

        minikube ip
* Once you have determined the IP address of the minikube instance, and both the service and pod are launched and ready, you can begin making requests
    * Sample POST request to add a record of December 6th, 2020, Poudre River, 200 CFS: 
        
             curl --location --request POST 'http://$(minikube ip):30001/api/' \
                --header 'Content-Type: application/json' \
                --data-raw '{
                        "date": "12062020",
                        "name": "Poudre",
                        "flow": "200"
              }'   
    * Sample GET request to retrieve the record you just inserted: 
        
             curl --location --request GET 'http://$(minikube ip):30001/api/' \
                --header 'Content-Type: application/json' \
                --data-raw '{
                        "date": "12062020" 
             }'   
    * Sample PUT request to update the record you've just viewed to 300 CFS:
                
                curl --location --request PUT 'http://$(minikube ip):30001/api/' \
                --header 'Content-Type: application/json' \
                --data-raw '{
                        "date": "12062020",
                        "name": "Poudre",
                        "flow": "300"
                }'
   * Run the previous GET request to see the record you've updated.
   * Sample DELETE request to delete the record you've just updated: 
                
                curl --location --request DELETE 'http://$(minikube ip):30001/api/' \
                --header 'Content-Type: application/json' \
                --data-raw '{
                        "date": "12062020"
                }'