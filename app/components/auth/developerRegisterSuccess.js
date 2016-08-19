import React from 'react';
import { Row, Column } from '../grid/grid';

export const DeveloperRegisterSuccess = () => {
  return (
    <Row>
      <Column md={4} />
      <Column md={4} >
        <h3>Success!</h3>
        <p>You will recieve and email when your account has been approved.</p>
      </Column>
    </Row>
  );
};
