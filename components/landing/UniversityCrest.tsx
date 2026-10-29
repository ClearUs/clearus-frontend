import React from 'react';
import Image from 'next/image';

const crestMap: Record<string, string> = {
  FUTO: '/images/futo-crest.png',
  UNILAG: '/images/unilag-crest.png',
  UNN: '/images/unn-crest.png',
  UI: '/images/ui-crest.png',
  CU: '/images/cu-crest.png',
  BU: '/images/bu-crest.png'
};

export default function UniversityCrest({ code }: { code: string }) {
  const src = crestMap[code];
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={`${code} crest`}
      width={47}
      height={46}
      className="object-contain"
      priority
    />
  );
}
