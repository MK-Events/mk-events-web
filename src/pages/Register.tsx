import {
  ErrorScreen,
  Loader,
  RegisterWrapper,
  RegistrationClosed,
  RegistrationComingSoon,
} from '@mk/components';
import { useGetEventRegistrationWindowQuery } from '@mk/store/api/events.api';
import { useParams } from 'react-router-dom';

export function Register() {
  const { slug } = useParams();
  const { data, isLoading, error, isFetching, refetch } = useGetEventRegistrationWindowQuery(
    slug as string,
    {
      skip: !slug,
    }
  );

  const opensAt = data?.registration?.opensAt;
  const closesAt = data?.registration?.closesAt;
  const now = Date.now();

  const opensAtMs = opensAt ? new Date(opensAt).getTime() : Number.NaN;
  const closesAtMs = closesAt ? new Date(closesAt).getTime() : Number.NaN;

  const isRegistrationOpen = Number.isFinite(opensAtMs) && now >= opensAtMs;
  const isRegistrationClosed = Number.isFinite(closesAtMs) && now > closesAtMs;

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (error) {
    return <ErrorScreen onRetry={refetch} />;
  }

  if (isRegistrationClosed) {
    return <RegistrationClosed />;
  }

  if (!isRegistrationOpen) {
    return <RegistrationComingSoon />;
  }

  return <RegisterWrapper />;
}
