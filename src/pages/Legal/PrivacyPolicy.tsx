import { Anchor, Text } from '@mantine/core';
import { LegalLayout, LegalSection } from '@mk/components';
import { useAppConfig } from '@mk/hooks';
import { usePageConfig } from '@mk/hooks/usePageConfig';
import { Fragment } from 'react/jsx-runtime';

export function PrivacyPolicy() {
  const config = useAppConfig();
  const pageConfig = usePageConfig('privacy');
  return (
    <LegalLayout title={pageConfig.title} lastUpdated={pageConfig.lastUpdated}>
      {pageConfig.sections.map((section) => (
        <LegalSection key={section.title} title={section.title}>
          <Text>
            {section.content.split('{{supportEmail}}').map((part, index, array) => (
              <Fragment key={index}>
                {part}
                {index < array.length - 1 && (
                  <Anchor href={config.social.links.find((link) => link.platform === 'gmail')?.url}>
                    {config.global.supportEmail}
                  </Anchor>
                )}
              </Fragment>
            ))}
          </Text>
        </LegalSection>
      ))}
    </LegalLayout>
  );
}

export default PrivacyPolicy;
