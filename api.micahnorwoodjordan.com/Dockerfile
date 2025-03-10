FROM maven:3.9-eclipse-temurin-17

ENV DATABASE_CONNECTION_STRING=${DATABASE_CONNECTION_STRING}
ENV DATABASE_USER=${DATABASE_USER}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}

COPY . /srv/api

WORKDIR /srv/api

RUN chmod +x ./mvnw && ./mvnw clean package

ENTRYPOINT [ "java --jar /srv/api/api.micahnorwoodjordan.com-build.jar" ]
