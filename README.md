## Outline

 - [Installation](#installation)
 - [Building APIs](#building-apis)
 - [REST APIs](#rest-api)


## Libraries

This project is using several libraries and frameworks:

 - [express] - Web Framework
 - [sequelize] - ORM
 - [sqlite3] - Database

## Installation

### Dependencies

Make sure you have Node v12.19.1 or greater installed. Type into the terminal:

```bash
$ node -v
```

### Setup

Run the task to install dependencies:

```bash
$ npm i
```

```bash
$ npm run installApp
```
### Testing

Runing Tests

```bash
$ npm run test
```

### Running

Once you are setup, be sure to start your Node application:

```bash
$ npm run dev
```
This starts your API application at <http://localhost:3333>
## Building APIs

### Define User Stories

 - Register Raw Materials
 - List Raw Materials
 - List History of raw material use

### Define Schema

rawMaterials.

 - name
 - quantity

usedRawMaterials.

 - name
 - usedQuantity
 - user


### Request Methods


|Method|Description|Example|
| ------ | ------ | ----- |
|get|For returning resources from read-only endpoint|Get raw materials|
|post|For creating new resources|Create new raw materials|
|put|For updating an existing resource|Editing raw materials|

### Response Status Codes

Another thing to notice is API response `status` codes, as a rule of thumb:

|Status|Description|Example|
| ------ | ------ | ----- |
|200|Success|Retrieved list of raw materials|
|201|Created|raw material was created|
|400|Bad request|Invalid entry from raw materials|
|500|Error|Exception happened on server|


## REST API

The REST API to the example app is described below.

## Get list of raw materials

### Request

`GET /rawMaterials/`

    curl -i -H 'Accept: application/json' http://localhost:3333/rawMaterials

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 2487
    Connection: keep-alive
    Keep-Alive: timeout=5

    [{"id":1,"name":"ovo","quantity:10"}]
    

## Create a new raw materials

### Request

`POST /rawMaterials/`

    curl -i -X POST -H "Content-Type: application/json" -d '{"name":"Farinha","quantity":10}' http://localhost:3333/rawMaterials

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 118
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":60,"name":"Farinha","quantity":10,"updatedAt":"2021-01-17T14:51:05.293Z","createdAt":"2021-01-17T14:51:05.293Z"}

## Get a specific raw material

### Request

`GET /rawMaterials?name=XXX`

    curl -i -H 'Accept: application/json' http://localhost:3333/rawMaterials?name=ovo

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 628
    Connection: keep-alive
    Keep-Alive: timeout=5

    [{"id":17,"name":"Ovo","quantity":89}]

## Get a non-existent raw materials

### Request

`GET /rawMaterials?name=nonExistent`

    curl -i -H 'Accept: application/json' http://localhost:3333/rawMaterials?name=nonExistent

### Response
    
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 2
    Connection: keep-alive
    Keep-Alive: timeout=5
    
    []

## Update the system after getting raw material

### Request

`PUT /rawMaterials/:id/request`

    curl -i -X PUT -H "Content-Type: application/json" -d '{"user":"user","quantity":1}' http://localhost:3333/rawMaterials/1/request



### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 31
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"quantity":1,"user":"user"}


##  Update the system after getting raw material using invalid params

### Request

`PUT /rawMaterials/:id/request`

    curl -i -X PUT -H "Content-Type: application/json" -d '{"user":"user","quantity":"five"}' http://localhost:3333/rawMaterials/1/request


### Response

    HTTP/1.1 400 Bad Request
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 47
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"err":"the field, quantity must be a integer"}

