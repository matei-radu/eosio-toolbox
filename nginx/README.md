# Nginx Configuration
`default.conf` is a simple Nginx configuration for Single Page Applications (SPAs).

Its main feature is the redirection of not found routes to `index.html`. In addition to that, it serves gzipped content and adds Cache-Control headers to application assets such as JavaScript and CSS files.

When using Docker with an Nginx image, this configuration must be moved to an appropriate directory to be properly recognized. Example:

```Dockerfile
FROM nginx:mainline-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/
```

This config directory might vary between image flavors so check your specific image documentation.
