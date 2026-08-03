import { Group, List, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { usePageConfig } from '@mk/hooks/usePageConfig';
import type { RegistrationNotice } from '@mk/types';
import { IconInfoCircle } from '@tabler/icons-react';

interface TicketNoticeProps {
  notice: RegistrationNotice[];
}

export function TicketNotice({ notice }: TicketNoticeProps) {
  const config = usePageConfig('eventDetails');
  const noticeContent =
    notice.length > 1 ? (
      <List>
        {notice.map((notice: RegistrationNotice) => (
          <List.Item key={notice.message}>{notice.message}</List.Item>
        ))}
      </List>
    ) : (
      notice.map((notice: RegistrationNotice) => <Text>{notice.message}</Text>)
    );

  return (
    <Paper withBorder radius="md" my={'md'} p="md" bg="var(--mantine-primary-color-light)">
      <Group align="flex-start" wrap="nowrap">
        <ThemeIcon variant="light" color="blue" radius="xl">
          <IconInfoCircle size={18} />
        </ThemeIcon>

        <Stack gap={6}>
          <Text fw={600}>{config.misc.ticketNoticeLabel}</Text>

          {noticeContent}
        </Stack>
      </Group>
    </Paper>
  );
}

export default TicketNotice;
