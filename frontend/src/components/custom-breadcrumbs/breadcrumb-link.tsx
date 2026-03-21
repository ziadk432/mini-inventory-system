import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

import type { BreadcrumbLinkProps } from './types';

// ----------------------------------------------------------------------

type Props = {
  link: BreadcrumbLinkProps;
  activeLast?: boolean;
  disabled?: boolean;
};

export function BreadcrumbsLink({ link, activeLast, disabled }: Props) {
  const { name, href, icon } = link;

  const renderContent = (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        ...(disabled && { cursor: 'default' }),
        '& > svg': { width: 20, height: 20 },
      }}
    >
      {icon && (
        <Box component="span" sx={{ mr: 1, display: 'inherit' }}>
          {icon}
        </Box>
      )}
      {name}
    </Box>
  );

  if (href) {
    return (
      <Link
        component={RouterLink}
        href={href}
        variant="body2"
        color={disabled ? 'text.disabled' : 'text.primary'}
        sx={{
          lineHeight: 2,
          display: 'flex',
          alignItems: 'center',
          ...(disabled && { pointerEvents: 'none' }),
        }}
      >
        {renderContent}
      </Link>
    );
  }

  return (
    <Box
      component="span"
      sx={{
        display: 'flex',
        typography: 'body2',
        alignItems: 'center',
        color: 'text.disabled',
        lineHeight: 2,
      }}
    >
      {renderContent}
    </Box>
  );
}
