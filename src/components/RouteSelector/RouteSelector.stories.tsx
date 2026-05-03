import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RouteSelector, { RouteEndpoint } from './RouteSelector';

const meta: Meta<typeof RouteSelector> = {
  title: 'Components/RouteSelector',
  component: RouteSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**RouteSelector** displays an origin and destination pair with a swap button.

Pass \`from\` and \`to\` objects with \`city\`, \`code\`, and \`subtitle\` fields.
Use \`onChange\` to react to swaps in your app.

\`\`\`tsx
import { RouteSelector } from 'propsperity';

<RouteSelector
  from={{ city: 'Bengaluru', code: 'BLR', subtitle: 'Bengaluru International Airport' }}
  to={{ city: 'Mumbai', code: 'BOM', subtitle: 'Chhatrapati Shivaji Maharaj Airport' }}
  onChange={({ from, to }) => console.log(from, to)}
/>
\`\`\`
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '560px', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RouteSelector>;

export const Default: Story = {
  args: {
    from: {
      city: 'Bhubaneswar',
      code: 'BBI',
      subtitle: 'Biju Patnaik International Airport',
    },
    to: {
      city: 'Bengaluru',
      code: 'BLR',
      subtitle: 'Bengaluru International Airport',
    },
  },
};

export const WithoutSubtitle: Story = {
  args: {
    from: { city: 'Delhi', code: 'DEL' },
    to: { city: 'Mumbai', code: 'BOM' },
  },
};

export const CityOnly: Story = {
  args: {
    from: { city: 'Chennai' },
    to: { city: 'Hyderabad' },
  },
};

export const WithOnChange: Story = {
  render: () => {
    const [route, setRoute] = useState<{
      from: RouteEndpoint;
      to: RouteEndpoint;
    }>({
      from: {
        city: 'Bhubaneswar',
        code: 'BBI',
        subtitle: 'Biju Patnaik International Airport',
      },
      to: {
        city: 'Bengaluru',
        code: 'BLR',
        subtitle: 'Bengaluru International Airport',
      },
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RouteSelector
          from={route.from}
          to={route.to}
          onChange={(updated) => setRoute(updated)}
        />
        <div style={{
          fontSize: '12px',
          color: '#64748b',
          fontFamily: 'monospace',
          background: '#f8fafc',
          padding: '12px',
          borderRadius: '8px',
        }}>
          From: {route.from.city} → To: {route.to.city}
        </div>
      </div>
    );
  },
};