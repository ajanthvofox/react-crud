/*
 *
 * EditPostPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Notifications, {notify} from 'react-notify-toast';
import Loader from 'react-loader';
import {
  makeSelectEditPostPage,
  selectPostId,
  selectPost,
  selectLoading,
} from './selectors';
import {
  resetPostAction,
  savePostAction,
  iniPostData,
  loadPostAction,
  changePostId,
} from './actions';
import messages from './messages';

import A from 'components/A';
import BUTTON from 'components/Button';
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

const Button =  styled.button`
  display: inline-block;
  box-sizing: border-box;
  line-height: 1.5;
  margin-left:10px;
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
  &:disabled {
    color: #81d8dd;
    border: 2px solid #81d8dd;
    cursor: not-allowed;
  }
`;

const BackLink =  styled(Link)`
  display: inline-block;
  box-sizing: border-box;
  margin-left:10px;
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

  constructor(props) {
      super(props);
      if(this.props.params.id) {
        this.state = {
          id: '',
          title: '',
          body: '',
          userId: '1'
        }
      }
      else {
        this.state = {
          title: '',
          body: '',
          userId: '1'
        }
      }
    }
  componentWillMount() {
      this.props.doReset();
      if(this.props.params.id) {
        this.props.onChangePostId(this.props.params.id);
      }
  }
  componentDidMount() {
    if(this.props.params.id) {
      this.props.doLoad();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.post.success == "Success") {
      notify.show('Post Saved Successfully','success');
      this.props.router.push('/posts');
    }
    if (nextProps.post.error == 'Error') {
      notify.show('Failed Saving the Post','error');
    }
    if(nextProps.post && nextProps.post.title !== '')
    {
      this.setState(nextProps.post);
    }
  }
  onChangeTitle(e) {
    this.setState({['title']: e.target.value});
  }
  onChangeBody(e) {
    this.setState({['body']: e.target.value});
  }
  submitPost(e) {
    this.props.doSave (this.state);
  }
  render() {
    let backBtn = null;
    let head = null;
    if(this.props.params.id) {
      backBtn = <Link style={{color:'#41addd', fontWeight:'bold', textDecoration:'none'}} to={"/posts/"+this.props.pid}>{"<< Back to Post"}</Link>;
      head = <H3>Edit Post - {this.props.pid}</H3>;
    }
    else {
      backBtn = <Link style={{color:'#41addd', fontWeight:'bold', textDecoration:'none'}} to="/posts">{"<< Back to Posts"}</Link>;
      head = <H3>Create New Post</H3>;
    }
    return (
      <Loader loaded={this.props.post && this.props.post.loading!=='Loading' && this.props.loading!=='Loading'} lines={13} length={20} width={10} radius={30}
      corners={1} rotate={0} direction={1} color="#000" speed={1}
      trail={60} shadow={false} hwaccel={false} className="spinner"
      zIndex={2e9} top="50%" left="50%" scale={1.00}
      loadedClassName="loadedContent">
        <ContentWrapper>
          <Helmet
            title="EditPostPage"
            meta={[
              { name: 'description', content: 'Description of EditPostPage' },
            ]}
          />
          <PostWrapper>
            {head}
            <PostBody>
                <Input value={this.state.title} onChange={(value) => this.onChangeTitle(value)} ref="titleInput" type="text" id="title" name="title" placeholder="Post Title" />
                <TextArea value={this.state.body} onChange={(value) => this.onChangeBody(value)} ref="bodyInput" id="body" name="body" placeholder="Post Content" />
                <ToolBar>
                  <Button disabled={!this.state.title || !this.state.body} onClick={() => this.submitPost()}>Save</Button>
                  <BackLink to="/posts">Cancel</BackLink>
                  <div style={{float:'left', marginTop:'10px'}}>
                    {backBtn}
                  </div>
                </ToolBar>
            </PostBody>
          </PostWrapper>
        </ContentWrapper>
      </Loader>
    );
  }
}

EditPostPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.object,
  pid: PropTypes.string,
  loading: PropTypes.string,
  doSave: PropTypes.func,
  doLoad: PropTypes.func,
  doReset: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  EditPostPage: makeSelectEditPostPage(),
  post: selectPost(),
  pid: selectPostId(),
  loading: selectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    doSave: (state) => {
      dispatch(savePostAction(state));
    },
    onChangePostId: (pid) => dispatch(changePostId(pid)),
    doLoad: () => {
      dispatch(loadPostAction());
    },
    doReset: () => {
      dispatch(resetPostAction());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
