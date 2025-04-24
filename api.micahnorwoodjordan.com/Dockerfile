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

ENV DATABASE_CONNECTION_STRING=${DATABASE_CONNECTION_STRING}
ENV DATABASE_USER=${DATABASE_USER}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}
ENV SERVER_PORT=${SERVER_PORT}
ENV SMTP_USERNAME=${SMTP_USERNAME}
ENV SMTP_PASSWORD=${SMTP_PASSWORD}

COPY . /srv/api

WORKDIR /srv/api

RUN mkdir -p /var/log/api.micahnorwoodjordan.com
RUN chmod +x ./mvnw && ./mvnw clean package

# use exec form of ENTRYPOINT to avoid arg parse errors
ENTRYPOINT [ "java", "-jar", "/srv/api/target/api.micahnorwoodjordan.com-build.jar"]
