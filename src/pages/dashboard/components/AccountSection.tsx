import { AccountImage, Card } from '@src/components';
import { useAuth } from '@src/hooks';
import { FunctionComponent, ReactNode, useContext } from 'react';

type AccountBodyItemProps = {
  className?: string;
};
const AccountBodyItem: FunctionComponent<AccountBodyItemProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`flex justify-between items-center py-4 text-sm px-3 ${className}`}
    >
      {children}
    </div>
  );
};

const AccountSection: FunctionComponent<{}> = () => {
  const { user } = useAuth({});
  return (
    <Card>
      <div className="flex flex-col -m-3 divide-y">
        {/* Account Header */}
        <div className="flex items-center gap-3 px-3 my-2">
          <AccountImage></AccountImage>
          <div className="flex flex-auto">
            <div className="flex-auto">
              <p>Nº de cuenta</p>
              <p>03030438930434</p>
            </div>
            <div className="flex items-center justify-center">
              <button className="flex">
                <div>
                  <span className="w-5 h-5 material-icons text-neutral-500">
                    expand_more
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Account Body */}
        <AccountBodyItem>
          <span className="text-neutral-500">Estado</span>
          <span className="text-semantic-success">Activo</span>
        </AccountBodyItem>
        <AccountBodyItem>
          <span className="text-neutral-500">Saldo inicial</span>
          <span className="font-bold text-neutral-500">$50,000,000.00</span>
        </AccountBodyItem>
        <AccountBodyItem className="text-base rounded-md bg-neutral-700">
          {/* <div className="flex items-center justify-between px-3 py-4 rounded-md text-md"> */}
          <span className="font-bold text-neutral-500">Saldo final</span>
          <span className="font-bold text-neutral-500">$1,450,000.00</span>
          {/* </div> */}
        </AccountBodyItem>
      </div>
    </Card>
  );
};

export default AccountSection;
