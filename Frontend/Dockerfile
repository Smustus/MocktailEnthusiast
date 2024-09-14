#Define the base image on top of which our application will run, Node in this case.
FROM node:20-alpine 

#Working directory of the docker container at any given time
WORKDIR /app

#Copy our package.json file from our local system to the docker image
COPY package.json .

#Run npm install inside the docker image to install all our dependencies
RUN npm install

#Install serve. It helps you serve a static site, single page application or just a static file
RUN npm install -g serve

#Copy the rest of the files into the docker image
COPY . .

#Run npm run build to create a production build of our application
RUN npm run build

#Define EXPOSE 8080 is a convention and a good practice that declares on which port the application “should” run and not must run. We can have a different port exposed in the Dockerfile and can use a totally different port while running the image.
EXPOSE 8080

#Serve -s distruns only when the server (container) starts.
CMD ["serve", "-s", "dist", "-l", "8080"]