#!/bin/bash
source venv/bin/activate
gunicorn -w 2 --threads 2 -b 0.0.0.0:5000 app:app --log-level debug