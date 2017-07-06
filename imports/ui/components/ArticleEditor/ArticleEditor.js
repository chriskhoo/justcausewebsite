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
import FormThumbnailUpload from '../../componentElements/FormThumbnailUpload/FormThumbnailUpload';

class ArticleEditor extends React.Component {
  constructor(props) {
   super(props);
   const { art } = this.props;
   this.state = {
     body: art && art.body,
   }
   this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount(){
    // rule created on client and server
    Slingshot.fileRestrictions("Article_Image", {
      allowedFileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
      maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited)
    });
  }

  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        title: {
          required: true,
        },
        summary: {
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
        summary: {
          required: 'Please enter a summary',
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

  handleUpload(metaContext, fieldName){
    let nextState = this.state;
    const uploader = new Slingshot.Upload("Article_Image", metaContext);

    // update the element ID
    uploader.send(this.form[fieldName].files[0], function (error, downloadUrl) {
      if (error) {
        // Log service detailed response
        Bert.alert(error.message, 'danger');
      }
      else {
        nextState[fieldName] = downloadUrl;
      }
      // update the sample image
      this.setState(nextState);
    }.bind(this));
  }

  handleSubmit() {
    const { history, svcs, ctrys, t_grps, a_types } = this.props;
    const { title, summary, service_ids, country_id } = this.form;
    const existingArticle = this.props.art && this.props.art._id;
    const methodToCall = existingArticle ? 'articles.update' : 'articles.insert';
    const selectedServices = getSelectedObjects(service_ids, svcs);
    const selectedCountry = getSelectedObject(country_id, ctrys);
    const selectedTarget_Groups = getSelectedObjects(target_group_ids, t_grps);
    const selectedArticle_Type = getSelectedObject(article_type_id, a_types);
    const art = {
      title: title.value.trim(),
      summary: summary.value.trim(),
      body: this.state.body,
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
      <FormTextArea fieldName="summary" defaultVal={art && art.summary} />
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

      <FormThumbnailUpload fieldName="body" metaContext={ {type: "article"} } handleUpload={this.handleUpload} />

      <Button type="submit" bsStyle="success">
        {art && art._id ? 'Save Changes' : 'Add Article'}
      </Button>

      <div className="article_image"><img src={this.state.body} alt="body_preview" /></div>

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
