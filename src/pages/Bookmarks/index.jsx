import BaseLayout from "layouts/sections/components/BaseLayout";
import FormWrapper from "components/FormWrapper";
import Form from "./components/Form";
function BookmarksPage() {
  return (
    <>
      <BaseLayout>
        <FormWrapper form={<Form />} />
      </BaseLayout>
    </>
  );
}
export default BookmarksPage;
