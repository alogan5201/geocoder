// Material Kit 2 PRO React components
// Material Kit 2 PRO React components
// Material Kit 2 PRO React components
// Material Kit 2 PRO React examples
// Coworking page sections
import BaseLayout from "layouts/sections/components/BaseLayout";
// Routes
import FormWrapper from "components/FormWrapper";
import { useLocation } from "react-router-dom";
import useStore from "store/mapStore";
import Form from "./components/Form";

function HomePage() {
  const { pathname } = useLocation();

  return (
    <>
      <BaseLayout>
        <FormWrapper key={pathname} form={<Form addressToLatLng={true} />} />

  
      </BaseLayout>
    </>
  );
}
export default HomePage;
