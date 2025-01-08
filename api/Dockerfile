FROM python:3.13-alpine

WORKDIR /src

COPY . .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

CMD ["flask", "--app", "app", "run", "--host=0.0.0.0", "--debug"]
