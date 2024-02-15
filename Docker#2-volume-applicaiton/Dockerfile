from node

WORKDIR /app

COPY . /app/

RUN npm install

EXPOSE 3001:80

# VOLUME [ "/app/feedback" ]

CMD [ "node","server.js" ]

# docker volume create my_named_volume
# docker run -d --rm -p 3001:80 -v my_named_volume:/app/feedback ajayy6796/volume-training
