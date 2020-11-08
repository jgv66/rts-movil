export interface Usuario {
  id: number;
  rut: string;
  email: string;
  nombre: string;
  cargo: string;
  esadmin: boolean;
}

export interface Cliente {
  id: number;
  codigo: string;
  razonsocial: string;
}


