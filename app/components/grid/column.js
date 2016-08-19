// @flow

import React from 'react';

import styles from './grid.css';

import classNames from 'classnames';

type Props = {
  lg?: ?number,
  md?: ?number,
  sm?: ?number,
  xs?: ?number,
  hiddenLg?: boolean,
  hiddenMd?: boolean,
  hiddenSm?: boolean,
  hiddenXs?: boolean,
  visibleLg?: boolean,
  visibleMd?: boolean,
  visibleSm?: boolean,
  visibleXs?: boolean,
  children?: ?any
}

export const Column = ({
  lg,
  md,
  sm,
  xs,
  hiddenLg = false,
  hiddenMd = false,
  hiddenSm = false,
  hiddenXs = false,
  visibleLg = false,
  visibleMd = false,
  visibleSm = false,
  visibleXs = false,
  children,
}: Props) => {
  const columnClass = classNames(
    // column widths
    lg ? styles[`colLg${lg}`] : null,
    md ? styles[`colMd${md}`] : null,
    sm ? styles[`colSm${sm}`] : null,
    xs ? styles[`colXs${xs}`] : null,
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
    <div className={columnClass}>
      {children}
    </div>
  );
};
