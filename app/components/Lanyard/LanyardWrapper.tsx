'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Import Lanyard dengan dynamic import dan disable SSR
const Lanyard = dynamic(() => import('./Lanyard'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-muted-foreground">Loading 3D scene...</div>
    </div>
  ),
});

export default function LanyardWrapper() {
  return (
    <Suspense fallback={
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    }>
      <Lanyard />
    </Suspense>
  );
}