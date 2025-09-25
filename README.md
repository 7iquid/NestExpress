# 🦉 NestJS REST API

A modular and secure REST API built with [NestJS](https://nestjs.com/), featuring Swagger docs, JWT authentication, Firebase integration, and more.

---

## 🚀 Features

- ✅ **Modular architecture** using `@Module`, `@Controller`, and `@Service` pattern
- 🔐 **JWT Authentication** with:
  - Login using `passport-local` strategy
  - Protected routes with `@UseGuards(AuthGuard('jwt'))`
- 🔁 **Global Cache** using `CacheInterceptor` for performance
- 📄 **Swagger (OpenAPI) Documentation** at `/api`
- 🔧 **Environment-configurable** via `@nestjs/config`
- 🔥 **Firebase Admin SDK** integration (for authentication, Firestore, etc.)
- 👤 **Profile Module** with CRUD endpoints for traveler profiles
- 📁 **User Module** with mock users for demo/testing
- 🌐 **Deployed on Render**

---

## 📚 Swagger API Docs

Access interactive API docs at:

👉 **[http://localhost:3000/api](http://localhost:3000/api)** (local)  
👉 **[https://nestexpress.onrender.com/api](https://nestexpress.onrender.com/api)** (Render deployment)

You can use Swagger to:

- Explore available endpoints
- Test API requests with JWT token
- View request/response structures and status codes

---

## 👤 Profile Module

Traveler profiles API.

### Endpoints

- `POST /profile` → Create a new traveler profile
- `GET /profile/:id` → Retrieve a traveler profile
- `PUT /profile/:id` → Update a traveler profile

### Profile fields

- `id` (UUID)
- `username` (string, unique)
- `email` (string)
- `bio` (string)
- `interests` (array of strings, e.g. `["hiking", "food trips"]`)
- `location` (city, country)
- `avatarUrl` (string, optional)
- `createdAt`, `updatedAt`

### Example Request

```http
POST /profile
Content-Type: application/json

{
  "username": "traveler01",
  "email": "user@example.com",
  "bio": "Loves adventures",
  "interests": ["hiking", "food trips"],
  "location": "Manila, Philippines"
}
```
