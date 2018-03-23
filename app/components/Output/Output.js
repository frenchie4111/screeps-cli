// @flow
import React, { Component } from 'react';

import styles from './Output.scss';

import OutputLine from './OutputLine';

const REFS_OUTPUT_WRAP = 'output-wrap';

export default class Output extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            scroll_lock: true
        };
    }
    componentDidUpdate() {
        let elm = this.refs[ REFS_OUTPUT_WRAP ];
        if( this.props.scroll_lock ) {
            elm.scrollTop = elm.scrollHeight;
        }
    }

    setScrollLock( new_value ) {
        if( this.props.scroll_lock !== new_value ) {
            this.props.setScrollLock( new_value );
        }
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
