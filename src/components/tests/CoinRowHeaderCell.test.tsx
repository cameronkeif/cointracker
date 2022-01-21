import React from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { render } from '@testing-library/react';
import CoinRowHeaderCell, { CoinRowHeaderCellProps } from '../CoinRowHeaderCell';
import { TableSortDirection, TableSortType } from '../../utilities/enums';

const defaultProps: CoinRowHeaderCellProps = {
  onClick: jest.fn(),
  displayText: 'name',
  tableSortType: TableSortType.Name,
};

describe('CoinRowHeaderCell', () => {
  it('renders as expected (no sortedIcon)', () => {
    const { asFragment } = render(<CoinRowHeaderCell {...defaultProps} />);
    expect(asFragment).toMatchSnapshot();
  });

  it('renders as expected (ascending)', () => {
    const sortedIcon = <ArrowDropUpIcon fontSize="small" />;
    const { asFragment } = render(
      <CoinRowHeaderCell
        sortedIcon={sortedIcon}
        {...defaultProps}
      />,
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('renders as expected (descending)', () => {
    const sortedIcon = <ArrowDropUpIcon fontSize="small" />;
    const { asFragment } = render(
      <CoinRowHeaderCell
        sortedIcon={sortedIcon}
        defaultSortDirection={TableSortDirection.Descending}
        {...defaultProps}
      />,
    );
    expect(asFragment).toMatchSnapshot();
  });
});
