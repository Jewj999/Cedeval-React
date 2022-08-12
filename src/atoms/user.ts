import { GetInformationLoginResponse } from '@src/interfaces';
import { atom } from 'recoil';

export const userAtom = atom({
  key: 'userState',
  default: {
    usuario: {
      bvsIduse: 0,
      bvsTipodoc: '',
      bvsNodocu: '',
      bvsEmail: '',
      bvsIsEnabled: false,
      bvsNombre: '',
      bvsTelefono: '',
      bvsStatusSession: false,
      bvsIntentoSesion: false,
      bvsAcceptContract: 0,
    },
    casas: [
      {cta: '123456789',
      cte: '123456789',
      estado: 'Activo',
      tcta: '123456789',
      tmvCodcas: '123456789',
      tmvNomcor: 'BANCO AGRICOLA',},
      {cta: '123456789',
      cte: '123456789',
      estado: 'Activo',
      tcta: '123456789',
      tmvCodcas: '123456789',
      tmvNomcor: 'PROMERICA',},
    ],
    sesionActiva: {
      bvsIdsesact: 0,
      bvsIduse: 0,
      bvsActive: false,
      bvsApp: '',
      bvsFechaInicioSesion: new Date(),
      fechafinSesion: new Date(),
    },
    lastSession: {
      bvsIdsesact: 0,
      bvsIduse: false,
      bvsActive: false,
      bvsApp: '',
      bvsFechaInicioSesion: new Date(),
      fechafinSesion: new Date(),
    },
  } as GetInformationLoginResponse,
});
