import { Text } from '@mantine/core';
import { LegalLayout, LegalSection } from '@mk/components';
import { usePageConfig } from '@mk/hooks';

export function Terms() {
  const pageConfig = usePageConfig('terms');

  return (
    <LegalLayout title={pageConfig.title} lastUpdated={pageConfig.lastUpdated}>
      {pageConfig.sections.map((section) => (
        <LegalSection key={section.title} title={section.title}>
          <Text>{section.content}</Text>
        </LegalSection>
      ))}
    </LegalLayout>
  );
}

export default Terms;
