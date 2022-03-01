import { Card, FormGroup, FormInput, Modal, Text } from '@src/components';
import { axios } from '@src/libs';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormValues {
  search: string;
}

const ValuesInventoryTab: FC<{ account: any }> = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [isOpenModal, setIsOpenModal] = useState(false);

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
                  $5,000,000.00
                </Text>
              </div>
              <div>
                <Text type="extra-small" className="text-neutral-500">
                  Precio valor del mercado
                </Text>
                <Text type="large" className="text-semantic-success" bold>
                  $500.00
                </Text>
              </div>
            </div>

            <div className="flex flex-col divide-y text-neutral-500 place-content-center">
              <div className="px-6 py-4">
                <Text type="small">Emisor</Text>
                <Text type="small" bold>
                  Central de Depósito de Valores de El Salvador
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Serie</Text>
                <Text type="small" bold>
                  84394
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Fecha de vencimiento</Text>
                <Text type="small" bold>
                  26 de diciembre 2021
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Moneda</Text>
                <Text type="small" bold>
                  Dólar
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Tasa de interés</Text>
                <Text type="small" bold>
                  3,4%
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

        <div className="flex flex-col divide-y">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div
              className="grid grid-cols-2 p-3 cursor-pointer hover:bg-neutral-100"
              key={item}
              onClick={() => setIsOpenModal(true)}
            >
              <div className="flex flex-col">
                <p className="text-sm text-neutral-600">#84393</p>
                <p className="text-base text-neutral-500">
                  Central de Depósito de Valores de El Salvador de Centroamérica
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <div className="flex flex-col justify-center">
                  <p className="text-xs text-neutral-600">Valor nominal</p>
                  <p className="text-lg font-bold text-secondary-500">
                    $5,000,000,000.00
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

export default ValuesInventoryTab;
