FROM python:latest

WORKDIR /src/

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD ["gunicorn", "wsgi:app" "-b" "0.0.0.0:5000"]
