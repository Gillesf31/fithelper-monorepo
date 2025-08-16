import { render } from '@testing-library/react';

import HomepageFeature from './homepage-feature';

describe('HomepageFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomepageFeature />);
    expect(baseElement).toBeTruthy();
  });
});
