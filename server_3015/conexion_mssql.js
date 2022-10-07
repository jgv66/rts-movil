// conexion a la base de jgv
module.exports = [{
        server: '172.19.2.2',
        user: 'rts_kinetik',
        password: 'rtsknt2k21$!$!',
        port: 1433,
        database: 'RTS_Kinetik',
        options: { encrypt: false, enableArithAbort: true }, // Use this if you're on Windows Azure
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
        options: { encrypt: false, enableArithAbort: true }, // Use this if you're on Windows Azure
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 10000
        }
    }
];
