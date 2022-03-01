import { Menu, Transition } from '@headlessui/react';
import { AccountImage, Card } from '@src/components';
import Icon from '@src/components/ui/Icon';
import AccountContext from '@src/context/AccountContext';
import { useAuth } from '@src/hooks';
import { useAccount } from '@src/hooks/account';
import {
  Fragment,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

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

const AccountSection: FunctionComponent<{ account: any }> = ({ account }) => {
  const { user } = useAuth({});
  useEffect(() => {
    account.setActualAccount(user?.casas[0]);
  }, [user]);

  return (
    <AccountContext.Provider value={account.actualAccount}>
      <Card>
        <div className="flex flex-col -m-3 divide-y">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="w-full p-4 text-sm font-medium rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <div className="flex">
                <div className="flex-auto text-left">
                  <p className="text-sm text-neutral-500">Cuenta</p>
                  <p className="font-bold text-primary">
                    {account.actualAccount?.tmvNomcor}
                  </p>
                </div>
                <Icon className="text-neutral-500">expand_more</Icon>
                <div className="flex items-center justify-center">
                  {/* <button className="flex">
                    <div>
                      <span className="w-5 h-5 material-icons text-neutral-500">
                        expand_more
                      </span>
                    </div>
                  </button> */}
                </div>
              </div>

              {/* <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            /> */}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {user?.casas.map((casa) => (
                    <Menu.Item key={casa.tmvNomcor}>
                      {({ active }) => (
                        <button
                          onClick={() => account.setActualAccount(casa)}
                          className={`${
                            active
                              ? 'bg-violet-500 text-white'
                              : 'text-gray-900'
                          } group flex rounded-md items-center w-full p-4 text-sm`}
                        >
                          {casa?.tmvNomcor}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="flex flex-col -m-3 divide-y">
          {/* Account Header */}

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
    </AccountContext.Provider>
  );
};

export default AccountSection;
