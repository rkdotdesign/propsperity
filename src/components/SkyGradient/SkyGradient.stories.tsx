import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SkyGradient from './SkyGradient';

// ─────────────────────────────────────────────
// PRESET MAP
// Maps a human-readable label to a time value
// ─────────────────────────────────────────────
const PRESETS: Record<string, string> = {
  'Deep Night': '02:00',
  'Pre-Dawn': '05:00',
  'Sunrise': '06:30',
  'Morning': '08:00',
  'Midday': '12:00',
  'Afternoon': '15:00',
  'Sunset': '18:00',
  'Dusk': '20:00',
  'Night': '22:00',
};

const meta: Meta<typeof SkyGradient> = {
  title: 'Components/SkyGradient',
  component: SkyGradient,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**SkyGradient** is a sky-inspired gradient container that shifts colour based on time of day.

Use it as a full-page background, a hero section, or any decorative container. Pass a \`time\` prop to manually set the sky phase, or let it auto-detect your local time.

\`\`\`tsx
import { SkyGradient } from 'propsperity';

// Auto-detects current local time
<SkyGradient width="100%" height="400px" />

// Manual time
<SkyGradient time="18:00" width="100%" height="400px" />

// With content inside
<SkyGradient time="06:30" width="100%" height="100vh">
  <h1 style={{ color: 'white' }}>Good Morning</h1>
</SkyGradient>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    time: {
      control: 'text',
      description: 'Manual time override in HH:MM 24hr format',
      table: {
        defaultValue: { summary: 'auto' },
        type: { summary: 'string' },
      },
    },
    location: {
      control: 'text',
      description: 'IANA timezone string e.g. "Asia/Kolkata" for timezone-aware time',
      table: {
        defaultValue: { summary: 'null' },
        type: { summary: 'string' },
      },
    },
    width: {
      control: 'text',
      description: 'Any valid CSS width value',
      table: {
        defaultValue: { summary: '100%' },
        type: { summary: 'string' },
      },
    },
    height: {
      control: 'text',
      description: 'Any valid CSS height value',
      table: {
        defaultValue: { summary: '400px' },
        type: { summary: 'string' },
      },
    },
    children: {
      control: false,
      description: 'Optional content rendered inside the gradient container',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkyGradient>;

// ─────────────────────────────────────────────
// 1. DEFAULT
// All props editable via controls panel
// ─────────────────────────────────────────────
export const Default: Story = {
  args: {
    time: '12:00',
    width: '100%',
    height: '100vh',
  },
};

// ─────────────────────────────────────────────
// 2. PRESETS
// Dropdown maps to a preset time value
// Uses a custom render to intercept the
// preset selection and pass the right time
// ─────────────────────────────────────────────

// We define a wrapper component that accepts
// a 'preset' prop instead of 'time'
interface PresetsProps {
  preset: string;
  width: string;
  height: string;
}

const PresetsWrapper = ({ preset, width, height }: PresetsProps) => (
  <SkyGradient
    time={PRESETS[preset]}
    width={width}
    height={height}
  />
);

export const Presets: StoryObj<PresetsProps> = {
  render: (args) => <PresetsWrapper {...args} />,
  argTypes: {
    preset: {
      control: 'select',
      options: Object.keys(PRESETS),
      description: 'Choose a sky phase to preview',
      table: {
        defaultValue: { summary: 'Midday' },
        type: { summary: Object.keys(PRESETS).join(' | ') },
      },
    },
    width: {
      control: 'text',
      description: 'Any valid CSS width value',
      table: {
        defaultValue: { summary: '100%' },
      },
    },
    height: {
      control: 'text',
      description: 'Any valid CSS height value',
      table: {
        defaultValue: { summary: '100vh' },
      },
    },
  },
  args: {
    preset: 'Midday',
    width: '100%',
    height: '100vh',
  },
};

// ─────────────────────────────────────────────
// 3. CURRENT TIME
// No time prop — auto-detects local time
// ─────────────────────────────────────────────
export const CurrentTime: Story = {
  args: {
    width: '100%',
    height: '100vh',
  },
  parameters: {
    docs: {
      description: {
        story: 'No `time` prop passed — automatically uses your device\'s current local time. The gradient will differ depending on when you view this.',
      },
    },
  },
};

// ─────────────────────────────────────────────
// 4. WITH CONTENT
// Shows how to use children inside the gradient
// ─────────────────────────────────────────────
export const WithContent: Story = {
  args: {
    time: '06:30',
    width: '100%',
    height: '100vh',
  },
  parameters: {
    docs: {
      description: {
        story: 'Pass any content as `children` — it renders inside the gradient container. Use `position: absolute` to place it precisely.',
      },
    },
  },
  render: (args) => (
    <SkyGradient {...args}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '48px',
          fontWeight: '800',
          marginBottom: '12px',
          textShadow: '0 2px 20px rgba(0,0,0,0.2)',
        }}>
          Propsperity
        </div>
        <div style={{ fontSize: '18px', opacity: 0.85 }}>
          Your personal UI component library
        </div>
      </div>
    </SkyGradient>
  ),
};