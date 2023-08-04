import BaseLayout from "layouts/sections/components/BaseLayout";
import Form from "./components/Form";
import FormWrapper from "./components/FormWrapper";

function DemoPage() {
  return (
    <>
      <BaseLayout>
        <FormWrapper form={<Form addressToLatLng={true} />} />
      </BaseLayout>
    </>
  );
}
export default DemoPage;
