/*
 *
 * PostsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Loader from 'react-loader';
import Pagination from 'components/Pagination';
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

const AddLink =  styled(Link)`
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

export class PostsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor (props) {
    super(props)
    // call the fetch when the component starts up
    this.props.doLoad();

    this.state = {
        pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
      // update state with new page of items
      this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    let postData = [];
    if (this.props.posts && !this.props.posts.loading) {
      postData = this.props.posts
    }
    return (
      <Loader loaded={typeof this.props.posts !== 'undefined'} lines={13} length={20} width={10} radius={30}
      corners={1} rotate={0} direction={1} color="#000" speed={1}
      trail={60} shadow={false} hwaccel={false} className="spinner"
      zIndex={2e9} top="50%" left="50%" scale={1.00}
      loadedClassName="loadedContent">
        <ContentWrapper>
          <Helmet
            title="View All Posts"
            meta={[
              { name: 'description', content: 'List all posts' },
            ]}
          />
          <H2>All Posts <div style={{float:'right'}}><AddLink to="posts/edit">Add New</AddLink></div></H2>
          <div>
            {
              this.state.pageOfItems.map((row, index) => {
                 return (
                   <PostWrapper key={index}>
                     <H3>{row.id}. {row.title}</H3>
                     <PostBody>
                       {row.body.substr(0,70)}...<Link style={{color:'#41addd', fontWeight:'bold', textDecoration:'none', fontSize:'15px'}} to={"/posts/"+row.id}> Read More >></Link>
                     </PostBody>
                   </PostWrapper>
                 );
              })
            }
            <Pagination items={postData} onChangePage={this.onChangePage} />
          </div>
        </ContentWrapper>
      </Loader>
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
