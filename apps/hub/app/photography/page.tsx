'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';

export default function PhotographyPage() {
  const features = [
    {
      title: 'Street Journals',
      desc: 'Curated monochrome and color collections exploring geometry, shadows, and candid moments of human presence in urban spaces.',
    },
    {
      title: 'Travel Chronicles',
      desc: 'Minimalist landscape compositions, architectural observations, and quiet visual logs capturing slow journeys across countries.',
    },
    {
      title: 'Gear & Technical Logs',
      desc: 'Behind-the-lens documentation detailing cameras, specific focal lengths, and the creative/technical processes of physical film scans.',
    },
  ];

  return (
    <ComingSoon
      title="Photography Gallery"
      tag="[02 // LIFE // GALLERY]"
      explanation="A visual journal dedicated to capturing street scenes, spatial structures, and fragments of life observed during quiet walks. This space will function as a clean digital portfolio for street and travel photography."
      features={features}
      icon={<Camera size={22} />}
    />
  );
}
