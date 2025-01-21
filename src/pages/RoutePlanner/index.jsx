import BaseLayout from "layouts/sections/components/BaseLayout";
import Form from "./components/Form";
import FormWrapper from "./components/FormWrapper";

function RoutePlannerPage() {
  return (
    <>
      <BaseLayout>
        <FormWrapper form={<Form />} />
      </BaseLayout>
    </>
  );
}
export default RoutePlannerPage;
