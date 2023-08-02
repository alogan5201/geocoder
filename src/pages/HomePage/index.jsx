 // Homepage.jsx
import FormWrapper from "components/FormWrapper";
import BaseLayout from "layouts/sections/components/BaseLayout";
import { useLocation } from "react-router-dom";
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
