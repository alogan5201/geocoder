// Material Kit 2 PRO React components
import Box from "components/Box";
// Material Kit 2 PRO React components
// Material Kit 2 PRO React components
// Material Kit 2 PRO React examples
import DefaultFooter from "examples/Footers/DefaultFooter";
// Coworking page sections
import BaseLayout from "layouts/sections/components/BaseLayout";
// Routes
import FormWrapper from "./components/FormWrapper";
import footerRoutes from "footer.routes";
import Form from "./components/Form";

function RoutePlannerPage() {
  return (
    <>
      <BaseLayout>
        <FormWrapper form={<Form addressToLatLng={true} />} />
        <Box pt={6} px={1} mt={6}>
          <DefaultFooter content={footerRoutes} />
        </Box>
      </BaseLayout>
    </>
  );
}
export default RoutePlannerPage;
