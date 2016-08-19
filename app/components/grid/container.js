// @flow
import React from 'react';
import styles from './grid.css';

type Props = {
  children: ?any
}

export const Container = (props: Props) =>
  <div className={styles.container}>
    {props.children}
  </div>;
