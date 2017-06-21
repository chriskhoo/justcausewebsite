import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import AdminTagRow from '../AdminTagRow/AdminTagRow';
import processTagString from '../../../modules/process-strings';


class AdminTagTable extends React.Component {
  handleCreate(collection_name) {
    Meteor.call(`${collection_name}.insert`, {name: 'Example name'}, (error, res) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('New tag added', 'success');
      }
    });
  };

  render() {
    const { tags, tag_type } = this.props;
    const {tagLowerCasePlural, tagUpperCasePlural} = processTagString(tag_type);
    const tags_name = tagUpperCasePlural;
    const collection_name = tagLowerCasePlural;
    return(
      <div className={tags_name}>
        <div className="page-header clearfix">
          <h4 className="pull-left">{tags_name}</h4>
          <Button
            bsStyle="success"
            className="pull-right"
            onClick={() => this.handleCreate(collection_name)}
            >Add {tags_name}</Button>
        </div>
        {tags.length ? <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <AdminTagRow  key={tag._id} collection_name={collection_name} tag={tag} />
            ))}
          </tbody>
        </Table> : <Alert bsStyle="warning">No {tags_name} yet!</Alert>}
      </div>
    );
  };
};

AdminTagTable.propTypes = {
  tags: PropTypes.array.isRequired,
  tag_type: PropTypes.string.isRequired,
};

export default AdminTagTable;
