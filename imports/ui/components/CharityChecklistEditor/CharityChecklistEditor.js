// Form component for text box
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import FormTextInput from '../../componentElements/FormTextInput/FormTextInput';

class CharityChecklistEditor extends React.Component {
  render() {
    const { checklists, charity_checklists, checklist_type } = this.props;
    // create new object that compares current checklists list with checklists assigned to charity to populate charity_awarded and reason
    let companyChecklistList = [];
    checklists.forEach(function(checklist){
      let newChecklist = {...checklist};
      let existing = charity_checklists.filter((charity_checklist)=> charity_checklist._id == checklist._id);

      newChecklist.charity_awarded = existing.length >= 1
      companyChecklistList.push(newChecklist);
    })

    return(
      <Table responsive>
        <thead>
          <tr>
            <th>Award to charity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {
            companyChecklistList.map( checklist=>
              <tr key={checklist._id}>
                <td>
                  <FormTextInput
                    type="checkbox"
                    fieldName={`${checklist_type}-charity_awarded`}
                    label=" "
                    value={checklist._id}
                    checked={checklist.charity_awarded} />
                </td>
                <td>
                  {checklist.description}
                </td>
              </tr>)
          }
        </tbody>
      </Table>

    )
  }
};

CharityChecklistEditor.defaultProps = {
  charity_checklists: [],
};

CharityChecklistEditor.propTypes = {
  checklists: PropTypes.arrayOf(PropTypes.object).isRequired,
  charity_checklists: PropTypes.arrayOf(PropTypes.object),
  checklist_type: PropTypes.string.isRequired,
};

export default CharityChecklistEditor;
