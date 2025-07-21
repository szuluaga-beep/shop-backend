
# 🛒 Shop Backend

> API RESTful para la gestión de una tienda online, desarrollada con NestJS, PostgreSQL y Wompi.

---

## 🚀 Tecnologías principales

- [NestJS](https://nestjs.com/) (Node.js framework)
- [PostgreSQL](https://www.postgresql.org/)
- Docker & Docker Compose
- TypeScript

---

## 📦 Instalación y uso rápido

1. Clona el repositorio:
   ```bash
   git clone https://github.com/szuluaga-beep/shop-backend.git
   cd shop-backend
   ```
2. Crea un archivo `.env` con tus variables de entorno (ver ejemplo en `.env.example`).
3. Levanta los servicios con Docker Compose:
   ```bash
   docker compose up --build
   ```
4. La API estará disponible en: [http://localhost:3000](http://localhost:3000)

---

## 📂 Estructura del proyecto

```
src/
  ├── common/
  ├── customers/
  ├── deliveries/
  ├── payments/
  ├── products/
  └── transactions/
```

---

## 🗄️ Diagrama de la base de datos
<img width="763" height="622" alt="Shop-DB Relacional" src="https://github.com/user-attachments/assets/c2e09994-d870-45a4-bddb-d9a83dffdb87" />

---

## 📝 Endpoints principales

- `/customers` - Gestión de clientes
- `/products` - Gestión de productos
- `/payments` - Gestión de pagos
- `/transactions` - Gestión de transacciones
- `/deliveries` - Gestión de entregas

---

## 👨‍💻 Scripts útiles

```bash
# Ejecutar en desarrollo
npm run start:dev

# Ejecutar pruebas
npm run test
```

---

## 📄 Licencia

MIT
