

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// SocialButtons page components
import SocialButtonsSection from "layouts/sections/elements/social-buttons/components/SocialButtons";
import SocialButtonsIcon from "layouts/sections/elements/social-buttons/components/SocialButtonsIcon";

// SocialButtons page components code
import socialButtonsSectionCode from "layouts/sections/elements/social-buttons/components/SocialButtons/code";
import socialButtonsIconCode from "layouts/sections/elements/social-buttons/components/SocialButtonsIcon/code";

function SocialButtons() {
  return (
    <BaseLayout
      title="Social Buttons"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/elements/social-buttons" },
        { label: "Social Buttons" },
      ]}
    >
      <View title="Social buttons" code={socialButtonsSectionCode}>
        <SocialButtonsSection />
      </View>
      <View title="Social buttons icon only" code={socialButtonsIconCode}>
        <SocialButtonsIcon />
      </View>
    </BaseLayout>
  );
}

export default SocialButtons;
