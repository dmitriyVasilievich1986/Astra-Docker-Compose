FROM python:3.9

LABEL author='dmitriyvasil@gmail.com'

RUN mkdir /app
WORKDIR /app

COPY . /app
RUN pip install -r requirments.txt

CMD gunicorn authentication.wsgi:application --bind 0.0.0.0:8000
