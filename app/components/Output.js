// @flow
import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import ReactJson from 'react-json-view'

import { parseJSONFromLine } from '../utils/parse';

import styles from './Output.scss';

import OutputLine from './OutputLine';

const REFS_OUTPUT_WRAP = 'output-wrap';

const react_json_options = {
    collapsed: 1,
    name: false,
    onAdd: false,
    onEdit: false,
    enableClipboard: false
};

export default class Output extends Component {
    componentDidUpdate() {
        this.refs[ REFS_OUTPUT_WRAP ].scrollTop = this.refs[ REFS_OUTPUT_WRAP ].scrollHeight;
    }

    render() {
        const {
            output
        } = this.props;

        return (
            <div
                className={ styles.output_wrap }
                ref={ REFS_OUTPUT_WRAP }>
                { output.map( ( line, i ) => <OutputLine key={ i } output_line={ line } /> ) }
            </div>
        );
    }
};
