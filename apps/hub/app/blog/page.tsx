'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';

export default function BlogPage() {
  const features = [
    {
      title: 'Engineering Essays',
      desc: 'Deep-dives into systems engineering, performance optimization, workspace setup patterns, API designs, and code experiments.',
    },
    {
      title: 'Travel Diaries',
      desc: 'Slow travel notes, maps, itineraries, and stories from walking, train journeys, and cycling across different geographies.',
    },
    {
      title: 'Observations & Artifacts',
      desc: 'Reflective short-form essays on typography, photography composition, objects of craft, and history of design.',
    },
  ];

  return (
    <ComingSoon
      title="Publications & Travel Log"
      tag="[03 // JOURNAL // BLOG]"
      explanation="A writing space for software systems engineering, architectural research, travel journals, and physical artifacts. This blog will hold guides and thoughts at the intersection of technology and creative observation."
      features={features}
      icon={<BookOpen size={22} />}
    />
  );
}
