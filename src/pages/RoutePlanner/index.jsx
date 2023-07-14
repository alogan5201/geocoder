// Material Kit 2 PRO React components
// Material Kit 2 PRO React components
// Material Kit 2 PRO React components
// Material Kit 2 PRO React examples
// Coworking page sections
import BaseLayout from "layouts/sections/components/BaseLayout";
// Routes
import Form from "./components/Form";
import FormWrapper from "./components/FormWrapper";

function RoutePlannerPage() {
  return (
    <>
      <BaseLayout>
        <FormWrapper form={<Form addressToLatLng={true} />} />
     
      </BaseLayout>
    </>
  );
}
export default RoutePlannerPage;
