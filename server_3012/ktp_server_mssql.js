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
        res.json({ resultado: 'ok', datos: dbconex });
    }
);
// --------------------------------------------ordenes
app.post('/ordenes',
    function(req, res) {
        //        
        console.log('/ordenes', req.body);
        //
        var tm;
        var query = '';
        try {
            tm = JSON.parse(req.body.datos);
        } catch (error) {
            tm = undefined;
        }
        console.log('/ordenes', tm);
        //
        if (req.body.accion === 'select') {
            query = `
            select	top 100 
                    t.*
                    ,f.nombre as nombrefac 
                    ,vb.nombre as nombrevb 
                    ,m.descripcion as nombremaq 
                    ,o.nombre as nombremae
                    ,a1.nombre as nombreayu1
                    ,a2.nombre as nombreayu2
                    ,ob.observaciones
            from ktb_ordendefab         as t with (nolock)
            left join ktb_usuarios      as f with (nolock) on f.id = t.facilitador
            left join ktb_usuarios      as vb with (nolock) on vb.id = t.vistobueno
            left join ktb_maquinas      as m with (nolock) on m.maquina = t.maquina
            left join ktb_operarios     as o with (nolock) on o.operario=t.maestro
            left join ktb_operarios     as a1 with (nolock) on a1.operario=t.ayudante1
            left join ktb_operarios     as a2 with (nolock) on a2.operario=t.ayudante2
            left join ktb_ordendefabobs as ob with (nolock) on ob.id_ordendefab=t.id
            order by t.fecha desc;
            `;
        } else if (req.body.accion === 'insert') {
            query = ``;
        } else if (req.body.accion === 'update') {
            query = ``;
        } else if (req.body.accion === 'delete') {
            query = ``;
        } else {
            query = `
            select 'sin accion en tml' as error ;
            `;
        }
        //        
        console.log(query);
        //
        sql.close();
        sql.connect(dbconex[0])
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
app.post('/ordenesSoft',
    function(req, res) {
        //        
        console.log('/ordenesSoft', req.body);
        //
        var tm;
        var query = '';
        try {
            nv = JSON.parse(req.body.datos);
        } catch (error) {
            nv = undefined;
        }
        //
        if (req.body.accion === 'select') {
            query = `
            select	top 100 
                    nv.NVNumero as folio
                    ,convert(varchar, nv.nvFem, 103)  fechaemision
                    ,convert(varchar, nv.nvFeEnt, 103) fechaprometida
                    ,nv.CodAux as cliente,cli.NomAux as razonsocial
                    ,nv.VenCod as vendedor,ve.VenDes as nombrevend
                    ,nv.nvObser as observaciones
                    ,nv.NumOC as oc
                    ,det.CodProd as codigo,det.nvCant cantidad,det.CodUMed as um
                    ,det.DetProd as descripcion
            from softland.nw_nventa as nv with (nolock)
            inner join softland.nw_detnv as det with (nolock) on det.NVNumero = nv.NVNumero
            left join softland.cwtvend as ve with (nolock) on ve.VenCod = nv.VenCod
            left join softland.cwtauxi as cli with (nolock) on cli.CodAux = nv.CodAux 
            where nv.NVNumero = ${ nv.nvv }
            order by nvFeEnt desc
            `;
        } else if (req.body.accion === 'insert') {
            query = ``;
        } else if (req.body.accion === 'update') {
            query = ``;
        } else if (req.body.accion === 'delete') {
            query = ``;
        } else {
            query = `
            select 'sin accion en tml' as error ;
            `;
        }
        //        
        console.log(query);
        //
        sql.close();
        sql.connect(dbconex[1])
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
            select 'sin accion en maquinas' as error ;
            `;
        }
        //        
        console.log(query);
        //
        sql.close();
        sql.connect(dbconex[0])
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
            select 'sin accion en operarios' as error ;
            `;
        }
        //        
        console.log(query);
        //
        sql.close();
        sql.connect(dbconex[0])
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
                    ,me.nombre as nombremec
            from ktb_tml as t with (nolock)
            left join ktb_usuarios as f with (nolock) on f.id = t.facilitador
            left join ktb_maquinas as m with (nolock) on m.maquina = t.maquina
            left join ktb_operarios as o with (nolock) on o.operario=t.operador
            left join ktb_operarios as a1 with (nolock) on a1.operario=t.ayudante1
            left join ktb_operarios as a2 with (nolock) on a2.operario=t.ayudante2
            left join ktb_operarios as me with (nolock) on me.operario=t.mecanico
            order by t.fecha desc, t.horadesde desc, t.facilitador;
            `;
        } else if (req.body.accion === 'insert') {
            query = `
                insert into [ktb_tml] (facilitador,fecha,turno,fecharegistro,maquina,horadesde,horahasta,operador,ayudante1,ayudante2,mecanico,descripcion) 
                values (${ tm.facilitador },
                        '${ tm.fecha }',
                        '${ tm.turno }',
                        getdate(),
                        '${ tm.maquina }',
                        '${ tm.horaini }',
                        '${ tm.horafin }',
                        '${ tm.operador }',
                        '${ tm.ayudante1 }',
                        '${ tm.ayudante2 }',
                        '${ tm.mecanico }',
                        '${ tm.descripcion }' );
            `;
        } else if (req.body.accion === 'update') {
            query = `
                update [ktb_tml] 
                set facilitador=${ tm.facilitador },
                    fecha='${ tm.fecha }',
                    turno='${ tm.turno }',
                    fecharegistro=getdate(),
                    maquina='${ tm.maquina }',
                    horadesde='${ tm.horaini }',
                    horahasta='${ tm.horafin }',
                    operador='${ tm.operador }',
                    ayudante1='${ tm.ayudante1 }',
                    ayudante2='${ tm.ayudante2 }',
                    mecanico='${ tm.mecanico }',
                    descripcion='${ tm.descripcion }'
                where id='${ tm.id }'
            `;
        } else if (req.body.accion === 'delete') {
            query = `
                delete [ktb_tml] where id='${ tm.id }' ;
            `;
        } else {
            query = `
            select 'sin accion en tml' as error ;
            `;
        }
        //        
        console.log(query);
        //
        sql.close();
        sql.connect(dbconex[0])
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
                select 'sin accion en usuarios' as error ;
            `;
        }
        //        
        console.log(query);
        //
        sql.close();
        sql.connect(dbconex[0])
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
app.post('/procesos',
    function(req, res) {
        console.log('/procesos', req.body);
        var pro;
        var query = '';
        try {
            pro = JSON.parse(req.body.datos);
        } catch (error) {
            pro = undefined;
        }
        console.log(pro);
        //
        if (req.body.accion === 'select') {
            query = `
            select  *
            from [ktb_procesos] 
            order by proceso ;
        `;
        } else if (req.body.accion === 'insert') {
            query = `
            insert into [ktb_procesos] (proceso, descripcion) 
            values ('${ pro.proceso }','${ pro.descripcion }' ) ;
        `;
        } else if (req.body.accion === 'update') {
            query = `
            update [ktb_procesos] 
            set descripcion='${ pro.descripcion }'
            where proceso='${ pro.proceso }' ;
        `;
        } else if (req.body.accion === 'delete') {
            query = `
            if  not exists ( select * from [ktb_ordendefab] with (nolock) where proceso = '${ pro.proceso }' ) begin 
                delete [ktb_procesos] where proceso='${ pro.proceso }'
                select cast(1 as bit) as resultado, cast(0 as bit) as error,'' as  mensaje;;
            end
            else begin
                select cast(0 as bit) as resultado, cast(1 as bit) as error, 'Proceso existe en OF' as  mensaje;
            end ;
        `;
        } else {
            query = `
        select 'sin accion en procesos' as error ;
        `;
        }
        //        
        console.log(query);
        //
        sql.close();
        sql.connect(dbconex[0])
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
app.post('/estatus',
    function(req, res) {
        // console.log('/estatus', req.body);
        var ser;
        var query = '';
        try {
            est = JSON.parse(req.body.datos);
        } catch (error) {
            est = undefined;
        }
        console.log(est);
        //
        if (req.body.accion === 'select') {
            query = `
            select  *
            from [ktb_estatus] 
            order by estatus ;
        `;
        } else if (req.body.accion === 'insert') {
            query = `
            insert into [ktb_estatus] (estatus, descripcion) 
            values ('${ est.estatus }','${ est.descripcion }' ) ;
        `;
        } else if (req.body.accion === 'update') {
            query = `
            update [ktb_estatus] 
            set descripcion='${ est.descripcion }',
            where estatus='${ est.estatus }' ;
        `;
        } else if (req.body.accion === 'delete') {
            query = `
            if  not exists ( select * from [ktb_ordendefab] with (nolock) where estatus = '${ est.estatus }' ) begin 
                delete [ktb_estatus] where estatus='${ est.estatus }'
                select cast(1 as bit) as resultado, cast(0 as bit) as error,'' as  mensaje;;
            end
            else begin
                select cast(0 as bit) as resultado, cast(1 as bit) as error, 'Estatus existe en OF' as  mensaje;
            end ;
        `;
        } else {
            query = `
        select 'sin accion en Estatuss' as error ;
        `;
        }
        //        
        console.log(query);
        //
        sql.close();
        sql.connect(dbconex[0])
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