import { accountAtom } from '@src/atoms/account';
import { Card, FormGroup, FormInput, Modal, Text } from '@src/components';
import { EmptyState } from '@src/components/ui/EmptyState';
import { axios, currency, dayjs } from '@src/libs';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

interface FormValues {
  search: string;
}

const InventoryStockTab: FC = () => {
  const { register } = useForm<FormValues>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inventories, setInventories] = useState<any[]>([]);
  const [currentInventory, setCurrentInventory] = useState<any>({});
  const [isEmpty, setIsEmpty] = useState(true);
  const [account, setAccount] = useRecoilState(accountAtom);

  useEffect(() => {
    if (account.cta === '') return;
    axios
      .post('/vbesRest/getInventory', {
        request: {
          msg: {
            cte: account.cte,
            cta: account.cta,
            tcta: account.tcta,
            mes: 1,
          },
        },
      })
      .then((res) => {
        if (
          res.data?.response?.errorCode !== '0' ||
          res.data.response.msg.inventoryList.content.lenght === 0
        ) {
          setInventories([]);
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
          setInventories(res.data.response.msg.inventoryList.content);
        }
      });
  }, [account]);

  return (
    <Card>
      <Modal
        withPadding={false}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <Card withPadding={false}>
          <div className="flex flex-col ">
            <div className="px-6 py-4 bg-neutral-500">
              <Text type="subtitle" className="text-neutral-0">
                Detalle de consulta
              </Text>
            </div>

            <div className="grid grid-cols-2 px-6 py-4 bg-neutral-700">
              <div>
                <Text type="extra-small" className="text-neutral-500">
                  Valor nominal
                </Text>
                <Text type="large" className="text-secondary-500" bold>
                  {currency(currentInventory.valnom).format()}
                </Text>
              </div>
              <div>
                <Text type="extra-small" className="text-neutral-500">
                  Precio valor del mercado
                </Text>
                <Text type="large" className="text-semantic-success" bold>
                  {currency(currentInventory.valmer).format()}
                </Text>
              </div>
            </div>

            <div className="flex flex-col divide-y text-neutral-500 place-content-center">
              <div className="px-6 py-4">
                <Text type="small">Emisor</Text>
                <Text type="small" bold>
                  {currentInventory.nombreEmisor}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Serie</Text>
                <Text type="small" bold>
                  {currentInventory.serie}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Número ISIN</Text>
                <Text type="small" bold>
                  {currentInventory.codisi}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Emisión</Text>
                <Text type="small" bold>
                  {currentInventory.emision}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Número lámina inicial</Text>
                <Text type="small" bold>
                  {currentInventory.laminaI}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Número lámina final</Text>
                <Text type="small" bold>
                  {currentInventory.laminaF}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Moneda</Text>
                <Text type="small" bold>
                  {currentInventory.nommon}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Tasa de interés</Text>
                <Text type="small" bold>
                  {currentInventory.tasa}%
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Cantidad de acciones</Text>
                <Text type="small" bold>
                  {currentInventory.acciones}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Precio acción</Text>
                <Text type="small" bold>
                  {currency(currentInventory.precioAccion).format()}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Equivalente en dólares</Text>
                <Text type="small" bold>
                  {currency(currentInventory.saldoDolar).format()}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Fecha de vencimiento</Text>
                <Text type="small" bold>
                  {currentInventory.fecven
                    ? dayjs(currentInventory.fecven).format('DD [de] MMMM YYYY')
                    : '-'}
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </Modal>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2">
          <div className="flex gap-2">
            <div className="flex items-center">
              <span className="text-xs font-bold text-neutral-500">
                Consulta desde:
              </span>
            </div>
            <div className="flex items-center p-2 divide-x rounded-md outline-neutral-700 outline outline-1 text-neutral-500">
              <div className="px-3 py-1">
                <p className="text-xs ">Desde:</p>
                <p className="text-sm font-bold ">Noviembre 2020</p>
              </div>
              <div className="px-3 py-1">
                <p className="text-xs ">Desde:</p>
                <p className="text-sm font-bold ">Noviembre 2020</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm font-bold text-neutral-500">
              Resultados:{' '}
            </span>
            <span className="text-sm text-neutral-500">459 registros</span>
          </div>
        </div>

        <div className="relative ">
          <div className="z-50">
            <FormGroup>
              <FormInput {...register('search')}></FormInput>
            </FormGroup>
          </div>
          {/* <div className="absolute top-0 z-10 flex items-center justify-start w-full h-full">
          <span className="mt-1 ml-2 material-icons top-4">search</span>
        </div> */}
        </div>

        <div className="mx-3">
          <h4>Valores activos</h4>
        </div>

        <div className="flex flex-col divide-y">
          {isEmpty && (
            <div className="flex justify-center w-full">
              <EmptyState />
            </div>
          )}

          {!isEmpty &&
            inventories.map((inventory, index) => (
              <div
                className="grid grid-cols-2 p-3 cursor-pointer hover:bg-neutral-100"
                key={index}
                onClick={() => {
                  setIsOpenModal(true);
                  setCurrentInventory(inventory);
                }}
              >
                <div className="flex flex-col">
                  <p className="text-sm text-neutral-600">
                    #{inventory.emision}
                  </p>
                  <p className="text-base text-neutral-500">
                    {inventory.nombreEmisor}
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <div className="flex flex-col justify-center">
                    <p className="text-xs text-neutral-600">Valor nominal</p>
                    <p className="text-lg font-bold text-secondary-500">
                      {currency(inventory.valnom).format()}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button className="flex">
                      <div className="flex items-center justify-center">
                        <span className="w-5 h-5 material-icons text-neutral-500">
                          chevron_right
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}

          <div className="flex items-center justify-center gap-4 pt-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <button
                className="text-base font-bold text-neutral-500 hover:text-secondary-500"
                key={item}
              >
                <span>{item}</span>
              </button>
            ))}
            <button>
              <span>...</span>
            </button>
            <button className="text-base font-bold text-neutral-500 hover:text-secondary-500">
              <span>15</span>
            </button>
            <div className="flex items-center justify-center mb-1">
              <button className="flex text-base font-bold text-neutral-500 hover:text-secondary-500 ">
                <div className="flex items-center justify-center">
                  <span className="w-5 h-5 material-icons text-neutral-500">
                    chevron_right
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InventoryStockTab;
