import React from 'react';
import Button from './Button';

// This default export is Storybook's registration block.
// 'title' sets the path in the sidebar: Components → Button
export default {
  title: 'Components/Button',
  component: Button,
};

// Each named export below is one "story" — one specific version of the component.
// Think of each story as answering: "what does Button look like when...?"

export const Primary = () => (
  <Button label="Click me" variant="primary" />
);

export const Secondary = () => (
  <Button label="Click me" variant="secondary" />
);

export const Danger = () => (
  <Button label="Delete" variant="danger" />
);

export const SmallSize = () => (
  <Button label="Small" variant="primary" size="small" />
);

export const LargeSize = () => (
  <Button label="Large" variant="primary" size="large" />
);

export const Disabled = () => (
  <Button label="Can't click me" variant="primary" disabled={true} />
);

export const AllVariants = () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <Button label="Primary" variant="primary" />
    <Button label="Secondary" variant="secondary" />
    <Button label="Danger" variant="danger" />
  </div>
);