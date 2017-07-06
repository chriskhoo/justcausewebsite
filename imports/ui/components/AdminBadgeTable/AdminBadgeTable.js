import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import AdminBadgeRow from '../AdminBadgeRow/AdminBadgeRow';


class AdminBadgeTable extends React.Component {
  handleCreate() {
    exampleThumbnail = 'http://lorempixel.com/65/65';
    Meteor.call('badges.insert', {name: 'example name', image: exampleThumbnail}, (error, res) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('New badge added', 'success');
      }
    });
  };

  render() {
    const { badges } = this.props;
    return(
      <div className='Badges'>
        <div className="page-header clearfix">
          <h4 className="pull-left">Badges</h4>
          <Button
            bsStyle="success"
            className="pull-right"
            onClick={() => this.handleCreate()}
            >Add Badge</Button>
        </div>
        {badges.length ? <Table responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Details</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {badges.map((badge) => (
              <AdminBadgeRow  key={badge._id} badge={badge} />
            ))}
          </tbody>
        </Table> : <Alert bsStyle="warning">No Badges yet!</Alert>}
      </div>
    );
  };
};

AdminBadgeTable.propTypes = {
  badges: PropTypes.array.isRequired,
};

export default AdminBadgeTable;
