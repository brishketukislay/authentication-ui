# Step 1: Build the React app
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install axios

# Copy the rest of the React app code
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve the React app with a lightweight web server
FROM nginx:alpine

# Copy the build directory from the previous image to the Nginx server's directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
