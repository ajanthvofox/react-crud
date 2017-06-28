/*
 *
 * SinglePostPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import Loader from 'react-loader';
import { confirmAlert } from 'react-confirm-alert';
import 'css/react-confirm-alert.css';
import { notify } from 'react-notify-toast';
import BUTTON from 'components/Button';
import H3 from 'components/H3';
import {
  makeSelectSinglePostPage,
  selectPost,
  selectLoading,
} from './selectors';
import {
  loadPostAction,
  changePostId,
  deletePostAction,
} from './actions';

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

const EditLink = styled(Link)`
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

export class SinglePostPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.onChangePostId(this.props.params.id);
  }

  componentDidMount() {
    this.props.doLoad();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post && nextProps.post.success === 'Success') {
      notify.show('Post Deleted Successfully', 'success');
      this.props.router.push('/posts');
    }
    if (nextProps.post && nextProps.post.error === 'Error') {
      notify.show('Failed Deleting the Post', 'error');
    }
  }

  componentWillUnmount() {
    const myElem = document.getElementById('react-confirm-alert');
    if (myElem) {
      document.getElementById('react-confirm-alert').remove();
      document.getElementById('react-confirm-alert-firm-svg').remove();
    }
  }

  submit = () => {
    confirmAlert({
      title: 'Delete Post',                        // Title dialog
      message: 'Are you sure you want to delete this post?',               // Message dialog
      confirmLabel: 'Confirm',                           // Text button confirm
      cancelLabel: 'Cancel',                             // Text button cancel
      onConfirm: () => this.props.doDelete(),    // Action after Confirm
      // onCancel: () => alert('Action after Cancel'),      // Action after Cancel
    });
  };

  render() {
    let postData = [];
    if (this.props.post) {
      postData = this.props.post;
    }
    return (
      <Loader
        loaded={this.props.post && this.props.post.loading !== 'Loading' && this.props.loading !== 'Loading'}
        lines={13} length={20} width={10} radius={30}
        corners={1} rotate={0} direction={1} color="#000" speed={1}
        trail={60} shadow={false} hwaccel={false} className="spinner"
        zIndex={2e9} top="50%" left="50%" scale={1.00}
        loadedClassName="loadedContent">
        <ContentWrapper>
          <Helmet
            title="View Post"
            meta={[
              { name: 'description', content: 'View post' },
            ]}
          />
          <div>
            <PostWrapper>
              <H3>{ postData.id }. { postData.title }</H3>
              <PostBody>
                { postData.body }
                <ToolBar>
                  <EditLink to={'/posts/edit/' + postData.id}>Edit</EditLink>
                  <BUTTON onClick={this.submit}>Delete</BUTTON>
                  <div style={{ float: 'left', marginTop: '10px' }}>
                    <Link style={{ color: '#41addd', fontWeight: 'bold', textDecoration: 'none' }} to="/posts">{'<< Back to Posts'}</Link>
                  </div>
                </ToolBar>
              </PostBody>
            </PostWrapper>
          </div>
        </ContentWrapper>
      </Loader>
    );
  }
}

SinglePostPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.object,
  pid: PropTypes.string,
  loading: PropTypes.string,
  doLoad: PropTypes.func,
  doDelete: PropTypes.func,
  onChangePostId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  SinglePostPage: makeSelectSinglePostPage(),
  post: selectPost(),
  loading: selectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangePostId: (pid) => dispatch(changePostId(pid)),
    doLoad: () => {
      dispatch(loadPostAction());
    },
    doDelete: () => {
      dispatch(deletePostAction());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePostPage);
