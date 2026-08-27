import { useState } from 'react';

import { Button, Container, Group, Paper, Stack, Text } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconBrandWhatsapp as Whatsapp } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export interface SupportCtaConfig {
  title: string;
  description: string;
  buttonLabel: string;
  link: string;
  linkType?: string;
}

export interface SupportCtaProps {
  data: SupportCtaConfig;
  showIcon?: boolean;
  collapsed?: boolean;
}

export function SupportCta({ data, showIcon = false, collapsed = false }: SupportCtaProps) {
  const isExternalLink = data.linkType === 'external';
  const isWhatsApp = showIcon;
  const [expanded, setExpanded] = useState(!collapsed);

  const compactTitle = isWhatsApp && collapsed;

  if (collapsed && !expanded) {
    return (
      <Container mb="md" p={0} style={{ maxWidth: '900px' }}>
        <Paper withBorder radius="md" p="xs">
          <Button
            variant="subtle"
            fullWidth
            justify="space-between"
            onClick={() => setExpanded(true)}
            styles={{
              label: { justifyContent: 'space-between', width: '100%' },
              inner: { justifyContent: 'space-between', width: '100%' },
            }}
          >
            <Group gap="xs" wrap="nowrap">
              {isWhatsApp && <Whatsapp size={16} />}
              <Text fw={700} size="sm" style={{ whiteSpace: 'nowrap' }}>
                {data.title}
              </Text>
            </Group>

            <IconChevronDown size={16} />
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container mb="md" p={0} style={{ maxWidth: '900px' }}>
      <Paper
        withBorder
        radius="md"
        p="lg"
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(77, 123, 255, 0.08))',
        }}
      >
        <Stack gap="sm" align="center">
          {isWhatsApp ? (
            <Group gap="xs" align="center" wrap="nowrap">
              <Whatsapp size={22} />
              <Text
                fw={700}
                size={compactTitle ? 'sm' : 'lg'}
                ta="center"
                style={{ whiteSpace: compactTitle ? 'nowrap' : 'normal' }}
              >
                {data.title}
              </Text>
            </Group>
          ) : (
            <Text fw={700} size="lg" ta="center">
              {data.title}
            </Text>
          )}

          <Text size="sm" c="dimmed" ta="center">
            {data.description}
          </Text>

          {isExternalLink ? (
            <Button
              component="a"
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              leftSection={isWhatsApp ? <Whatsapp size={16} /> : undefined}
              variant="filled"
              size="md"
              radius="xl"
            >
              {data.buttonLabel}
            </Button>
          ) : (
            <Button
              component={Link}
              to={data.link}
              leftSection={isWhatsApp ? <Whatsapp size={16} /> : undefined}
              variant="filled"
              size="md"
              radius="xl"
            >
              {data.buttonLabel}
            </Button>
          )}

          {collapsed && (
            <Button
              variant="subtle"
              size="compact-xs"
              rightSection={<IconChevronUp size={14} />}
              onClick={() => setExpanded(false)}
            >
              Hide
            </Button>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}

export default SupportCta;
