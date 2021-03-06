import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';

const HeaderInner = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  text-align: Left;
`;

const Logo = styled(Link)`
  color: #0087BD;
  font-size: 30px;
  font-weight: bold;
  text-decoration:none;
`;

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <HeaderInner>
          <Logo to="/">CRUD APP</Logo>
          <NavBar>
            <HeaderLink activeStyle={{ boxShadow: 'inset 0 -3px 0 #41addd', color: '#666' }} to="/">
              Home Page
            </HeaderLink>
            <HeaderLink activeStyle={{ boxShadow: 'inset 0 -3px 0 #41addd', color: '#666' }} to="/posts">
              Posts Page
            </HeaderLink>
            {/* <HeaderLink activeStyle={{ 'boxShadow': 'inset 0 -3px 0 #41addd', 'color':'#666' }} to="/posts/edit">
              Create Post
            </HeaderLink> */}
          </NavBar>
        </HeaderInner>
      </div>
    );
  }
}

export default Header;
