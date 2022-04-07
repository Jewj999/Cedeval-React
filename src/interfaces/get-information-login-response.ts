import { Response } from '.';

export interface GetInformationLogin {
  response: Response<GetInformationLoginResponse>;
}

interface GetInformationLoginResponse {
  usuario: {
    bvsIduse: number;
    bvsTipodoc: string;
    bvsNodocu: string;
    bvsEmail: string;
    bvsIsEnabled: boolean;
    bvsNombre: string;
    bvsTelefono: string;
    bvsStatusSession: boolean;
    bvsIntentoSesion: boolean;
  };
  casas: {
    tmvCodcas: string;
    tmvNomcor: string;
    estado: string;
    cte: string;
    cta: string;
    tcta: string;
  }[];
  sesionActiva: any;
  lastSession: {
    bvsIdsesact: number;
    bvsIduse: boolean;
    bvsActive: boolean;
    bvsApp: string;
    bvsFechaInicioSesion: Date;
    fechafinSesion: any;
  };
}
