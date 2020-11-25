-- select top 10 * from softland.cwtauxi
-- select top 1000 * from softland.nw_detnv where year(nvFecCompr)=2020 order by CodProd,nvFecCompr desc
-- select top 1000 * from softland.nw_nventa where year(nvFeEnt)=2020 order by nvFeEnt desc

select	top 100 
		nv.NVNumero as folio
		,convert(varchar, nv.nvFem, 103)  fechaemision
		,convert(varchar, nv.nvFeEnt, 103) fechaprometida
		,nv.CodAux as cliente,cli.NomAux
		,nv.VenCod as vendedor,ve.VenDes
		,nv.nvObser as observaciones
		,nv.NumOC as oc
		,det.CodProd as codigo,det.nvCant cantidad,det.CodUMed as um
		,det.DetProd as descripcion
from softland.nw_nventa as nv with (nolock)
inner join softland.nw_detnv as det with (nolock) on det.NVNumero = nv.NVNumero
left join softland.cwtvend as ve with (nolock) on ve.VenCod = nv.VenCod
left join softland.cwtauxi as cli with (nolock) on cli.CodAux = nv.CodAux 
--where nv.NVNumero = 
order by nvFeEnt desc



