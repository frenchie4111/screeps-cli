// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from '../routes';

import Output from '../components/Output';

import websocket from '../actions/websocket';

import styles from './Terminal.css'

class Terminal extends Component {
    componentDidMount() {
        const {
            initWebsocket
        } = this.props;

        initWebsocket();
    }

    render() {
        const {
            output
        } = this.props;

        return (
            <div
                id={ styles.terminal_wrap }>
                <Output
                    output={ output } />
            </div>
        );
    }
};

Terminal = connect(
    ( state ) => {
        return {
            output: state.output.messages
        };
    },
    ( dispatch, props ) => {
        return {
            initWebsocket: () => {
                return dispatch( websocket.init() );
            }
        };
    }
)( Terminal );

export default Terminal;
