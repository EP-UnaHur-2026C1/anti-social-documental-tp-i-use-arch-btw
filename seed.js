const mongoose = require('mongoose');
const { User, Post, Comment, Tag, PostImage, PostTag, Follow } = require('./src/models');

const MONGO_URI =
    process.env.MONGO_URI ??
    'mongodb://root:admin@localhost:27017/anti-social?authSource=admin';

async function seed() {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB');

    // Clear existing data
    await Promise.all([
        User.deleteMany({}),
        Post.deleteMany({}),
        Comment.deleteMany({}),
        Tag.deleteMany({}),
        PostImage.deleteMany({}),
        PostTag.deleteMany({}),
        Follow.deleteMany({}),
    ]);
    console.log('Datos existentes eliminados');

    // Create users
    const users = await User.create([
        { _id: 'gabi', email: 'gabi@test.com', name: 'Gabriel', surname: 'García' },
        { _id: 'maria', email: 'maria@test.com', name: 'María', surname: 'López' },
        { _id: 'carlos', email: 'carlos@test.com', name: 'Carlos', surname: 'Martínez' },
        { _id: 'ana', email: 'ana@test.com', name: 'Ana', surname: 'Rodríguez' },
        { _id: 'pedro', email: 'pedro@test.com', name: 'Pedro', surname: 'Sánchez' },
    ]);
    console.log(`Creados ${users.length} usuarios`);

    // Create tags
    const tags = await Tag.create([
        { name: 'programacion' },
        { name: 'tecnologia' },
        { name: 'musica' },
        { name: 'deportes' },
        { name: 'viajes' },
        { name: 'fotografia' },
        { name: 'cocina' },
        { name: 'libros' },
    ]);
    console.log(`Creados ${tags.length} tags`);

    // Create posts with varied dates (recent)
    const now = new Date();
    const posts = await Post.create([
        { user_nickName: 'gabi', description: 'Acabo de terminar un curso de Node.js! Muy recomendado', dateTime: new Date(now - 1 * 24 * 60 * 60 * 1000) },
        { user_nickName: 'gabi', description: 'Mi setup de desarrollo para 2026', dateTime: new Date(now - 3 * 24 * 60 * 60 * 1000) },
        { user_nickName: 'maria', description: 'Nueva receta de paella que probé este fin de semana', dateTime: new Date(now - 2 * 24 * 60 * 60 * 1000) },
        { user_nickName: 'maria', description: 'Fotos de mi viaje a la playa', dateTime: new Date(now - 5 * 24 * 60 * 60 * 1000) },
        { user_nickName: 'carlos', description: 'Gané el torneo de pádel del club!', dateTime: new Date(now - 4 * 24 * 60 * 60 * 1000) },
        { user_nickName: 'carlos', description: 'Mi nuevo álbum favorito de rock progresivo', dateTime: new Date(now - 7 * 24 * 60 * 60 * 1000) },
        { user_nickName: 'ana', description: 'Consejos para empezar en la fotografía analógica', dateTime: new Date(now - 6 * 24 * 60 * 60 * 1000) },
        { user_nickName: 'pedro', description: 'Leyendo Clean Code por primera vez, increíble', dateTime: new Date(now - 8 * 24 * 60 * 60 * 1000) },
    ]);
    console.log(`Creados ${posts.length} posts`);

    // Create post images
    const postImages = await PostImage.create([
        { post_id: posts[0]._id, url_image: 'https://picsum.photos/seed/node/800/600' },
        { post_id: posts[1]._id, url_image: 'https://picsum.photos/seed/setup/800/600' },
        { post_id: posts[2]._id, url_image: 'https://picsum.photos/seed/paella/800/600' },
        { post_id: posts[3]._id, url_image: 'https://picsum.photos/seed/beach1/800/600' },
        { post_id: posts[3]._id, url_image: 'https://picsum.photos/seed/beach2/800/600' },
        { post_id: posts[4]._id, url_image: 'https://picsum.photos/seed/padel/800/600' },
        { post_id: posts[6]._id, url_image: 'https://picsum.photos/seed/photo/800/600' },
    ]);
    console.log(`Creadas ${postImages.length} imágenes`);

    // Create post-tag relationships
    const postTags = await PostTag.create([
        { post_id: posts[0]._id, tag_id: tags[0]._id },
        { post_id: posts[0]._id, tag_id: tags[1]._id },
        { post_id: posts[1]._id, tag_id: tags[1]._id },
        { post_id: posts[2]._id, tag_id: tags[6]._id },
        { post_id: posts[3]._id, tag_id: tags[4]._id },
        { post_id: posts[3]._id, tag_id: tags[5]._id },
        { post_id: posts[4]._id, tag_id: tags[3]._id },
        { post_id: posts[5]._id, tag_id: tags[2]._id },
        { post_id: posts[6]._id, tag_id: tags[5]._id },
        { post_id: posts[7]._id, tag_id: tags[0]._id },
        { post_id: posts[7]._id, tag_id: tags[7]._id },
    ]);
    console.log(`Creadas ${postTags.length} relaciones post-tag`);

    // Create comments
    const comments = await Comment.create([
        { user_nickName: 'maria', post_id: posts[0]._id, content: 'Felicidades! Qué curso hiciste?' },
        { user_nickName: 'carlos', post_id: posts[0]._id, content: 'Comparte el link!', dateTime: new Date(now - 1 * 24 * 60 * 60 * 1000 + 1000) },
        { user_nickName: 'gabi', post_id: posts[2]._id, content: 'Se ve deliciosa, pasas la receta?' },
        { user_nickName: 'ana', post_id: posts[2]._id, content: 'La paella es mi plato favorito!', dateTime: new Date(now - 2 * 24 * 60 * 60 * 1000 + 2000) },
        { user_nickName: 'pedro', post_id: posts[3]._id, content: 'Qué playa tan bonita! Dónde es?' },
        { user_nickName: 'maria', post_id: posts[4]._id, content: 'Enhorabuena campeón!' },
        { user_nickName: 'gabi', post_id: posts[5]._id, content: 'A mí también me gusta el rock progresivo. Recomiendas algo?' },
        { user_nickName: 'carlos', post_id: posts[6]._id, content: 'Muy buenos consejos! Yo recomiendo empezar con una cámara prestada', dateTime: new Date(now - 5 * 24 * 60 * 60 * 1000 + 3000) },
    ]);
    console.log(`Creados ${comments.length} comentarios`);

    // Update comment counts
    await Post.updateOne({ _id: posts[0]._id }, { commentsCount: 2 });
    await Post.updateOne({ _id: posts[2]._id }, { commentsCount: 2 });
    await Post.updateOne({ _id: posts[3]._id }, { commentsCount: 1 });
    await Post.updateOne({ _id: posts[4]._id }, { commentsCount: 1 });
    await Post.updateOne({ _id: posts[5]._id }, { commentsCount: 1 });
    await Post.updateOne({ _id: posts[6]._id }, { commentsCount: 1 });
    console.log('Contadores de comentarios actualizados');

    // Create follows
    const follows = await Follow.create([
        { follower_nickName: 'gabi', following_nickName: 'maria' },
        { follower_nickName: 'gabi', following_nickName: 'carlos' },
        { follower_nickName: 'maria', following_nickName: 'gabi' },
        { follower_nickName: 'maria', following_nickName: 'ana' },
        { follower_nickName: 'carlos', following_nickName: 'gabi' },
        { follower_nickName: 'carlos', following_nickName: 'pedro' },
        { follower_nickName: 'ana', following_nickName: 'maria' },
        { follower_nickName: 'ana', following_nickName: 'gabi' },
        { follower_nickName: 'pedro', following_nickName: 'ana' },
        { follower_nickName: 'pedro', following_nickName: 'carlos' },
    ]);
    console.log(`Creados ${follows.length} follows`);

    // Update follower counts
    await User.updateOne({ _id: 'gabi' }, { followers: 3 });
    await User.updateOne({ _id: 'maria' }, { followers: 2 });
    await User.updateOne({ _id: 'carlos' }, { followers: 2 });
    await User.updateOne({ _id: 'ana' }, { followers: 2 });
    await User.updateOne({ _id: 'pedro' }, { followers: 1 });
    console.log('Contadores de followers actualizados');

    await mongoose.disconnect();
    console.log('Seed completado exitosamente!');
}

seed().catch((err) => {
    console.error('Error en seed:', err);
    process.exit(1);
});
