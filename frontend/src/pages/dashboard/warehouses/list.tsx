import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { WarehouseListView } from 'src/sections/warehouse/view/warehouse-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Warehouses | ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <WarehouseListView />
    </>
  );
}
