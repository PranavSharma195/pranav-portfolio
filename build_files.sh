#!/bin/bash
# Runs on Vercel during the build step: installs dependencies and
# collects static files into staticfiles/ so they can be served directly.
set -e

pip install -r requirements.txt --break-system-packages
python3 manage.py collectstatic --noinput --clear
