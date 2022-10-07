const dbconex = require('./conexion_mssql.js');
//
module.exports = {

    // cada funncion se separa por comas  
    dbZap: (sqlpool, body) => {
        //  
        console.log(body);
        const query = body.select;
        //
        return sqlpool[0]
            .then(pool => {
                return pool.request()
                    .query(query);
            })
            .then(resultado => {
                return resultado.recordset;
            })
            .catch(err => {
                // consol.log(err);
                return [];
            });
    },

};