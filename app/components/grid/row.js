// @flow
import React from 'react';

import styles from './grid.css';

import classNames from 'classnames';

type Props = {
  hiddenLg?: boolean,
  hiddenMd?: boolean,
  hiddenSm?: boolean,
  hiddenXs?: boolean,
  visibleLg?: boolean,
  visibleMd?: boolean,
  visibleSm?: boolean,
  visibleXs?: boolean,
  children?: any
}

export const Row = ({
  hiddenLg = false,
  hiddenMd = false,
  hiddenSm = false,
  hiddenXs = false,
  visibleLg = false,
  visibleMd = false,
  visibleSm = false,
  visibleXs = false,
  children = null,
}: Props) => {
  const rowClass = classNames(
    // row
    styles.row,
    // hidden
    hiddenLg ? styles.hiddenLg : null,
    hiddenMd ? styles.hiddenMd : null,
    hiddenSm ? styles.hiddenSm : null,
    hiddenXs ? styles.hiddenXs : null,
    // visible
    visibleLg ? styles.visibleLg : null,
    visibleMd ? styles.visibleMd : null,
    visibleSm ? styles.visibleSm : null,
    visibleXs ? styles.visibleXs : null
  );
  return (
    <div className={rowClass}>
      {children}
    </div>
  );
};

Row.defaultProps = {
  hiddenLg: false,
  hiddenMd: false,
  hiddenSm: false,
  hiddenXs: false,
  visibleLg: false,
  visibleMd: false,
  visibleSm: false,
  visibleXs: false,
  children: null,
};
