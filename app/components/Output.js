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
    constructor( props ) {
        super( props );

        this.state = {
            scroll_lock: true
        };
    }
    componentDidUpdate() {
        let elm = this.refs[ REFS_OUTPUT_WRAP ];
        if( this.state.scroll_lock ) {
            elm.scrollTop = elm.scrollHeight;
        }
    }

    setScrollLock( new_val ) {
        if( new_val === this.state.scroll_lock ) return;
        this
            .setState( ( prev ) => {
                prev.scroll_lock = new_val;
                return prev;
            } );
    }

    onScroll() {
        let elm = this.refs[ REFS_OUTPUT_WRAP ];
        let at_bottom = ( elm.scrollTop === elm.scrollHeight - elm.clientHeight );
        this.setScrollLock( at_bottom );
    }

    render() {
        const {
            output
        } = this.props;

        return (
            <div
                className={ styles.output_wrap }
                ref={ REFS_OUTPUT_WRAP }
                onScroll={ this.onScroll.bind( this ) }>
                { output.map( ( line, i ) => <OutputLine key={ i } output_line={ line } /> ) }
            </div>
        );
    }
};
