import { Card, FormGroup, FormInput, Modal, Text } from '@src/components';
import { axios, currency, dayjs } from '@src/libs';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormValues {
  search: string;
}

const CuponExpirationTab: FC<{ account: any }> = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [couponsAccount, setCouponsAccount] = useState<any[]>([]);
  const [currentCoupon, setCurrentCoupon] = useState<any>({});

  useEffect(() => {
    axios
      .post('/vbesRest/getCouponsAccoun', {
        request: {
          msg: {
            cte: '1202',
          },
        },
      })
      .then((res) => {
        setCouponsAccount(res.data.response.msg.cupones.content);
      });
  }, []);
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
                  {currency(currentCoupon.valorFacial).format()}
                </Text>
              </div>
              <div>
                <Text type="extra-small" className="text-neutral-500">
                  Precio valor del mercado
                </Text>
                <Text type="large" className="text-semantic-success" bold>
                  {currency(currentCoupon.valMercdo).format()}
                </Text>
              </div>
            </div>

            <div className="flex flex-col divide-y text-neutral-500 place-content-center">
              <div className="px-6 py-4">
                <Text type="small">Emisor</Text>
                <Text type="small" bold>
                  {currentCoupon.emisor}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Emisión</Text>
                <Text type="small" bold>
                  {currentCoupon.emision}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Moneda</Text>
                <Text type="small" bold>
                  {currentCoupon.nomMoneda}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Fecha de vencimiento</Text>
                <Text type="small" bold>
                  {dayjs(currentCoupon.fvence).format('DD [de] MMMM YYYY')}
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
          {couponsAccount.map((coupon) => (
            <div
              className="grid grid-cols-2 p-3 cursor-pointer hover:bg-neutral-100"
              key={coupon.vwcIdinven}
              onClick={() => {
                setIsOpenModal(true);
                setCurrentCoupon(coupon);
              }}
            >
              <div className="flex flex-col">
                <p className="text-sm text-neutral-600">#{coupon.emisor}</p>
                <p className="text-base text-neutral-500">{coupon.emision}</p>
              </div>
              <div className="flex justify-end gap-2">
                <div className="flex flex-col justify-center">
                  <p className="text-xs text-neutral-600">Valor nominal</p>
                  <p className="text-lg font-bold text-secondary-500">
                    {currency(coupon.valorFacial).format()}
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

export default CuponExpirationTab;
