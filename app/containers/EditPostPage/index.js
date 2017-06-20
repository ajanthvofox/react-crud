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
import makeSelectEditPostPage from './selectors';
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

export class EditPostPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
            <Input name="title" placeholder="Post Title" />
            <TextArea name="title" placeholder="Post Content" />
            <ToolBar>
              <BUTTON>Save</BUTTON>
              <BUTTON>Cancel</BUTTON>
              <div style={{float:'left', marginTop:'10px'}}>
                <A href="/posts">Back to Posts</A>
              </div>
            </ToolBar>
          </PostBody>
        </PostWrapper>
      </ContentWrapper>
    );
  }
}

EditPostPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  EditPostPage: makeSelectEditPostPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
