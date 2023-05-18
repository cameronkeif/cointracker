import React, { useEffect, Fragment } from 'react';
import { toast } from 'react-toastify';
import request from 'superagent';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import AddCoinRow from './AddCoinRow';
import CoinRow from './CoinRow';
import CoinRowHeaderCell from './CoinRowHeaderCell';
import api from '../api';
import { CoinItem, CoinOption } from '../react-app-env';
import spinnerIcon from '../assets/spinner.png';
import { TableSortType, TableSortDirection } from '../utilities/enums';

export type TableSort = {
  sortType: TableSortType,
  sortDirection: TableSortDirection
};

const UPDATE_ERROR_MESSAGE = 'An error occurred while updating. Trying again shortly.';

const sortCoins = (coins: Array<CoinItem>, tableSort: TableSort): void => {
  const { sortType, sortDirection } = tableSort;

  if (sortType === TableSortType.Change) {
    // Numeric comparison
    coins.sort((a: CoinItem, b: CoinItem) => {
      if (sortDirection === TableSortDirection.Ascending) {
        return a[sortType] - b[sortType];
      }

      return b[sortType] - a[sortType];
    });
  } else if (sortType === TableSortType.Price) {
    // convert to number, then do numeric comparison
    coins.sort((a: CoinItem, b: CoinItem) => {
      if (sortDirection === TableSortDirection.Ascending) {
        return parseFloat(a[sortType]) - parseFloat(b[sortType]);
      }

      return parseFloat(b[sortType]) - parseFloat(a[sortType]);
    });
  } else {
    coins.sort((a:CoinItem, b: CoinItem) => {
      // String comparison
      if (sortDirection === TableSortDirection.Ascending) {
        if (a[sortType] < b[sortType]) {
          return -1;
        }

        if (b[sortType] < a[sortType]) {
          return 1;
        }
      }

      if (a[sortType] < b[sortType]) {
        return 1;
      }

      if (b[sortType] < a[sortType]) {
        return -1;
      }

      return 0;
    });
  }
};

const CoinRows: React.FC = () => {
  const [uuids, setUuids] = React.useState<Set<string>>(new Set());
  const [coins, setCoins] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeTimerId, setActiveTimerId] = React.useState<null | NodeJS.Timeout>(null);
  const [tableSortType, setTableSortType] = React.useState(
    { sortType: TableSortType.Name, sortDirection: TableSortDirection.Ascending },
  );

  const addCoin = (selectedCoin: CoinOption): void => {
    const updatedUuids = new Set(uuids);
    updatedUuids.add(selectedCoin.uuid);

    setUuids(updatedUuids);

    if (activeTimerId) {
      clearInterval(activeTimerId);
    }
  };

  const removeCoin = (uuid: string): void => {
    const updatedUuids = new Set(uuids);
    updatedUuids.delete(uuid);
    setUuids(updatedUuids);

    if (activeTimerId) {
      clearInterval(activeTimerId);
    }

    if (updatedUuids.size === 0) {
      setCoins([]);
    }
  };

  const changeTableSort = (sortType: TableSortType, defaultSortDirection: TableSortDirection): void => {
    if (tableSortType.sortType === sortType) {
      if (tableSortType.sortDirection === TableSortDirection.Ascending) {
        setTableSortType({ ...tableSortType, sortDirection: TableSortDirection.Descending });
      } else {
        setTableSortType({ ...tableSortType, sortDirection: TableSortDirection.Ascending });
      }
    } else {
      setTableSortType({ sortType, sortDirection: defaultSortDirection });
    }
  };

  useEffect(() => {
    if (uuids.size === 0) {
      return;
    }

    api.getCoinData(uuids)
      .then((res: request.Response) => {
        setCoins(res.body.data.coins);
        setIsLoading(false); // Clear initial loading state.
      })
      .catch(() => { toast.error(UPDATE_ERROR_MESSAGE); });
    setActiveTimerId(setInterval(() => {
      setIsLoading(true);
      api.getCoinData(uuids)
        .then((res: request.Response) => {
          setCoins(res.body.data.coins);
          setIsLoading(false);
        })
        .catch(() => { toast.error(UPDATE_ERROR_MESSAGE); });
    }, 60000));
  }, [uuids]);

  sortCoins(coins, tableSortType);

  const coinRows = coins.map((coin: CoinItem) => (
    <CoinRow
      coin={coin}
      onRemove={removeCoin}
      key={`coin-row-${coin.uuid}`}
    />
  ));

  const sortedIcon = tableSortType.sortDirection === TableSortDirection.Ascending
    ? <ArrowDropUpIcon fontSize="small" />
    : <ArrowDropDownIcon fontSize="small" />;

  return (
    <Fragment>
      <table className="coin-table">
        <thead>
          <tr>
            <CoinRowHeaderCell
              onClick={changeTableSort}
              displayText="Name"
              tableSortType={TableSortType.Name}
              sortedIcon={tableSortType.sortType === TableSortType.Name ? sortedIcon : null}
            />
            <CoinRowHeaderCell
              onClick={changeTableSort}
              displayText="Symbol"
              tableSortType={TableSortType.Symbol}
              sortedIcon={tableSortType.sortType === TableSortType.Symbol ? sortedIcon : null}
            />
            <CoinRowHeaderCell
              onClick={changeTableSort}
              displayText="Price"
              tableSortType={TableSortType.Price}
              sortedIcon={tableSortType.sortType === TableSortType.Price ? sortedIcon : null}
              defaultSortDirection={TableSortDirection.Descending}
            />
            <CoinRowHeaderCell
              onClick={changeTableSort}
              displayText="Change (24 hours)"
              tableSortType={TableSortType.Change}
              sortedIcon={tableSortType.sortType === TableSortType.Change ? sortedIcon : null}
              defaultSortDirection={TableSortDirection.Descending}
            />
          </tr>
        </thead>
        <tbody>
          {coinRows}
        </tbody>
      </table>
      <AddCoinRow onAdd={addCoin} selectedUuids={uuids} />
      {isLoading && uuids.size > 0 && <div><img src={spinnerIcon} className="loading" alt="Loading" /></div>}
    </Fragment>
  );
};

export default CoinRows;
