import { useEffect, useState } from 'react';

import {
  Button,
  Card,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { usePageConfig } from '@mk/hooks';
import { type PartialContact } from '@mk/types';
import { IconArrowLeft, IconAt, IconPhone, IconUser } from '@tabler/icons-react';

import styles from './ContactStep.module.scss';

interface ContactStepProps {
  contactData?: Partial<PartialContact> | null;
  onContinue: (value: PartialContact) => void;
  onBack: () => void;
  onSave: (value: PartialContact) => void;
  loading?: boolean;
}

const defaultContact: PartialContact = {
  name: '',
  age: 0,
  gender: 'Male',
  phone: '',
  email: '',
};

export function ContactStep({
  contactData,
  onContinue,
  onBack,
  onSave,
  loading = false,
}: ContactStepProps) {
  const {
    sections: { contactStep },
  } = usePageConfig('registration');
  const genderOptions = contactStep.genderOptions;
  const countryCodeOptions = contactStep.countryCodeOptions;
  const [contact, setContact] = useState<PartialContact>({
    ...defaultContact,
    ...contactData,
  });
  const [countryCode, setCountryCode] = useState<string>('+91');

  const formatPhoneValue = (code: string, local: string) => {
    const sanitizedCode = code.startsWith('+') ? code : `+${code}`;
    const sanitizedLocal = local.replace(/\D/g, '');

    return sanitizedLocal ? `${sanitizedCode}-${sanitizedLocal}` : sanitizedCode;
  };

  const getPhoneParts = (value: string | undefined, fallbackCode = '+91') => {
    if (!value) {
      return { countryCode: fallbackCode, local: '' };
    }

    const hyphenSplit = value.split('-');
    if (hyphenSplit.length > 1) {
      const possibleCode = hyphenSplit[0]?.trim() || fallbackCode;
      const possibleLocal = hyphenSplit.slice(1).join('').replace(/\D/g, '');

      return {
        countryCode: possibleCode.startsWith('+') ? possibleCode : `+${possibleCode}`,
        local: possibleLocal,
      };
    }

    const digits = value.replace(/\D/g, '');

    if (!digits) {
      return { countryCode: fallbackCode, local: '' };
    }

    const explicitMatch = value.match(/^\+(\d{1,3})/);
    if (explicitMatch) {
      const detectedCode = `+${explicitMatch[1]}`;
      const detectedCodeDigits = detectedCode.replace(/\D/g, '');

      if (digits.startsWith(detectedCodeDigits)) {
        return {
          countryCode: detectedCode,
          local: digits.slice(detectedCodeDigits.length),
        };
      }
    }

    const preferredCodes = ['+91', '+971', '+1', '+44'];
    for (const preferredCode of preferredCodes) {
      const preferredCodeDigits = preferredCode.replace(/\D/g, '');

      if (digits.startsWith(preferredCodeDigits)) {
        return {
          countryCode: preferredCode,
          local: digits.slice(preferredCodeDigits.length),
        };
      }
    }

    return { countryCode: fallbackCode, local: digits };
  };

  useEffect(() => {
    const nextContact = {
      ...defaultContact,
      ...contactData,
    };

    setContact(nextContact);

    if (!nextContact.phone) {
      setCountryCode('+91');
      return;
    }

    const parsedPhone = getPhoneParts(nextContact.phone);

    setCountryCode(parsedPhone.countryCode);
    setContact({
      ...nextContact,
      phone: formatPhoneValue(parsedPhone.countryCode, parsedPhone.local),
    });
  }, [contactData]);

  const updateReservationContact = <K extends keyof PartialContact>(
    field: K,
    value: PartialContact[K]
  ) => {
    setContact((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const parsedPhone = getPhoneParts(contact.phone, countryCode);
  const localPhoneNumber = parsedPhone.local;

  const handleCountryCodeChange = (nextCode: string | null) => {
    const selectedCode = nextCode ?? '+91';
    const currentLocalNumber = getPhoneParts(contact.phone, countryCode).local;

    setCountryCode(selectedCode);
    updateReservationContact('phone', formatPhoneValue(selectedCode, currentLocalNumber));
  };

  const sanitizeContactPayload = (value: PartialContact): PartialContact => ({
    name: value.name,
    age: value.age,
    gender: value.gender,
    phone: value.phone,
    email: value.email,
  });

  const hasValidContactData =
    contact.name.trim().length > 0 &&
    contact.phone.trim().length > 0 &&
    contact.email.trim().length > 0;

  return (
    <div className={styles.wrapper}>
      <Card withBorder radius="xl" className={styles.card}>
        <Stack gap="xl">
          <Stack gap={4}>
            <section className={styles.backButton}>
              <Button
                variant="subtle"
                color="gray"
                leftSection={<IconArrowLeft size={17} />}
                onClick={onBack}
                disabled={loading}
              >
                {contactStep.backLabel}
              </Button>
            </section>
            <Title order={2}>{contactStep.title}</Title>

            <Text size="sm" c="dimmed">
              {contactStep.description}
            </Text>
          </Stack>

          <Stack gap="md">
            <TextInput
              label={contactStep.fullNameLabel}
              placeholder={contactStep.fullNamePlaceholder}
              leftSection={<IconUser size={18} />}
              required
              value={contact.name}
              autoComplete="name"
              onChange={(event) => updateReservationContact('name', event.currentTarget.value)}
            />

            <Group grow align="flex-start">
              <NumberInput
                label={contactStep.ageLabel}
                placeholder={contactStep.agePlaceholder}
                min={1}
                max={120}
                value={contact.age}
                onChange={(value) => updateReservationContact('age', Number(value ?? 0))}
              />

              <Select
                label={contactStep.genderLabel}
                placeholder={contactStep.genderPlaceholder}
                data={genderOptions}
                value={contact.gender}
                searchable
                nothingFoundMessage={contactStep.genderNotFoundMessage}
                onChange={(value) =>
                  updateReservationContact('gender', (value ?? 'Male') as PartialContact['gender'])
                }
                clearable
              />
            </Group>

            <Group gap="xs" align="flex-start">
              <Select
                label={contactStep.codeLabel}
                data={countryCodeOptions}
                value={countryCode}
                w={100}
                onChange={(value) => handleCountryCodeChange(value)}
              />

              <TextInput
                label={contactStep.phoneLabel}
                placeholder={contactStep.phonePlaceholder}
                leftSection={<IconPhone size={18} />}
                required
                type="tel"
                autoComplete="tel"
                style={{ flex: 1 }}
                value={localPhoneNumber}
                onChange={(event) => {
                  const phone = event.currentTarget.value.replace(/\D/g, '');
                  updateReservationContact('phone', formatPhoneValue(countryCode, phone));
                }}
              />
            </Group>

            <TextInput
              label={contactStep.emailLabel}
              placeholder={contactStep.emailPlaceholder}
              leftSection={<IconAt size={18} />}
              required
              type="email"
              autoComplete="email"
              value={contact.email}
              onChange={(event) => updateReservationContact('email', event.currentTarget.value)}
            />
          </Stack>

          <div className={styles.footer}>
            <Button
              variant={'light'}
              onClick={() => onSave(sanitizeContactPayload(contact))}
              disabled={loading || !hasValidContactData}
            >
              {contactStep.saveLabel}
            </Button>

            <Button
              loading={loading}
              disabled={loading || !hasValidContactData}
              onClick={() => onContinue(sanitizeContactPayload(contact))}
            >
              {contactStep.continueLabel}
            </Button>
          </div>
        </Stack>
      </Card>
    </div>
  );
}

export default ContactStep;
