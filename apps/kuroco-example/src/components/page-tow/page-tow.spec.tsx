import { render } from '@testing-library/react';

import PageTow from './page-tow';

describe('PageTow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageTow />);
    expect(baseElement).toBeTruthy();
  });
});
