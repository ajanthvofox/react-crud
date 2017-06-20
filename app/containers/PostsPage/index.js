/*
 *
 * PostsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectPostsPage,
  selectPosts
} from './selectors';
import {
  loadPostsAction
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

const PostBody = styled.div`
  width: 100%;
  color: #777777;
  font-size: 16px;
`;

export class PostsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor (props) {
    super(props)
    // call the fetch when the component starts up
    this.props.doLoad()
  }

  render() {
    let postData = [];
    if (this.props.posts) {
      postData = this.props.posts
    }
    //console.log(postData);
    return (
      <ContentWrapper>
        <Helmet
          title="View All Posts"
          meta={[
            { name: 'description', content: 'List all posts' },
          ]}
        />
        <H2>All Posts <div style={{float:'right'}}><BUTTON>Add New</BUTTON></div></H2>
        <div>
          {
            postData.map((row, index) => {
               return (
                 <PostWrapper key={index}>
                   <H3>{row.id}. {row.title}</H3>
                   <PostBody>
                     {row.body.substr(0,70)}...<A href={"/posts/"+row.id}>Read More</A>
                   </PostBody>
                 </PostWrapper>
               );
            })
          }
        </div>
      </ContentWrapper>
    );
  }
}

PostsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.array,
  doLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  PostsPage: makeSelectPostsPage(),
  posts: selectPosts(),
});

function mapDispatchToProps(dispatch) {
  return {
    doLoad: () => {
      dispatch(loadPostsAction());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
