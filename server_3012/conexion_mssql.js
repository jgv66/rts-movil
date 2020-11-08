// conexion a la base de jgv
module.exports = {
    server: '45.182.116.32',
    port: 1779,
    user: 'valencia',
    password: 'valencia$$$',
    database: 'valencia',
    options: { encrypt: false },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 10000
    }
};