# Node
FROM node:13.12.0-alpine as build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN timeout 30s npm install || true 
RUN npm install --verbose

# Copy the entire project directory
COPY . .

# Build the React application
RUN npm run build

# Nginx
FROM nginx:alpine

# Copy the build output to Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
