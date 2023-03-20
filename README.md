## Установка

Для запуска проекта необходимо установить зависимости для клиентской и серверной части приложения.

1. Склонируйте репозиторй

```
git clone https://github.com/shtramvasov/node-hotel.git
```

2. Зайти в папку <code>server</code> и выполнить следующую команду:

```
npm install
```

3. Создать базу данных PostgreSQL и использовать скрипт
```
createdb hotel_system
psql -d hotel_system -f hotel_system.sql
```

4. Создать <code>.env</code> файл и написать свои данные:
```
PG_USER= YOUR_username
PG_PASSWORD= YOUR_password
PG_HOST= YOUR_localhost
PG_PORT= YOUR_port
PG_DATABASE=hotel_system
```

5. После перейти в папку <code>client</code> и выполнить следующую команду:

```
npm install
```

6. Cоздать <code>.env</code> файл и написать свои данные:
```
VITE_APP_ENDPOINT= YOUR_BACKEND_ENDPOINT (http://localhost:5000/api)
```
## Запуск приложения

1. Зайти в папку <code>server</code> и выполнить следующую команду:

```
npm run dev
```
2. После перейти в папку <code>client</code> и выполнить следующую команду:

```
npm run dev
```
