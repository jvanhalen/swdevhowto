FROM node:17

# Set your timezone, mine is "Europe/Helsinki"
ENV TZ="Europe/Helsinki"

# Install telnet application
RUN apt update && apt install -y telnet

# Install nodemon
RUN npm install -g nodemon