import React from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { render } from '@testing-library/react';
import CoinRowHeaderCell, { CoinRowHeaderCellProps } from '../CoinRowHeaderCell';
import { TableSortDirection } from '../../types/TableSortDirection';
import { TableSortType } from '../../types/TableSortType';

const defaultProps: CoinRowHeaderCellProps = {
  onClick: jest.fn(),
  displayText: 'name',
  tableSortType: TableSortType.Name,
  sortedIcon: <ArrowDropUpIcon fontSize="small" />,
};

describe('CoinRowHeaderCell', () => {
  it('renders as expected (no sortedIcon)', () => {
    const { asFragment } = render(<CoinRowHeaderCell {...defaultProps} />);
    expect(asFragment).toMatchSnapshot();
  });

  it('renders as expected (ascending)', () => {
    const { asFragment } = render(
      <CoinRowHeaderCell
        {...defaultProps}
      />,
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('renders as expected (descending)', () => {
    const { asFragment } = render(
      <CoinRowHeaderCell
        defaultSortDirection={TableSortDirection.Descending}
        {...defaultProps}
      />,
    );
    expect(asFragment).toMatchSnapshot();
  });
});
