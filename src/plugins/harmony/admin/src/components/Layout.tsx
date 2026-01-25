import React, { FC, PropsWithChildren, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useLocation, Outlet, NavLink } from 'react-router-dom';
import { Box, Flex, Typography, Tooltip } from '@strapi/design-system';
import { getTranslation } from '../utils/getTranslation';

const SidebarLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
  <Box
    as={NavLink}
    to={to}
    padding={2}
    style={{
      display: 'block',
      textDecoration: 'none',
      borderRadius: 8,
      background: active ? 'var(--ds-neutral100)' : 'transparent',
      fontWeight: active ? 600 : 400,
    }}
  >
    <Typography variant="omega">{children}</Typography>
  </Box>
);

function Layout() {
  const { pathname } = useLocation();
  const { formatMessage } = useIntl();

  const links = useMemo(
    () => [
      { id: 0, label: 'Resumen', href: './overview' },
      { id: 1, label: 'Ventas', href: './sales' },
      { id: 2, label: 'Vender', href: './create-sales' },
      { id: 3, label: 'Devoluciones', href: './returns' },
    ],
    []
  );

  return (
    <Box as="main">
      tets
      <Tooltip.Provider>
        <Flex>
          <Box padding={4} background="neutral100" minWidth="250px" height="100vh">
            <Typography variant="pi" textColor="neutral600">
              {formatMessage({ id: getTranslation('plugin.name'), defaultMessage: 'Gestión de Ventas' })}
            </Typography>

            <Box paddingTop={3} paddingBottom={2}>
              {links.map((l) => (
                <SidebarLink key={l.id} to={l.href} active={pathname === l.href}>
                  {l.label}
                </SidebarLink>
              ))}
            </Box>
          </Box>

          <Box style={{ alignSelf: 'flex-start', flex: '1 1 auto', minHeight: '100dvh' }} paddingRight={4}>
            <Outlet />
          </Box>
        </Flex>
      </Tooltip.Provider>

      <Outlet />
    </Box>
  );
};

export default Layout;
