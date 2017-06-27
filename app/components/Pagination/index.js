/**
*
* Pagination
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

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

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number
}

const defaultProps = {
    initialPage: 1
}

class Pagination extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        var items = this.props.items;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page);

        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        //var pages = _.range(startPage, endPage + 1);
        var pages = [1,2,3,4,5,6,7,8,9,10];

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <Ul className="pagination">
                <Li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <Anchor onClick={() => this.setPage(1)}>First</Anchor>
                </Li>
                <Li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <Anchor onClick={() => this.setPage(pager.currentPage - 1)}>{"<<"}</Anchor>
                </Li>
                {pager.pages.map((page, index) =>
                    <Li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <Anchor onClick={() => this.setPage(page)}>{page}</Anchor>
                    </Li>
                )}
                <Li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <Anchor onClick={() => this.setPage(pager.currentPage + 1)}>{">>"}</Anchor>
                </Li>
                <Li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <Anchor onClick={() => this.setPage(pager.totalPages)}>Last</Anchor>
                </Li>
            </Ul>
        );
    }
}

Pagination.propTypes =  propTypes;
Pagination.defaultProps;

export default Pagination;
