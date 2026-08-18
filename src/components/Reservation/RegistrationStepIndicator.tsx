import { Container, Group, Paper, Stack, Text } from '@mantine/core';
import { useAppSelector } from '@mk/hooks';

import styles from './RegistrationStepIndicator.module.scss';

const STEPS = [
  {
    stage: 'CONTACT',
    label: 'Contact Details',
  },
  {
    stage: 'TICKETS',
    label: 'Select Tickets',
  },
  {
    stage: 'ATTENDEES',
    label: 'Attendee Details',
  },
  {
    stage: 'REVIEW',
    label: 'Review & Payment',
  },
] as const;

export function RegistrationStepIndicator() {
  const stage = useAppSelector((state) => state.reservation.reservationdata.reservation.stage);

  const currentIndex = STEPS.findIndex((step) => step.stage === stage);

  // If the reservation is not yet at one of the four form stages,
  // don't render the indicator.
  if (currentIndex === -1) {
    return null;
  }

  const currentStep = currentIndex + 1;
  const totalSteps = STEPS.length;
  const currentLabel = STEPS[currentIndex].label;

  return (
    <Container mb="md" p={0} className={styles.wrapper}>
      <Paper withBorder radius="md" p="md" className={styles.stepIndicator}>
        <Stack gap="xs">
          <Group justify="space-between" align="center">
            <Text size="xs" fw={700} className={styles.label}>
              {currentLabel}
            </Text>

            <Text size="xs" c="dimmed" fw={500}>
              Step {currentStep} of {totalSteps}
            </Text>
          </Group>

          <div className={styles.progress}>
            {STEPS.map((step, index) => (
              <div
                key={step.stage}
                className={`${styles.segment} ${index <= currentIndex ? styles.active : ''}`}
              />
            ))}
          </div>
        </Stack>
      </Paper>
    </Container>
  );
}

export default RegistrationStepIndicator;
