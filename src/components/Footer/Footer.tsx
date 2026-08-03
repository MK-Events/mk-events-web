import { Container, Group, Text } from '@mantine/core';
import { MKEventsLogo, SocialLinks } from '@mk/components';
import { useAppConfig } from '@mk/hooks';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

export function Footer() {
  const config = useAppConfig();
  const groups = config.footer.links.map((group) => {
    const links = group.links.map((link, index) => (
      <Link to={link.link} key={index} className={styles.link}>
        {link.label}
      </Link>
    ));

    return (
      <div className={styles.wrapper} key={group.title}>
        <Text className={styles.title}>{group.title.toUpperCase()}</Text>
        <div className={styles.accent}></div>
        {links}
      </div>
    );
  });

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.logo}>
          <MKEventsLogo type="logo" theme={'dark'} />
        </div>
        <div className={styles.groups}>{groups}</div>
      </Container>

      <Container>
        <hr />
      </Container>

      <Container className={styles.afterFooter}>
        <Text c="dimmed" size="sm">
          {config.legal.copyright}
        </Text>

        <Group gap={0} className={styles.social} justify="flex-end" wrap="nowrap">
          <SocialLinks layout="horizontal" iconTheme="dark" />
        </Group>
      </Container>
    </footer>
  );
}
