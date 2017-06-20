/*
 *
 * PostsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectPostsPage from './selectors';
import messages from './messages';

export class PostsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="PostsPage"
          meta={[
            { name: 'description', content: 'Description of PostsPage' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

PostsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  PostsPage: makeSelectPostsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
