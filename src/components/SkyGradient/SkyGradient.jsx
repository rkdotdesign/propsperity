import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// ─────────────────────────────────────────────
// THE SKY COLOUR MAP
// Each entry covers a time range (in hours, 0–24)
// and defines a CSS gradient for that period.
// ─────────────────────────────────────────────
const SKY_STAGES = [
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
// HELPER: get the gradient for a given hour
// ─────────────────────────────────────────────
function getGradientForHour(hour) {
  const stage = SKY_STAGES.find(
    (s) => hour >= s.start && hour < s.end
  );
  // Fallback to deep night if nothing matches
  return stage || SKY_STAGES[0];
}

// ─────────────────────────────────────────────
// HELPER: get current hour for a given location
// using the Intl API built into every browser
// ─────────────────────────────────────────────
async function getLocalHour(location) {
  try {
    // We use a free timezone API to convert city → timezone
    const response = await fetch(
      `https://timeapi.io/api/timezone/zone?timeZone=${encodeURIComponent(location)}`
    );

    if (!response.ok) throw new Error('Timezone fetch failed');

    const data = await response.json();
    const timezone = data.timeZone;

    // Use the browser's Intl API to get current hour in that timezone
    const now = new Date();
    const hour = parseInt(
      new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        timeZone: timezone,
      }).format(now),
      10
    );

    return hour;
  } catch {
    // If anything fails, fall back to local device time
    return new Date().getHours();
  }
}

// ─────────────────────────────────────────────
// THE COMPONENT
// ─────────────────────────────────────────────
function SkyGradient({
  location,
  time,
  width,
  height,
  children,
}) {
  const [gradient, setGradient] = useState(SKY_STAGES[3].gradient);
  const [label, setLabel] = useState('');

  useEffect(() => {
    async function resolveGradient() {
      let hour;

      if (time) {
        // Manual time override — parse "HH:MM" string into an hour number
        hour = parseInt(time.split(':')[0], 10);
      } else if (location) {
        // Location provided — fetch the correct local hour
        hour = await getLocalHour(location);
      } else {
        // Nothing provided — use the device's current local time
        hour = new Date().getHours();
      }

      const stage = getGradientForHour(hour);
      setGradient(stage.gradient);
      setLabel(stage.label);
    }

    resolveGradient();
  }, [location, time]);
  // The array [location, time] means: re-run this effect
  // whenever location or time props change

  const containerStyle = {
    width: width || '100%',
    height: height || '400px',
    background: gradient,
    transition: 'background 1.2s ease',
    // transition smoothly animates the gradient change
    // when time or location props update
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '0px',
    boxSizing: 'border-box',
  };

  const labelStyle = {
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
  
SkyGradient.defaultProps = {
    time: null,
    location: null,
    width: '100%',
    height: '400px',
    children: null,
};

export default SkyGradient;