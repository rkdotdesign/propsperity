import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SkyGradient from './SkyGradient';

// ─────────────────────────────────────────────
// WHAT WE'RE TESTING
// 1. Component renders without crashing
// 2. Children render correctly inside it
// 3. Default props work
// 4. Time prop produces the right gradient
// 5. Width and height props apply correctly
// 6. The sky stage logic is correct
// ─────────────────────────────────────────────

describe('SkyGradient', () => {
  // ─────────────────────────────────────────────
  // describe() groups related tests together
  // The string label shows up in test output
  // ─────────────────────────────────────────────

  describe('Rendering', () => {

    it('renders without crashing', () => {
      // it() defines a single test
      // The string describes what should be true
      render(<SkyGradient />);
      // If this line throws, the test fails
      // If it renders without error, the test passes
    });

    it('renders children inside the container', () => {
      render(
        <SkyGradient time="12:00">
          <p>Hello Propsperity</p>
        </SkyGradient>
      );

      expect(screen.getByText('Hello Propsperity')).toBeInTheDocument();
      // screen.getByText() searches the rendered DOM for an element
      // containing this text — throws if not found
      // toBeInTheDocument() is from @testing-library/jest-dom
      // it checks the element actually exists in the document
    });

    it('renders the sky stage label', async () => {
      render(<SkyGradient time="12:00" />);

      await waitFor(() => {
        expect(screen.getByText('Midday')).toBeInTheDocument();
      });
      // waitFor() is needed because the gradient resolves
      // inside a useEffect which runs after render
      // waitFor retries until the assertion passes or times out
    });

  });

  describe('Props', () => {

    it('applies custom width and height', () => {
      const { container } = render(
        <SkyGradient time="12:00" width="500px" height="300px" />
      );

      const div = container.firstChild as HTMLElement;
      // container is the wrapper div that Testing Library creates
      // firstChild is your component's root element
      // 'as HTMLElement' is a TypeScript type assertion

      expect(div).toHaveStyle({ width: '500px' });
      expect(div).toHaveStyle({ height: '300px' });
      // toHaveStyle() checks inline styles on the element
    });

    it('applies default width and height when not provided', () => {
      const { container } = render(<SkyGradient time="12:00" />);
      const div = container.firstChild as HTMLElement;

      expect(div).toHaveStyle({ width: '100%' });
      expect(div).toHaveStyle({ height: '400px' });
    });

  });

  describe('Sky stages', () => {

    const cases: [string, string][] = [
      // Each entry is [time, expected label]
      // This is a TypeScript tuple — an array with
      // exactly two string elements
      ['02:00', 'Deep Night'],
      ['05:00', 'Pre-Dawn'],
      ['06:30', 'Sunrise'],
      ['08:00', 'Morning'],
      ['12:00', 'Midday'],
      ['15:00', 'Afternoon'],
      ['18:00', 'Sunset'],
      ['20:00', 'Dusk'],
      ['22:00', 'Night'],
    ];

    it.each(cases)('time %s shows label %s', async (time, expectedLabel) => {
      render(<SkyGradient time={time} />);

      await waitFor(() => {
        expect(screen.getByText(expectedLabel)).toBeInTheDocument();
      });
    });
    // it.each() runs the same test for every entry in the array
    // %s in the test name gets replaced with the actual values
    // So you get 9 separate tests from one block:
    // "time 02:00 shows label Deep Night"
    // "time 05:00 shows label Pre-Dawn"
    // etc.

  });

});