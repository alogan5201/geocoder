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

function BookmarksPage() {
  const formWrapperStyles = formStyles.mapForm.formWrapper;
  const formWrapperProps = {
    styles: formWrapperStyles,
    name: "Address to Latitude & Longitude",
    description:
      "To pinpoint a location, you can type in the name of a place, city, state, or address, or click the location on the map to get the coordinates.",
    map: true,
  };

  // formStyles.formWrapper
  const actionProps = {
    type: "internal",
    route: "/pages/landing-pages/coworking",
    color: "dark",
    label: "find more",
  };
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
export default BookmarksPage;
