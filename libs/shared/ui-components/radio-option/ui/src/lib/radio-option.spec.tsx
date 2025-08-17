import { render } from '@testing-library/react';

import RadioOption from './radio-option';

describe('RadioOption', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RadioOption
        label="Male"
        value="male"
        checked={true}
        onChange={() => {
          console.log('onChange');
        }}
        name="gender"
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
