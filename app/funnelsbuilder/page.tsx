'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FunnelBuilderPro from '@/components/funnelsbuilder';

// Define the exact shape the funnel builder component expects (imported from its types, but we'll redefine here for clarity)
interface FunnelBlockData {
  type?: string;
  label?: string;
  sublabel?: string;
  headline?: string;
  body?: string;
  cta?: string;
  ctaLink?: string;
  [key: string]: unknown;
}

interface FunnelPageData {
  id?: string;
  label?: string;
  icon?: string;
  bg?: string;
  blocks?: FunnelBlockData[];
  type?: string;
  headline?: string;
  body?: string;
  cta?: string;
  ctaLink?: string;
}

interface EmailStepData {
  subject: string;
  timing: string;
  purpose?: string;
  bodyPreview?: string;
}

interface VideoSuggestionData {
  title: string;
  embedUrl?: string;
  searchUrl?: string;
  videoUrl?: string;
}

interface Palette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  surface: string;
  surfaceAlt: string;
  dark: string;
  text: string;
  textMuted: string;
  border: string;
}

interface FunnelData {
  pages?: FunnelPageData[];
  steps?: FunnelBlockData[];
  emails?: EmailStepData[];
  video?: VideoSuggestionData;
  funnelType?: string;
  palette?: Palette;
}

// This is the shape we saved in sessionStorage from the funnel generation API
interface StoredFunnelData {
  steps: FunnelBlockData[];
  emails: EmailStepData[];
  video?: VideoSuggestionData;
  funnelType?: string;
  palette?: Palette;
}

export default function FunnelsBuilderPage() {
  const router = useRouter();
  const [initialData, setInitialData] = useState<FunnelData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      const saved = sessionStorage.getItem('funnelBuilderData');
      if (saved && isMounted) {
        try {
          const stored = JSON.parse(saved) as StoredFunnelData;
          // Convert to the shape expected by the funnel builder component
          const componentData: FunnelData = {
            steps: stored.steps,
            emails: stored.emails,
            video: stored.video,
            funnelType: stored.funnelType,
            palette: stored.palette,
          };
          setInitialData(componentData);
          sessionStorage.removeItem('funnelBuilderData'); // clean up
        } catch (e) {
          console.error('Failed to parse funnel builder data', e);
        }
      }
      if (isMounted) {
        setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleComplete = (finalData: FunnelData) => {
    // The component returns the full funnel data; store it so the campaign page can pick it up.
    // The campaign page expects a simplified shape (only steps, emails, video, funnelType, palette).
    // We'll store exactly what we need.
    const toStore = {
      steps: finalData.steps || [],
      emails: finalData.emails || [],
      video: finalData.video,
      funnelType: finalData.funnelType,
      palette: finalData.palette,
    };
    sessionStorage.setItem('funnelBuilderResult', JSON.stringify(toStore));
    router.push('/dashboard/campaign');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-[#6B5E5E]">
        Loading your funnel...
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="flex items-center justify-center h-screen text-[#6B5E5E]">
        No funnel data found. Please go back and generate a funnel first.
      </div>
    );
  }

  return (
    <FunnelBuilderPro
      initialFunnelData={initialData}
      onComplete={handleComplete}
    />
  );
}