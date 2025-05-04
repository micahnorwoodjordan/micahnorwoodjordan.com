FROM python:3.12-slim

ARG STATIC_DIRECTORY

ENV STATIC_DIRECTORY=${STATIC_DIRECTORY}
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN useradd -m deployuser

RUN apt-get update && apt-get install -y curl

COPY . /srv/static

WORKDIR /srv/static

RUN chown -R deployuser:deployuser /srv/static

RUN pip install --no-cache-dir -r requirements.txt

USER deployuser
