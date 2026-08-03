import { Accordion, Stack, Text, Title } from '@mantine/core';
import { type FAQ } from '@mk/types';

import styles from './Faq.module.scss';

interface FaqProps {
  faqs: FAQ[];
  title?: string;
}

export function Faq({ faqs, title }: FaqProps) {
  if (faqs.length === 0) return null;

  return (
    <Stack gap="xl">
      <Title order={2}>{title}</Title>

      <Accordion variant={'filled'} chevronPosition="right">
        {faqs.map(({ question, answer }) => (
          <Accordion.Item key={question} value={question}>
            <Accordion.Control className={styles.accordionControl}>
              <Text fw={600}>{question}</Text>
            </Accordion.Control>

            <Accordion.Panel>
              <Text c="dimmed" lh={1.7}>
                {answer}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Stack>
  );
}

export default Faq;
