/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Helmet from 'react-helmet';

import styled from 'styled-components';

import A from 'components/A';
import BUTTON from 'components/Button';
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
  text-align:center;
  background-color: #ddedfc;
`;

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ContentWrapper>
        <Helmet
          title="Sample Crud App"
          meta={[
            { name: 'description', content: 'Sampel Crud App' },
          ]}
        />
        <PostWrapper>
          <H1>Welcome to React CRUD APP</H1>
        </PostWrapper>
        <img src={require('images/banners.png')} style={{width:'100%'}} />
      </ContentWrapper>
    );
  }
}
