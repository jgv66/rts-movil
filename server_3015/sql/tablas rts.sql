
use RTS
GO

/****** Object:  Table [dbo].[ktb_centros]    Script Date: 23-11-2020 21:01:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_centros](
	[centro] [varchar](3) NOT NULL,
	[descripcion] [varchar](50) NULL,
 CONSTRAINT [PK_centros] PRIMARY KEY CLUSTERED 
(
	[centro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


GO

/****** Object:  Table [dbo].[ktb_entidades]    Script Date: 23-11-2020 21:01:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_entidades](
	[codaux] [varchar](20) NOT NULL,
	[rut] [varchar](20) NULL,
	[razonsocial] [varchar](80) NULL,
	[direccion] [varchar](80) NULL,
	[conuma] [varchar](80) NULL,
	[ciudad] [varchar](80) NULL,
	[especialidadess] [varchar](80) NULL,
	[calificacion] [decimal](18, 3) NULL,
 CONSTRAINT [PK_entidades] PRIMARY KEY CLUSTERED 
(
	[codaux] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


GO

/****** Object:  Table [dbo].[ktb_maquinas]    Script Date: 23-11-2020 21:01:27 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_maquinas](
	[maquina] [varchar](20) NOT NULL,
	[descripcion] [varchar](80) NULL,
	[activa] [bit] NOT NULL,
	[ultimamant] [date] NULL,
	[proximamant] [date] NULL,
	[diasentremant] [int] NULL,
 CONSTRAINT [PK_maquinas] PRIMARY KEY CLUSTERED 
(
	[maquina] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ktb_maquinas] ADD  CONSTRAINT [DF_Table_1_valida]  DEFAULT ((1)) FOR [activa]
GO


GO

/****** Object:  Table [dbo].[ktb_operarios]    Script Date: 23-11-2020 21:01:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_operarios](
	[operario] [varchar](20) NOT NULL,
	[nombre] [varchar](80) NOT NULL,
	[direccion] [varchar](80) NULL,
	[comuna] [varchar](30) NULL,
	[nrotelefono] [varchar](30) NULL,
	[email] [varchar](60) NULL,
	[genero] [char](1) NULL,
	[esmaestro] [bit] NULL,
	[esmecanico] [bit] NULL,
	[especialidad] [varchar](30) NULL,
	[ingreso] [date] NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [PK_operarios] PRIMARY KEY CLUSTERED 
(
	[operario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ktb_operarios] ADD  CONSTRAINT [DF_operarios_esmaestro]  DEFAULT ((0)) FOR [esmaestro]
GO

ALTER TABLE [dbo].[ktb_operarios] ADD  CONSTRAINT [DF_ktb_operarios_esmecanico]  DEFAULT ((0)) FOR [esmecanico]
GO

ALTER TABLE [dbo].[ktb_operarios] ADD  CONSTRAINT [DF_operarios_activo]  DEFAULT ((1)) FOR [activo]
GO


GO

/****** Object:  Table [dbo].[ktb_ordendefab]    Script Date: 23-11-2020 21:01:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_ordendefab](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[estado] [char](1) NULL,
	[facilitador] [int] NOT NULL,
	[vistobueno] [int] NOT NULL,
	[fecha] [datetime] NULL,
	[turno] [char](1) NULL,
	[cliente] [varchar](20) NULL,
	[codigo] [varchar](20) NULL,
	[impresion] [varchar](100) NULL,
	[qsolicitada] [decimal](18, 3) NULL,
	[qproducida] [decimal](18, 3) NULL,
	[maquina] [varchar](20) NOT NULL,
	[folio] [varchar](20) NULL,
	[ordendefab] [varchar](20) NULL,
	[maestro] [int] NOT NULL,
	[ayudante1] [int] NULL,
	[ayudante2] [int] NULL,
 CONSTRAINT [PK_ktb_of] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ktb_ordendefab] ADD  CONSTRAINT [DF_ktb_of_vobo]  DEFAULT ((0)) FOR [vistobueno]
GO

ALTER TABLE [dbo].[ktb_ordendefab] ADD  CONSTRAINT [DF_ktb_of_fecha]  DEFAULT (getdate()) FOR [fecha]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'null,Activa,Detenida,Cerrada' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ktb_ordendefab', @level2type=N'COLUMN',@level2name=N'estado'
GO


GO

/****** Object:  Table [dbo].[ktb_ordendefabobs]    Script Date: 23-11-2020 21:01:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_ordendefabobs](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_ordendefab] [int] NOT NULL,
	[observaciones] [varchar](200) NULL,
 CONSTRAINT [PK_ktb_ordendefabobs] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


GO

/****** Object:  Table [dbo].[ktb_ordenes]    Script Date: 23-11-2020 21:02:09 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_ordenes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nv] [varchar](20) NOT NULL,
	[tipo] [varchar](10) NULL,
	[fechanv] [date] NULL,
	[fechavencnv] [date] NULL,
	[fechaprometida] [date] NULL,
	[fechallegada] [datetime] NOT NULL,
	[fechainicio] [datetime] NULL,
	[fechatermino] [datetime] NULL,
	[servicio] [varchar](20) NOT NULL,
	[centro] [varchar](3) NULL,
	[estado] [char](1) NOT NULL,
	[codaux] [varchar](20) NULL,
	[codigo] [varchar](20) NOT NULL,
	[descripcion] [varchar](100) NULL,
	[plano] [varchar](30) NULL,
	[cantsolicitada] [decimal](18, 4) NOT NULL,
	[cantproducida] [decimal](18, 4) NOT NULL,
	[largo] [decimal](18, 4) NULL,
	[ancho] [decimal](18, 4) NULL,
	[alto] [decimal](18, 4) NULL,
	[kilostotal] [decimal](18, 4) NULL,
	[observaciones] [varchar](100) NULL,
 CONSTRAINT [PK_ordenes] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ktb_ordenes] ADD  CONSTRAINT [DF_ordenes_estado]  DEFAULT ('') FOR [estado]
GO

ALTER TABLE [dbo].[ktb_ordenes] ADD  CONSTRAINT [DF_ordenes_cantsolicitada]  DEFAULT ((0)) FOR [cantsolicitada]
GO

ALTER TABLE [dbo].[ktb_ordenes] ADD  CONSTRAINT [DF_ordenes_cantproducida]  DEFAULT ((0)) FOR [cantproducida]
GO

ALTER TABLE [dbo].[ktb_ordenes]  WITH CHECK ADD  CONSTRAINT [FK_ordenes_centros] FOREIGN KEY([centro])
REFERENCES [dbo].[ktb_centros] ([centro])
GO

ALTER TABLE [dbo].[ktb_ordenes] CHECK CONSTRAINT [FK_ordenes_centros]
GO

ALTER TABLE [dbo].[ktb_ordenes]  WITH CHECK ADD  CONSTRAINT [FK_ordenes_entidades] FOREIGN KEY([codaux])
REFERENCES [dbo].[ktb_entidades] ([codaux])
GO

ALTER TABLE [dbo].[ktb_ordenes] CHECK CONSTRAINT [FK_ordenes_entidades]
GO

ALTER TABLE [dbo].[ktb_ordenes]  WITH CHECK ADD  CONSTRAINT [FK_ordenes_planos] FOREIGN KEY([plano], [codaux], [codigo])
REFERENCES [dbo].[ktb_planos] ([plano], [codaux], [codigo])
GO

ALTER TABLE [dbo].[ktb_ordenes] CHECK CONSTRAINT [FK_ordenes_planos]
GO

ALTER TABLE [dbo].[ktb_ordenes]  WITH CHECK ADD  CONSTRAINT [FK_ordenes_productos] FOREIGN KEY([codigo])
REFERENCES [dbo].[ktb_productos] ([codigo])
GO

ALTER TABLE [dbo].[ktb_ordenes] CHECK CONSTRAINT [FK_ordenes_productos]
GO

ALTER TABLE [dbo].[ktb_ordenes]  WITH CHECK ADD  CONSTRAINT [FK_ordenes_servicios] FOREIGN KEY([servicio])
REFERENCES [dbo].[ktb_servicios] ([servicio])
GO

ALTER TABLE [dbo].[ktb_ordenes] CHECK CONSTRAINT [FK_ordenes_servicios]
GO


GO

/****** Object:  Table [dbo].[ktb_ordenes_sub]    Script Date: 23-11-2020 21:02:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_ordenes_sub](
	[id] [int] NOT NULL,
	[id_ordenes] [int] NOT NULL,
	[prioridad] [int] NOT NULL,
	[proceso] [varchar](20) NOT NULL,
	[inicio] [datetime] NULL,
	[cerrado] [bit] NOT NULL,
	[termino] [datetime] NULL,
	[maquina] [varchar](20) NOT NULL,
	[operario] [varchar](20) NOT NULL,
	[ayudantes] [int] NOT NULL,
 CONSTRAINT [PK_ordenes_sub] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ktb_ordenes_sub] ADD  CONSTRAINT [DF_ordenes_sub_prioridad]  DEFAULT ((0)) FOR [prioridad]
GO

ALTER TABLE [dbo].[ktb_ordenes_sub] ADD  CONSTRAINT [DF_ordenes_sub_cerrado]  DEFAULT ((0)) FOR [cerrado]
GO

ALTER TABLE [dbo].[ktb_ordenes_sub]  WITH CHECK ADD  CONSTRAINT [FK_ordenes_sub_maquinas] FOREIGN KEY([maquina])
REFERENCES [dbo].[ktb_maquinas] ([maquina])
GO

ALTER TABLE [dbo].[ktb_ordenes_sub] CHECK CONSTRAINT [FK_ordenes_sub_maquinas]
GO

ALTER TABLE [dbo].[ktb_ordenes_sub]  WITH CHECK ADD  CONSTRAINT [FK_ordenes_sub_operarios] FOREIGN KEY([operario])
REFERENCES [dbo].[ktb_operarios] ([operario])
GO

ALTER TABLE [dbo].[ktb_ordenes_sub] CHECK CONSTRAINT [FK_ordenes_sub_operarios]
GO

ALTER TABLE [dbo].[ktb_ordenes_sub]  WITH CHECK ADD  CONSTRAINT [FK_ordenes_sub_procesos] FOREIGN KEY([proceso])
REFERENCES [dbo].[ktb_procesos] ([proceso])
GO

ALTER TABLE [dbo].[ktb_ordenes_sub] CHECK CONSTRAINT [FK_ordenes_sub_procesos]
GO


GO

/****** Object:  Table [dbo].[ktb_planos]    Script Date: 23-11-2020 21:02:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_planos](
	[plano] [varchar](30) NOT NULL,
	[codaux] [varchar](20) NOT NULL,
	[codigo] [varchar](20) NOT NULL,
	[descripcion] [varchar](80) NULL,
	[archivo] [text] NULL,
	[extension] [nchar](10) NULL,
	[link] [varchar](250) NULL,
 CONSTRAINT [PK_planos] PRIMARY KEY CLUSTERED 
(
	[plano] ASC,
	[codaux] ASC,
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


GO

/****** Object:  Table [dbo].[ktb_procesos]    Script Date: 23-11-2020 21:02:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_procesos](
	[proceso] [varchar](20) NOT NULL,
	[descripcion] [varchar](80) NULL,
 CONSTRAINT [PK_procesos] PRIMARY KEY CLUSTERED 
(
	[proceso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


GO

/****** Object:  Table [dbo].[ktb_procesos_sub]    Script Date: 23-11-2020 21:02:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_procesos_sub](
	[subproceso] [varchar](20) NOT NULL,
	[proceso] [varchar](20) NOT NULL,
	[descripcion] [varchar](80) NOT NULL,
 CONSTRAINT [PK_procesos_sub] PRIMARY KEY CLUSTERED 
(
	[subproceso] ASC,
	[proceso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ktb_procesos_sub]  WITH CHECK ADD  CONSTRAINT [FK_procesos_sub_procesos] FOREIGN KEY([proceso])
REFERENCES [dbo].[ktb_procesos] ([proceso])
GO

ALTER TABLE [dbo].[ktb_procesos_sub] CHECK CONSTRAINT [FK_procesos_sub_procesos]
GO


GO

/****** Object:  Table [dbo].[ktb_productos]    Script Date: 23-11-2020 21:02:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_productos](
	[codigo] [varchar](20) NOT NULL,
	[codsoft] [varchar](20) NULL,
	[descripcion] [varchar](80) NULL,
	[largo] [decimal](18, 4) NULL,
	[ancho] [decimal](18, 4) NULL,
	[espesor] [decimal](18, 4) NULL,
	[unidxplancha] [decimal](18, 4) NULL,
	[kilosxpieza] [decimal](18, 4) NULL,
	[diasconfeccionprom] [decimal](18, 4) NULL,
	[plano] [varchar](30) NULL,
	[archivo] [text] NULL,
	[extension] [varchar](5) NULL,
 CONSTRAINT [PK_codigos] PRIMARY KEY CLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


GO

/****** Object:  Table [dbo].[ktb_servicios]    Script Date: 23-11-2020 21:03:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_servicios](
	[servicio] [varchar](20) NOT NULL,
	[descripcion] [varchar](50) NULL,
 CONSTRAINT [PK_servicios] PRIMARY KEY CLUSTERED 
(
	[servicio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


GO

/****** Object:  Table [dbo].[ktb_tml]    Script Date: 23-11-2020 21:03:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_tml](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[facilitador] [int] NULL,
	[fecha] [datetime] NOT NULL,
	[turno] [char](1) NULL,
	[fecharegistro] [datetime] NULL,
	[maquina] [varchar](20) NOT NULL,
	[horadesde] [char](5) NOT NULL,
	[horahasta] [char](5) NOT NULL,
	[operador] [varchar](20) NOT NULL,
	[ayudante1] [varchar](20) NULL,
	[ayudante2] [varchar](20) NULL,
	[mecanico] [varchar](20) NULL,
	[descripcion] [varchar](250) NULL,
 CONSTRAINT [PK_ktb_tml] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ktb_tml] ADD  CONSTRAINT [DF_ktb_tml_fecharegistro]  DEFAULT (getdate()) FOR [fecharegistro]
GO


GO

/****** Object:  Table [dbo].[ktb_usuarios]    Script Date: 23-11-2020 21:03:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ktb_usuarios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](80) NULL,
	[nombre] [varchar](80) NULL,
	[pssw] [varchar](100) NULL,
	[facilitador] [bit] NOT NULL,
	[admin] [bit] NOT NULL,
 CONSTRAINT [PK_usuario] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ktb_usuarios] ADD  CONSTRAINT [DF__usuario__email__300424B4]  DEFAULT (NULL) FOR [email]
GO

ALTER TABLE [dbo].[ktb_usuarios] ADD  CONSTRAINT [DF__usuario__nombre__30F848ED]  DEFAULT (NULL) FOR [nombre]
GO

ALTER TABLE [dbo].[ktb_usuarios] ADD  CONSTRAINT [DF__usuario__pssw__31EC6D26]  DEFAULT (NULL) FOR [pssw]
GO

ALTER TABLE [dbo].[ktb_usuarios] ADD  CONSTRAINT [DF_ktb_usuarios_facilitador]  DEFAULT ((0)) FOR [facilitador]
GO

ALTER TABLE [dbo].[ktb_usuarios] ADD  CONSTRAINT [DF_usuarios_admin]  DEFAULT ((0)) FOR [admin]
GO


