import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface SkyStage {
  label: string;
  start: number;
  end: number;
  gradient: string;
}

interface SkyGradientProps {
  time?: string;
  location?: string;
  width?: string;
  height?: string;
  children?: React.ReactNode;
}

// ─────────────────────────────────────────────
// SKY COLOUR MAP
// ─────────────────────────────────────────────
const SKY_STAGES: SkyStage[] = [
  {
    label: 'Deep Night',
    start: 0,
    end: 4,
    gradient: 'linear-gradient(to bottom, #020408, #0a0e1a, #0f1635)',
  },
  {
    label: 'Pre-Dawn',
    start: 4,
    end: 6,
    gradient: 'linear-gradient(to bottom, #0f1635, #1a1040, #2d1b5e)',
  },
  {
    label: 'Sunrise',
    start: 6,
    end: 7,
    gradient: 'linear-gradient(to bottom, #f97316, #fb923c, #fcd5b0, #fde8d8)',
  },
  {
    label: 'Morning',
    start: 7,
    end: 10,
    gradient: 'linear-gradient(to bottom, #fbbf24, #fde68a, #bae6fd, #e0f2fe)',
  },
  {
    label: 'Midday',
    start: 10,
    end: 14,
    gradient: 'linear-gradient(to bottom, #38bdf8, #7dd3fc, #bae6fd, #f0f9ff)',
  },
  {
    label: 'Afternoon',
    start: 14,
    end: 17,
    gradient: 'linear-gradient(to bottom, #60a5fa, #93c5fd, #c7d9f8, #e8f0fe)',
  },
  {
    label: 'Sunset',
    start: 17,
    end: 19,
    gradient: 'linear-gradient(to bottom, #ea580c, #f97316, #fb7185, #c084fc)',
  },
  {
    label: 'Dusk',
    start: 19,
    end: 21,
    gradient: 'linear-gradient(to bottom, #7c3aed, #4f46e5, #1e1b4b, #0f0a2e)',
  },
  {
    label: 'Night',
    start: 21,
    end: 24,
    gradient: 'linear-gradient(to bottom, #0f0a2e, #0a0e1a, #020408)',
  },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function getGradientForHour(hour: number): SkyStage {
  const stage = SKY_STAGES.find((s) => hour >= s.start && hour < s.end);
  return stage ?? SKY_STAGES[0];
}

async function getLocalHour(location: string): Promise<number> {
  try {
    const response = await fetch(
      `https://timeapi.io/api/timezone/zone?timeZone=${encodeURIComponent(location)}`
    );
    if (!response.ok) throw new Error('Timezone fetch failed');
    const data = await response.json() as { timeZone: string };
    const hour = parseInt(
      new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        timeZone: data.timeZone,
      }).format(new Date()),
      10
    );
    return hour;
  } catch {
    return new Date().getHours();
  }
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
function SkyGradient({
  time,
  location,
  width = '100%',
  height = '400px',
  children,
}: SkyGradientProps) {
  const [gradient, setGradient] = useState<string>(SKY_STAGES[3].gradient);
  const [label, setLabel] = useState<string>('');

  useEffect(() => {
    async function resolveGradient(): Promise<void> {
      let hour: number;

      if (time) {
        hour = parseInt(time.split(':')[0], 10);
      } else if (location) {
        hour = await getLocalHour(location);
      } else {
        hour = new Date().getHours();
      }

      const stage = getGradientForHour(hour);
      setGradient(stage.gradient);
      setLabel(stage.label);
    }

    resolveGradient();
  }, [location, time]);

  const containerStyle: React.CSSProperties = {
    width,
    height,
    background: gradient,
    transition: 'background 1.2s ease',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '12px',
    right: '16px',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '11px',
    fontFamily: 'system-ui, sans-serif',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    userSelect: 'none',
  };

  return (
    <div style={containerStyle}>
      {children}
      <span style={labelStyle}>{label}</span>
    </div>
  );
}

SkyGradient.propTypes = {
  time: PropTypes.string,
  location: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node,
};

export default SkyGradient;
export type { SkyGradientProps };