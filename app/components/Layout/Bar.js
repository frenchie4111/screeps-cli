// @flow
import React, { Component } from 'react';

import styles from './Bar.scss';

export default class Bar extends Component {
    constructor( props ) {
        super( props );

        this.state = {};
    }

    render() {
        const {
            children
        } = this.props;

        return (
            <div
                className={ styles.bar }>
                { children }
            </div>
        );
    }
};
