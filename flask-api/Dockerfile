FROM python:3.8-alpine

# RUN adduser -D miniburn

WORKDIR /home/miniburn

COPY dependencies/prod.txt requirements.txt
RUN python -m venv venv
RUN venv/bin/pip install -r requirements.txt
RUN venv/bin/pip install gunicorn

COPY app.py gunicorn_starter.sh ./
COPY business business/
COPY database database/
COPY exceptions exceptions/

ENV FLASK_APP app.py

EXPOSE 5000
ENTRYPOINT ["./gunicorn_starter.sh"]

