
import { Card, Modal, Text } from '@src/components'
import { FunctionComponent, useState } from 'react'

const BeneficiarySection: FunctionComponent<{}> = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)

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
              <Text type="small">Titular de cuenta</Text>
              <Text type="large" bold>
                Juan Carlos Landaverde Pineda
              </Text>
            </div>

            <div className="flex flex-col divide-y text-neutral-500 place-content-center">
              <div className="px-6 py-4">
                <Text type="extra-small">Tipo de documento</Text>
                <Text type="small" bold>
                  Documento Único de Identidad
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="extra-small">Número de identidad</Text>
                <Text type="small" bold>
                  73939373-9
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="extra-small">Teléfono de contacto</Text>
                <Text type="small" bold>
                  7839-3839
                </Text>
              </div>
              <div className="px-6 py-4">
                <Text type="extra-small">Dirección residencial</Text>
                <Text type="small" bold>
                  Calle San Martí, #30, Colonia Escalón, San Salvador, El
                  Salvador
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
        {[1, 2, 3, 4].map((number) => (
          <div
            className="flex p-3 cursor-pointer"
            key={number}
            onClick={() => setIsOpenModal(true)}
          >
            <div className="flex-auto ">
              <p className="text-sm text-neutral-500">
                Juan Carlos Landaverde Pineda
              </p>
              <p className="text-xs text-neutral-600">Titular de la cuenta</p>
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
  )
}

export default BeneficiarySection
