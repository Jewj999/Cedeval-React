import { Card, Modal, Text } from '@src/components';
import { axios } from '@src/libs';
import { FC, FunctionComponent, useEffect, useState } from 'react';

const BeneficiarySection: FC<{ account: any }> = ({ account }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentBeneficiary, setCurrentBeneficiary] = useState<any>({});

  useEffect(() => {
    axios
      .post('/vbesRest/getBeneficiaries', {
        request: {
          msg: {
            cte: '07',
            cta: '982',
            tcta: '03',
          },
        },
      })
      .then((res) => {
        if (res.data.response.errorCode !== '0') {
          setIsEmpty(true);
        } else {
          setBeneficiaries(res.data.response.msg.beneficiarios.content);
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
            <div className="p-3 bg-neutral-500">
              <Text type="subtitle" className="text-neutral-0">
                Beneficiarios de la cuenta
              </Text>
            </div>

            <div className="px-6 py-4 bg-secondary-500 text-neutral-0">
              <Text type="small">{currentBeneficiary.represen}</Text>
              <Text type="large" bold>
                {currentBeneficiary.nombre}
              </Text>
            </div>

            <div className="flex flex-col divide-y text-neutral-500 place-content-center">
              <div className="px-6 py-4">
                <Text type="extra-small">Tipo de documento</Text>
                <Text type="small" bold>
                  {currentBeneficiary.nombreDoc}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="extra-small">Número de identidad</Text>
                <Text type="small" bold>
                  {currentBeneficiary.noIdent}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="extra-small">Teléfono de contacto</Text>
                <Text type="small" bold>
                  {currentBeneficiary.telefono}
                </Text>
              </div>
              <div className="px-6 py-4">
                <Text type="extra-small">Dirección residencial</Text>
                <Text type="small" bold>
                  {currentBeneficiary.direccion}
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </Modal>
      <div className="flex flex-col -m-5 divide-y">
        <div className="p-4">
          <p className="text-base font-bold text-neutral-200">
            Beneficiarios de la cuenta
          </p>
          <p className="text-sm text-neutral-500">
            Consulta al: 19 de abril de 2021
          </p>
        </div>
        {beneficiaries.map((beneficiary, index) => (
          <div
            className="flex p-3 cursor-pointer"
            key={beneficiary.noIdent + index}
            onClick={() => {
              setIsOpenModal(true);
              setCurrentBeneficiary(beneficiary);
            }}
          >
            <div className="flex-auto ">
              <p className="text-sm text-neutral-500">{beneficiary.nombre}</p>
              <p className="text-xs text-neutral-600">{beneficiary.represen}</p>
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
        ))}
      </div>
    </Card>
  );
};

export default BeneficiarySection;
