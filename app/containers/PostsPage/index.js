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
import { createStructuredSelector } from 'reselect';
import Loader from 'react-loader';

import H2 from 'components/H2';
import H3 from 'components/H3';

import {
  makeSelectPostsPage,
  selectPosts,
  selectLoading,
  selectPage,
} from './selectors';
import {
  loadPostsAction,
  loadSetPage,
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

const PostBody = styled.div`
  width: 100%;
  color: #777777;
  font-size: 16px;
`;

const AddLink = styled(Link)`
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

const Ul = styled.ul`
  float:right;
`;

const Li = styled.li`
  float:left;
  color:#41addd;
  font-size:16px;
  font-weight:bold;
  cursor:pointer;
  list-style: none;
  &.disabled {
    color: #81d8dd;
    cursor: not-allowed;
  }
  &.active a {
    background-color: #41addd;
    color: #fff;
    cursor: default;
  }
`;
const Anchor = styled.a`
  padding:7px 12px;
  -moz-box-shadow:    inset 0 0 2px #41addd;
  -webkit-box-shadow: inset 0 0 2px #41addd;
  box-shadow:inset 0 0 2px #41addd;
`;

export class PostsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    if (this.props.page) {
      this.state = {
        currentPage: this.props.page,
        pages: Array.from(new Array(10), (x, i) => i + 1),
        totalPages: 10,
      };
    }
    else {
      this.state = {
        currentPage: 1,
        pages: Array.from(new Array(10), (x, i) => i + 1),
        totalPages: 10,
      };
    }

  }

  componentWillMount() {
    this.props.doLoad(this.state.currentPage);
  }

  setPage(page) {
    this.setState({ ['currentPage']: page });
    this.props.currentPage(page);
    this.props.doLoad(page);
  }

  render() {
    let postData = [];
    if (this.props.posts && !this.props.posts.loading) {
      postData = this.props.posts;
    }
    let style = {};
    if(this.props.loading === 'Loading') {
      style = { opacity: '0.5' };
    }
    return (
      <Loader
        loaded={typeof this.props.posts !== 'undefined'}
        lines={13} length={20} width={10} radius={30}
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
          <H2>All Posts <div style={{ float: 'right' }}><AddLink to="posts/edit">Add New</AddLink></div></H2>
          <Loader loaded={this.props.loading !== 'Loading'} lines={10} length={7} width={3} radius={10}
            corners={1} rotate={0} direction={1} color="#41addd" speed={1}
            trail={60} shadow={false} hwaccel={false} className="spinner"
            zIndex={2e9} top="45%" left="50%" scale={1.00} opacity={0.6}
            position="fixed" loadedClassName="loadedContent">
          </Loader>
          <div style={style}>
            {
              postData.map((row, index) => {
                return (
                  <PostWrapper key={index}>
                    <H3><Link style={{ color: '#333', fontWeight: 'bold', textDecoration: 'none' }} to={'/posts/' + row.id}>{row.id}. {row.title}</Link></H3>
                    <PostBody>
                      { row.body.substr(0, 70) }...<Link style={{ color: '#41addd', fontWeight: 'bold', textDecoration: 'none', fontSize: '15px' }} to={'/posts/' + row.id}>{' Read More >>'}</Link>
                    </PostBody>
                  </PostWrapper>
                );
              })
            }
          </div>

          <Ul className="pagination">
            <Li className={this.state.currentPage === 1 ? 'disabled' : ''}>
              <Anchor onClick={() => this.setPage(1)}>First</Anchor>
            </Li>
            <Li className={this.state.currentPage === 1 ? 'disabled' : ''}>
              <Anchor onClick={() => this.setPage(this.state.currentPage - 1)}>{'<<'}</Anchor>
            </Li>
            {this.state.pages.map((page, index) =>
              <Li key={index} className={this.state.currentPage === page ? 'active' : ''}>
                <Anchor onClick={() => this.setPage(page)}>{page}</Anchor>
              </Li>
            )}
            <Li className={this.state.currentPage === this.state.totalPages ? 'disabled' : ''}>
              <Anchor onClick={() => this.setPage(this.state.currentPage + 1)}>{'>>'}</Anchor>
            </Li>
            <Li className={this.state.currentPage === this.state.totalPages ? 'disabled' : ''}>
              <Anchor onClick={() => this.setPage(this.state.totalPages)}>Last</Anchor>
            </Li>
          </Ul>

        </ContentWrapper>
      </Loader>
    );
  }
}

PostsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.array,
  loading: PropTypes.string,
  doLoad: PropTypes.func,
  currentPage: PropTypes.func,
  page: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  PostsPage: makeSelectPostsPage(),
  posts: selectPosts(),
  loading: selectLoading(),
  page: selectPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    doLoad: (page) => {
      dispatch(loadPostsAction(page));
    },
    currentPage: (page) => {
      dispatch(loadSetPage(page));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
