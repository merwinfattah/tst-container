FROM python:3.9

WORKDIR /usr/src/server
ADD requirements.txt .
RUN pip3 install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]