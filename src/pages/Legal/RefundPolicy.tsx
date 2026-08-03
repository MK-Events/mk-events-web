import { Anchor, Text } from '@mantine/core';
import { LegalLayout, LegalSection } from '@mk/components';
import { useAppConfig, usePageConfig } from '@mk/hooks';

export function RefundPolicy() {
  const config = useAppConfig();
  const pageConfig = usePageConfig('refund');

  return (
    <LegalLayout title={pageConfig.title} lastUpdated={pageConfig.lastUpdated}>
      {pageConfig.sections.map((section) => (
        <LegalSection key={section.title} title={section.title}>
          <Text>
            {section.content.split('{{supportEmail}}').map((part, index, array) => (
              <>
                {part}
                {index < array.length - 1 && (
                  <Anchor href={config.social.links.find((link) => link.platform === 'gmail')?.url}>
                    {config.global.supportEmail}
                  </Anchor>
                )}
              </>
            ))}
          </Text>
        </LegalSection>
      ))}
    </LegalLayout>
  );
}

export default RefundPolicy;
