// conexion a la base de jgv
module.exports = [{
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
    },
    {
        server: '172.19.2.2',
        user: 'rts_kinetik',
        password: 'rtsknt2k21$!$!',
        port: 1433,
        database: 'RTS',
        options: { encrypt: false }, // Use this if you're on Windows Azure
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 10000
        }
    }
];