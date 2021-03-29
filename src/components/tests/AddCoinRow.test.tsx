import React from 'react';
import { shallow, mount } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';

import AddCoinRow, { AddCoinRowProps } from '../AddCoinRow';

const render = (renderFunction: Function, props: AddCoinRowProps) => shallow(<AddCoinRow {...props} />);

const selectedSymbols = new Set(['BTC', 'ETH']);

describe('AddCoinRow', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(render(shallow, { onAdd: jest.fn(), selectedSymbols: new Set() })).toMatchSnapshot();
  });

  it('renders correctly (with selectedSymbols populated)', () => {
    expect(render(shallow, { onAdd: jest.fn(), selectedSymbols })).toMatchSnapshot();
  });

  it('filters out options matching the provided selectedSymbols', () => {
    const component = render(mount, { onAdd: jest.fn(), selectedSymbols });
    component.find(Autocomplete).props().options
      .forEach((option) => {
        expect(option.symbol).not.toBe('BTC');
        expect(option.symbol).not.toBe('ETH');
      });
  });

  it('Disables the add button if selectedCoin is null', () => {
    const addButton = render(mount, { onAdd: jest.fn(), selectedSymbols }).find(IconButton);
    expect(addButton.props().disabled).toBe(true);
  });

  it('Calls onAdd when the add button is clicked or the enter button is pressed', () => {
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => React.useState({ selectedCoin: { name: 'Bitcoin', smybol: 'BTC' } }));

    const onAdd = jest.fn();

    // Test click
    let component = render(mount, { onAdd, selectedSymbols });
    const addButton = component.find(IconButton);

    expect(addButton.props().disabled).toBe(false);
    expect(onAdd.mock.calls.length).toBe(0);

    addButton.simulate('click');
    expect(onAdd.mock.calls.length).toBe(1);

    // Re-render and test "enter keydown"
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => React.useState({ selectedCoin: { name: 'Bitcoin', smybol: 'BTC' } }));

    component = render(mount, { onAdd, selectedSymbols });
    const autoComplete = component.find(Autocomplete);

    autoComplete.simulate('keydown', { key: 'Enter' });
    expect(onAdd.mock.calls.length).toBe(2);
  });
});
