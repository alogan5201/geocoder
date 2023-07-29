

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// ProgressBars page components
import ProgressSimple from "layouts/sections/elements/progress-bars/components/ProgressSimple";
import ProgressGradient from "layouts/sections/elements/progress-bars/components/ProgressGradient";
import Sliders from "layouts/sections/elements/progress-bars/components/Sliders";

// ProgressBars page components code
import progressSimpleCode from "layouts/sections/elements/progress-bars/components/ProgressSimple/code";
import progressGradientCode from "layouts/sections/elements/progress-bars/components/ProgressGradient/code";
import slidersCode from "layouts/sections/elements/progress-bars/components/Sliders/code";

function ProgressBars() {
  return (
    <BaseLayout
      title="Progress Bars"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/elements/progress-bars" },
        { label: "Progress Bars" },
      ]}
    >
      <View title="Progress bar simple" code={progressSimpleCode}>
        <ProgressSimple />
      </View>
      <View title="Progress bar gradient" code={progressGradientCode}>
        <ProgressGradient />
      </View>
      <View title="Sliders" code={slidersCode}>
        <Sliders />
      </View>
    </BaseLayout>
  );
}

export default ProgressBars;
