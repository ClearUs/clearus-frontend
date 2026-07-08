import { getInstitutionByCode } from '@/data/institution';
import BrandedLogin from '@/views/auth/branded-login'
import { notFound } from 'next/navigation';
import React from 'react'



interface Props {
    params: Promise<{
        code: string;
    }>;
}

async function AuthPage({ params }: Props) {

    const { code } = await params;

    const institution = getInstitutionByCode(code);

    if (!institution) {
        notFound();
    }

    return (
        <div className='className="flex-1 flex flex-col-reverse md:flex-row min-h-150 font-sans"'>

        <BrandedLogin institution={institution} />
        </div>

    );

}

export default AuthPage