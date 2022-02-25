import AccountSection from './AccountSection';
import BeneficiarySection from './BeneficiarySection';

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-4">
      <AccountSection></AccountSection>
      <BeneficiarySection></BeneficiarySection>
    </div>
  );
};

export default Sidebar;
