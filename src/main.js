const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const { connectToDatabase } = require('./config/db');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const tagRoutes = require('./routes/tag.routes');
const followRoutes = require('./routes/follow.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const errorHandler = require('./middlewares/errorHandler.middleware');
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/follow', followRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

app.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.info(
        `Servidor de swagger corriendo en http://localhost:${PORT}/api-docs`
    );
});

/*
 *
 * 1. docker compose up -d
 * 2. pnpm install
 * 3. Crear .env
 * 4. pnpm run dev
 * 4. docker compose down
 * */
