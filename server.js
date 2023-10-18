const express = require('express');
const server = express();
const jwt = require('jsonwebtoken');
const knex = require('knex')
const knexConfig = require('./knexfile')['development']; // Cargamos la configuración adecuada
const cors = require('cors')
require('dotenv').config();
const { pool } = require('./pg')

const db = knex(knexConfig);

const PORT = 5000;

const Routes = require('./routes/Index');

server.use(cors());

server.use(express.json());

const secretKey = process.env.SECRET_KEY;

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

server.get('/test', async (req, res) => {
    try {
        // Intenta ejecutar una consulta simple para verificar la conexión exitosa.
        const result = await pool.query('SELECT 1');
        res.send({ message: 'Conexión exitosa a la base de datos' });
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
        res.status(500).send({ message: 'Error de conexión a la base de datos' });
    }
});


server.listen(PORT, () => {
    console.log(`😇😇Iniciando servidor en el puerto ${PORT}😇😇`);
});



/* server.listen(PORT, () => {
    console.log(`😇😇Iniciando servidor en el puerto ${PORT}😇😇`);
});
 */

/* const express = require('express');
const server = express();
const jwt = require('jsonwebtoken');
const knex = require('knex');
const knexConfig = require('./knexfile')['development'];
const cors = require('cors');
require('dotenv').config();

// Configurar Knex
const db = knex(knexConfig);
const Routes = require('./routes/Index');

const PORT = 5000;
const secretKey = process.env.SECRET_KEY //|| 'YourSecretKeyHere'; // Utiliza una clave segura y guárdala en una variable de entorno

server.use(cors());
server.use(express.json());

// Middleware para verificar token JWT
function verificarToken(req, res, next) {
    const token = req.header('Authorization');

    if (token) {
        const accessToken = token.split(' ')[1];

        jwt.verify(accessToken, secretKey, (error, decode) => {
            if (error) {
                return res.status(401).send({ mensaje: 'Token inválido' });
            }
            next();
        });
    } else {
        res.status(401).json({ mensaje: 'Falta token de autenticación' });
    }
}

// Ruta de inicio de sesión para generar tokens JWT
server.post('/login', async (req, res) => {
    const { correo_electronico, contraseña } = req.body;

    try {
        const user = await db('Usuarios').where({ correo_electronico, contraseña }).first();

        if (user) {
            const payload = { correo_electronico: user.correo_electronico };
            const token = jwt.sign(payload, secretKey, { expiresIn: '5m' });

            return res.json({ token });
        }

        return res.status(401).json({ message: 'Credenciales inválidas' });
    } catch (error) {
        console.error('Error al autenticar:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Rutas que requieren autenticación
server.use('/usuario', verificarToken, Routes.Usuarios);
server.use('/categoria', verificarToken, Routes.CategoriaDeGastos);
server.use('/ingresos', verificarToken, Routes.Ingresos);
server.use('/gastos', verificarToken, Routes.Gastos);

// Comprobación de la conexión a la base de datos
function checkDatabaseConnection() {
    db.raw('SELECT 1')
        .then(() => {
            console.log('Conexión a la base de datos exitosa');
            server.listen(PORT, () => {
                console.log(`Iniciando servidor en el puerto ${PORT}`);
            });
        })
        .catch(error => {
            console.error('Error de conexión a la base de datos:', error);
        });
}

checkDatabaseConnection(); */

