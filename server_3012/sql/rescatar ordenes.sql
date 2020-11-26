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