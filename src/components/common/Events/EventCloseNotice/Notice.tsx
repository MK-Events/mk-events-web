import { Group, Text, ThemeIcon, type MantineColor } from '@mantine/core';
import type { EventComponentUsage } from '@mk/types';
import type { TablerIcon } from '@tabler/icons-react';

interface NoticeProps {
  icon: TablerIcon;
  color: MantineColor;
  text: string;
  usage?: EventComponentUsage;
}

export function Notice({ icon: Icon, color, text, usage }: NoticeProps) {
  return (
    <Group
      justify={usage === 'FeaturedEvent' ? 'left' : 'center'}
      align="center"
      wrap="wrap"
      gap={6}
      mt="xs"
    >
      <ThemeIcon variant="transparent" color={color} size="sm">
        <Icon size={16} />
      </ThemeIcon>

      <Text size="xs" c={color} ta="center">
        {text}
      </Text>
    </Group>
  );
}

export default Notice;
