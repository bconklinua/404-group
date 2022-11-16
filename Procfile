#release: python backend/manage.py migrate
web: gunicorn backend.truefriends.wsgi --log-file -
frontend: cd frontend && npm start