'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function ClearUsLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="12" fill="url(#req_clearus_linear)" />
      <path
        d="M29.15 18.1514V23.6514M14.4834 20.4431V23.6514C14.4834 25.2098 16.9584 26.4014 19.9834 26.4014C23.0084 26.4014 25.4834 25.2098 25.4834 23.6514V20.4431M11.3667 17.3264L19.25 13.7514C19.4813 13.6505 19.731 13.5984 19.9834 13.5984C20.2358 13.5984 20.4854 13.6505 20.7167 13.7514L28.6 17.3264C28.755 17.4015 28.8857 17.5187 28.9772 17.6646C29.0686 17.8105 29.1171 17.9792 29.1171 18.1514C29.1171 18.3236 29.0686 18.4924 28.9772 18.6383C28.8857 18.7842 28.755 18.9014 28.6 18.9764L20.7167 22.5514C20.4854 22.6524 20.2358 22.7045 19.9834 22.7045C19.731 22.7045 19.4813 22.6524 19.25 22.5514L11.3667 18.9764C11.2117 18.9014 11.081 18.7842 10.9896 18.6383C10.8981 18.4924 10.8496 18.3236 10.8496 18.1514C10.8496 17.9792 10.8981 17.8105 10.9896 17.6646C11.081 17.5187 11.2117 17.4015 11.3667 17.3264Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#DCFCE7"
      />
      <defs>
        <linearGradient id="req_clearus_linear" x1="0" y1="0" x2="28.2885" y2="28.2885" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16A34A" />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.8332 7.00002C12.8332 10.2217 10.2215 12.8334 6.99984 12.8334C3.77818 12.8334 1.1665 10.2217 1.1665 7.00002C1.1665 3.77836 3.77818 1.16669 6.99984 1.16669C10.2215 1.16669 12.8332 3.77836 12.8332 7.00002Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#B42318"
      />
      <path d="M7 4.66669V7.00002" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="#B42318" />
      <path d="M7 9.33331H7.00583" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="#B42318" />
    </svg>
  );
}

function SuccessRosetteBadge() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mx-auto">
      <path
        d="M6.69731 23.8168C6.17202 21.4497 6.25267 18.9883 6.9318 16.6606C7.61093 14.333 8.86653 12.2146 10.5822 10.5019C12.2979 8.78913 14.418 7.53746 16.7462 6.86295C19.0743 6.18843 21.5349 6.1129 23.9 6.64335C25.2018 4.60666 26.9951 2.93056 29.1146 1.76955C31.2342 0.60855 33.6118 0 36.0283 0C38.4448 0 40.8224 0.60855 42.9419 1.76955C45.0615 2.93056 46.8548 4.60666 48.1566 6.64335C50.5252 6.11059 52.9901 6.18578 55.3219 6.86194C57.6538 7.53809 59.7768 8.79324 61.4935 10.5106C63.2102 12.228 64.4649 14.3519 65.1408 16.6846C65.8167 19.0174 65.8918 21.4832 65.3593 23.8528C67.3952 25.1551 69.0706 26.9491 70.2311 29.0695C71.3917 31.1899 72 33.5685 72 35.9859C72 38.4033 71.3917 40.7819 70.2311 42.9023C69.0706 45.0227 67.3952 46.8167 65.3593 48.1189C65.8895 50.4849 65.814 52.9466 65.1398 55.2756C64.4655 57.6046 63.2143 59.7257 61.5023 61.442C59.7902 63.1584 57.6726 64.4145 55.3459 65.0938C53.0192 65.7732 50.5587 65.8539 48.1925 65.3284C46.8925 67.3729 45.0978 69.0562 42.9746 70.2224C40.8514 71.3886 38.4684 72 36.0463 72C33.6241 72 31.2411 71.3886 29.118 70.2224C26.9948 69.0562 25.2001 67.3729 23.9 65.3284C21.5349 65.8589 19.0743 65.7833 16.7462 65.1088C14.418 64.4343 12.2979 63.1827 10.5822 61.4699C8.86653 59.7571 7.61093 57.6388 6.9318 55.3111C6.25267 52.9835 6.17202 50.5221 6.69731 48.1549C4.64578 46.8561 2.95595 45.0593 1.78499 42.9317C0.614036 40.804 0 38.4147 0 35.9859C0 33.5571 0.614036 31.1677 1.78499 29.0401C2.95595 26.9125 4.64578 25.1157 6.69731 23.8168Z"
        fill="#16A34A"
      />
      <path
        d="M49.0983 26.5582L33.4337 42.058L26.3135 35.0126"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="white"
      />
    </svg>
  );
}

