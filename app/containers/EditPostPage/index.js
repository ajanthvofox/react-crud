/*
 *
 * EditPostPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {
  selectPost,
  selectPostTitle,
  selectPostBody,
  makeSelectEditPostPage
} from './selectors';
import {
  savePostAction,
  setPostTitle,
  setPostBody,
  iniPostData,
} from './actions';
import messages from './messages';

import A from 'components/A';
import BUTTON from 'components/BUTTON';
import H1 from 'components/H1';
import H2 from 'components/H2';
import H3 from 'components/H3';

const Input = styled.input`
  width: 100%;
  border-bottom: #41addd 2px solid;
  color: #777777;
  font-size: 17px;
  padding:8px 10px;
  margin-bottom: 18px;
  font-family: arial;

  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border-bottom: #41addd 2px solid;
  color: #777777;
  font-size: 17px;
  padding:8px 10px;
  height: 70px;
  overflow: auto;
  margin-bottom: 18px;
  font-family: arial;

  &:focus {
    outline: none;
  }
`;

const ContentWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  padding: 10px 16px 32px 16px;
`;

const PostWrapper = styled.div`
  width: 100%;
  border: 1px #cccccc solid;
  margin:8px 0;
  padding:0 25px 25px 25px;
`;

const ToolBar = styled.div`
  width: 100%;
  padding:10px 16px;
  text-align: right;
`;

const PostBody = styled.div`
  width: 100%;
  color: #777777;
  font-size: 16px;
`;

const Submit = styled.button`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid #41addd;
  color: #41addd;

  &:active {
    background: #41addd;
    color: #fff;
  }
`;

export class EditPostPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // handleSubmit() {
  //   alert('in');
  //   if (this.props.title && this.props.username.trim().length > 0 && this.props.body && this.props.body.trim().length > 0) {
  //     this.props.doSave();
  //   }
  //   return false;
  // }
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.props.doSave();
    event.preventDefault();
  }


  render() {
    return (
      <ContentWrapper>
        <Helmet
          title="EditPostPage"
          meta={[
            { name: 'description', content: 'Description of EditPostPage' },
          ]}
        />
        <PostWrapper>
          <H3>Create New Post</H3>
          <PostBody>
            <form>
              <Input type="hidden" id="id" value={this.props.id} name="id" />
              <Input type="hidden" id="userId" value={this.props.userId} name="userId" />
              <Input onChange={this.handleChange} type="text" id="title" value={this.state.title} name="title" placeholder="Post Title" />
              <TextArea onChange={this.handleChange} id="body" value={this.state.body} name="body" placeholder="Post Content" />
              <ToolBar>
                <Submit>Save</Submit>
                <BUTTON>Cancel</BUTTON>
                <div style={{float:'left', marginTop:'10px'}}>
                  <A href="/posts">Back to Posts</A>
                </div>
              </ToolBar>
            </form>
          </PostBody>
        </PostWrapper>
      </ContentWrapper>
    );
  }
}

EditPostPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.object,
  //pdata: PropTypes.array,
  //id: PropTypes.string,
  //userId: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  doSave: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  EditPostPage: makeSelectEditPostPage(),
  post: selectPost(),
});

function mapDispatchToProps(dispatch) {
  return {
    doSave: () => {
      dispatch(savePostAction());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
