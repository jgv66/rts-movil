// console.log("hola mundo");
var express = require('express');
var app = express();
// configuracion
var sql = require('mssql');
var dbconex = require('./conexion_mssql.js');
//
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// carpeta de imagenes: desde donde se levanta el servidor es esta ruta -> /root/trial-server-001/public
app.use(express.static('public'));

// servidor escuchando puerto 3012
var server = app.listen(3012, function() {
    console.log("Escuchando http en el puerto: %s", server.address().port);
});

// pruebas
app.get('/ping',
    function(req, res) {
        res.json({ resultado: 'ok', datos: 'pong' });
    }
);
// --------------------------------------------centros 
app.get('/centros',
    function(req, res) {
        //
        var query = "select * from [ktb_centros] ;";
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.post('/centros',
    function(req, res) {
        //
        var query = "insert into [ktb_centros] (centro,descripcion) values ( '" + req.body.centro + "','" + req.body.descripcion + "' ) ;";
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.put('/centros',
    function(req, res) {
        //
        var query = "update [ktb_centros] set descripcion='" + req.body.descripcion + "' where centro='" + req.body.centro + "' ;";
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.delete('/centros',
    function(req, res) {
        //
        var query = "delete [ktb_centros] where centro='" + req.body.centro + "' ;";
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
// --------------------------------------------entidades
app.get('/entidades',
    function(req, res) {
        // los parametros
        var query = '';
        var razonrut = req.query.razon;
        //
        if (razonrut === '' || razonrut === undefined) {
            query = "select * from [ktb_entidades] ;";
        } else {
            query = "select * from [ktb_entidades] " +
                " where codaux like '%" + razonorut.rtrim() + "%' " +
                " or rut like '%" + razonorut.rtrim() + "%' " +
                " or razonsocial like '%" + razonorut.rtrim() + "%' ;";
        }
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.post('/entidades',
    function(req, res) {
        // los parametros
        var query = `insert into [ktb_entidades] (codaux,rut,razonsocial,direccion,comuna,ciudad,especialidad,calificacion) 
                    values ('${ req.body.codaux }',
                            '${ req.body.rut }',
                            '${ req.body.razonsocial }',
                            '${ req.body.direccion }',
                            '${ req.body.comuna }',
                            '${ req.body.ciudad }',
                            '${ req.body.especialidad }',
                             ${ req.body.calificacion } ); `;
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.put('/entidades',
    function(req, res) {
        // los parametros
        var query = `update [ktb_entidades]
                    set rut='${ req.body.rut }',
                        razonsocial='${ req.body.razonsocial }',
                        direccion='${ req.body.direccion }',
                        comuna='${ req.body.comuna }',
                        ciudad='${ req.body.ciudad }',
                        especialidad='${ req.body.especialidad }',
                        calificacion=${ req.body.calificacion }
                    where codaux = '${ req.body.codaux }' ;`;
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.delete('/entidades',
    function(req, res) {
        //
        var query = "delete [ktb_entidades] where codaux='" + req.body.codaux + "' ;";
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
// --------------------------------------------servicios
app.get('/servicios',
    function(req, res) {
        //
        var query = "select * from [ktb_servicios] ;";
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.post('/servicios',
    function(req, res) {
        //
        var query = "insert into [ktb_servicios] (servicio,descripcion) values ( '" + req.body.servicio + "','" + req.body.descripcion + "' ) ;";
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.put('/servicios',
    function(req, res) {
        //
        var query = "update [ktb_servicios] set descripcion='" + req.body.descripcion + "' where servicio='" + req.body.servicio + "' ;";
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.delete('/servicios',
    function(req, res) {
        //
        var query = "delete [ktb_servicios] where servicio='" + req.body.servicio + "' ;";
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
// --------------------------------------------planos
app.get('/planos',
    function(req, res) {
        // los parametros
        var query = '';
        var cliente = req.query.cliente;
        var codigo = req.query.codigo;
        //
        if (cliente !== undefined && codigo !== undefined) {
            query = `select * from [ktb_planos] where codaux = '${ cliente }' and codigo = '${ codigo }' ; `;
        } else {
            query = `select * from [ktb_planos] `;
        }
        //
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.post('/planos',
    function(req, res) {
        //
        var query = `insert into [ktb_planos] (plano,codaux,codigo,descripcion,extension,link,archivo) 
                    values ('${ req.body.plano}',
                            '${ req.body.codaux}',
                            '${ req.body.codigo}',
                            '${ req.body.descripcion}',
                            '${ req.body.extension}',
                            '${ req.body.link}',
                            '${ req.body.archivo}' ) ;`;
        //
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.put('/planos',
    function(req, res) {
        //
        var query = `update [ktb_planos]
                    set descripcion='${ req.body.descripcion}',
                        extension='${ req.body.extension}',
                        link='${ req.body.link}',
                        archivo='${ req.body.archivo}'
                    where plano  = '${ req.body.plano}'
                      and codaux = '${ req.body.codaux}'
                      and codigo = '${ req.body.codigo}' ;`;
        //
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.delete('/planos',
    function(req, res) {
        //
        var query = `delete [ktb_planos]
                    where plano  = '${ req.body.plano}'
                      and codaux = '${ req.body.codaux}'
                      and codigo = '${ req.body.codigo}' ;`;
        //
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
// --------------------------------------------procesos
app.get('/procesos',
    function(req, res) {
        //
        var query = "select * from [ktb_procesos] ;";
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.post('/procesos',
    function(req, res) {
        //
        var query = `insert into [ktb_procesos] (proceso,descripcion,maquina,tienealternativas,tienesubprocesos) 
                    values ('${ req.body.proceso}',
                            '${ req.body.descripcion}',
                            '${ req.body.maquina}',
                            ${ req.body.tienealternativas },
                            ${ req.body.tienesubprocesos} ) ;`;
        //
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.put('/procesos',
    function(req, res) {
        //
        var query = `update into [ktb_procesos] 
                    set descripcion='${ req.body.descripcion}',
                        maquina='${ req.body.maquina}',
                        tienealternativas=${ req.body.tienealternativas },
                        tienesubprocesos=${ req.body.tienesubprocesos} ) 
                    where proceso = '${ req.body.proceso}' ;`;
        //
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
app.delete('/procesos',
    function(req, res) {
        //
        var query = `delete [ktb_procesos] 
                    where proceso = '${ req.body.proceso}' ;`;
        //
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
// --------------------------------------------maquinas
app.post('/maquinas',
    function(req, res) {
        //        
        // console.log('/maquinas', req.body);
        var maq;
        var query = '';
        try {
            maq = JSON.parse(req.body.datos);
        } catch (error) {
            maq = undefined;
        }
        console.log(maq);
        //
        if (req.body.accion === 'select') {
            query = `
                select  *
                        ,cast('' as varchar(60) ) as picture
                        ,cast( (case when ultimamant>getdate() then 1 else 0 end) as bit) as fuerademant 
                from [ktb_maquinas] 
                order by maquina ;
            `;
        } else if (req.body.accion === 'insert') {
            query = `
                insert into [ktb_maquinas] (maquina,descripcion,activa,ultimamant,diasentremant) 
                values ('${ maq.codmaquina }',
                        '${ maq.descripcion }',
                        ${ maq.activa === true ? 1 : 0 },
                        '${ maq.ultimamant }',
                        ${ maq.diasentremant.toString() } ) ;
            `;
        } else if (req.body.accion === 'update') {
            query = `
                update [ktb_maquinas] 
                set descripcion='${ maq.descripcion }',
                    activa= ${ maq.activa === true ? 1 : 0 },
                    diasentremant=${ maq.diasentremant === null ? '0' : maq.diasentremant.toString() },
                    ultimamant='${ maq.ultimamant }' 
                where maquina='${ maq.codmaquina }' ;
            `;
        } else if (req.body.accion === 'delete') {
            query = `
                if  not exists ( select * from [ktb_of] with (nolock) where maquina = '${ maq.codmaquina }' ) begin 
                    delete [ktb_maquinas] where maquina='${ maq.codmaquina }'
                    select cast(1 as bit) as resultado, cast(0 as bit) as error,'' as  mensaje;;
                end
                else begin
                    select cast(0 as bit) as resultado, cast(1 as bit) as error, 'Maquina existe en OF' as  mensaje;
                end ;
            `;
        } else {
            query = `
            select 'sin accion en parametros' as error ;
            `;
        }
        //        
        console.log(query);
        //
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });

    });
// --------------------------------------------operarios
app.post('/operarios',
    function(req, res) {
        //        
        console.log('/operarios', req.body);
        //
        var oper;
        var query = '';
        try {
            oper = JSON.parse(req.body.datos);
        } catch (error) {
            oper = undefined;
        }
        console.log('/operarios', oper);
        //
        if (req.body.accion === 'select') {
            query = `
                select * from [ktb_operarios] order by nombre;
            `;
        } else if (req.body.accion === 'insert') {
            query = `
                insert into [ktb_operarios] (operario,nombre,esmaestro,esmecanico,genero,ingreso,activo) 
                values ('${ oper.operario }',
                        '${ oper.nombre }',
                        ${ oper.esmaestro === true ? 1 : 0 },
                        ${ oper.esmecanico === true ? 1 : 0 },
                        '${ oper.genero }',
                        '${ oper.ingreso }',
                        ${ oper.activo === true ? 1 : 0 } );
            `;
        } else if (req.body.accion === 'update') {
            query = `
                update [ktb_operarios] 
                set nombre='${ oper.nombre }',
                    esmaestro=${ oper.esmaestro === true ? 1 : 0 },
                    esmecanico=${ oper.esmecanico === true ? 1 : 0 },
                    ingreso='${ oper.ingreso }',
                    genero='${ oper.genero }',
                    activo=${ oper.activo === true ? 1 : 0 }
                where operario='${ oper.operario }' ;
            `;
        } else if (req.body.accion === 'delete') {
            query = `
                if not exists ( select * 
                                from [ktb_of] with (nolock)
                                where maestro = '${ oper.operario }' ) begin 
                   delete [ktb_operarios] where operario='${ oper.operario }'
                   select cast(1 as bit) as resultado, cast(0 as bit) as error,'' as  mensaje;;
                end
                else begin
                   select cast(0 as bit) as resultado, cast(1 as bit) as error, 'Operario existe en OF' as  mensaje;
                end ;
            `;
        } else {
            query = `
            select 'sin accion en parametros' as error ;
            `;
        }
        //        
        console.log(query);
        //
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
// --------------------------------------------operarios
app.post('/tml',
    function(req, res) {
        //        
        console.log('/tml', req.body);
        //
        var tm;
        var query = '';
        try {
            tm = JSON.parse(req.body.datos);
        } catch (error) {
            tm = undefined;
        }
        console.log('/tml', tm);
        //
        if (req.body.accion === 'select') {
            query = `
            select	t.*
                    ,f.nombre as nombrefac 
                    ,m.descripcion as nombremaq 
                    ,o.nombre as nombreoper
                    ,a1.nombre as nombreayu1
                    ,a2.nombre as nombreayu2
            from ktb_tml as t with (nolock)
            left join ktb_usuarios as f with (nolock) on f.id = t.facilitador
            left join ktb_maquinas as m with (nolock) on m.maquina = t.maquina
            left join ktb_operarios as o with (nolock) on o.operario=t.operador
            left join ktb_operarios as a1 with (nolock) on a1.operario=t.ayudante1
            left join ktb_operarios as a2 with (nolock) on a2.operario=t.ayudante2
            order by t.fecha desc, t.horadesde desc, t.facilitador;
            `;
        } else if (req.body.accion === 'insert') {
            query = `
                insert into [ktb_operarios] (operario,nombre,esmaestro,esmecanico,genero,ingreso,activo) 
                values ('${ oper.operario }',
                        '${ oper.nombre }',
                        ${ oper.esmaestro === true ? 1 : 0 },
                        ${ oper.esmecanico === true ? 1 : 0 },
                        '${ oper.genero }',
                        '${ oper.ingreso }',
                        ${ oper.activo === true ? 1 : 0 } );
            `;
        } else if (req.body.accion === 'update') {
            query = `
                update [ktb_operarios] 
                set nombre='${ oper.nombre }',
                    esmaestro=${ oper.esmaestro === true ? 1 : 0 },
                    esmecanico=${ oper.esmecanico === true ? 1 : 0 },
                    ingreso='${ oper.ingreso }',
                    genero='${ oper.genero }',
                    activo=${ oper.activo === true ? 1 : 0 }
                where operario='${ oper.operario }' ;
            `;
        } else if (req.body.accion === 'delete') {
            query = `
                if not exists ( select * 
                                from [ktb_of] with (nolock)
                                where maestro = '${ oper.operario }' ) begin 
                   delete [ktb_operarios] where operario='${ oper.operario }'
                   select cast(1 as bit) as resultado, cast(0 as bit) as error,'' as  mensaje;;
                end
                else begin
                   select cast(0 as bit) as resultado, cast(1 as bit) as error, 'Operario existe en OF' as  mensaje;
                end ;
            `;
        } else {
            query = `
            select 'sin accion en parametros' as error ;
            `;
        }
        //        
        console.log(query);
        //
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
// --------------------------------------------usuarios
app.post('/usuarios',
    function(req, res) {
        //        
        console.log(req.body);
        //
        var query = '';
        if (req.body.accion === 'select') {
            //
            if (req.body.email !== '' || req.body.email !== undefined) {
                query = `
                    select * 
                    from [ktb_usuarios] with (nolock)
                    where email = '${ req.body.email }' 
                      and pssw = '${ req.body.pssw }' ;
                `;
            } else {
                query = `
                    select id,email,nombre 
                    from [ktb_usuarios] with (nolock)
                    order by nombre ;
                `;
            }
            //
        } else if (req.body.accion === 'insert') {
            query = `
                insert into [ktb_usuarios] (email,nombre,pssw) 
                values ('${ req.body.email }',
                        '${ req.body.nombre }',
                        '${ req.body.pssw }') ;
            `;
        } else if (req.body.accion === 'update') {
            query = `update [ktb_usuarios]
                        set email='${ req.body.email }',
                            nombre='${ req.body.nombre }',
                            pssw='${ req.body.pssw }'
                        where id = ${id} ;
            `;
        } else if (req.body.accion === 'update') {
            query = `
                delete [ktb_usuarios]
                where id = ${ req.body.id } ;
            `;
        } else {
            query = `
                select 'el sin accion' as error ;
            `;
        }
        //        
        console.log(query);
        //
        sql.close();
        sql.connect(dbconex)
            .then(pool => {
                return pool.request().query(query);
            })
            .then(resultado => {
                // console.log(resultado);
                res.json({ resultado: 'ok', datos: resultado.recordset });
            })
            .catch(err => {
                console.log(err);
                res.json({ resultado: 'error', datos: err });
            });
    });
// --------------------------------------------permisos