type FormState = 'form' | 'validation_error' | 'sending' | 'failed' | 'received';

interface FormErrors {
  schoolName?: string;
  state?: string;
  fullName?: string;
  role?: string;
  email?: string;
  consent?: string;
}

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeVQhMvBIIWguLY-I0M1cXyjgfcTb0MZWIx1JroLMvfVqk2Bg/formResponse';

export default function RequestSchoolPage() {
  const [schoolName, setSchoolName] = useState('');
  const [state, setState] = useState('');
  const [schoolWebsite, setSchoolWebsite] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Student');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [registryContact, setRegistryContact] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [consent, setConsent] = useState(false);

  const [formState, setFormState] = useState<FormState>('form');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [submissionResult, setSubmissionResult] = useState<{
    reference: string;
    submittedDate: string;
    schoolName: string;
    firstName: string;
    email: string;
  } | null>(null);

  const validate = (): { isValid: boolean; newErrors: FormErrors; count: number } => {
    const errs: FormErrors = {};
    let count = 0;

    if (!schoolName.trim()) {
      errs.schoolName = 'Enter your school’s name.';
      count++;
    }
    if (!state.trim()) {
      errs.state = 'Enter your school’s state.';
      count++;
    }
    if (!fullName.trim()) {
      errs.fullName = 'Enter your full name.';
      count++;
    }
    if (!role.trim()) {
      errs.role = 'Enter your role.';
      count++;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Enter a valid email address.';
      count++;
    }

    if (!consent) {
      errs.consent = 'Please agree to continue.';
      count++;
    }

    return {
      isValid: count === 0,
      newErrors: errs,
      count,
    };
  };

  const generateReference = (name: string) => {
    const code = name.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase() || 'SCH';
    const rand = Math.floor(10000 + Math.random() * 90000);
    return `REQ-${code}-${rand}`;
  };

  const formatDate = () => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, newErrors } = validate();
    if (!isValid) {
      setErrors(newErrors);
      setFormState('validation_error');
      // Scroll to top of form card smoothly
      const el = document.getElementById('form-card-top');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setErrors({});
    setFormState('sending');

    const formParams = new URLSearchParams();
    formParams.append('entry.220646691', schoolName.trim());
    formParams.append('entry.870243288', state.trim());
    formParams.append('entry.371766831', schoolWebsite.trim());
    formParams.append('entry.1278262328', fullName.trim());
    formParams.append('entry.1470283692', role.trim());
    formParams.append('entry.707129898', email.trim());
    formParams.append('entry.1686484113', phone.trim());
    formParams.append('entry.1238604238', registryContact.trim());
    formParams.append('entry.1853765212', additionalInfo.trim());
    formParams.append('entry.534247411', 'I agree');

    const firstName = fullName.trim().split(' ')[0] || 'there';
    const reference = generateReference(schoolName.trim());
    const submittedDate = formatDate();

    try {
      // Primary: Post to internal Next.js API route proxy
      const res = await fetch('/api/request-school', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schoolName: schoolName.trim(),
          state: state.trim(),
          schoolWebsite: schoolWebsite.trim(),
          fullName: fullName.trim(),
          role: role.trim(),
          email: email.trim(),
          phone: phone.trim(),
          registryContact: registryContact.trim(),
          additionalInfo: additionalInfo.trim(),
          consent,
        }),
      });

      if (!res.ok) {
        // Fallback: Submit directly to Google Form with no-cors so request always reaches Google
        await fetch(GOOGLE_FORM_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formParams.toString(),
        });
      }

      setSubmissionResult({
        reference,
        submittedDate,
        schoolName: schoolName.trim(),
        firstName,
        email: email.trim(),
      });
      setFormState('received');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
      // Try direct no-cors submit as final attempt before failing
      try {
        await fetch(GOOGLE_FORM_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formParams.toString(),
        });
        setSubmissionResult({
          reference,
          submittedDate,
          schoolName: schoolName.trim(),
          firstName,
          email: email.trim(),
        });
        setFormState('received');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        setFormState('failed');
      }
    }
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-between text-[#13241A]">
      {/* =========================================================================
          NAVBAR [404:2426] (Nav pill 1120x64, fixed to top on scroll)
         ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-[#E2EBE5]/70 shadow-xs py-2.5 sm:py-3'
            : 'bg-white/80 backdrop-blur-xs border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="w-full max-w-280 mx-auto h-16 sm:h-18 px-3 sm:px-6 flex items-center justify-between">
          {/* Logo Tile [404:2429] */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center gap-2">
              <ClearUsLogo />
              <div className="flex flex-col">
                <span className="text-[16px] font-bold tracking-tight text-[#13241A] font-jakarta">
                  Clear<span className="text-[#15803D]">Us</span>
                </span>
                <span className="text-[8px] text-[#8A9A90] leading-none font-sans">Academic Network</span>
              </div>
            </div>
          </Link>

          {/* Right Links [404:2434] */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/"
              className="text-[14px] sm:text-[15px] font-medium text-[#33463A] hover:text-[#15803D] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Back to home
            </Link>
            <a
              href="mailto:support@clearus.tech?subject=Help%20with%20Requesting%20School"
              className="text-[14px] sm:text-[15px] font-medium text-[#33463A] hover:text-[#15803D] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Help
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN BODY [404:2437] (Top padded for fixed navbar)
         ========================================================================= */}
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24">
        {formState === 'received' && submissionResult ? (
          /* =========================================================================
             FRAME 404:2612: Request school / Request received
             Form card: 560x566, r=20, bg=white, border=#E2EBE5, p=48px 40px
             ========================================================================= */
          <div className="w-full max-w-140 bg-white rounded-[20px] border border-[#E2EBE5] p-6 sm:p-10 lg:p-12 shadow-[0px_8px_24px_rgba(19,36,26,0.06)] flex flex-col gap-6 mt-4">
            {/* Scalloped Checkmark Rosette [404:2627] (72x72) */}
            <SuccessRosetteBadge />

            {/* Title [404:2630] */}
            <h1 className="text-[28px] text-center sm:text-[30px] font-extrabold text-[#13241A] font-jakarta leading-tight">
              Request received
            </h1>

            {/* Custom Updated Message [404:2631] informing them to check inbox for next steps */}
            <p
              className="text-[15px] sm:text-[16px] text-[#5E7165] leading-6 font-normal"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Thanks {submissionResult.firstName}, We’ll contact the Registry at {submissionResult.schoolName} and email you at {submissionResult.email} when there’s an update. Kindly check your inbox for next steps
            </p>

            {/* Request Summary Box [404:2632] (fill=#F7FBF8, stroke=#E2EBE5, r=14, p=16px 20px) */}
            <div className="rounded-2xl border border-[#E2EBE5] bg-[#F7FBF8] p-4 sm:p-5 flex flex-col gap-2.5">
              {/* Row: Reference */}
              {/* <div className="flex items-center justify-between text-[13px] font-sans">
                <span className="text-[#5E7165]">Reference</span>
                <span className="text-[#13241A] font-medium font-mono">
                  {submissionResult.reference}
                </span>
              </div> */}

              {/* Row: School */}
              <div className="flex items-center justify-between text-[13px] font-sans">
                <span className="text-[#5E7165]">School</span>
                <span className="text-[#13241A] font-medium text-right max-w-[65%] truncate">
                  {submissionResult.schoolName}
                </span>
              </div>

              {/* Row: Status */}
              <div className="flex items-center justify-between text-[13px] font-sans">
                <span className="text-[#5E7165]">Status</span>
                <span className="text-[#13241A] font-medium">Pending review</span>
              </div>

              {/* Row: Submitted */}
              <div className="flex items-center justify-between text-[13px] font-sans">
                <span className="text-[#5E7165]">Submitted</span>
                <span className="text-[#13241A] font-medium">{submissionResult.submittedDate}</span>
              </div>
            </div>

            {/* Action Buttons [404:2645] */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
              <Link
                href="/#find-school"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#16A34A] text-[#15803D] hover:bg-[#F0FDF4] text-[14px] font-semibold transition-all text-center"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Back to directory
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-[14px] font-semibold transition-all shadow-xs text-center"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Back to home
              </Link>
            </div>
          </div>
        ) : (
          /* =========================================================================
             FRAMES: 404:2424 (Form), 404:2470 (Validation errors), 404:2518 (Sending), 404:2564 (Send failed)
             ========================================================================= */
          <div className="w-full max-w-170 flex flex-col gap-8">
            {/* Header [404:2439] (560px, Eyebrow, Title, Subtitle) */}
            <div id="form-card-top" className="max-w-140 flex flex-col gap-2.5 scroll-mt-28 sm:scroll-mt-32">
              <span
                className="text-[12px] font-semibold text-[#15803D] tracking-[0.06em] uppercase"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                REQUEST YOUR SCHOOL
              </span>
              <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#13241A] font-jakarta leading-[1.2]">
                Bring ClearUs to your school
              </h1>
              <p
                className="text-[15px] sm:text-[16px] text-[#5E7165] leading-6"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Tell us about your school and how to reach its Registry. We’ll contact them for you. It usually takes a few days.
              </p>
            </div>

            {/* Form Card [404:2443] (680px, r=20, bg=white, border=#E2EBE5, p=36px 40px) */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="w-full bg-white rounded-[20px] border border-[#E2EBE5] p-6 sm:p-9 lg:p-10 shadow-[0px_8px_24px_rgba(19,36,26,0.06)] flex flex-col gap-6"
            >
              {/* Validation Error Summary Banner [404:2490] */}
              {formState === 'validation_error' && (
                <div className="rounded-xl bg-[#FEE4E2] px-4 py-3 flex items-center gap-2.5 text-[14px] font-medium text-[#B42318]">
                  <span>Please fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} before sending.</span>
                </div>
              )}

              {/* Send Failed Error Summary Banner [404:2584] */}
              {formState === 'failed' && (
                <div className="rounded-xl bg-[#FEE4E2] px-4 py-3 flex items-center gap-2.5 text-[14px] font-medium text-[#B42318]">
                  <span>We couldn’t send your request. Check your connection and try again.</span>
                </div>
              )}

              {/* Fields Container [404:2444] (gap=28px) */}
              <div className="space-y-7">
                {/* -------------------------------------------------------------
                    SECTION 1: About your school [404:2445]
                   ------------------------------------------------------------- */}
                <div className="space-y-4">
                  <h2 className="text-[16px] font-bold text-[#13241A] font-jakarta">
                    About your school
                  </h2>

                  {/* Row 1: School Name + State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* School Name */}
                    <div>
                      <label
                        htmlFor="schoolName"
                        className="block text-[13px] text-[#5E7165] font-normal mb-1.5"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        School name
                      </label>
                      <input
                        id="schoolName"
                        type="text"
                        value={schoolName}
                        onChange={(e) => {
                          setSchoolName(e.target.value);
                          if (errors.schoolName) {
                            setErrors((prev) => ({ ...prev, schoolName: undefined }));
                          }
                        }}
                        placeholder="Covenant University"
                        className={`w-full h-12 rounded-xl bg-white px-3.5 text-[14px] font-medium text-[#13241A] placeholder:text-[#8A9A90] placeholder:font-normal focus:outline-none transition-all ${
                          errors.schoolName
                            ? 'border border-[#B42318] focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15'
                            : 'border border-[#C9D8CE] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                      {errors.schoolName && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-[13px] text-[#B42318] font-normal">
                          <AlertIcon />
                          <span>{errors.schoolName}</span>
                        </div>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-[13px] text-[#5E7165] font-normal mb-1.5"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        State
                      </label>
                      <input
                        id="state"
                        type="text"
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);
                          if (errors.state) {
                            setErrors((prev) => ({ ...prev, state: undefined }));
                          }
                        }}
                        placeholder="Ogun"
                        className={`w-full h-12 rounded-xl bg-white px-3.5 text-[14px] font-medium text-[#13241A] placeholder:text-[#8A9A90] placeholder:font-normal focus:outline-none transition-all ${
                          errors.state
                            ? 'border border-[#B42318] focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15'
                            : 'border border-[#C9D8CE] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                      {errors.state && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-[13px] text-[#B42318] font-normal">
                          <AlertIcon />
                          <span>{errors.state}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* School Website (optional) */}
                  <div>
                    <label
                      htmlFor="schoolWebsite"
                      className="block text-[13px] text-[#5E7165] font-normal mb-1.5"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      School website (optional)
                    </label>
                    <input
                      id="schoolWebsite"
                      type="url"
                      value={schoolWebsite}
                      onChange={(e) => setSchoolWebsite(e.target.value)}
                      placeholder="https://www.covenantuniversity.edu.ng"
                      className="w-full h-12 rounded-xl bg-white border border-[#C9D8CE] px-3.5 text-[14px] font-medium text-[#13241A] placeholder:text-[#8A9A90] placeholder:font-normal focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    SECTION 2: About you [404:2451]
                   ------------------------------------------------------------- */}
                <div className="space-y-4">
                  <h2 className="text-[16px] font-bold text-[#13241A] font-jakarta">
                    About you
                  </h2>

                  {/* Row 2: Full Name + Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-[13px] text-[#5E7165] font-normal mb-1.5"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Your full name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) {
                            setErrors((prev) => ({ ...prev, fullName: undefined }));
                          }
                        }}
                        placeholder="Adaeze Okafor"
                        className={`w-full h-12 rounded-xl bg-white px-3.5 text-[14px] font-medium text-[#13241A] placeholder:text-[#8A9A90] placeholder:font-normal focus:outline-none transition-all ${
                          errors.fullName
                            ? 'border border-[#B42318] focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15'
                            : 'border border-[#C9D8CE] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                      {errors.fullName && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-[13px] text-[#B42318] font-normal">
                          <AlertIcon />
                          <span>{errors.fullName}</span>
                        </div>
                      )}
                    </div>

                    {/* Role */}
                    <div>
                      <label
                        htmlFor="role"
                        className="block text-[13px] text-[#5E7165] font-normal mb-1.5"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Your role
                      </label>
                      <input
                        id="role"
                        type="text"
                        value={role}
                        onChange={(e) => {
                          setRole(e.target.value);
                          if (errors.role) {
                            setErrors((prev) => ({ ...prev, role: undefined }));
                          }
                        }}
                        placeholder="Student"
                        className={`w-full h-12 rounded-xl bg-white px-3.5 text-[14px] font-medium text-[#13241A] placeholder:text-[#8A9A90] placeholder:font-normal focus:outline-none transition-all ${
                          errors.role
                            ? 'border border-[#B42318] focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15'
                            : 'border border-[#C9D8CE] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                      {errors.role && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-[13px] text-[#B42318] font-normal">
                          <AlertIcon />
                          <span>{errors.role}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[13px] text-[#5E7165] font-normal mb-1.5"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Your email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        placeholder="adaeze.okafor@gmail.com"
                        className={`w-full h-12 rounded-xl bg-white px-3.5 text-[14px] font-medium text-[#13241A] placeholder:text-[#8A9A90] placeholder:font-normal focus:outline-none transition-all ${
                          errors.email
                            ? 'border border-[#B42318] focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15'
                            : 'border border-[#C9D8CE] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                      {errors.email && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-[13px] text-[#B42318] font-normal">
                          <AlertIcon />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-[13px] text-[#5E7165] font-normal mb-1.5"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Phone number (optional)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0803 000 0000"
                        className="w-full h-12 rounded-xl bg-white border border-[#C9D8CE] px-3.5 text-[14px] font-medium text-[#13241A] placeholder:text-[#8A9A90] placeholder:font-normal focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    SECTION 3: Registry contact (if you know it) [404:2459]
                   ------------------------------------------------------------- */}
                <div className="space-y-4">
                  <h2 className="text-[16px] font-bold text-[#13241A] font-jakarta">
                    Registry contact (if you know it)
                  </h2>

                  {/* Registry Email / Phone */}
                  <div>
                    <label
                      htmlFor="registryContact"
                      className="block text-[13px] text-[#5E7165] font-normal mb-1.5"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Registry email or phone (optional)
                    </label>
                    <input
                      id="registryContact"
                      type="text"
                      value={registryContact}
                      onChange={(e) => setRegistryContact(e.target.value)}
                      placeholder="registry@covenantuniversity.edu.ng"
                      className="w-full h-12 rounded-xl bg-white border border-[#C9D8CE] px-3.5 text-[14px] font-medium text-[#13241A] placeholder:text-[#8A9A90] placeholder:font-normal focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>

                  {/* Anything else we should know? */}
                  <div>
                    <label
                      htmlFor="additionalInfo"
                      className="block text-[13px] text-[#5E7165] font-normal mb-1.5"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Anything else we should know? (optional)
                    </label>
                    <input
                      id="additionalInfo"
                      type="text"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      placeholder="Tell us how your school handles clearance today."
                      className="w-full h-12 rounded-xl bg-white border border-[#C9D8CE] px-3.5 text-[14px] font-medium text-[#13241A] placeholder:text-[#8A9A90] placeholder:font-normal focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>
              </div>

              {/* Consent Checkbox [404:2463] */}
              <div className="pt-1">
                <div
                  onClick={() => {
                    setConsent(!consent);
                    if (errors.consent) {
                      setErrors((prev) => ({ ...prev, consent: undefined }));
                    }
                  }}
                  className="flex items-start gap-2.5 cursor-pointer group select-none"
                >
                  <div
                    className={`w-4.5 h-4.5 rounded-[5px] flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      consent
                        ? 'bg-[#16A34A] text-white shadow-xs'
                        : errors.consent
                        ? 'border border-[#B42318] bg-white group-hover:border-[#B42318]'
                        : 'border border-[#C9D8CE] bg-white group-hover:border-[#16A34A]'
                    }`}
                  >
                    {consent && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2.5 6L5 8.5L9.5 3.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-[13px] text-[#33463A] leading-5 font-normal"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    I agree that ClearUs may contact my school’s Registry about bringing ClearUs to my school.
                  </span>
                </div>
                {errors.consent && (
                  <div className="flex items-center gap-1.5 mt-1.5 ml-7 text-[13px] text-[#B42318] font-normal">
                    <AlertIcon />
                    <span>{errors.consent}</span>
                  </div>
                )}
              </div>

              {/* Submit Button [404:2466] / Sending state [404:2560] */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className={`w-full h-11 sm:h-12 rounded-xl text-[14px] font-semibold transition-all flex items-center justify-center gap-2 ${
                    formState === 'sending'
                      ? 'bg-[#E2EBE5] text-[#5E7165] cursor-not-allowed'
                      : 'bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.99] text-white shadow-xs cursor-pointer'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {formState === 'sending' ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-[#5E7165]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Sending request…</span>
                    </>
                  ) : (
                    <span>Send request</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* =========================================================================
          FOOTER [404:2467] (73px, border-t #E2EBE5, p 28px 80px)
         ========================================================================= */}
      <footer className="w-full border-t border-[#E2EBE5] py-7 px-4 sm:px-8 lg:px-20">
        <div className="w-full max-w-280 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#5E7165]">
          <span style={{ fontFamily: 'Inter, sans-serif' }}>
            © 2026 ClearUs Digital Infrastructure Limited
          </span>
          <div className="flex items-center gap-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" className="hover:text-[#13241A] transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/" className="hover:text-[#13241A] transition-colors">
              Terms
            </Link>
            <span>·</span>
            <a href="mailto:support@clearus.tech" className="hover:text-[#13241A] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
