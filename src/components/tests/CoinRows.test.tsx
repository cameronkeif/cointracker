import React from 'react';
import nock from 'nock';
import { shallow, mount } from 'enzyme';

import CoinRows, { TableSort } from '../CoinRows';
import coinItem from '../../resources/coinItem';
import { TableSortType, TableSortDirection } from '../../utilities/enums';

const flushPromises = () => new Promise(setImmediate);

const generateMockRequest = () => nock('https://api.coinranking.com')
  .get('/v1/public/coins')
  .query(true)
  .reply(200, { data: { coins: [coinItem] } });

describe('CoinRows.tsx', () => {
  const realUseState = React.useState;

  beforeEach(() => {
    React.useState = realUseState;
  });

  it('renders correctly - empty', () => {
    expect(shallow(<CoinRows />)).toMatchSnapshot();
  });

  it('renders correctly - loading', () => {
    React.useState = jest.fn()
      .mockReturnValueOnce([new Set(), {}])
      .mockReturnValueOnce([[], {}])
      .mockReturnValueOnce([true, {}])
      .mockReturnValueOnce([null, {}])
      .mockReturnValueOnce([{ sortType: TableSortType.Name, sortDirection: TableSortDirection.Ascending }, {}]);

    expect(shallow(<CoinRows />)).toMatchSnapshot();
  });

  it('renders correctly - populated', async () => {
    React.useState = jest.fn()
      .mockReturnValueOnce([new Set(['BTC']), {}])
      .mockReturnValueOnce([[coinItem], {}])
      .mockReturnValueOnce([false, {}])
      .mockReturnValueOnce([null, {}])
      .mockReturnValueOnce([{ sortType: TableSortType.Name, sortDirection: TableSortDirection.Ascending }, {}]);

    expect(shallow(<CoinRows />)).toMatchSnapshot();
  });

  it('calls API on mount', async () => {
    const pending = generateMockRequest();

    // Initialize state for simplicity.
    React.useState = jest.fn()
      .mockReturnValueOnce([new Set(['BTC']), jest.fn()])
      .mockReturnValueOnce([[coinItem], jest.fn()])
      .mockReturnValueOnce([false, jest.fn()])
      .mockReturnValueOnce([null, jest.fn()])
      .mockReturnValueOnce([{ sortType: TableSortType.Name, sortDirection: TableSortDirection.Ascending }, jest.fn()])
      .mockReturnValueOnce([null, jest.fn()]);

    mount(<CoinRows />);
    await flushPromises();
    expect(pending.isDone()).toBe(true);
  });

  const testAdd = (
    shouldClearIntervalBeCalled: boolean,
    setSymbols: Function,
  ) => {
    generateMockRequest();

    jest.spyOn(window, 'clearInterval');

    const addButton = mount(<CoinRows />).find('button[data-id="add-btn"]');
    addButton.simulate('click');
    expect(setSymbols).toHaveBeenCalledWith(new Set(['BTC', 'DOGE']));
    if (shouldClearIntervalBeCalled) {
      expect(clearInterval).toHaveBeenCalled();
    } else {
      expect(clearInterval).not.toHaveBeenCalled();
    }
  };

  it('Handles adding a coin', () => {
    const setSymbols = jest.fn();

    React.useState = jest.fn()
      .mockReturnValueOnce([new Set(['BTC']), setSymbols])
      .mockReturnValueOnce([[coinItem], jest.fn()])
      .mockReturnValueOnce([false, jest.fn()])
      .mockReturnValueOnce([5, jest.fn()])
      .mockReturnValueOnce([{ sortType: TableSortType.Name, sortDirection: TableSortDirection.Ascending }, jest.fn()])
      .mockReturnValueOnce([{ name: 'Dogecoin', symbol: 'DOGE' }, jest.fn()]);

    testAdd(true, setSymbols);
  });

  it('Handles adding a coin (no interval set)', () => {
    const setSymbols = jest.fn();

    React.useState = jest.fn()
      .mockReturnValueOnce([new Set(['BTC']), setSymbols])
      .mockReturnValueOnce([[coinItem], jest.fn()])
      .mockReturnValueOnce([false, jest.fn()])
      .mockReturnValueOnce([null, jest.fn()])
      .mockReturnValueOnce([{ sortType: TableSortType.Name, sortDirection: TableSortDirection.Ascending }, jest.fn()])
      .mockReturnValueOnce([{ name: 'Dogecoin', symbol: 'DOGE' }, jest.fn()]);

    testAdd(false, setSymbols);
  });

  const testDelete = (
    shouldClearIntervalBeCalled: boolean,
    setSymbols: Function,
    expectedSymbols: Set,
    setCoins: Function,
    shouldTestCoins: boolean,
  ) => {
    generateMockRequest();

    jest.spyOn(window, 'clearInterval');

    const deleteButton = mount(<CoinRows />).find('.coin-row .MuiSvgIcon-root');
    deleteButton.first().simulate('click');
    expect(setSymbols).toHaveBeenCalledWith(expectedSymbols);

    if (shouldClearIntervalBeCalled) {
      expect(clearInterval).toHaveBeenCalled();
    } else {
      expect(clearInterval).not.toHaveBeenCalled();
    }

    if (shouldTestCoins) {
      expect(setCoins).toHaveBeenCalledWith([]);
    } else {
      expect(setCoins).not.toHaveBeenCalled();
    }
  };

  it('Handles deleting a coin', () => {
    const coinItem2 = {
      ...coinItem,
      name: 'Dogecoin',
      symbol: 'DOGE',
      uuid: 'Qwsogvtv82FCe',
    };

    const setSymbols = jest.fn();
    const setCoins = jest.fn();

    React.useState = jest.fn()
      .mockReturnValueOnce([new Set(['BTC', 'DOGE']), setSymbols])
      .mockReturnValueOnce([[coinItem, coinItem2], setCoins])
      .mockReturnValueOnce([false, jest.fn()])
      .mockReturnValueOnce([5, jest.fn()])
      .mockReturnValueOnce([{ sortType: TableSortType.Name, sortDirection: TableSortDirection.Ascending }, jest.fn()])
      .mockReturnValueOnce([null, jest.fn()]);

    testDelete(true, setSymbols, new Set(['DOGE']), setCoins, false);
  });

  it('Handles deleting a coin (no coins after delete) (no interval set)', () => {
    const setSymbols = jest.fn();
    const setCoins = jest.fn();

    React.useState = jest.fn()
      .mockReturnValueOnce([new Set(['BTC']), setSymbols])
      .mockReturnValueOnce([[coinItem], setCoins])
      .mockReturnValueOnce([false, jest.fn()])
      .mockReturnValueOnce([null, jest.fn()])
      .mockReturnValueOnce([{ sortType: TableSortType.Name, sortDirection: TableSortDirection.Ascending }, jest.fn()])
      .mockReturnValueOnce([null, jest.fn()]);

    testDelete(false, setSymbols, new Set(), setCoins, true);
  });

  const testSort: void = (headerIndex: number, expectedTableSort: TableSort, setSortType: Function) => {
    const component = mount(<CoinRows />);

    const nameHeader = component.find('th > div');

    nameHeader.at(headerIndex).simulate('keydown', { key: 'Enter' });
    expect(setSortType.mock.calls[0][0]).toEqual(expectedTableSort);

    nameHeader.at(headerIndex).simulate('click');
    expect(setSortType.mock.calls[0][0]).toEqual(expectedTableSort);

    // Clear and retry with keypress
    jest.clearAllMocks();

    nameHeader.at(headerIndex).simulate('keydown', { key: 'Enter' });
    expect(setSortType.mock.calls[0][0]).toEqual(expectedTableSort);
  };

  it('Handles changing the sort order (same sort field)', () => {
    const coinItem2 = {
      ...coinItem,
      name: 'Dogecoin',
      symbol: 'DOGE',
      uuid: 'Qwsogvtv82FCe',
    };

    const setSymbols = jest.fn();
    const setCoins = jest.fn();

    const setSortType = jest.fn();

    React.useState = jest.fn()
      .mockReturnValueOnce([new Set(['BTC', 'DOGE']), setSymbols])
      .mockReturnValueOnce([[coinItem, coinItem2], setCoins])
      .mockReturnValueOnce([false, jest.fn()])
      .mockReturnValueOnce([5, jest.fn()])
      .mockReturnValueOnce([{ sortType: TableSortType.Name, sortDirection: TableSortDirection.Ascending }, setSortType])
      .mockReturnValueOnce([null, jest.fn()]);

    testSort(0, { sortDirection: TableSortDirection.Descending, sortType: TableSortType.Name }, setSortType);
  });

  it('Handles changing the sort order (different sort field - default ascending)', () => {
    const coinItem2 = {
      ...coinItem,
      name: 'Dogecoin',
      symbol: 'DOGE',
      uuid: 'Qwsogvtv82FCe',
    };

    const setSymbols = jest.fn();
    const setCoins = jest.fn();

    const setSortType = jest.fn();

    React.useState = jest.fn()
      .mockReturnValueOnce([new Set(['BTC', 'DOGE']), setSymbols])
      .mockReturnValueOnce([[coinItem, coinItem2], setCoins])
      .mockReturnValueOnce([false, jest.fn()])
      .mockReturnValueOnce([5, jest.fn()])
      .mockReturnValueOnce([{ sortType: TableSortType.Name, sortDirection: TableSortDirection.Ascending }, setSortType])
      .mockReturnValueOnce([null, jest.fn()]);

    testSort(1, { sortDirection: TableSortDirection.Ascending, sortType: TableSortType.Symbol }, setSortType);
  });

  it('Handles changing the sort order (different sort field - default descending)', () => {
    const coinItem2 = {
      ...coinItem,
      name: 'Dogecoin',
      symbol: 'DOGE',
      uuid: 'Qwsogvtv82FCe',
    };

    const setSymbols = jest.fn();
    const setCoins = jest.fn();

    const setSortType = jest.fn();

    React.useState = jest.fn()
      .mockReturnValueOnce([new Set(['BTC', 'DOGE']), setSymbols])
      .mockReturnValueOnce([[coinItem, coinItem2], setCoins])
      .mockReturnValueOnce([false, jest.fn()])
      .mockReturnValueOnce([5, jest.fn()])
      .mockReturnValueOnce([{ sortType: TableSortType.Name, sortDirection: TableSortDirection.Ascending }, setSortType])
      .mockReturnValueOnce([null, jest.fn()]);

    testSort(2, { sortDirection: TableSortDirection.Descending, sortType: TableSortType.Price }, setSortType);
  });
});
