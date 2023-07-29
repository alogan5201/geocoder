// Coworking page sections
import BaseLayout from 'layouts/sections/components/BaseLayout';
// Routes
import FormWrapper from 'components/FormWrapper';
import { useLocation } from 'react-router-dom';
import Form from './components/Form';

function LatLngToAddressPage() {
  const { pathname } = useLocation();
  return (
    <>
      <BaseLayout>
        <FormWrapper key={pathname} form={<Form addressToLatLng={true} />} />
      </BaseLayout>
    </>
  );
}
export default LatLngToAddressPage;
