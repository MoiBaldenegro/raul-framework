 Raúl

<div styles="display: flex; flex-direction=row; gap: 16px; align-items:center;">
  <img src="./raul-logo.webp" alt="Raúl Framework Logo" width="320" />
  <h1> raul </h1>
</div>

<div align="center">

Un mini-framework HTTP inspirado en Laravel, escrito 100% en TypeScript. Nace con una idea muy simple: **entender cómo funciona un framework por dentro**.

Raúl demuestra lo esencial de cualquier framework web: el **servidor escucha**, el **router decide** y tú **respondes**.

</div>

## 🚀 ¿Qué es Raúl?

Raúl es un framework web minimalista para Node.js. Su núcleo es un enrutador súper simple que te permite registrar rutas con métodos HTTP (`GET`, `POST`, ...) y ejecutar sus controladores cuando llega una petición.

Está pensado para aprender, experimentar y construir sobre él poco a poco, al estilo de cómo Laravel nos da esa comodidad para organizar rutas.

## ✨ Características

- **Enrutado simple y directo** – Registra rutas por método HTTP + path.
- **Soporte para GET y POST** – Extensible fácilmente a `PUT`, `PATCH`, `DELETE`, etc.
- **Respuestas HTTP controladas** – Define status, headers y cuerpo de respuesta a tu gusto.
- **Servidor nativo de Node.js** – Usa `http.createServer`, sin dependencias externas.
- **100% TypeScript** – Con tipados de `IncomingMessage` y `ServerResponse` para mayor seguridad.
- **Ligero y educativo** – Perfecto para entender cómo funcionan los frameworks por dentro.
- **Inspirado en Laravel** – Misma idea de definir rutas de forma limpia y declarativa.

## 📂 Estructura del proyecto

```text
laravel-typescript-clone/
├── raul-logo.webp     # Logo del framework Raúl
├── index.ts           # Punto de entrada. Crea y levanta el servidor HTTP
├── router.ts          # Núcleo del framework (Clase Router)
├── README.md          # Documentación de Raúl
├── instrucciones.md   # Guía paso a paso para entender la implementación
└── package.json       # Configuración y dependencias del proyecto
```

## ⚡ Instalación

Clona el proyecto y entra a la carpeta:

```bash
git clone <repo-url>
cd laravel-typescript-clone
```

Instala las dependencias:

```bash
npm install
```

## 🧪 Uso rápido

### 1. Registrar rutas

Con Raúl es tan simple como definirlas con `get()` o `post()`:

```ts
import { createServer } from 'http';
import { Router } from './router';

const router = new Router();

router.get('/', (_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>¡Bienvenido a Raúl!</h1>');
});

router.get('/users', (_req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ users: [] }));
});

router.post('/users', (_req, res) => {
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Usuario creado correctamente' }));
});
```

### 2. Levantar el servidor

Raúl te deja controlar el servidor HTTP como tú quieras. Solo pásale las peticiones al router:

```ts
const server = createServer((req, res) => {
  router.handle(req.method || 'GET', req.url || '/', req, res);
});

server.listen(8000, () => {
  console.log('🔥 Raúl está corriendo en http://localhost:8000');
});
```

## ▶️ Cómo ejecutar el proyecto

Para desarrollo, lo más rápido es con [`tsx`](https://github.com/esbuild-kit/tsx):

```bash
npx tsx index.ts
```

Para producción, compílalo con `tsc` y ejecútalo con Node:

```bash
npx tsc
node dist/index.js
```

## 🧪 Probarlo

### En el navegador

Abre [http://localhost:8000/](http://localhost:8000/) y verás el mensaje de bienvenida.

Abre [http://localhost:8000/users](http://localhost:8000/users) y recibirás un JSON.

### Con cURL

**GET /**

```bash
curl http://localhost:8000/
```

**GET /users**

```bash
curl http://localhost:8000/users
```

**POST /users**

```bash
curl -X POST http://localhost:8000/users
```

Cualquier ruta que no exista devolverá `Not Found` con estado `404`.

## 📚 API de Raúl

### `router.get(path: string, handler)`
Registra una ruta para el método **GET**.

### `router.post(path: string, handler)`
Registra una ruta para el método **POST**.

### `router.handle(method: string, url: string, req: IncomingMessage, res: ServerResponse)`
Procesa una petición HTTP entrante.

- **Limpia la URL**: Elimina query params (`?page=1`) para hacer match exacto con la ruta registrada.
- **Busca el handler**: Usa la clave `METHOD:path` para encontrarlo.
- **Ejecuta o responde 404**: Si existe lo ejecuta, si no, responde con `404 Not Found`.

## 🧠 Filosofía

> *"Simple. Directo. Sin complicaciones."*

La gran diferencia con PHP + `php -S` es que **Node no trae un servidor HTTP por defecto**. Ahí está la esencia de Raúl: **tú creas el servidor, tú decides cómo responder**.

Esto es justo lo que hacen los frameworks por dentro: abstraen ese proceso para que tú solo te centres en escribir rutas y lógica de negocio.

## 🛣️ Roadmap

- [ ] Añadir métodos `put()`, `patch()` y `delete()`
- [ ] Soporte para parámetros dinámicos (`/users/:id`)
- [ ] Sistema de Middlewares
- [ ] Lectura del cuerpo de la petición (JSON, Form Data, URL-encoded)
- [ ] Sistema de vistas (Templates/Blade-like)
- [ ] Clase `Request` y `Response` para una API más "Laravel-like"

## 👨‍💻 Autor

Creado con ❤️ para aprender cómo funcionan los frameworks web por dentro.

---

<div align="center">
  <strong>Raúl</strong> – Pequeño, humilde y listo para crecer.
</div>
