import React from 'react';

// components
import { Row, Column } from '../grid/grid';

// css
import responsive from '../../css/responsive.css';

const getMessage = (value) => {
  switch (value) {
    case 10:
      return 'Opening Backpack';
    case 20:
      return 'Dialing Professor Oak';
    case 30:
      return 'Transfering Pokémon';
    case 60:
      return 'Discarding Rare TMs';
    case 80:
      return 'Found a Masterball!';
    case 100:
      return 'Closing Backpack';
    default:
      return 'Waiting in line at the Pokémon Center...';
  }
};

export const RegisterProcessing = (props) => {
  const message = getMessage(props.state.poke.progress);
  return (
    <span>
      <Row>
        <Column md={4} sm={4} />
        <Column md={4} sm={4}>
          <div>
            <h4 className={responsive.textCenter}>{message}</h4>
          </div>
        </Column>
      </Row>
    </span>
  );
};
