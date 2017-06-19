/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class Article_TypeEditor extends React.Component {
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
      },
      messages: {
        title: {
          required: 'Need a title in here, Seuss.',
        },
        body: {
          required: 'This thneeds a body, please.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    const existingArticle_Type = this.props.a_type && this.props.a_type._id;
    const methodToCall = existingArticle_Type ? 'article_types.update' : 'article_types.insert';
    const a_type = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
    };

    if (existingArticle_Type) a_type._id = existingArticle_Type;

    Meteor.call(methodToCall, a_type, (error, article_typeId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingArticle_Type ? 'Article_Type updated!' : 'Article_Type added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/admin/article_types/${article_typeId}`);
      }
    });
  }

  render() {
    const { a_type } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={a_type && a_type.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <textarea
          className="form-control"
          name="body"
          ref={body => (this.body = body)}
          defaultValue={a_type && a_type.body}
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {a_type && a_type._id ? 'Save Changes' : 'Add Article_Type'}
      </Button>
    </form>);
  }
}

Article_TypeEditor.defaultProps = {
  a_type: { title: '', body: '' },
};

Article_TypeEditor.propTypes = {
  a_type: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default Article_TypeEditor;
