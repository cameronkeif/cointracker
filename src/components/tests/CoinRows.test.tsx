import React from 'react';
import { render } from '@testing-library/react';
import CoinRows from '../CoinRows';
// import api from '../../api';

describe('CoinRows', () => {
  it('renders correctly - empty', () => {
    const { asFragment } = render(<CoinRows />);
    expect(asFragment()).toMatchSnapshot();
  });

  // it('renders correctly - loading', () => {
  //   api.getCoinData = jest.fn(() => )
  //   const { asFragment } = render(<CoinRows />);
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
