
<div  align="center" style="display: flex; flex-direction:row; gap: 16px; align-items:center; justify-content: center; margin-bottom: 16px;">
  <img style="border-radius: 16px;" src="./raul-logo.webp" alt="Raúl Framework Logo" width="720" />
</div>

<div align="center">

Un framework HTTP inspirado en Laravel, escrito 100% en TypeScript. Nace con una idea muy simple: **entender cómo funciona un framework por dentro**.

Raúl demuestra lo esencial de cualquier framework web: el **servidor escucha**, el **router decide** y tú **respondes**.

</div>

## 🚀 ¿Qué es Raúl?

Raúl es un framework web minimalista para Node.js. Su núcleo es un enrutador que te permite registrar rutas con métodos HTTP (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`) y ejecutar sus controladores cuando llega una petición.

Está pensado para aprender, experimentar y construir sobre él poco a poco, al estilo de cómo Laravel nos da esa comodidad para organizar rutas.

## ✨ Características

- **API tipo Laravel** – Crea la app con `RaulServerFactory.create()` y registra rutas con `app.get()`, `app.post()`, etc.
- **Enrutado por método HTTP + path** – Cada método tiene su propio mapa de rutas (`GET /users` ≠ `POST /users`).
- **Todos los métodos HTTP** – `GET`, `POST`, `PUT`, `DELETE`, `PATCH` y `OPTIONS`.
- **Arquitectura por adaptadores** – El servidor HTTP se abstrae detrás de la interfaz `HttpServerAdapter` (por defecto `NodeServerAdapter`).
- **Servidor nativo de Node.js** – Usa `http.createServer`, sin dependencias externas.
- **100% TypeScript** – Interfaces `HttpRaulServer`, `IRouter` y `HttpServerAdapter` para mayor seguridad.
- **Ligero y educativo** – Perfecto para entender cómo funcionan los frameworks por dentro.
- **Inspirado en Laravel** – Misma idea de definir rutas de forma limpia y declarativa.

## 📂 Estructura del proyecto

```text
raul-framework/
├── raul-logo.webp            # Logo del framework Raúl
├── index.ts                  # Punto de entrada. Crea la app, registra rutas y levanta el servidor
├── RaulServerFactory.ts      # Factory: crea instancias de RaulServer con su adaptador
├── RaulServer.ts             # API pública (get/post/put/...) y dispatcher de rutas
├── Router.ts                 # Núcleo del enrutado (IRouter / Router)
├── HttpMethod.ts             # Enum con los métodos HTTP soportados
├── NodeServerAdapter.ts      # Adaptador sobre http.createServer de Node.js
├── types/
│   └── HttpServerAdapter.ts  # Interfaz del adaptador de servidor HTTP
├── README.md                 # Documentación de Raúl
├── instrucciones.md          # Guía paso a paso para entender la implementación
└── package.json              # Configuración y scripts del proyecto
```

## 🏗️ Arquitectura

El flujo de una petición es el siguiente:

```text
index.ts
   └─ RaulServerFactory.create()        → new RaulServer(new NodeServerAdapter())
         ├─ app.get()/post()/...        → Router registra method + path → handler
         └─ app.listen(port, cb)        → HttpServerAdapter.listen(port, dispatcher)
               └─ NodeServerAdapter     → http.createServer(req, res)
                     └─ dispatcher(method, path)
                           └─ Router.getHandler(method, path) → ejecuta el handler
```

- **`RaulServerFactory`** – Punto de entrada. Permite inyectar un adaptador distinto con `RaulServerFactory.create({ adapter })`.
- **`RaulServer`** – Expone la API pública (`get`, `post`, `put`, `delete`, `patch`, `options`, `listen`) y delega el enrutado al `Router`.
- **`Router`** – Guarda los handlers en un `Map` anidado `method → path → handler` y los busca con `getHandler(method, path)`.
- **`HttpServerAdapter`** – Interfaz que desacopla el framework del servidor HTTP subyacente.

## ⚡ Instalación

Clona el proyecto y entra a la carpeta:

```bash
git clone <repo-url>
cd raul-framework
```

Instala las dependencias:

```bash
pnpm install
```

## 🧪 Uso rápido

### 1. Crear la app y registrar rutas

```ts
import { RaulServerFactory } from './RaulServerFactory.js';

const app = RaulServerFactory.create();

app.get('/users', () => {
  console.log('GET /users route handler');
});

app.post('/users', () => {
  console.log('POST /users route handler');
});

app.put('/users', () => { /* ... */ });
app.delete('/users', () => { /* ... */ });
app.patch('/users', () => { /* ... */ });
app.options('/users', () => { /* ... */ });
```

### 2. Levantar el servidor

```ts
app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
```

### Usar un adaptador personalizado

```ts
import { RaulServerFactory } from './RaulServerFactory.js';
import { MyCustomAdapter } from './MyCustomAdapter.js';

const app = RaulServerFactory.create({ adapter: new MyCustomAdapter() });
```

## ▶️ Cómo ejecutar el proyecto

Compila y ejecuta en un solo paso:

```bash
pnpm raul:dev
```

Solo compilar con `tsc`:

```bash
pnpm build
```

Compilar en modo watch (recompila al guardar):

```bash
pnpm dev
```

El servidor queda disponible en `http://localhost:3002`.

## 📚 API de Raúl

### `RaulServerFactory.create(options?)`

Crea una instancia de `RaulServer`. Acepta `{ adapter?: HttpServerAdapter }`; si no se pasa, usa `NodeServerAdapter`.

### `app.get(path, handler)` / `app.post(path, handler)`
### `app.put(path, handler)` / `app.delete(path, handler)`
### `app.patch(path, handler)` / `app.options(path, handler)`

Registran una ruta para su método HTTP en el `Router`.

### `app.listen(port, callback)`

Arranca el servidor HTTP a través del adaptador, pasándole el dispatcher interno.

### `Router.getHandler(method, path)`

Devuelve el handler registrado para ese método y path, o `undefined` si no existe.

## 🧠 Filosofía

> *"Simple. Directo. Sin complicaciones."*

La gran diferencia con PHP + `php -S` es que **Node no trae un servidor HTTP por defecto**. Ahí está la esencia de Raúl: **tú creas el servidor, tú decides cómo responder**.

Por eso Raúl separa tres responsabilidades, igual que los frameworks grandes:

- **`RaulServer`** = la API con la que el usuario trabaja.
- **`Router`** = quien decide qué handler ejecutar.
- **`HttpServerAdapter`** = quien realmente habla con Node (o con cualquier otro runtime).

## 🛣️ Roadmap

- [ ] Pasar `req`/`res` a los handlers y devolver respuestas reales (status, headers, cuerpo)
- [ ] Soporte para parámetros dinámicos (`/users/:id`)
- [ ] Sistema de Middlewares
- [ ] Lectura del cuerpo de la petición (JSON, Form Data, URL-encoded)
- [ ] Respuesta 404 automática para rutas no registradas
- [ ] Sistema de vistas (Templates/Blade-like)
- [ ] Clase `Request` y `Response` para una API más "Laravel-like"

## 👨‍💻 Autor

Creado con ❤️ para aprender cómo funcionan los frameworks web por dentro.

---

<div align="center">
  <strong>Raúl</strong> – Pequeño, humilde y listo para crecer.
</div>
