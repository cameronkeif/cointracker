import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';

import AddCoinRow, { AddCoinRowProps } from '../AddCoinRow';

const renderComponent = (renderFunction: Function, props: AddCoinRowProps) => shallow(<AddCoinRow {...props} />);

const selectedUuids = new Set(['Qwsogvtv82FCd', 'razxDUgYGNAdQ']);

const defaultProps: AddCoinRowProps = {
  onAdd: jest.fn(),
  selectedUuids,
};

describe('AddCoinRow', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly (with selectedSymbols empty)', () => {
    const { asFragment } = render(
      <AddCoinRow
        {...defaultProps}
        selectedUuids={new Set()}
      />,
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('renders correctly (with selectedSymbols populated)', () => {
    const { asFragment } = render(
      <AddCoinRow
        {...defaultProps}
      />,
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('Disables the add button if selectedCoin is null', () => {
    render(
      <AddCoinRow
        {...defaultProps}
      />,
    );
    const addButton = renderComponent(mount, { onAdd: jest.fn(), selectedUuids }).find(IconButton);
    expect(addButton.props().disabled).toBe(true);
  });
});
