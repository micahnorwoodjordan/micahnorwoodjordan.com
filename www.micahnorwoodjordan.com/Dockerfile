FROM --platform=linux/amd64 node:23.9.0

ARG UI_PORT

ENV UI_PORT=${UI_PORT}
ENV NG_CLI_DISABLE_INTERACTIVE=true
ENV npm_config_arch=x64

RUN useradd -m deployuser

COPY . /srv/ui

WORKDIR /srv/ui

RUN chown -R deployuser:deployuser /srv/ui

USER deployuser

RUN npm install
