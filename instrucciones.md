# Instrucciones para hacer que el Router escuche peticiones HTTP

La clave es esta: **PHP con `php -S` ya trae un servidor HTTP**. En Node/TypeScript tú tienes que crearlo tú mismo con `http.createServer()`.

Tu `Router` por ahora solo guarda callbacks, lo que falta es:

1. Que guarde las rutas por `(método + path)`
2. Que tenga un método `handle()` para buscar y ejecutar la ruta correcta
3. Que `index.ts` cree un servidor HTTP y lo ponga a escuchar con `.listen()`

## Paso 1: Modificar `router.ts`

Abre `router.ts` y reemplázalo o modifícalo de esta forma.

### 1.1 Importar los tipos necesarios de Node

Añade al inicio:

```ts
import { IncomingMessage, ServerResponse } from 'http';
```

### 1.2 Definir el tipo del handler

Crea un tipo para los callbacks de las rutas. Así tendrás autocompletado y tipos correctos:

```ts
type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;
```

### 1.3 Guardar las rutas

Dentro de la clase `Router`, crea un `Map` para guardar las rutas. Usaremos una clave `METHOD:ruta` para diferenciarlas (GET `/users` no es lo mismo que POST `/users`).

```ts
export class Router {
  private routes = new Map<string, RouteHandler>();
```

### 1.4 Crear un método para generar la clave

Añádelo dentro de la clase:

```ts
  private key(method: string, path: string) {
    return `${method.toUpperCase()}:${path}`;
  }
```

### 1.5 Guardar rutas en `get()` y `post()`

Modifica tus métodos para que guarden en el `Map`. Usa el tipo `RouteHandler`.

```ts
  get(path: string, handler: RouteHandler) {
    this.routes.set(this.key('GET', path), handler);
    return this;
  }

  post(path: string, handler: RouteHandler) {
    this.routes.set(this.key('POST', path), handler);
    return this;
  }
```

> Consejo: Puedes añadir `put()`, `patch()`, `delete()` igual que estos si quieres más adelante.

### 1.6 Añadir el método `handle()`

Este método recibe las peticiones del servidor HTTP. Su trabajo es:

1. Quitar los query params (`?page=1`) de la URL
2. Buscar si existe un handler para ese `method + path`
3. Si existe, ejecutarlo pasándole `req` y `res`
4. Si NO existe, responder con un `404 Not Found`

Añádelo al final de la clase:

```ts
  handle(
    method: string,
    url: string,
    req: IncomingMessage,
    res: ServerResponse
  ) {
    const path = url?.split('?')[0] || '/';
    const handler = this.routes.get(this.key(method, path));

    if (!handler) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    handler(req, res);
  }
}
```

**Resultado final esperado de `router.ts`:**

```ts
import { IncomingMessage, ServerResponse } from 'http';

type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;

export class Router {
  private routes = new Map<string, RouteHandler>();

  private key(method: string, path: string) {
    return `${method.toUpperCase()}:${path}`;
  }

  get(path: string, handler: RouteHandler) {
    this.routes.set(this.key('GET', path), handler);
    return this;
  }

  post(path: string, handler: RouteHandler) {
    this.routes.set(this.key('POST', path), handler);
    return this;
  }

  handle(
    method: string,
    url: string,
    req: IncomingMessage,
    res: ServerResponse
  ) {
    const path = url?.split('?')[0] || '/';
    const handler = this.routes.get(this.key(method, path));

    if (!handler) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    handler(req, res);
  }
}
```

## Paso 2: Modificar `index.ts`

Ahora creamos el **servidor HTTP**. Este es el que realmente va a **escuchar** en un puerto (como hace `php -S`).

Abre `index.ts` y cámbialo por esto:

```ts
import { createServer } from 'http';
import { Router } from './router';

function main() {
  const router = new Router();

  router.get('/users', (_req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: [] }));
  });

  router.post('/users', (_req, res) => {
    res.writeHead(201, { 'Content-Type': 'text/plain' });
    res.end('Usuario creado');
  });

  const server = createServer((req, res) => {
    router.handle(req.method || 'GET', req.url || '/', req, res);
  });

  server.listen(8000, () => {
    console.log('Servidor corriendo en http://localhost:8000');
  });
}

main();
```

### Explicación de lo importante aquí

- `createServer()` recibe un callback que se ejecuta **cada vez que llega una petición HTTP**.
- Ahí le pasamos `req.method` (GET, POST...) y `req.url` (la ruta, ej: `/users`) directamente a `router.handle()`.
- `server.listen(8000)` es lo que **pone el servidor a escuchar**. Hasta que no haces esto, **no responde a ninguna petición**.
- Usamos `_req` cuando no vamos a leer el cuerpo de la petición (por ahora no lo necesitamos).

## Paso 3: Ejecutar el servidor

En la terminal, desde la carpeta `laravel-typescript-clone`, ejecuta:

```bash
npx tsx index.ts
```

Deberías ver este mensaje:

```text
Servidor corriendo en http://localhost:8000
```

## Paso 4: Probarlo

### En el navegador

Abre [http://localhost:8000/users](http://localhost:8000/users). Verás: `{"users":[]}`

Si visitas cualquier otra ruta (ej. `/test`) verás: `Not Found`

### En la terminal (con curl)

**GET /users:**

```bash
curl http://localhost:8000/users
```

**POST /users:**

```bash
curl -X POST http://localhost:8000/users
```

## Explicación final (muy importante)

- **Servidor = quien escucha.** Ese es el `http.createServer()` + `.listen()`. Ahí es donde está la diferencia con PHP (allí el servidor lo da `php -S`).
- **Router = quien decide.** Solo busca qué handler ejecutar según método + ruta.
- **Tú respondes con `res.end()`.** Si no llamas `res.end()`, el navegador se queda cargando. Ahí es donde entra tu lógica.

Con esto ya tienes lo mínimo para empezar a construir algo parecido a Laravel, pero en TypeScript.