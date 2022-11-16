#release: python backend/manage.py migrate
web: gunicorn backend.wsgi --log-file -
frontend: cd frontend && npm start