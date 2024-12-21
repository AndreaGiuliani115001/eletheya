FROM php:8.2-cli

# Installare estensioni e dipendenze necessarie
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libjpeg-dev \
    libpng-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Installare Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Configurare la directory di lavoro
WORKDIR /var/www

# Copiare il codice del progetto
COPY . .

# Installare le dipendenze di Laravel
RUN composer install

# Impostare i permessi corretti per Laravel
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Porta da esporre
EXPOSE 9000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]


