/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

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
    const existingArticle = this.props.art && this.props.art._id;
    const methodToCall = existingArticle ? 'articles.update' : 'articles.insert';
    const art = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
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
    const { art } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={art && art.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <textarea
          className="form-control"
          name="body"
          ref={body => (this.body = body)}
          defaultValue={art && art.body}
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {art && art._id ? 'Save Changes' : 'Add Article'}
      </Button>
    </form>);
  }
}

ArticleEditor.defaultProps = {
  art: { title: '', body: '' },
};

ArticleEditor.propTypes = {
  art: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default ArticleEditor;
