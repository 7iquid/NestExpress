# 🦉 NestJS REST API

A modular and secure REST API built with [NestJS](https://nestjs.com/),
featuring Swagger docs, JWT authentication, request caching, and more.

---

## 🚀 Features

- ✅ **Modular architecture** using `@Module`, `@Controller`, and
  `@Service` pattern
- 📖 **API Documentation** with [Swagger](https://swagger.io/)
- ⚡ **Caching** using NestJS cache manager
- 🗂 **Database Integration** with Prisma ORM (PostgreSQL)
- 🌱 **Seeding Support** for quick database setup
- 📝 **Logging** with NestJS Logger for debugging
- 🎯 **Validation & Serialization** using `class-validator` and
  `class-transformer`
- 🧩 **Profiles Module** with CRUD operations and seeding

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

---

## 📝 License

This project is licensed under the MIT License.  
Authored by **Tavie Legasto**.
