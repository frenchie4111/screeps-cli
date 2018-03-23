// @flow
import React, { Component } from 'react';

import styles from './FilterInput.scss';

export default class FilterInput extends Component {
    constructor( props ) {
        super( props );

        this.state = {};
    }

    render() {
        const {
            filter,
            filterChanged
        } = this.props;

        return (
            <div
                className={ styles.filter_input_wrap }>
                <label htmlFor="filter-input">Filter: </label>
                <input name="filter-input" type="text" value={ filter } onChange={ ( event ) => filterChanged( event.target.value ) } />
            </div>
        );
    }
};
