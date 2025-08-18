import { render } from '@testing-library/react';
import { Title } from './title';

describe('Title', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Title>Hello there</Title>);
    expect(baseElement).toBeTruthy();
  });
});
