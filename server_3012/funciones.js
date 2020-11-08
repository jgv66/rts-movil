module.exports = {
    // 
    p1: function(sqlpool, body) {
        //
        var query = "select * from usuarios ;";
        //
        // console.log(sqlpool[0]);
        return sqlpool[0]
            .then(pool => {
                console.dir(query);
                return pool.request().query(query);
            })
            .then(resultado => {

                consol.dir('resultado', resultado);

                if (resultado.recordset[0].resultado === true) {
                    return { resultado: 'ok', datos: resultado.recordset };
                } else {
                    return { resultado: 'yyyyy', datos: resultado.recordset };
                }
            })
            .catch(err => {

                consol.warm('catch', err);

                return { resultado: 'xxxx', datos: err };
            });
    },
    //
};