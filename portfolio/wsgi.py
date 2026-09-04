"""
WSGI config for portfolio project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')

application = get_wsgi_application()

# Vercel's @vercel/python builder looks for a module-level variable named
# "app" to use as the WSGI callable — this alias makes this file work both
# as a normal Django WSGI entry point and as a Vercel serverless function.
app = application
