import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { WarehouseNewView } from 'src/sections/warehouse/view/warehouse-new-view';

// ----------------------------------------------------------------------

const metadata = { title: `Create Warehouse | ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <WarehouseNewView />
    </>
  );
}
