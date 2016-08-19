import React from 'react';

// css
import responsive from '../../css/responsive.css';

// components
import { Row, Column } from '../grid/grid';
import { List, ListItem, Subheader } from 'material-ui';

// actions
import { getDevelopers } from '../../actions/index';

export class Success extends React.Component {
  componentDidMount() {
    this.props.dispatch(getDevelopers());
  }
  render() {
    const inProduction = this.props.state.poke.developers.filter((dev) => dev.production);
    const developers = inProduction.map((developer, index) => {
      const url = developer.callbackUrl.match(/^http(s)?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
      return (
        <ListItem
          key={index}
          primaryText={<a href={url[0]} target="_blank">{developer.serviceName}</a>}
        />
      );
    });
    const display = developers.length
      ? (
      <List>
        <Subheader>Check out these Applications</Subheader>
        {developers}
      </List>
      )
      : null;
    return (
      <Row>
        <Column md={4} />
        <Column md={4} >
          <h3 className={responsive.textCenter}>Success!</h3>
          {display}
        </Column>
      </Row>
    );
  }
}
