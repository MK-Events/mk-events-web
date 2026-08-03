import { Skeleton } from '@mantine/core';

interface SectionLoaderProps {
  loading: boolean;
  height?: number;
  children: React.ReactNode;
}

export function SectionLoader({ loading, height = 300, children }: SectionLoaderProps) {
  if (loading) {
    return <Skeleton height={height} radius="md" />;
  }

  return children;
}
