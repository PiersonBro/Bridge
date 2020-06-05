# Do we really need to use Alpine: https://unix.stackexchange.com/questions/561158/missing-c-headers-under-alpine-clang
# FROM alpine:3.12
# RUN apk add --update clang ttf-ubuntu-font-family && mkdir /src
FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y clang
RUN apt-get node

WORKDIR /src
COPY main.cpp .

CMD clang++ main.cpp && ls