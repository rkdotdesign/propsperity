import React from 'react';
import SkyGradient from './SkyGradient';

const meta = {
  title: 'Components/SkyGradient',
  component: SkyGradient,
};

export default meta;

export const DeepNight = () => <SkyGradient time="02:00" width="100%" height="300px" />;
export const PreDawn = () => <SkyGradient time="05:00" width="100%" height="300px" />;
export const Sunrise = () => <SkyGradient time="06:30" width="100%" height="300px" />;
export const Morning = () => <SkyGradient time="08:00" width="100%" height="300px" />;
export const Midday = () => <SkyGradient time="12:00" width="100%" height="300px" />;
export const Afternoon = () => <SkyGradient time="15:00" width="100%" height="300px" />;
export const Sunset = () => <SkyGradient time="18:00" width="100%" height="300px" />;
export const Dusk = () => <SkyGradient time="20:00" width="100%" height="300px" />;
export const Night = () => <SkyGradient time="22:00" width="100%" height="300px" />;
export const AutoCurrentTime = () => <SkyGradient width="100%" height="300px" />;

export const WithChildren = () => (
  <SkyGradient time="06:30" width="100%" height="400px">
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
      fontSize: '32px',
      fontWeight: '700',
      textShadow: '0 2px 12px rgba(0,0,0,0.3)',
      textAlign: 'center',
    }}>
      Good Morning 🌅
    </div>
  </SkyGradient>
);

export const AsHeroSection = () => (
  <SkyGradient time="12:00" width="100%" height="100vh">
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '48px', fontWeight: '800', marginBottom: '12px' }}>
        Propsperity
      </div>
      <div style={{ fontSize: '18px', opacity: 0.85 }}>
        Your personal UI component library
      </div>
    </div>
  </SkyGradient>
);