# Step 1: Build the React application
FROM node:latest AS build

WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built files from the first stage to the Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
