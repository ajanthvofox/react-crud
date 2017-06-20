/*
 *
 * SinglePostPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectSinglePostPage,
  selectPost,
  selectPostId
} from './selectors';
import {
  loadPostAction
} from './actions';
import messages from './messages';
import A from 'components/A';
import BUTTON from 'components/BUTTON';
import H1 from 'components/H1';
import H2 from 'components/H2';
import H3 from 'components/H3';

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

export class SinglePostPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props)
    // call the fetch when the component starts up
    console.log(this.props.params.id);
    window.postId = this.props.params.id;
    //this.prop.postId = this.props.params.id;
    this.props.doLoad()
  }

  render() {
    let postData = [];
    if (this.props.post) {
      postData = this.props.post
    }
    return (
      <ContentWrapper>
        <Helmet
          title="View Post"
          meta={[
            { name: 'description', content: 'View post' },
          ]}
        />
        <div>
           <PostWrapper>
             <H3>{postData.id}. {postData.title}</H3>
             <PostBody>
               {postData.body}
               <ToolBar>
                 <BUTTON>Edit</BUTTON>
                 <BUTTON>Delete</BUTTON>
                 <div style={{float:'left', marginTop:'10px'}}>
                   <A href="/posts">Back to Posts</A>
                 </div>
               </ToolBar>
             </PostBody>
           </PostWrapper>
        </div>
      </ContentWrapper>
    );
  }
}

SinglePostPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.object,
  postId: PropTypes.string,
  doLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  SinglePostPage: makeSelectSinglePostPage(),
  post: selectPost(),
});

function mapDispatchToProps(dispatch) {
  return {
    doLoad: (id) => {
      dispatch(loadPostAction());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePostPage);
