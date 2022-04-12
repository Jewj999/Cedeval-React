import { accountAtom } from '@src/atoms/account';
import { Card, FormGroup, FormInput, Modal, Text } from '@src/components';
import { EmptyState } from '@src/components/ui/EmptyState';
import AccountContext from '@src/context/AccountContext';
import { useAccount } from '@src/hooks/account';
import { axios, currency, dayjs } from '@src/libs';
import { FC, FunctionComponent, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

interface FormValues {
  search: string;
}
const AccountStatusTab: FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [currentTransaction, setCurrentTransaction] = useState<any>({});
  const [isEmpty, setIsEmpty] = useState(true);
  const [account, setAccount] = useRecoilState(accountAtom);

  useEffect(() => {
    if (account.cta === '') return;
    axios
      .post('/vbesRest/getAccountSummary', {
        request: {
          msg: {
            cte: account.cte,
            cta: account.cta,
            tcta: account.tcta,
            mes: 0,
          },
        },
      })
      .then((res) => {
        if (
          res.data?.response?.errorCode !== '0' ||
          res.data.response.msg.cuentas.content.lenght === 0
        ) {
          setTransactions([]);
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
          setTransactions(res.data.response.msg.cuentas.content);
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
                Detalle de estado
              </Text>
            </div>

            <div
              className={`px-6 py-4 text-neutral-0 ${
                currentTransaction.operacion === 'Deposito'
                  ? 'bg-semantic-success'
                  : 'bg-semantic-error'
              }`}
            >
              <div>
                <Text type="small">
                  {currentTransaction.operacion === 'Deposito'
                    ? 'Depósito'
                    : 'Retiro'}
                </Text>
                <Text type="large" bold>
                  {currency(currentTransaction.monto).format()}
                </Text>
              </div>
            </div>

            <div className="flex flex-col divide-y text-neutral-500 place-content-center">
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Emisión</Text>
                <Text type="small" bold>
                  {currentTransaction.emision}
                </Text>
              </div>
              <div className="px-6 py-4">
                <Text type="small">Título</Text>
                <Text type="small" bold>
                  {currentTransaction.titulo}
                </Text>
              </div>
              <div className="px-6 py-4 ">
                <Text type="small">Emisor</Text>
                <Text type="small" bold>
                  {currentTransaction.emisor}
                </Text>
              </div>
              <div className="px-6 py-4 ">
                <Text type="small">Descripción de administración</Text>
                <Text type="small" bold>
                  {currentTransaction.descripcionOp}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Fecha de vencimiento</Text>
                <Text type="small" bold>
                  {currentTransaction.fvencimiento
                    ? dayjs(currentTransaction.fvencimiento).format(
                        'DD [de] MMMM YYYY'
                      )
                    : 'N/A'}
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
          {isEmpty && (
            <div className="flex justify-center w-full">
              <EmptyState />
            </div>
          )}
          {!isEmpty &&
            transactions.map((transaction) => (
              <div
                className="grid grid-cols-3 p-3 cursor-pointer hover:bg-neutral-100"
                key={`${transaction.titulo}-${transaction.folio}`}
                onClick={() => {
                  setCurrentTransaction(transaction);
                  setIsOpenModal(true);
                }}
              >
                <div className="flex gap-6">
                  <div className="flex items-center justify-center mb-1">
                    {transaction.operacion === 'Deposito' ? (
                      <span className="w-5 h-5 material-icons text-semantic-success">
                        north_east
                      </span>
                    ) : (
                      <span className="w-5 h-5 material-icons text-semantic-error">
                        south_west
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <p className="text-base text-neutral-500">
                      {transaction.operacion === 'Deposito'
                        ? 'Depósito'
                        : 'Retiro'}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {dayjs(transaction.fecha).format('DD [de] MMMM YYYY')}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end col-start-3 gap-10">
                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-neutral-600">Valor nominal</p>
                    <p
                      className={`text-lg font-bold ${
                        transaction.operacion === 'Deposito'
                          ? 'text-semantic-success'
                          : 'text-semantic-error'
                      }`}
                    >
                      {currency(transaction.monto).format()}
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

export default AccountStatusTab;
