import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ProductNewView } from 'src/sections/product/view/product-new-view';

// ----------------------------------------------------------------------

const metadata = { title: `Create Product | ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <ProductNewView />
    </>
  );
}
