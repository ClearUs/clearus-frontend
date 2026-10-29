import { getInstitutionByCode } from '@/data/institution';
import BrandedLogin from '@/views/auth/branded-login';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ code: string }>;
}

export default async function AuthPage({ params }: Props) {
  const { code } = await params;
  const institution = getInstitutionByCode(code);

  if (!institution) {
    notFound();
  }

  return <BrandedLogin institution={institution} />;
}
