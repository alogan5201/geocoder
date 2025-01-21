import BaseLayout from "layouts/sections/components/BaseLayout";
import Form from "./components/Form";
import FormWrapper from "./components/FormWrapper";

function JourneyInsightsPage() {
  return (
    <>
      <BaseLayout>
        <FormWrapper form={<Form />} />
      </BaseLayout>
    </>
  );
}
export default JourneyInsightsPage;
