import React from 'react';
import { TableSortDirection, TableSortType } from '../utilities/enums';

export type CoinRowHeaderCellProps = {
  onClick: Function,
  displayText: string,
  tableSortType: TableSortType,
  sortedIcon: JSX.Element | null,
  defaultSortDirection?: TableSortDirection,
};

const CoinRowHeaderCell: React.FC<CoinRowHeaderCellProps> = ({
  onClick,
  displayText,
  tableSortType,
  sortedIcon,
  defaultSortDirection,
}: CoinRowHeaderCellProps) => (
  <th>
    <div
      onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === 'Enter') {
          onClick(tableSortType, defaultSortDirection);
        }
      }}
      onClick={() => onClick(tableSortType, defaultSortDirection)}
      role="button"
      tabIndex={0}
    >
      {displayText}
      {sortedIcon}
    </div>
  </th>
);

CoinRowHeaderCell.defaultProps = {
  defaultSortDirection: TableSortDirection.Ascending,
};

export default CoinRowHeaderCell;
