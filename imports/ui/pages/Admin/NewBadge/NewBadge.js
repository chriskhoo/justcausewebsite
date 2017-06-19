import React from 'react';
import PropTypes from 'prop-types';
import BadgeEditor from '../../../components/BadgeEditor/BadgeEditor';

const NewBadge = ({ history }) => (
  <div className="NewBadge">
    <h4 className="page-header">New Badge</h4>
    <BadgeEditor history={history} />
  </div>
);

NewBadge.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewBadge;
