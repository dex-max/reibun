FROM python

WORKDIR /src

RUN apt-get -y install libpq-dev

COPY . .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

CMD ["flask", "--app", "app", "run", "--host=0.0.0.0", "--debug"]
