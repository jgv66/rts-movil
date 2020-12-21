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
        var orden;
        var query = '';
        try {
            orden = JSON.parse(req.body.datos);
        } catch (error) {
            orden = undefined;
        }
        console.log('/ordenes', orden, req.body);
        //
        if (req.body.accion === 'select') {
            query = `
            select	top 100 
                    t.*
                    ,f.nombre  as nombrefac 
                    ,vb.nombre as nombrevb 
                    ,ve.VenDes as nombrevend
                    ,coalesce(m.descripcion,'') as nombremaq 
                    ,coalesce(o.nombre,'')  as nombremae
                    ,coalesce(a1.nombre,'') as nombreayu1
                    ,coalesce(a2.nombre,'') as nombreayu2
                    ,coalesce(me.nombre,'') as nombremec
                    ,coalesce(ob.observaciones,'') as observaciones
                    ,coalesce(nv.NumOC,'') as oc
                    ,cli.NomAux as razonsocial
                    ,det.DetProd as descripcion
                    ,det.CodUMed as um
                    ,coalesce(pr.descripcion,'') as nombreproc
                    ,coalesce(( select sum(qproducida) from ktb_ordendefabmov as mov with (nolock) where mov.id_padre = t.id ),0) as producido
            from ktb_ordendefab         as t  with (nolock)
            left join ktb_usuarios      as f  with (nolock) on f.id = t.facilitador
            left join ktb_usuarios      as vb with (nolock) on vb.id = t.vistobueno
            left join ktb_maquinas      as m  with (nolock) on m.maquina = t.maquina
            left join ktb_operarios     as o  with (nolock) on o.operario=t.maestro
            left join ktb_operarios     as a1 with (nolock) on a1.operario=t.ayudante1
            left join ktb_operarios     as a2 with (nolock) on a2.operario=t.ayudante2
            left join ktb_operarios     as me with (nolock) on me.operario=t.mecanico
            left join ktb_ordendefabobs as ob with (nolock) on ob.id_ordendefab=t.id
            left join ktb_procesos      as pr with (nolock) on pr.proceso=t.proceso
            left join RTS.softland.cwtauxi   as cli with (nolock) on cli.CodAux = t.cliente  collate database_default
            left join RTS.softland.nw_nventa as nv  with (nolock) on nv.NVNumero = t.folio
            left join RTS.softland.nw_detnv  as det with (nolock) on det.NVNumero = t.folio
            left join RTS.softland.cwtvend   as ve  with (nolock) on ve.VenCod = t.vendedor  collate database_default
            order by t.fechacreacion desc;
            `;
        } else if (req.body.accion === 'insert') {
            //
            const nv = orden.nvv;
            //
            query = `
            --
            declare @Error	nvarchar(250), 
                    @ErrMsg	nvarchar(2048), 
                    @id int = 0,
                    @idfb int = 0;
            --
            begin try
                if not exists ( select * from [dbo].[ktb_ordendefab] where ordendefab = '${ nv.folio }' ) begin
                    --
                    begin transaction;
                        --
                        insert into [dbo].[ktb_ordendefab] ( estado,facilitador,vistobueno,fechacreacion,fechaemision,fechaprometida,turno
                                                            ,ordendefab,cliente,codigo,impresion,qsolicitada,qproducida,maquina
                                                            ,folio,maestro,ayudante1,ayudante2,vendedor,oc )
                                values ( 'A', ${ req.body.idusuario}, 0, getdate(), '${ nv.fechaemision }', '${ nv.fechaprometida }', '' 
                                        ,'${nv.folio}', '${nv.cliente}', '${nv.codigo}', '', ${nv.cantidad}, 0, ''
                                        ,'${nv.folio}','', '', '', '${nv.vendedor}','${nv.oc}');
                        --
                        set @idfb = IDENT_CURRENT('ktb_ordendefab');
                        --
                        if ( '${ nv.observaciones }' <> '' ) begin
                            insert into [dbo].[ktb_ordendefabobs] (id_ordendefab,observaciones) values (@idfb,'${nv.observaciones}');
                        end;
                        --
                    commit transaction;
                    --
                    select cast(1 as bit) as resultado, cast(0 as bit) as error,'' as  mensaje;
                end
                else begin
                    select cast(0 as bit) as resultado, cast(1 as bit) as error, 'Nota de venta ya fue trasladada como Orden de Fabricación' as  mensaje;
                end ;
            end try
            begin catch
                --
                set @Error  = @@ERROR;
                set @ErrMsg = ERROR_MESSAGE();
                --
                if (@@TRANCOUNT > 0 ) rollback transaction;
                --
                select cast(0 as bit) as resultado, cast(1 as bit) as error, @ErrMsg as  mensaje;
                --
            end catch;
            `;
        } else if (req.body.accion === 'update') {
            query = `
                -- solo cambia de activa a en proceso
                declare @Error	nvarchar(250), 
                        @ErrMsg	nvarchar(2048); 
                --
                begin try
                    --
                    begin transaction;
                        --
                        update [dbo].[ktb_ordendefab]
                        set maquina='${ orden.maquina }',
                            maestro='${ orden.maestro }',
                            ayudante1='${ orden.ayudante1 }',
                            ayudante2='${ orden.ayudante2 }',
                            mecanico='${ orden.mecanico }',
                            proceso='${ orden.proceso }',
                            turno='${ orden.turno }',
                            qproducida=${orden.cantidad},
                            impresion='${orden.impresion}',
                            estado='P',
                            fechaultact=getdate()
                        where id =${ orden.id };
                        --
                        insert into [dbo].[ktb_ordendefabmov] (id_padre,fechamov,facilitador,maquina,maestro,ayudante1,
                                                               ayudante2,mecanico,proceso,turno,qproducida,
                                                               impresion) 
                        values ( ${orden.id}, getdate(), ${ orden.user },'${ orden.maquina }','${ orden.maestro }','${ orden.ayudante1 }'
                                ,'${ orden.ayudante2 }','${ orden.mecanico }','${ orden.proceso }','${ orden.turno }',${orden.cantidad}
                                ,'${orden.impresion}' );
                        --
                    commit transaction ;
                    --
                    select cast(1 as bit) as resultado, cast(0 as bit) as error,'' as  mensaje;
                    --
                end try
                begin catch
                    --
                    set @Error  = @@ERROR;
                    set @ErrMsg = ERROR_MESSAGE();
                    --
                    if (@@TRANCOUNT > 0 ) rollback transaction;
                    --
                    select cast(0 as bit) as resultado, cast(1 as bit) as error, @ErrMsg as  mensaje;
                    --
                end catch;
                --
            `;
        } else if (req.body.accion === 'cambiarestado') {
            query = `
                --
                declare @Error	nvarchar(250), 
                        @ErrMsg	nvarchar(2048); 
                --
                begin try
                    begin transaction;
                        update [dbo].[ktb_ordendefab]
                        set estado='${ orden.estado }',
                            fechaultact=getdate()
                        where id =${ orden.id };
                        --
                        insert into [dbo].[ktb_ordendefabmov] (id_padre,fechamov,facilitador) 
                        values ( ${orden.id}, getdate(), ${ orden.user } );
                        --
                    commit transaction ;
                    --
                    select cast(1 as bit) as resultado, cast(0 as bit) as error,'' as  mensaje;
                    --
                end try
                begin catch
                    --
                    set @Error  = @@ERROR;
                    set @ErrMsg = ERROR_MESSAGE();
                    --
                    if (@@TRANCOUNT > 0 ) rollback transaction;
                    --
                    select cast(0 as bit) as resultado, cast(1 as bit) as error, @ErrMsg as  mensaje;
                    --
                end catch;
                --
            `;
        } else if (req.body.accion === 'report') {
            query = `
            select	t.codigo
                    ,det.DetProd as descripcion
                    ,cast(mo.fechamov as date) as fecha
					,cast(convert(time, mo.fechamov) as varchar(5) ) as hora
					,( case when mo.turno = 'D' then 'Día' when mo.turno = 'N' then 'Noche' else '?' end ) as turno
					,mo.qproducida as cantidad
                    ,mo.impresion
                    ,f.nombre  as nombrefac 
                    ,coalesce(m.descripcion,'') as nombremaq 
                    ,coalesce(o.nombre,'')  as nombremae
                    ,coalesce(a1.nombre,'') as nombreayu1
                    ,coalesce(a2.nombre,'') as nombreayu2
                    ,coalesce(me.nombre,'') as nombremec
                    ,coalesce(ob.observaciones,'') as observaciones
                    ,det.CodUMed as um
                    ,cli.NomAux as razonsocial
                    ,coalesce(pr.descripcion,'') as nombreproc
            from ktb_ordendefab          as t  with (nolock)
			inner join ktb_ordendefabmov as mo with (nolock) on mo.id_padre = t.id 
            left  join ktb_usuarios      as f  with (nolock) on f.id = mo.facilitador
            left  join ktb_usuarios      as vb with (nolock) on vb.id = t.vistobueno
            left  join ktb_maquinas      as m  with (nolock) on m.maquina = mo.maquina
            left  join ktb_operarios     as o  with (nolock) on o.operario=mo.maestro
            left  join ktb_operarios     as a1 with (nolock) on a1.operario=mo.ayudante1
            left  join ktb_operarios     as a2 with (nolock) on a2.operario=mo.ayudante2
            left  join ktb_operarios     as me with (nolock) on me.operario=mo.mecanico
            left  join ktb_ordendefabobs as ob with (nolock) on ob.id_ordendefab=t.id
            left  join ktb_procesos      as pr with (nolock) on pr.proceso=mo.proceso
            left  join RTS.softland.cwtauxi   as cli with (nolock) on cli.CodAux = t.cliente  collate database_default
            left  join RTS.softland.nw_nventa as nv  with (nolock) on nv.NVNumero = t.folio
            left  join RTS.softland.nw_detnv  as det with (nolock) on det.NVNumero = t.folio
            where t.id = ${ orden.id }
            order by mo.fechamov desc;
            `;
        } else {
            query = `
            select 'sin accion en ordenes' as error ;
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
                    ,nv.nvFem as fechaemision
                    ,nv.nvFeEnt as fechaprometida
                    ,nv.CodAux as cliente,cli.NomAux as razonsocial
                    ,nv.VenCod as vendedor,ve.VenDes as nombrevend
                    ,nv.nvObser as observaciones
                    ,nv.NumOC as oc
                    ,det.CodProd as codigo,det.nvCant cantidad,det.CodUMed as um
                    ,det.DetProd as descripcion
                    ,cast( coalesce((select top 1 1 from RTS_Kinetik.dbo.ktb_ordendefab as x where x.folio = ${ nv.nvv } ),0) as bit) as yaexiste
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
// -------------------------------------------maquinas
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
                insert into [ktb_tml] (facilitador,fecha,turno,fecharegistro
                                        ,maquina,horadesde,horahasta,operador
                                        ,ayudante1,ayudante2,mecanico,descripcion) 
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
            set descripcion='${ est.descripcion }'
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