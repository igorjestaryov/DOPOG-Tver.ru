# DOPOG-Tver.ru

## Описание
Этот сайт является дипломным проектом, демонстрирующим навыки веб-разработки. Он включает разделы "Главная", "Услуги", "Контакты". Сайт имеет адаптивный дизайн для удобства на всех устройствах и функцию быстрой прокрутки вверх.

## Установка
1. Установите visualstudiocode, его можено установить тут https://code.visualstudio.com/
2. Скачайте или клонируйте репозиторий:
   git clone https://github.com/igorjestaryov/DOPOG-Tver.ru
3. Скачайте PHP рекомендуемая версия 7.4 (https://github.com/nurfawaiq/php-version/blob/master/php-7.4.33-Win32-vc15-x64.rar)
4. Скачайте для PHP пакет mysql
5. Скачайте MysqlWorkBench и создайте в ней свою базу данных, туториал по установке (https://it.vshp.online/#/pages/manuals/mysql_manual)
6. Вставьте в БД код:
```sql
create database diplom;
   use diplom;
   CREATE TABLE `diplom` (
   `id` int NOT NULL AUTO_INCREMENT,
   `name` varchar(255) NOT NULL,
   `phone` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
   ```
7.  что бы запустить мой сайт, можно просто перейти вот сюда!!! https://dopogtver.ru/
8. Откройте файл submit_form.php 
 ```PHP
   $username = "urUsername";
   $password = "urPassword";
   $dbname = "urDatabaseName";
   ```
   

## Запуск
в директории с проектом выполнить команду
```bash
php -S 127.0.0.1:8000
```
зайдите на 127.0.0.1:8000 В любом удобном для вас браузере
 
## Особенности
    1.Липкий подвал (footer), который всегда находится внизу страницы.
    2.Кнопка "Вверх", которая появляется при прокрутке страницы и позволяет быстро вернуться наверх.
    3.Адаптивный дизайн для мобильных устройств.
    4.Данные сохраняются в phpmyadmin, и на почту рег.ру
## Авторы
   izhestarev@mail.ru