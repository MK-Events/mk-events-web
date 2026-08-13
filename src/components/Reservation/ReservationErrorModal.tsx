import { Alert, Button, Modal, Stack, Text } from '@mantine/core';
import { usePageConfig } from '@mk/hooks';
import type { ReservationErrorData } from '@mk/types/Reservation.type';
import { IconAlertCircle } from '@tabler/icons-react';

import styles from './ReservationErrorModal.module.scss';

export interface ReservationErrorState {
  data?: ReservationErrorData;
  loading: boolean;
}

interface ReservationErrorModalProps {
  error: ReservationErrorState | null;
  onClose: () => void;
  retryLoading?: boolean;
  retry?: () => void | Promise<void>;
}

export function ReservationErrorModal({
  error,
  onClose,
  retryLoading = false,
  retry,
}: ReservationErrorModalProps) {
  const config = usePageConfig('registration');
  if (!error) {
    return null;
  }

  const fallbackErrorData: ReservationErrorData = {
    error: config.sections.errorModal.unknownErrorTitle,
    message: [config.sections.errorModal.message],
    statusCode: config.sections.errorModal.statusCode,
  };

  const data = error.data ?? fallbackErrorData;
  const { error: errorType, message, statusCode } = data;

  const handleRetry = async () => {
    if (!retry) {
      return;
    }

    await retry();
  };

  return (
    <Modal
      opened={Boolean(message)}
      onClose={onClose}
      centered
      radius="lg"
      title={config.sections.errorModal.title}
    >
      <Stack gap="md">
        <Alert
          color="red"
          variant="light"
          icon={<IconAlertCircle size={20} />}
          title={`${errorType} (${statusCode})`}
        >
          <Stack gap={4}>
            {Array.isArray(message) ? (
              message.map((item, index) => (
                <Text key={index} size="sm">
                  {item}
                </Text>
              ))
            ) : (
              <Text key={message} size="sm">
                {message}
              </Text>
            )}
          </Stack>
        </Alert>

        <div className={styles.actions}>
          <Button variant="default" onClick={onClose} disabled={retryLoading}>
            {config.common.closeButtonLabel}
          </Button>

          {retry && (
            <Button loading={retryLoading} onClick={handleRetry}>
              {config.common.retryButtonLabel}
            </Button>
          )}
        </div>
      </Stack>
    </Modal>
  );
}

export default ReservationErrorModal;
