FROM gradle:latest

RUN mkdir /api
WORKDIR /api

COPY . .

CMD gradle build --continuous & gradle run --continuous
