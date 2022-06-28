# syntax=docker/dockerfile:1
# FROM rabbitmq:3.10.5

FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY ./requirements.txt /code/
RUN pip install -r requirements.txt
COPY ./ /code/
