import { Logo } from '@components';
import { FC, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const HeaderLink: FunctionComponent<LinkProps> = ({ label, link }) => {
  return (
    <Link to={link}>
      <span className="flex items-center justify-center">
        <span className="p-4 text-sm font-bold text-neutral-500">{label}</span>
      </span>
    </Link>
  );
};

type LinkProps = {
  label: string;
  link: string;
};

export const Unauthenticated: FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="overflow-hidden  bg-neutral-0">
        <div className="container grid grid-cols-5 mx-auto  lg:grid-cols-2">
          <div className="grid text-primary lg:grid-cols-4">
            <div className="flex items-center justify-center p-2">
              <Logo></Logo>
            </div>
          </div>
          <div className="flex col-span-4 lg:gap-6 lg:col-span-1">
            <HeaderLink link="#" label="Enlaces"></HeaderLink>
            <HeaderLink
              link="#"
              label="Casas de corredores de bolsa"
            ></HeaderLink>
            <HeaderLink link="#" label="Preguntas frecuentes"></HeaderLink>
          </div>
        </div>
      </header>
      {children}
      <footer className="bg-[#919BB3] text-neutral-0">
        <div className="flex flex-col gap-4 px-32 py-10 ">
          <p className="text-xs tracking-wide text-center">
            <b>Términos de uso:</b> La información contenido en este sitio es
            propiedad de Central de Depósito de Valores S.A de C.V o de las
            fuentes citas en casos que apliquen, cuyos caso la Central de
            Depósito de Valores S.A de C.V no se responsabiliza por la presión,
            oportunidad o exhatividad de la misma. Cualquier reporte
            electrónicoo impresos obtenido por este medio no constituye una
            certificación, si surte efecto legal.
          </p>
          <hr className="border-[#AAAEB8]" />
          <div className="grid grid-cols-2 gap-10">
            <div className="flex justify-around gap-4 text-sm font-bold tracking-wide">
              <Link to="#">
                <span>Contáctanos</span>
              </Link>
              <Link to="#">
                <span>Contratos de confidencialidad</span>
              </Link>
            </div>
            <div>
              <p className="text-xs tracking-wide text-center">
                Todos los derechos reservados, Central de Depósito de Valores de
                El Salvador 2021®
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
