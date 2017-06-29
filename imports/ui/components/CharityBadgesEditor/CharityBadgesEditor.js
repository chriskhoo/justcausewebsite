// Form component for text box
import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, ButtonGroup, Table } from 'react-bootstrap';
import FormTextInput from '../../componentElements/FormTextInput/FormTextInput';
import FormTextArea from '../../componentElements/FormTextArea/FormTextArea';
import AdminCharityBadgeRow from '../AdminCharityBadgeRow/AdminCharityBadgeRow';

class CharityBadgesEditor extends React.Component {
  render() {
    const { badges, charity_badges } = this.props;
    // create new object that compares current badges list with badges assigned to charity to populate charity_awarded and reason
    let companyBadgeList = [];
    badges.forEach(function(badge){
      let newBadge = {...badge};
      let existing = charity_badges.filter((charity_badge)=> charity_badge._id == badge._id);

      if(existing.length >= 1){
        newBadge.charity_awarded = true;
        newBadge.reason = existing[0].reason
      }else{
        newBadge.charity_awarded = false;
      }
      companyBadgeList.push(newBadge);
    })
    
    return(
      <Table responsive>
        <thead>
          <tr>
            <th>Badge</th>
            <th>Name</th>
            <th>Award to charity</th>
            <th>Reason if awarded</th>
          </tr>
        </thead>
        <tbody>
          {
            companyBadgeList.map( badge=>
              <AdminCharityBadgeRow
               key={badge._id}
               _id={badge._id}
               name={badge.name}
               image={badge.image} charity_awarded={badge.charity_awarded} reason={badge.reason} />)
          }
        </tbody>
      </Table>

    )
  }
};

CharityBadgesEditor.defaultProps = {
  charity_badges: [],
};

CharityBadgesEditor.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.object).isRequired,
  charity_badges: PropTypes.arrayOf(PropTypes.object),
};

export default CharityBadgesEditor;
