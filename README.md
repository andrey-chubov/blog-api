API для блога на Express.js
Приложение представляет собой страницу, на которой могут делать записи любые авторизованные пользователи.
https://blog-api-l73a.onrender.com/api/docs/#/


Возможности
Реализована регистрация и авторизация пользователя, а также проверка JWT-токена при внесении записей на страницу
Запись блога содержит:
Дату записи
Сообщение: может содержать как текст, так и медиа
Автора сообщения
На странице с записями реализована пагинация, на каждой странице (пагинации) отображается по 20 записей
Автор записи может редактировать или удалять запись
Написана документаця к эндпоинтам (Swagger/OpenAPI)
Технологии
Express
MongoDB
Mongoose
TypeScript
Начало работы
Скопируйте репозиторий и установите зависимости

git clone 
cd blog-nodejs
npm install
Создайте файл .env в папке src и установите переменные среды

# Порт HTTP соединения, default = 5000
PORT=5000

# Адресс для подключения к MongoDB
DB_URL=

# Путь к папке сохранения изображений при загрузки на сервер
PATH_TO_FILES=

# Секретная строка для генерации токена доступа
JWT_ACCESS_SECRET = 
JWT_REFRESH_SECRET = 
Запустите сервер

# development
npm run dev

# production
npm run start
