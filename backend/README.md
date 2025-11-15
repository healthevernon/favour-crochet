# favour-crochet backend (Django)

This folder contains a minimal Django project scaffold. It uses SQLite by default for quick local development. Replace `DATABASE_URL` in `.env` with your Supabase Postgres URL when you want to use Supabase.

How to run locally (example):

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

API endpoint:
- /api/products/  (DRF ViewSet)

Admin:
- /admin/

