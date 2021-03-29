import React from 'react';
import { shallow, mount } from 'enzyme';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import CoinRow, { CoinRowProps } from '../CoinRow';
import coinItem from '../../resources/coinItem';

const render = (renderFunction: Function, props: CoinRowProps) => renderFunction(<CoinRow {...props} />);

describe('CoinRow.tsx', () => {
  it('renders correctly (positive change)', () => {
    expect(render(shallow, { coin: { ...coinItem, change: 1.52 }, onRemove: jest.fn() })).toMatchSnapshot();
  });

  it('renders correctly (negative change)', () => {
    expect(render(shallow, { coin: coinItem, onRemove: jest.fn() })).toMatchSnapshot();
  });

  it('calls onRemove when the remove button is clicked', () => {
    const onRemove = jest.fn();
    expect(onRemove.mock.calls.length).toBe(0);
    render(mount, { coin: coinItem, onRemove }).find(RemoveIcon).simulate('click');
    expect(onRemove.mock.calls.length).toBe(1);
  });
});
