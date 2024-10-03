#!/bin/bash

echo "Stopping and removing existing containers..."
docker-compose down

echo "Building and starting containers..."
docker-compose up --build -d
