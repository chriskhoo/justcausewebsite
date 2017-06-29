// Form component for text box
import React from 'react';
import PropTypes from 'prop-types';
import FormTextInput from '../../componentElements/FormTextInput/FormTextInput';
import FormTextArea from '../../componentElements/FormTextArea/FormTextArea';

import './AdminCharityBadgeRow.scss';

class AdminCharityBadgeRow extends React.Component {
  render() {
    const { _id, name, image, charity_awarded, reason } = this.props;
    return(
      <tr className="admin-charity-badge-row">
        <td>
          <img src={image} />
        </td>
        <td>
          {name}
        </td>
        <td>
          <FormTextInput
            type="checkbox"
            fieldName={`badge-${_id}-charity_awarded`}
            label=" "
            value={_id}
            checked={charity_awarded} />
        </td>
        <td>
          <FormTextArea
            fieldName={`badge-${_id}-reason`}
            defaultVal={reason}
            label=" " />
        </td>
      </tr>
    )
  }
};

AdminCharityBadgeRow.defaultProps = {};

AdminCharityBadgeRow.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  charity_awarded: PropTypes.bool.isRequired,
  reason: PropTypes.string,
};

export default AdminCharityBadgeRow;
