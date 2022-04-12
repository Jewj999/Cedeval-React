import { userAtom } from '@src/atoms/user';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import AccountSection from './AccountSection';
import BeneficiarySection from './BeneficiarySection';

const Sidebar: FC<{ account: any }> = ({ account }) => {
  return (
    <div className="flex flex-col gap-4">
      <AccountSection account={account}></AccountSection>
      <BeneficiarySection account={account}></BeneficiarySection>
    </div>
  );
};

export default Sidebar;
