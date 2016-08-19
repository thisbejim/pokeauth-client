import React from 'react';

// components
import { Row, Column } from '../grid/grid';

// css
import responsive from '../../css/responsive.css';

export const RegisterError = (props) => {
  return (
    <span>
      <Row>
        <Column md={4} sm={4} />
        <Column md={4} sm={4}>
          <div>
            <h4 className={responsive.textCenter}>There was an error creating your account.</h4>
          </div>
        </Column>
      </Row>
    </span>
  );
};
