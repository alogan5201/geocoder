/*
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import Box from 'components/Box';

// Sections components
import BaseLayout from 'layouts/sections/components/BaseLayout';
import View from 'layouts/sections/components/View';

// Stats page components
import TabsSimple from 'layouts/sections/navigation/nav-tabs/components/TabsSimple';
import TabsWithIcons from 'layouts/sections/navigation/nav-tabs/components/TabsWithIcons';
import TabsVertical from 'layouts/sections/navigation/nav-tabs/components/TabsVertical';

// Stats page components code
import tabsSimpleCode from 'layouts/sections/navigation/nav-tabs/components/TabsSimple/code';
import tabsWithIconsCode from 'layouts/sections/navigation/nav-tabs/components/TabsWithIcons/code';
import tabsVerticalCode from 'layouts/sections/navigation/nav-tabs/components/TabsVertical/code';

function NavTabs() {
  return (
    <BaseLayout
      title="Nav Tabs"
      breadcrumb={[{ label: 'Page Sections', route: '/sections/navigation/nav-tabs' }, { label: 'Nav Tabs' }]}
    >
      <View title="Tabs simple" code={tabsSimpleCode}>
        <Box bgColor="white" py={6}>
          <TabsSimple />
        </Box>
      </View>
      <View title="Tabs with icon" code={tabsWithIconsCode}>
        <Box bgColor="white" py={6}>
          <TabsWithIcons />
        </Box>
      </View>
      <View title="Tabs vertical" code={tabsVerticalCode}>
        <Box bgColor="white" py={6}>
          <TabsVertical />
        </Box>
      </View>
    </BaseLayout>
  );
}

export default NavTabs;
