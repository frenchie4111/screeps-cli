// @flow
import React, { Component } from 'react';
import ReactJson from 'react-json-view'

import styles from './ColoredText.scss';

let SPLIT = '1521847886512'; // Random hopefully unique thing
let REGEX_16 = /<([\dABCDEF][\dABCDEF]) ([^>]*)>/;
let REGEX_HEX = /<#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}) ([^>]*)>/;

export default class ColoredText extends Component {
    parseLine( line ) {
        let output = [];

        let key = 0;

        while( true ) {
            let was_16 = true;
            let piece = REGEX_16.exec( line );
            if( !piece ) {
                was_16 = false;
                piece = REGEX_HEX.exec( line );
            }
            
            if( piece ) {
                let before = line.substr( 0, piece.index );
                let after = line.substr( piece.index + piece[ 0 ].length );

                output.push( <a key={ key++ }>{ before }</a> );

                if( was_16 ) {
                    output.push( <a key={ key++ } className={ styles[ 'color_' + piece[ 1 ] ] }>{ piece[ 2 ] }</a> );
                } else {
                    output.push( <a key={ key++ } className={ styles[ 'color_hex' ] } style={ { color: '#' + piece[ 1 ] } }>{ piece[ 2 ] }</a> );
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
