// @flow
import React, { Component } from 'react';

import styles from './Input.scss';

export default class Output extends Component {
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
                className={ styles.input_wrap }>
                <input type="text" value={ filter } onChange={ ( event ) => filterChanged( event.target.value ) } />
            </div>
        );
    }
};
