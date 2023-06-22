# Use an official PHP runtime as the base image
FROM php:8.1-apache

# Set the working directory in the container
WORKDIR /var/www/html
ENV COMPOSER_ALLOW_SUPERUSER=1
# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libzip-dev \
    zip

# Install PHP extensions
RUN docker-php-ext-install \
    intl \
    pdo_mysql \
    zip 
    
RUN apt-get update && apt-get install -y librabbitmq-dev libssh-dev \
    && docker-php-ext-install opcache bcmath sockets \
    && pecl install amqp \
    && docker-php-ext-enable amqp

# Enable Apache rewrite module
RUN a2enmod rewrite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy the application files to the container
COPY . .

# Install Symfony dependencies
RUN usermod -u 1000 www-data 

# Set the correct permissions for Symfony
#RUN mkdir var
RUN chown -R www-data:www-data var

RUN composer install --no-interaction --no-scripts --no-suggest --prefer-dist --ignore-platform-reqs



# Expose port 80
#EXPOSE 80

# Start the Apache server
#CMD ["apache2-foreground"]
EXPOSE 8000
#CMD php bin/console server:run 0.0.0.0:8000
CMD php -S 0.0.0.0:8000 -t public
