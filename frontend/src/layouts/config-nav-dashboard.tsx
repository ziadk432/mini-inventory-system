import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  product: icon('ic-product'),
  order: icon('ic-order'),
  dashboard: icon('ic-dashboard'),
};

// ----------------------------------------------------------------------

export const navData = [
  {
    subheader: 'Inventory',
    items: [
      {
        title: 'Products',
        path: paths.dashboard.products.root,
        icon: ICONS.product,
        
      },
      {
        title: 'Warehouses',
        path: paths.dashboard.warehouses.root,
        icon: ICONS.order,
         
      },
    ],
  },
];
