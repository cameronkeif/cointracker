import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CoinRow, { CoinRowProps } from '../CoinRow';
import coinItem from '../../resources/coinItem';

const defaultProps: CoinRowProps = {
  coin: coinItem,
  onRemove: jest.fn(),
};

describe('CoinRow.tsx', () => {
  it('renders correctly (positive change)', () => {
    const { asFragment } = render(
      <CoinRow
        {...defaultProps}
        coin={{ ...coinItem, change: 1.52 }}
      />,
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('renders correctly (negative change)', () => {
    const { asFragment } = render(
      <CoinRow
        {...defaultProps}
      />,
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('calls onRemove when the remove button is clicked', () => {
    const onRemove = jest.fn();
    expect(onRemove.mock.calls.length).toBe(0);

    render(
      <CoinRow
        {...defaultProps}
        onRemove={onRemove}
      />,
    );
    fireEvent.click(screen.getByTitle('Remove'));
    expect(onRemove).toHaveBeenCalledWith(coinItem.symbol);
  });
});
