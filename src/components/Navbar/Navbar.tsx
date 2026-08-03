import { Burger, Container, Divider, Drawer, Group, ScrollArea, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MKEventsLogo, SocialLinks } from '@mk/components';
import { useAppConfig } from '@mk/hooks';
import { Link, useLocation } from 'react-router-dom';

import styles from './Navbar.module.scss';

export function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();
  const config = useAppConfig();

  const items = config.navbar.links.map((link) => (
    <Link
      to={link.link}
      key={link.label}
      className={styles.link}
      data-active={location.pathname === link.link || undefined}
      onClick={() => close}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={styles.header}>
      <Container size="md" className={styles.inner}>
        <Link to={'/'} className={styles.navbarLogo}>
          <MKEventsLogo type="icon" theme="light" />
        </Link>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="xs"
          size="sm"
          aria-label="Toggle navigation"
        />
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title={config.navbar.drawerlabel}
        hiddenFrom="xs"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />
          {items}
          <Link to={'#'} className={styles.link}>
            <Text c="dimmed" size="sm">
              {config.legal.copyright}
            </Text>
          </Link>
          <SocialLinks />
        </ScrollArea>
      </Drawer>
    </header>
  );
}

export default Navbar;
