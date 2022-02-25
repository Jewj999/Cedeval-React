import { FC, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { Authenticated } from '@src/components';
import ValuesInventoryTab from './components/tabs/ValuesInventoryTab';
import AccountStatusTab from './components/tabs/AccountStatus';
import CuponExpirationTab from './components/tabs/CuponExpirationTab';
import InventoryStockTab from './components/tabs/InventoryStockTab';
import Sidebar from './components/Sidebar';
import { axios } from '@src/libs';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const DashboardPage: FC = () => {
  
  const [tabMenu] = useState([
    {
      title: 'Inventario de valores',
    },
    {
      title: 'Estado de cuenta',
    },
    {
      title: 'Vcto. de cupones',
    },
    {
      title: 'Inventario de valores a fin de mes',
    },
  ]);

  return (
    <Authenticated>
      <div className="container flex flex-col flex-1 gap-4 p-4 mx-auto">
        {/* Header */}
        <div>
          <h2 className="text-primary">Consulta en linea</h2>
          <p className="text-sm text-neutral-500 roun">
            Última conexión: 19 de abril de 2021
          </p>
        </div>

        {/* Body */}
        <div className="grid grid-cols-3 gap-4">
          {/* Main content */}
          <div className="col-span-2">
            <Tab.Group>
              <div className="flex flex-col gap-4">
                {/* Menu Items */}

                <div className="flex flex-col gap-4 px-6 py-5 rounded-lg bg-neutral-0">
                  <h5 className="text-primary">Selecciona tu consulta</h5>

                  <Tab.List className="flex text-sm divide-x rounded-md outline outline-1 outline-secondary-500 divide-secondary-500">
                    {tabMenu.map((menuItem, index) => (
                      <Tab
                        key={index}
                        className={({ selected }) =>
                          classNames(
                            'flex-auto p-3 first:rounded-l-md last:rounded-r-md',
                            selected
                              ? 'bg-secondary-500 text-neutral-0'
                              : 'text-secondary-500'
                          )
                        }
                      >
                        {menuItem.title}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>

                {/* Content */}
                <Tab.Panels className="">
                  <Tab.Panel>
                    <ValuesInventoryTab></ValuesInventoryTab>
                  </Tab.Panel>

                  <Tab.Panel>
                    <AccountStatusTab></AccountStatusTab>
                  </Tab.Panel>

                  <Tab.Panel>
                    <CuponExpirationTab></CuponExpirationTab>
                  </Tab.Panel>

                  <Tab.Panel>
                    <InventoryStockTab></InventoryStockTab>
                  </Tab.Panel>
                </Tab.Panels>
              </div>
            </Tab.Group>
          </div>
          {/* Sidebar right */}
          <Sidebar></Sidebar>
        </div>
      </div>
    </Authenticated>
  );
};

export default DashboardPage;
