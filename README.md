# 🦉 NestJS REST API

A modular and secure REST API built with [NestJS](https://nestjs.com/), featuring Swagger docs, JWT authentication, request caching, and more.

---

## 🚀 Features

- ✅ **Modular architecture** using `@Module`, `@Controller`, and `@Service` pattern
- 🔐 **JWT Authentication** with:
  - Login using `passport-local` strategy
  - Protected routes with `@UseGuards(AuthGuard('jwt'))`
- 🔁 **Global Cache** using `CacheInterceptor` for performance
- 📄 **Swagger (OpenAPI) Documentation** at `/api`
- 🔧 **Environment-configurable** via `@nestjs/config`
- 📁 **User Module** with mock users for demo/testing
- 🌐 **Deployed on Render**

---

## 📚 Swagger API Docs

Access live, interactive docs at:

👉 **[https://nestexpress.onrender.com/api](https://nestexpress.onrender.com/api)**

Use it to:

- Explore available endpoints
- Test API requests with JWT token
- View request/response structure and status codes

---

## 🔐 Authentication

### 🧪 Login

```
POST /auth/login
```

**Body (JSON):**

```json
{
  "username": "test2",
  "password": "password2"
}
```

**Response:**

```json
{
  "access_token": "your.jwt.token"
}
```

Use the token in `Authorization` header:

```
Authorization: Bearer your.jwt.token
```

---

## 🔒 Protected Route Example

```
GET /v1/agencies/list
```

Requires JWT token. Returns sample report data.

---

## 🛠 Setup (for local development)

```bash
# Clone and install dependencies
git clone https://github.com/your-username/nestexpress.git
cd nestexpress
yarn install

# Start dev server
yarn start:dev
```

---

## 🌍 Deployment

This app is deployed on **Render.com** using auto-deploy from the `main` branch.
