import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import AdminChecklistRow from '../AdminChecklistRow/AdminChecklistRow';
import {processTagString} from '../../../modules/process-strings';


class AdminChecklistTable extends React.Component {
  handleCreate(collection_name) {
    Meteor.call(`${collection_name}.insert`, {description: 'Example description'}, (error, res) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('New item added', 'success');
      }
    });
  };

  render() {
    const { checklists, checklist_type } = this.props;
    const {tagLowerCasePlural, tagUpperCasePlural} = processTagString(checklist_type);
    const checklist_name = tagUpperCasePlural;
    const collection_name = tagLowerCasePlural;
    return(
      <div className={checklist_name}>
        <div className="page-header clearfix">
          <h4 className="pull-left">{checklist_name}</h4>
          <Button
            bsStyle="success"
            className="pull-right"
            onClick={() => this.handleCreate(collection_name)}
            >Add {checklist_name}</Button>
        </div>
        {checklists.length ? <Table responsive>
          <thead>
            <tr>
              <th>Description</th>
              <th>Last Editor</th>
              <th>Last Edited</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {checklists.map((checklist) => (
              <AdminChecklistRow  key={checklist._id} collection_name={collection_name} checklist={checklist} />
            ))}
          </tbody>
        </Table> : <Alert bsStyle="warning">No {checklist_name} yet!</Alert>}
      </div>
    );
  };
};

AdminChecklistTable.propTypes = {
  checklists: PropTypes.array.isRequired,
  checklist_type: PropTypes.string.isRequired,
};

export default AdminChecklistTable;
