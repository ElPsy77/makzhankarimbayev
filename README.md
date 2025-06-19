<!-- О ПРОЕКТЕ -->

## О проекте

Дипломный проект Мейрбека Алмаса 
Группы П21-4гк

### Данные для входа в панель администратора

Логин: admin  
Пароль: 4uslvzdo6  

<!-- СОЗДАНО С ПОМОЩЬЮ -->

## Создано с помощью

<ul>
   <li>React</li>
   <li>Next.js</li>
   <li>React Query</li>
   <li>Ant Design</li>
   <li>Tailwind CSS</li>
</ul>

<!-- НАЧАЛО РАБОТЫ -->

## Начало работы

Чтобы запустить локальную копию, выполните следующие простые шаги.

### Предварительные требования

- npm

   ```sh
   npm install npm@latest -g
   ```

- node (проект использует версию 20.17.0) - https://nodejs.org/en/download/

### Установка

1. Установите пакеты NPM

    ```sh
    npm install
    ```

2. Заполните файл .env

3. Запустите приложение локально
    ```sh
    npm run dev
    ```

## Подключение к базе данных

### 1. Установите MySQL

Если MySQL не установлен, скачайте и установите его с официального сайта:  
https://dev.mysql.com/downloads/mysql/

### 2. Создайте базу данных и пользователя

Откройте терминал и войдите в MySQL:

```sh
mysql -u root -p
```

Создайте базу данных и пользователя (можно использовать значения из `.env`):

```sql
CREATE DATABASE job_application_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'job_user'@'localhost' IDENTIFIED BY '050420501787';
GRANT ALL PRIVILEGES ON job_application_db.* TO 'job_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Создайте таблицу для заявок

Войдите в MySQL под своим пользователем:

```sh
mysql -u job_user -p job_application_db
```

Создайте таблицу:

```sql
CREATE TABLE job_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  town VARCHAR(100),
  startJobDate DATE,
  financialExpectations VARCHAR(100),
  lastCompany VARCHAR(255),
  isRecommendation TINYINT(1),
  employeeName VARCHAR(255),
  agreement TINYINT(1),
  status INT DEFAULT 0,
  closedDate DATETIME
);
```

### 4. Настройте переменные окружения

Убедитесь, что в файле `.env` указаны ваши параметры подключения:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=job_user
DB_PASSWORD=050420501787
DB_NAME=job_application_db
DB_TABLE_NAME_APPLICATIONS=job_applications
```

### 5. Установите зависимости и запустите проект

```sh
npm install
npm run dev
```

### 6. Проверьте подключение

- Откройте http://localhost:3000  
- Попробуйте отправить заявку через форму — данные должны появиться в базе.

---

Если возникнут вопросы — обратитесь к разработчику проекта.
