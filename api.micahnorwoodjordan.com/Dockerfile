FROM maven:3.9-eclipse-temurin-17

COPY . /srv/api

WORKDIR /srv/api

RUN chmod +x ./mvnw && ./mvnw clean package
