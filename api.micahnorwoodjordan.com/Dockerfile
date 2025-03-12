# FROM --platform=amd64 maven:3.9-eclipse-temurin-17
# this platfrom spec is only relevant for my m1 mac and rosetta compatibility regarding the AWS CLI

FROM maven:3.9-eclipse-temurin-17

ARG DATABASE_CONNECTION_STRING
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION

ENV DATABASE_CONNECTION_STRING=${DATABASE_CONNECTION_STRING}
ENV DATABASE_USER=${DATABASE_USER}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}

VOLUME ["/srv/api/src/main/resources/static"]

COPY . /srv/api

WORKDIR /srv/api

RUN apt update && apt install -y unzip sudo
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && sudo ./aws/install
RUN aws s3 sync s3://micahnorwoodjordan.com/api/client ./src/main/resources/static
RUN chmod +x ./mvnw && ./mvnw clean package

ENTRYPOINT [ "java -jar /srv/api/target/api.micahnorwoodjordan.com-build.jar" ]
