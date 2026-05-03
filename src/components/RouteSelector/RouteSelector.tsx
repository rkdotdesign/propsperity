import React, { useState } from 'react';
import './RouteSelector.css';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface RouteEndpoint {
  city: string;
  code?: string;
  subtitle?: string;
}

interface RouteSelectorProps {
  from: RouteEndpoint;
  to: RouteEndpoint;
  onSwap?: () => void;
  onChange?: (updated: { from: RouteEndpoint; to: RouteEndpoint }) => void;
  className?: string;
}

// ─────────────────────────────────────────────
// SWAP ICON SVG
// Inline SVG so no icon library needed
// ─────────────────────────────────────────────
const SwapIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 7h12M4 7l3-3M4 7l3 3M16 13H4M16 13l-3-3M16 13l-3 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
function RouteSelector({
  from,
  to,
  onSwap,
  onChange,
  className,
}: RouteSelectorProps) {
  const [fromEndpoint, setFromEndpoint] = useState<RouteEndpoint>(from);
  const [toEndpoint, setToEndpoint] = useState<RouteEndpoint>(to);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);

  // useState stores the current from/to internally
  // so the swap works even without an onChange handler

  function handleSwap() {
    setIsSwapping(true);
    // Trigger the CSS animation

    setTimeout(() => {
      const newFrom = toEndpoint;
      const newTo = fromEndpoint;

      setFromEndpoint(newFrom);
      setToEndpoint(newTo);
      setIsSwapping(false);

      onSwap?.();
      // ?. is optional chaining — only calls onSwap
      // if it was actually passed as a prop

      onChange?.({ from: newFrom, to: newTo });
    }, 200);
    // Wait 200ms for the animation to play
    // before actually swapping the values
  }

  return (
    <div className={`rs-container${className ? ` ${className}` : ''}`}>

      {/* FROM */}
      <div className={`rs-endpoint${isSwapping ? ' rs-endpoint--swapping' : ''}`}>
        <span className="rs-label">From</span>
        <span className="rs-city">{fromEndpoint.city}</span>
        {fromEndpoint.code && (
          <span className="rs-meta">
            {fromEndpoint.code}
            {fromEndpoint.subtitle && `, ${fromEndpoint.subtitle}`}
          </span>
        )}
      </div>

      {/* DIVIDER + SWAP BUTTON */}
      <div className="rs-divider">
        <div className="rs-divider-line" />
        <button
          className={`rs-swap-btn${isSwapping ? ' rs-swap-btn--active' : ''}`}
          onClick={handleSwap}
          aria-label="Swap origin and destination"
          type="button"
        >
          <SwapIcon />
        </button>
        <div className="rs-divider-line" />
      </div>

      {/* TO */}
      <div className={`rs-endpoint${isSwapping ? ' rs-endpoint--swapping' : ''}`}>
        <span className="rs-label">To</span>
        <span className="rs-city">{toEndpoint.city}</span>
        {toEndpoint.code && (
          <span className="rs-meta">
            {toEndpoint.code}
            {toEndpoint.subtitle && `, ${toEndpoint.subtitle}`}
          </span>
        )}
      </div>

    </div>
  );
}

export default RouteSelector;
export type { RouteSelectorProps, RouteEndpoint };