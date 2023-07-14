import { useEffect } from "react";
// Material Kit 2 PRO React components
import Box from "components/Box";
// Material Kit 2 PRO React components
// Material Kit 2 PRO React components
// Material Kit 2 PRO React examples
import DefaultFooter from "examples/Footers/DefaultFooter";
// Coworking page sections
import BaseLayout from "layouts/sections/components/BaseLayout";
// Routes
import FormWrapper from "components/FormWrapper";
import footerRoutes from "footer.routes";
import { formStyles } from "src/styles";
import Form from "./components/Form";
import { useLocation } from "react-router-dom";
import { getCurrentTime, formatMarkerData } from "util/helpers";
import useStore from "store/mapStore";

function HomePage() {
  const { pathname } = useLocation();
  const markerData = useStore((state) => state.markerData);

  return (
    <>
      <BaseLayout>
        <FormWrapper key={pathname} form={<Form addressToLatLng={true} />} />

  
      </BaseLayout>
    </>
  );
}
export default HomePage;
