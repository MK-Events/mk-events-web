import { Anchor, Stack, Text } from '@mantine/core';
import { LegalLayout, LegalSection } from '@mk/components';
import { useAppConfig } from '@mk/hooks';
import { usePageConfig } from '@mk/hooks/usePageConfig';

export function Contact() {
  const config = useAppConfig();
  const pageConfig = usePageConfig('contact');
  return (
    <LegalLayout title={pageConfig.hero.title} lastUpdated={pageConfig.lastUpdatedate}>
      <LegalSection title={pageConfig.sections.contact.title}>
        <Stack gap="xs">
          <Text>
            {`${pageConfig.sections.contact.emailLabel}: `}
            <Anchor href={config.social.links.find((link) => link.platform === 'gmail')?.url}>
              {config.global.supportEmail}
            </Anchor>
          </Text>

          <Text>
            {`${pageConfig.sections.contact.phoneLabel}: `}
            <Anchor
              target={'_blank'}
              href={config.social.links.find((link) => link.platform === 'whatsapp')?.url}
            >
              {config.global.supportContact}
            </Anchor>
          </Text>
        </Stack>
      </LegalSection>

      <LegalSection title={pageConfig.sections.businessHours.title}>
        {pageConfig.sections.businessHours.schedule}
        <br />
        {pageConfig.sections.businessHours.timing}
      </LegalSection>

      <LegalSection title={pageConfig.sections.responseTime.title}>
        {pageConfig.sections.responseTime.content}
      </LegalSection>
    </LegalLayout>
  );
}

export default Contact;
