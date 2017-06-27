/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import { FormSelectMultiple, getSelectedObjects } from '../../componentElements/FormSelectMultiple/FormSelectMultiple';
import { FormSelectSingle, getSelectedObject } from '../../componentElements/FormSelectSingle/FormSelectSingle';
import FormTextInput from '../../componentElements/FormTextInput/FormTextInput';
import FormTextArea from '../../componentElements/FormTextArea/FormTextArea';

class ArticleEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        title: {
          required: true,
        },
        body: {
          required: true,
        },
        service_ids: {
          required: true,
        },
        country_id: {
          valueNotEquals: undefined,
          required: true,
        },
        target_group_ids: {
          required: true,
        },
        article_type_id: {
          valueNotEquals: undefined,
          required: true,
        },
      },
      messages: {
        title: {
          required: 'Please enter a title',
        },
        body: {
          required: 'Please enter a body',
        },
        service_ids: {
          required: 'Please select the appropriate service tag(s)',
        },
        country_id: {
          required: 'Please select one country tag',
        },
        target_group_ids: {
          required: 'Please select the appropriate target group tag(s)',
        },
        article_type_id: {
          required: 'Please select one detail level tag',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history, svcs, ctrys, t_grps, a_types } = this.props;
    const { title, body, service_ids, country_id } = this.form;
    const existingArticle = this.props.art && this.props.art._id;
    const methodToCall = existingArticle ? 'articles.update' : 'articles.insert';
    const selectedServices = getSelectedObjects(service_ids, svcs);
    const selectedCountry = getSelectedObject(country_id, ctrys);
    const selectedTarget_Groups = getSelectedObjects(target_group_ids, t_grps);
    const selectedArticle_Type = getSelectedObject(article_type_id, a_types);
    const articleSummary = body.value.trim().substring(0,140);
    const art = {
      title: title.value.trim(),
      summary: articleSummary,
      body: body.value.trim(),
      service_ids: selectedServices,
      country_id: selectedCountry,
      target_group_ids: selectedTarget_Groups,
      article_type_id: selectedArticle_Type,

    };
    if (existingArticle) art._id = existingArticle;
    Meteor.call(methodToCall, art, (error, articleId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingArticle ? 'Article updated!' : 'Article added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/admin/articles/${articleId}`);
      }
    });
  }

  render() {
    const { svcs, art, ctrys, t_grps, a_types } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormTextInput fieldName="title" defaultVal={art && art.title}/>
      <FormTextArea fieldName="body" defaultVal={art && art.body} />
      <FormSelectMultiple
        fieldName="service_ids"
        optionsList= {svcs}
        defaultVal = {art && art.service_ids && art.service_ids[0]._id && art.service_ids.map( ids => ids._id )} />

      <FormSelectSingle
        fieldName="country_id"
        optionsList= {ctrys}
        defaultVal = {art && art.country_id && art.country_id._id} />

      <FormSelectMultiple
        fieldName="target_group_ids"
        optionsList= {t_grps}
        defaultVal = {art && art.target_group_ids && art.target_group_ids[0]._id && art.target_group_ids.map( ids => ids._id )} />

      <FormSelectSingle
        fieldName="article_type_id"
        optionsList= {a_types}
        defaultVal = {art && art.article_type_id && art.article_type_id._id} />

      <Button type="submit" bsStyle="success">
        {art && art._id ? 'Save Changes' : 'Add Article'}
      </Button>
    </form>);
  }
}

ArticleEditor.defaultProps = {
  art: { title: '', body: ''},
};

ArticleEditor.propTypes = {
  history: PropTypes.object.isRequired,
  art: PropTypes.object,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  a_types: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ArticleEditor;
