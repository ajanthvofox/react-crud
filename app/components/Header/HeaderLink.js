import { Link } from 'react-router';
import styled from 'styled-components';

export default styled(Link)`
  display: inline-flex;
  padding: 0.25em 2.5em;
  margin-top: 13px;
  margin-bottom:0;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 0;
  color: #BBB;

  &:active {
    box-shadow: inset 0 -3px 0 41addd;
    color:#666
  }
  &:hover {
    color:#666;
    box-shadow: inset 0 -3px 0 41addd;
  }
`;
