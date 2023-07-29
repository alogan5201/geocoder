// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// ContactSections page components
import ContactUsOne from "layouts/sections/input-areas/contact-sections/components/ContactUsOne";
import ContactUsTwo from "layouts/sections/input-areas/contact-sections/components/ContactUsTwo";

// ContactSections page components code
import contactUsOneCode from "layouts/sections/input-areas/contact-sections/components/ContactUsOne/code";
import conatctUsTwoCode from "layouts/sections/input-areas/contact-sections/components/ContactUsTwo/code";

function ContactSections() {
  return (
    <BaseLayout
      title="Contact Sections"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/input-areas/contact-sections" },
        { label: "Contact Sections" },
      ]}
    >
      <View title="Contact Us 1" code={contactUsOneCode}>
        <ContactUsOne />
      </View>
      <View title="Contact Us 2" code={conatctUsTwoCode}>
        <ContactUsTwo />
      </View>
    </BaseLayout>
  );
}

export default ContactSections;
