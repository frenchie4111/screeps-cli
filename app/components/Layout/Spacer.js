// @flow
import React, { Component } from 'react';

import styles from './Spacer.scss';

export default class Spacer extends Component {
    render() {
        const {
            children
        } = this.props;

        return (
            <div className={ styles.spacer }></div>
        );
    }
};
