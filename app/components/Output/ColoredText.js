// @flow
import React, { Component } from 'react';
import ReactJson from 'react-json-view'

import { convertSourceMap } from '~/utils/sourcemap';

import styles from './ColoredText.scss';

let SPLIT = '1521847886512'; // Random hopefully unique thing
let REGEX_16 = /<([\dABCDEF][\dABCDEF]) ([^>]*)>/;
let REGEX_HEX = /<#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}) ([^>]*)>/;
let REGEX_ERROR = /<e ([^>]*)>/;

export default class ColoredText extends Component {
    parseLine( line ) {
        let output = [];

        let key = 0;

        while( true ) {
            let line_type = '16';
            let piece = REGEX_16.exec( line );
            if( !piece ) {
                line_type = 'hex'
                piece = REGEX_HEX.exec( line );
            }
            if( !piece ) {
                line_type = 'error'
                piece = REGEX_ERROR.exec( line );
            }
            
            if( piece ) {
                let before = line.substr( 0, piece.index );
                let after = line.substr( piece.index + piece[ 0 ].length );

                output.push( <a key={ key++ }>{ before }</a> );

                if( line_type === '16' ) {
                    output.push( <a key={ key++ } className={ styles[ 'color_' + piece[ 1 ] ] }>{ piece[ 2 ] }</a> );
                } else if( line_type === 'hex' ) {
                    output.push( <a key={ key++ } className={ styles.color_hex } style={ { color: '#' + piece[ 1 ] } }>{ piece[ 2 ] }</a> );
                } else if( line_type === 'error' ) {
                    output.push( <a key={ key++ } className={ styles.color_error }>{ convertSourceMap( piece[ 1 ] ) }</a> );
                }

                line = after;
            } else {
                output.push( <a key={ key++ }>{ line }</a> );
                break;
            }
        }

        return output;
    }

    render() {
        const {
            text
        } = this.props;

        return (
            <span className={ 'asdf' }>
                { this.parseLine( text ) }
            </span>
        )
    }
};
