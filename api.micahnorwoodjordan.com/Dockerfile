FROM maven:3.9-eclipse-temurin-17


# NOTE:
#       these env vars are passed as a build arg from App Platform
#       they are promoted to an ENV var here so that Spring Boot picks them up at runtime

ARG DATABASE_CONNECTION_STRING
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG SPRING_PROFILES_ACTIVE
ARG SERVER_PORT
ARG SMTP_USERNAME
ARG SMTP_PASSWORD
ARG DOCKER_DEPLOYMENT_METHOD

ENV DATABASE_CONNECTION_STRING=${DATABASE_CONNECTION_STRING}
ENV DATABASE_USER=${DATABASE_USER}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}
ENV SERVER_PORT=${SERVER_PORT}
ENV SMTP_USERNAME=${SMTP_USERNAME}
ENV SMTP_PASSWORD=${SMTP_PASSWORD}
ENV DOCKER_DEPLOYMENT_METHOD=${DOCKER_DEPLOYMENT_METHOD}

RUN useradd -m deployuser

RUN mkdir -p /var/log/api.micahnorwoodjordan.com

COPY . /srv/api

WORKDIR /srv/api

RUN chmod +x ./mvnw && chown -R deployuser:deployuser /srv/api

USER deployuser

RUN ./mvnw clean package && ./mvnw install
