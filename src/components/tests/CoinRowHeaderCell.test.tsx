import React from 'react';
import { shallow } from 'enzyme';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import CoinRowHeaderCell, { CoinRowHeaderCellProps } from '../CoinRowHeaderCell';
import { TableSortType } from '../../utilities/enums';

const render = (
  renderFunction: Function,
  props: CoinRowHeaderCellProps,
) => renderFunction(<CoinRowHeaderCell {...props} />);

const defaultProps = {
  onClick: jest.fn(),
  displayText: 'name',
  tableSortType: TableSortType.Name,
};

describe('CoinRowHeaderCell', () => {
  it('renders as expected (no sortedIcon)', () => {
    expect(render(shallow, defaultProps)).toMatchSnapshot();
  });

  it('renders as expected (ascending)', () => {
    const sortedIcon = <ArrowDropUpIcon fontSize="small" />;
    expect(render(shallow, { ...defaultProps, sortedIcon })).toMatchSnapshot();
  });
});
