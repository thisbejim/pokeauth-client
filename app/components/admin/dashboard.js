import React from 'react';

// components
import { Row, Column } from '../grid/grid';

import {
  FlatButton, Card, CardActions,
  CardText, CardTitle,
} from 'material-ui';

// actions
import { getApplicants, validApplicant, invalidApplicant } from '../../actions/index';

export class AdminDashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(getApplicants());
  }
  render() {
    const dispatch = this.props.dispatch;
    const state = this.props.state.admin;
    const applicants = state.applicants.map((applicant, index) => {
      return (
        <Card key={index}>
          <CardTitle title={applicant.serviceName} />
          <CardText style={styles.cardText}>
            <p>{applicant.serviceDescription}</p>
            <p>{applicant.callbackUrl}</p>
          </CardText>
          <CardActions>
            <FlatButton
              onClick={() => dispatch(validApplicant(applicant.uid))}
              label="Approve"
            />
            <FlatButton
              onClick={() => dispatch(invalidApplicant(applicant.uid))}
              label="Deny"
            />
          </CardActions>
        </Card>
      );
    });
    return (
      <span>
        <Row>
          <Column md={4} sm={3} />
          <Column md={4} sm={6}>
            {applicants}
          </Column>
        </Row>
      </span>
    );
  }
}

const styles = {
  cardText: {
    wordWrap: 'break-word',
  },
};
