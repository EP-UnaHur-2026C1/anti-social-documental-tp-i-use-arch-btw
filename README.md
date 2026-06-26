[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/I9P6ejM-)

![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Mermaid](https://img.shields.io/badge/Mermaid-FF3670?style=for-the-badge&logo=mermaid&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![Mongo Express](https://img.shields.io/badge/Mongo%20Express-13AA52?style=for-the-badge&logo=mongodb&logoColor=white)

# UnaHur Anti-Social Net

Backend de una red social, hecha con Node.js + Express + Mongoose. Sigue el patrón **Controller → Service → Repository** para mantener las capas bien separadas y que el código sea más mantenible.

![Imagen](./assets/ANTI-SOCIALNET.jpeg)

## Descripción

Esto es el **MVP** de la **"UnaHur Anti-Social Net"**, una red social inspirada en plataformas populares.
La idea es que la gente pueda:

- Crear posts con descripción y opcionalmente mandar imágenes.
- Comentar los posts de otros.
- Etiquetar posts con tags.
- Seguirse entre usuarios.

## Arquitectura

```
src/
├── config/         → Conexión a MongoDB vía Mongoose
├── controllers/    → La capa que recibe los requests y llama a los services
├── helpers/        → Utils: manejo de errores y respuestas estandarizadas
├── middlewares/    → Error handler, validator, catchAsync
├── models/         → Schemas de Mongoose (User, Post, Comment, Tag, etc.)
├── repositories/   → Capa de acceso a datos (queries con Mongoose)
├── routes/         → Definición de endpoints
├── service/        → Lógica de negocio
├── main.js         → Entry point del server
└── swagger.js      → Configuración de Swagger (carga openapi.yaml)
```

## Entidades

| Entidad       | Colección en MongoDB | Descripción |
|---------------|----------------------|-------------|
| **User**      | `users`              | Usuarios registrados. `_id` es el nickName. |
| **Post**      | `posts`              | Publicaciones con descripción obligatoria y fecha. |
| **PostImage** | `postimages`         | Imágenes asociadas a un post. |
| **Comment**   | `comments`           | Comentarios en posts. Tienen un `visible` que depende de la config de meses. |
| **Tag**       | `tags`               | Etiquetas reutilizables. |
| **PostTag**   | `posttags`           | Relación muchos-a-muchos entre posts y tags. |
| **Follow**    | `follows`            | Seguimiento entre usuarios. |

### Diagrama Entidad-Relación

```mermaid
erDiagram
    USER ||--o{ POST : "publica"
    USER ||--o{ COMMENT : "escribe"
    USER ||--o{ FOLLOW : "sigue"
    USER ||--o{ FOLLOW : "es seguido"
    POST ||--o{ POSTIMAGE : "contiene"
    POST ||--o{ COMMENT : "recibe"
    POST ||--o{ POSTTAG : "tiene"
    TAG ||--o{ POSTTAG : "asignado a"
```

## Cómo levantar esto

```bash
# 1. Clonás el repo
git clone <repo-url>
cd anti-social-documental-tp-i-use-arch-btw

# 2. Instalás las dependencias
pnpm install

# 3. Configurás las variables de entorno (copiás el .env.example)
cp .env.example .env

# 4. Levantás MongoDB y Mongo Express con Docker
docker compose up -d

# 5. Lo prendés
pnpm run dev
```

El server arranca en `http://localhost:3000` y la docu de Swagger en `http://localhost:3000/api-docs`.

Mongo Express queda disponible en `http://localhost:8081` y sirve para visualizar la base de datos de MongoDB desde el navegador.

Credenciales de Mongo Express:

* Usuario: `admin`
* Contraseña: `admin`

La base de datos propia del proyecto es `anti-social`.

## Variables de Entorno

| Variable                      | Default                                                | Descripción |
|-------------------------------|--------------------------------------------------------|-------------|
| `PORT`                        | `3000`                                                 | Puerto del server |
| `NODE_ENV`                    | `development`                                          | Entorno |
| `MONGO_URI`                   | `mongodb://root:admin@localhost:27017/anti-social?authSource=admin` | URI de conexión a MongoDB |
| `COMMENT_VISIBILITY_MONTHS`   | `6`                                                    | Meses de visibilidad de comentarios |

## Endpoints

### Users
- `GET /api/users` — Lista todos los usuarios
- `GET /api/users/:nickName` — Busca un user por nick
- `GET /api/users/:nickName/posts` — Posts de un usuario
- `GET /api/users/:nickName/comments` — Comentarios de un usuario
- `POST /api/users` — Crea un usuario
- `PUT /api/users/:nickName` — Actualiza un usuario
- `DELETE /api/users/:nickName` — Borra un usuario

### Posts
- `GET /api/posts` — Lista todos los posts (paginado: `?page=1&limit=20`)
- `GET /api/posts/:id` — Busca un post por ID
- `GET /api/posts/:id/comments` — Comentarios de un post (paginado)
- `POST /api/posts` — Crea un post (con imágenes y tags opcionales)
- `PUT /api/posts/:id` — Actualiza un post
- `DELETE /api/posts/:id` — Borra un post
- `POST /api/posts/:id/images` — Agrega una imagen
- `DELETE /api/posts/:id/images/:imageId` — Elimina una imagen
- `POST /api/posts/:id/tags` — Agrega un tag
- `DELETE /api/posts/:id/tags/:tagId` — Elimina un tag

### Comments
- `GET /api/comments` — Lista comentarios (paginado: `?page=1&limit=20`)
- `POST /api/comments` — Crea un comentario
- `PUT /api/comments/:id` — Actualiza un comentario
- `DELETE /api/comments/:id` — Borra un comentario

### Tags
- `GET /api/tags` — Lista tags (paginado: `?page=1&limit=20`)
- `POST /api/tags` — Crea un tag
- `DELETE /api/tags/:id` — Borra un tag

### Follow
- `GET /api/follow/:nick/followers` — Seguidores de un usuario (paginado)
- `GET /api/follow/:nick/following` — Usuarios que sigue (paginado)
- `POST /api/follow/:followerNick/:followingNick` — Seguir a alguien
- `DELETE /api/follow/:followerNick/:followingNick` — Dejar de seguir

> Para más detalle, cuando el server esté corriendo entra a `/api-docs`.

## Testing

En la raíz del proyecto está el archivo `Antisocial.postman_collection.json` con todos los endpoints para importar en Postman y probar todo.
