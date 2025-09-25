# 🦉 NestJS REST API

A modular and secure REST API built with [NestJS](https://nestjs.com/),
featuring Swagger docs, JWT authentication, request caching, and more.

---

## 🚀 Features

- ✅ **Modular architecture** using `@Module`, `@Controller`, and
  `@Service` pattern
- 📖 **API Documentation** with [Swagger](https://swagger.io/)
- ⚡ **Caching** using NestJS cache manager
- 🌱 **Seeding Support** for quick database setup
- 📝 **Logging** with NestJS Logger for debugging
- 🎯 **Validation & Serialization** using `class-validator` and
  `class-transformer`
- 🧩 **Profiles Module** with CRUD operations and seeding

## 🌐 Live Example

- 🔗 [Main App](https://nestexpress.onrender.com/v1)
- 📄 [Swagger Docs](https://nestexpress.onrender.com/api/docs)

---

## 📦 Installation

```bash
# install dependencies
yarn install

# setup environment variables
cp .env.example .env

# run database migrations
npx prisma migrate dev

# run seed script (example: profiles)
yarn seed:profiles
```

---

## ▶️ Running the app

```bash
# development
yarn start:dev

# production build
yarn build
yarn start:prod
```

---

## 📖 API Documentation

Swagger UI available at: <http://localhost:3000/api/docs>

---

## 🌱 Seeding

We provide seeding scripts for initial data setup.

```bash
# seed profiles
yarn seed:profiles
```

## 🔐 Authentication

### 1. Login to obtain JWT token

```bash
curl -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Response:**

```json
{
  "access_token": "your.jwt.token"
}
```

### 2. Use token in protected routes

```bash
curl -X GET http://localhost:3000/v1/profile \
  -H "Authorization: Bearer your.jwt.token"
```

---

## 📌 Example API Requests

### Get all profiles

```bash
curl -X GET http://localhost:3000/v1/profile
```

### Create a new profile

```bash
curl -X POST http://localhost:3000/v1/profile \
  -H "Content-Type: application/json" \
  -d '{
    "username": "traveler01",
    "email": "user@example.com",
    "bio": "Loves adventures",
    "interests": ["hiking", "food trips"],
    "location": "Manila, Philippines"
  }'
```

### Update a profile

```bash
curl -X PUT http://localhost:3000/v1/profile/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "Now a full-time travel blogger"
  }'
```

### Delete a profile

```bash
curl -X DELETE http://localhost:3000/v1/profile/{id}
```

---

## 📝 License

This project is licensed under the MIT License.  
Authored by **Tavie**.
