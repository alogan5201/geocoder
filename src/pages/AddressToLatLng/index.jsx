import { useEffect } from "react";
import Box from "components/Box";
import DefaultFooter from "examples/Footers/DefaultFooter";
import BaseLayout from "layouts/sections/components/BaseLayout";
import FormWrapper from "components/FormWrapper";
import footerRoutes from "footer.routes";
import { formStyles } from "src/styles";
import Form from "./components/Form";
import { useLocation } from "react-router-dom";
import useStore from "store/mapStore";

function AddressToLatLngPage() {
    const { pathname } = useLocation();

  return (
    <>
      <BaseLayout>
        <FormWrapper key={pathname} form={<Form addressToLatLng={true} />} />

   
      </BaseLayout>
    </>
  );
}
export default AddressToLatLngPage;
