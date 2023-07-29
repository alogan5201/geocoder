

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// Avatars page components
import AvatarSize from "layouts/sections/elements/avatars/components/AvatarSize";

// Avatars page components code
import avatarSizeCode from "layouts/sections/elements/avatars/components/AvatarSize/code";

function Avatars() {
  return (
    <BaseLayout
      title="Avatars"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/elements/avatars" },
        { label: "Avatars" },
      ]}
    >
    
      <View title="Avatar Size" code={avatarSizeCode}>
        <AvatarSize />
      </View>
    </BaseLayout>
  );
}

export default Avatars;
