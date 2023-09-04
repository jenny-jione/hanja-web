FROM python:3.9-buster

WORKDIR /app
COPY ./ /app
RUN chmod +x ./start_server.sh
RUN apt-get update
ENTRYPOINT /bin/bash ./start_server.sh