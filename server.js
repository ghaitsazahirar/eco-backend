const Hapi = require('@hapi/hapi');
const { db } = require('./firebase-admin-config');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'], // Mengizinkan semua origin
                headers: ['Accept', 'Content-Type'],
                additionalHeaders: ['X-Requested-With']
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/faq',
        handler: async (request, h) => {
            try {
                const snapshot = await db.collection('faq').get();
                const faqs = snapshot.docs.map(doc => doc.data());
                return h.response(faqs)
                    .header('Access-Control-Allow-Origin', '*')
                    .header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
                    .code(200);
            } catch (error) {
                console.error('Error fetching FAQ:', error);
                return h.response({ error: 'Internal Server Error' })
                    .header('Access-Control-Allow-Origin', '*')
                    .header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
                    .code(500);
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
