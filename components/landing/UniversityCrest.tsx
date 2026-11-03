import React from 'react';
import Image from 'next/image';

const crestMap: Record<string, string> = {
  FUTO: '/images/futo-crest.png',
  UNILAG: '/images/unilag-crest.png',
  UNN: '/images/unn-crest.png',
  OAU: '/images/oau-crest.png',
  UI: '/images/ui-crest.png',
  CU: '/images/cu-crest.png',
  BU: '/images/bu-crest.png'
};

export default function UniversityCrest({
  code,
  className,
  width = 47,
  height = 46
}: {
  code: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const normalizedCode = code?.toUpperCase();
  const src = crestMap[normalizedCode];
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={`${code} crest`}
      width={width}
      height={height}
      className={className ?? 'object-contain'}
      priority
    />
  );
}
