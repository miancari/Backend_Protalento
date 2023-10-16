const express = require('express');
const server = express();
const jwt = require('jsonwebtoken');
const knex = require('knex')
const knexConfig = require('./knexfile')[process.env.NODE_ENV || 'development']; // Cargamos la configuración adecuada
const cors = require('cors')

const db = knex(knexConfig);

const PORT = 5000;

const Routes = require('./routes/Index');

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

server.use(express.json());

const secretKey = 'CastroRoa';

function verificarToken(req, res, next) {
    const token = req.header('Authorization');

    if (token) {
        const accessToken = token.split(' ')[1]

        jwt.verify(accessToken, secretKey, (error, decode) => {
            if (error) {
                res.status(401).send({ mensaje: 'Token inválido' });
            } else {
                next();
            }
        });
    } else {
        res.status(404).send({ mensaje: 'peticion incorrecta' })
    }
}
// Ruta de inicio de sesión para generar tokens JWT
server.post('/login', async (req, res) => {
    const { correo_electronico, contraseña } = req.body;

    try {
        const user = await db('Usuarios').where({ correo_electronico: correo_electronico, contraseña: contraseña }).first();

        if (user) {
            const payload = { correo_electronico: user.correo_electronico };
            const token = jwt.sign(payload, secretKey, { expiresIn: '5m' });

            return res.json({ token });
        }

        res.status(401).json({ message: ' Credenciales inválidas' });
    } catch (error) {
        console.error('Error al autenticar:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


server.use('/usuario', verificarToken, Routes.Usuarios);
server.use('/categoria', Routes.CategoriaDeGastos);
server.use('/ingresos', verificarToken, Routes.Ingresos);
server.use('/gastos', verificarToken, Routes.Gastos);

function checkDatabaseConnection() {
    db.raw('SELECT 1')
        .then(() => {
            console.log('Conexión a la base de datos exitosa');
            server.emit('db-connected'); // Emitir el evento personalizado 'db-connected'
        })
        .catch(error => {
            console.error('Error de conexión a la base de datos:', error);
        });
}

// Llamar a la función para verificar la conexión a la base de datos.
checkDatabaseConnection();

server.on('db-connected', () => {
    server.listen(PORT, () => {
        console.log(`😇😇Iniciando servidor en el puerto ${PORT}😇😇`);
    });
});


/* server.listen(PORT, () => {
    console.log(`😇😇Iniciando servidor en el puerto ${PORT}😇😇`);
}); */


