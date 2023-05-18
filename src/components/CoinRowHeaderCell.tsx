import React from 'react';
import { TableSortDirection } from '../types/TableSortDirection';
import { TableSortType } from '../types/TableSortType';

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
      style={{
        overflow: 'auto',
        whiteSpace: 'nowrap',
      }}
    >
      <span>
        {displayText}
        {sortedIcon}
      </span>
    </div>
  </th>
);

CoinRowHeaderCell.defaultProps = {
  defaultSortDirection: TableSortDirection.Ascending,
};

export default CoinRowHeaderCell;
