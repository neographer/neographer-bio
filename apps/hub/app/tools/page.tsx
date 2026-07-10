'use client';

import React from 'react';
import { Code2 } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';

export default function ToolsPage() {
  const features = [
    {
      title: 'Interactive Sandboxes',
      desc: 'Playgrounds for testing isolated UI components, CSS styles, canvas drawing algorithms, and client-side logic in real-time.',
    },
    {
      title: 'Developer Utilities',
      desc: 'Custom formatters, encoding tools, and small helper utilities designed to streamline daily systems development.',
    },
    {
      title: 'Systems Visualizers',
      desc: 'Interactive diagrams and network/data flow visualizers explaining complex system processes and architectural protocols.',
    },
  ];

  return (
    <ComingSoon
      title="Tools & Sandboxes"
      tag="[01 // TECH // TOOLS]"
      explanation="A space built to experiment with web utilities, lightweight sandboxes, and structural visualizers. This sub-application will hold interactive tools and utilities designed to speed up and visually verify systems development."
      features={features}
      icon={<Code2 size={22} />}
    />
  );
}
