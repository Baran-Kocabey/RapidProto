FROM nginxinc/nginx-unprivileged
COPY dist/apps/workshop-ui/browser /usr/share/nginx/html/
COPY nginx.site.template /etc/nginx/templates/default.conf.template
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
