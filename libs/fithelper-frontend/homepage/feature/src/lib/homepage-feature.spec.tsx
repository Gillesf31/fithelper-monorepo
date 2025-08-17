import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomepageFeature from './homepage-feature';

describe('HomepageFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <HomepageFeature />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
