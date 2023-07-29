
// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// Dropdowns page components
import DropdownAndDropup from "layouts/sections/elements/dropdowns/components/DropdownAndDropup";
import SelectPicker from "layouts/sections/elements/dropdowns/components/SelectPicker";

// Dropdowns page components code
import dropdownAndDropupCode from "layouts/sections/elements/dropdowns/components/DropdownAndDropup/code";
import selectPickerCode from "layouts/sections/elements/dropdowns/components/SelectPicker/code";

function Dropdowns() {
  return (
    <BaseLayout
      title="Dropdowns"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/elements/dropdowns" },
        { label: "Dropdowns" },
      ]}
    >
      <View title="Dropdown and Dropup" code={dropdownAndDropupCode}>
        <DropdownAndDropup />
      </View>
      <View title="Selectpicker" height="24rem" code={selectPickerCode}>
        <SelectPicker />
      </View>
    </BaseLayout>
  );
}

export default Dropdowns;
