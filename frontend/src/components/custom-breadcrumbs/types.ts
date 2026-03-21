import type { Theme, SxProps } from '@mui/material/styles';
import type { BreadcrumbsProps } from '@mui/material/Breadcrumbs';

export type BreadcrumbLinkProps = {
  name?: string;
  href?: string;
  icon?: React.ReactElement;
  disabled?: boolean;
};

export type CustomBreadcrumbsProps = BreadcrumbsProps & {
  heading?: string;
  moreLink?: string[];
  activeLast?: boolean;
  action?: React.ReactNode;
  links: BreadcrumbLinkProps[];
  slotProps?: {
    action?: SxProps<Theme>;
    heading?: SxProps<Theme>;
    moreLink?: SxProps<Theme>;
    breadcrumbs?: SxProps<Theme>;
  };
};
