# Use the official Nginx image
FROM nginx:alpine

# Copy the custom Nginx configuration file to the correct location
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set the working directory to where Nginx serves files
WORKDIR /usr/share/nginx/html

# Copy all HTML files from the "root" directory of the project to the working directory
COPY root/ .

# Expose port 80 to allow external access to the container
EXPOSE 80

# Run Nginx in the foreground (as the main process)
CMD ["nginx", "-g", "daemon off;"]
