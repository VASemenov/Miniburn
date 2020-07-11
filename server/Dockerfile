FROM python:3.8-slim

WORKDIR /home/miniburn

COPY dependencies/prod.txt requirements.txt
COPY static static/
COPY templates templates/
RUN python -m venv venv
RUN venv/bin/pip install -r requirements.txt
RUN venv/bin/pip install gunicorn

COPY app.py gunicorn_starter.sh ./

ENV FLASK_APP app.py

EXPOSE 5000
ENTRYPOINT ["./gunicorn_starter.sh"]
