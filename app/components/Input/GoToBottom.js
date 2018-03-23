// @flow
import React, { Component } from 'react';

import styles from './GoToBottom.scss';

export default class GoToBottom extends Component {
    constructor( props ) {
        super( props );

        this.state = {};
    }

    render() {
        const {
            show,
            onClick
        } = this.props;

        if( !show ) return null;

        return (
            <div
                className={ styles.go_to_bottom_wrap }
                onClick={ onClick }>
                Go To Bottom
            </div>
        );
    }
};
