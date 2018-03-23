// @flow
import React, { Component } from 'react';
import ReactJson from 'react-json-view'

import { parseJSONFromLine } from '../utils/parse';

import styles from './OutputLine.scss';

const react_json_options = {
    collapsed: 1,
    name: false,
    onAdd: false,
    onEdit: false,
    enableClipboard: false,
    displayDataTypes: false
};

export default class OutputLine extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            show_json: false
        };
    }

    onClickJson() {
        this
            .setState( ( prev ) => {
                prev.show_json = !prev.show_json;
                return prev;
            } );
    }

    render() {
        const {
            output_line
        } = this.props;

        let line_json_objects = parseJSONFromLine( output_line.text );

        return (
            <div
                className={ styles.output_line }>
                <div
                    className={ styles.output_line_buttons }>
                    <div
                        className={ styles.output_line_button }
                        onClick={ () => this.onClickJson() }>
                        { "{}" }
                    </div>
                </div>
                <div>
                    { output_line.text }
                    {
                        ( ( this.state.show_json ) ? (
                            line_json_objects
                                .map( ( json_obj, i ) => {
                                    return (
                                        <ReactJson 
                                            key={ i }
                                            src={ json_obj }
                                            { ...react_json_options } />
                                    );
                                } )
                        ) : null )
                    }
                </div>
            </div>
        )
    }
};
