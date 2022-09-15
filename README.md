# Trinity Plumbing API

## Setup Instructions

### Install Dependencies

-  `npm i`

### Setup Environment Variables

-  Copy `.env.example` and rename it to `.env`

### Run ExpressJS Server

-  `npm run dev`

## Collaborators

-  Roshane Johnson
-  Geovaunie Golding
-  Anthony Barrett
-  Tyrese Morgan
-  Dejhon Sherman
-  Jordan Wint
-  Jason Vaz

## HTTP Status Codes Cheatsheet

-  > `200` OK: Successful request.
-  > `400` Bad Request: Invalid argument (invalid request payload).
-  > `403` Forbidden: Permission denied (e.g. invalid API key).
-  > `429` Resource Exhausted: Either out of resource quota or reaching rate limiting.
-  > `500` Internal Server Error: Internal server error (retry your request).
-  > `503` Service Unavailable: Unavailable.
-  > `504` Gateway Timeout: Deadline exceeded (retry your request).
