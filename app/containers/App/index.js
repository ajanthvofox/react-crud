/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import Header from 'components/Header';

const HeaderContainer = styled.div`
  width: 100%;
  color: #0087BD;
  font-size: 30px;
  font-weight: bold;
  padding:15px 40px 0px 40px;
  box-shadow: 0 4px 4px -2px gray;
`;



export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        <HeaderContainer>
          <Header/>
        </HeaderContainer>
        <div>
          {React.Children.toArray(this.props.children)}
        </div>
      </div>
    );
  }
}
