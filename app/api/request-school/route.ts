import { NextResponse } from 'next/server';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeVQhMvBIIWguLY-I0M1cXyjgfcTb0MZWIx1JroLMvfVqk2Bg/formResponse';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      schoolName,
      state,
      schoolWebsite,
      fullName,
      role,
      email,
      phone,
      registryContact,
      additionalInfo,
      consent,
    } = body;

    // Validate required fields
    if (!schoolName || !state || !fullName || !role || !email || !consent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const formParams = new URLSearchParams();
    formParams.append('entry.220646691', schoolName);
    formParams.append('entry.870243288', state);
    formParams.append('entry.371766831', schoolWebsite || '');
    formParams.append('entry.1278262328', fullName);
    formParams.append('entry.1470283692', role);
    formParams.append('entry.707129898', email);
    formParams.append('entry.1686484113', phone || '');
    formParams.append('entry.1238604238', registryContact || '');
    formParams.append('entry.1853765212', additionalInfo || '');
    formParams.append('entry.534247411', 'I agree');

    // Submit to Google Form
    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formParams.toString(),
    });

    if (!response.ok && response.status !== 302 && response.status !== 200) {
      console.warn('Google form response status:', response.status);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error submitting to Google Forms:', err);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 },
    );
  }
}
