import { render } from '@testing-library/react';

import IntakeFeature from './intake-feature';

describe('IntakeFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IntakeFeature />);
    expect(baseElement).toBeTruthy();
  });
});
