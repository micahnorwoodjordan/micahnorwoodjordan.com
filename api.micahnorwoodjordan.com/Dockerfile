FROM maven:3.9-eclipse-temurin-17


# NOTE:
#       these env vars are passed as a build arg from App Platform
#       they are promoted to an ENV var here so that Spring Boot picks them up at runtime

ARG DATABASE_CONNECTION_STRING
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG SPRING_PROFILES_ACTIVE

ENV DATABASE_CONNECTION_STRING=${DATABASE_CONNECTION_STRING}
ENV DATABASE_USER=${DATABASE_USER}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}

COPY . /srv/api

WORKDIR /srv/api

RUN chmod +x ./mvnw && ./mvnw clean package

ENTRYPOINT [ "java -jar /srv/api/target/api.micahnorwoodjordan.com-build.jar" ]

EXPOSE 8080
