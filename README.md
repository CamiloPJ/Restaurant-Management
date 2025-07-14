# RESTAURANT-MANAGEMENT

![Last Commit](https://img.shields.io/github/last-commit/CamiloPJ/Restaurant-Management?label=last%20commit)
![Today](https://img.shields.io/badge/date-today-blue)
![JavaScript](https://img.shields.io/badge/javascript-79.1%25-yellow)
![Languages](https://img.shields.io/badge/languages-4-blue)

---

### *Built with the tools and technologies:*

![Express](https://img.shields.io/badge/-Express-black?logo=express&logoColor=white)
![JSON](https://img.shields.io/badge/-JSON-black?logo=json&logoColor=white)
![Markdown](https://img.shields.io/badge/-Markdown-black?logo=markdown&logoColor=white)
![npm](https://img.shields.io/badge/-npm-CB3837?logo=npm&logoColor=white)
![Mongoose](https://img.shields.io/badge/-Mongoose-AA2929?logo=mongoose&logoColor=white)
![DotEnv](https://img.shields.io/badge/-.ENV-yellow?logo=dotenv&logoColor=black)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)

![Nodemon](https://img.shields.io/badge/-Nodemon-76D04B?logo=nodemon&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)
![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white)
![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white)
![React Hook Form](https://img.shields.io/badge/-React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=white)


# Tabla de Contenidos

- [Resumen](#resumen)
- [🚀 Características Principales](#-características-principales)
- [📊 Estructura del Proyecto](#-estructura-del-proyecto)
- [📌 Endpoints de la API](#-endpoints-de-la-api)
  - [🍔 Productos (`/api/products`)](#-productos-apiproducts)
  - [🛒 Carrito (`/api/cart`)](#-carrito-apicart)
  - [📦 Órdenes (`/api/order`)](#-órdenes-apiorder)
  - [🔐 Autenticación (`/api/user`)](#-autenticación-apiuser)
- [Primeros Pasos](#primeros-pasos)
  - [⚠️ Requisitos Previos](#️-requisitos-previos)
  - [🛠️ Instalación](#-instalación)
- [▶️ Ejecucion del proyecto](#-ejecucion-del-proyecto)
- [👤 Autor](#-autor)
-------

## Resumen

**Restaurant-Management** es una plataforma full-stack diseñada para simplificar las operaciones de restaurantes mediante una arquitectura moderna y escalable. Combina un frontend en React construido con Vite para un desarrollo rápido y reemplazo de módulos en caliente, junto con un backend seguro en Node.js orquestado mediante contenedores Docker. El sistema incluye gestión centralizada del estado, autenticación de usuarios, visualización dinámica de alimentos y manejo completo de pedidos.

### 🚀 Características Principales

Este proyecto permite a los desarrolladores construir, gestionar y escalar aplicaciones de restaurantes de manera eficiente. Las características principales incluyen:

- ⚡ **Entorno de Desarrollo Rápido**: Utiliza Vite con React para compilaciones rápidas y recarga en caliente.
- 🔒 **Autenticación de Usuarios Segura**: Implementa flujos de inicio de sesión y registro basados en JWT.
- ♻️ **Componentes Modulares**: Componentes reutilizables en React para elementos del menú, carrito, navegación y más.
- 📦 **API Backend Robusta**: Endpoints RESTful para manejo de medios, pedidos y gestión de usuarios (con Express y MongoDB).
- 📦 **Despliegue Contenerizado**: Configuración con Docker para asegurar servicios backend consistentes y escalables.
- 📊 **Panel de Administración**: Permite gestionar ítems del menú, ver órdenes y supervisar operaciones del restaurante sin complicaciones.



## 📊 Estructura del Proyecto
```bash
Restaurant-Management/
├── admin/
│   ├── src/
│   │   ├── components/ # Componentes React
│   │   └── pages/      # Vistas principales para admin
├── backend/
│   ├── controllers/    # Lógica de endpoints
│   ├── models/         # Esquemas de MongoDB
│   ├── routes/         # Definición de rutas
│   └── server.js       # Configuración de Express
├── frontend/
│   ├── src/
│   │   ├── components/ # Componentes React
│   │   └── pages/      # Vistas principales para usuario
├── docker-compose.yml  # Configuración de Docker
└── README.md           # Este archivo
```

## 📌 Endpoints de la API

### 🍔 Productos (`/api/products`)

| Método | Endpoint | Descripción             | Autenticación | Parámetros / Body                         |
|--------|----------|-------------------------|----------------|--------------------------------------------|
| POST   | `/add`   | Añade nuevo producto     | ❌              | `image` (file), `name`, `price`           |
| GET    | `/list`  | Lista todos los productos| ❌              | -                                          |
| POST   | `/remove`| Elimina un producto      | ❌              | `_id` (ID del producto)                   |

---

### 🛒 Carrito (`/api/cart`)

| Método | Endpoint  | Descripción                    | Autenticación | Body                           |
|--------|-----------|--------------------------------|----------------|--------------------------------|
| POST   | `/add`    | Añade ítem al carrito          | ✅              | `productId`, `quantity`        |
| POST   | `/remove` | Elimina ítem del carrito       | ✅              | `productId`                    |
| POST   | `/get`    | Obtiene el carrito del usuario | ✅              | -                              |


---
### 📦 Órdenes (`/api/order`)

| Método | Endpoint  | Descripción                    | Autenticación | Body                           |
|--------|-----------|--------------------------------|----------------|--------------------------------|
| POST   | `/place`    | Crea nueva orden          | ✅              | `items`, `total`, `address`       |
| POST   | `/userorders` | Obtiene órdenes del usuario       | ✅              | -                    |
| GET   | `/list`    | Lista todas las órdenes (Admin) | ✅              | -                              |

---
### 👤 Usuarios (`/api/user`)

| Método | Endpoint  | Descripción                    | Autenticación | Body                           |
|--------|-----------|--------------------------------|----------------|--------------------------------|
| POST   | `/register`    | Registra nuevo usuario         | ✅              | `email`, `password`, `username`       |
| POST   | `/login` | Inicia sesión       | ✅              | `email`, `password`                   |

---

## Primeros Pasos

---
### ⚠️ Requisitos Previos
- **Lenguaje de Programación**: JavaScript  
- **Gestor de Paquetes**: Npm  
- **Docker Desktop** instalado y en ejecución
- **Node.js** (v16+) y **npm** (v8+) para desarrollo sin Docker

> 📌 **Nota importante**:  
> Asegúrate de tener Docker instalado y el servicio en ejecución antes de usar los comandos `docker-compose`.  
> Para el desarrollo con `npm`, solo necesitas Node.js instalado.
---

###  Instalación

Compila **Restaurant-Management** desde el código fuente e instala las dependencias:

1. **Clonar el repositorio:**

```bash
git clone https://github.com/CamiloPJ/Restaurant-Management
```
2. **Configurar variables de entorno**
Crea un archivo .env en la raíz del backend (cd backend/) con:
```env
MONGODB_URI=mongodb+srv://capaterjimenez:nm8QtI2cEKdPQ6aQ@cluster0.bpsaxn6.mongodb.net/Restaurant-management?retryWrites=true&w=majority
JWT_SECRET="random#secret"
PORT=4000
```
3. **Navega al directorio del proyecto:**
```bash
cd Restaurant-Management
```

4. **Instala las dependencias:**
   **🔧 Método recomendado: Usando Docker (contiene todo lo necesario)**
```bash
# Desde la raíz del proyecto:
cd backend
docker-compose up --build
```
Verifica que funcione: Accediendo a http://localhost:4000 desde tu navegador, deberías ver: "API Working".


  **Método alternativo: Usando npm (para desarrollo tradicional)**
```bash
# Instalar dependencias
npm install

# Iniciar servidor (desde /backend)
npm run server
```


## Ejecucion del proyecto
Ya deberías tener el backend corriendo según la instalación anterior. 
Para desarrollo completo, abre 2 terminales:
- **Terminal 1 (frontend):**
```bash
cd frontend  
npm install
npm run dev
```

- **Terminal 2 (Admin):**
```bash
cd admin
npm install
npm run dev
```

**SI NO ESTAS CORRIENDO EN DOCKER:**

Configura tu archivo .env con la base de datos en mongodb atlas (Sustituir el usuario y contraseña en MONGODB_URI)
```env
MONGODB_URI=mongodb+srv://capaterjimenez:nm8QtI2cEKdPQ6aQ@cluster0.bpsaxn6.mongodb.net/Restaurant-management?retryWrites=true&w=majority
```
- Terminal (Backend):
```bash
cd backend
npm install
npm run server
```


##  👤 Autor
📧 capaterjimenez@gmail.com

**Camilo Andrés Paternina Jiménez**  
💼 [LinkedIn](https://www.linkedin.com/in/camilopaterninaj)
