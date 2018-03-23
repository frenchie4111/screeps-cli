// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import Routes from '~/routes';

import websocket from '~/actions/websocket';
import input_actions from '~/actions/input';

import Output from '~/components/Output';
import Input from '~/components/Input';

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
            output,

            filter,
            filterChanged
        } = this.props;

        return (
            <div
                id={ styles.terminal_wrap }>
                <Output
                    output={ output } />
                <Input
                    filter={ filter }
                    filterChanged={ filterChanged } />
            </div>
        );
    }
};

const filterMessages = ( filter, messages ) => {
    return _.filter( messages, ( message ) => message.text.includes( filter ) );
};

Terminal = connect(
    ( state ) => {
        let filter = state.input.filter;

        return {
            output: filterMessages( filter, state.output.messages ),
            filter
        };
    },
    ( dispatch, props ) => {
        return {
            initWebsocket: () => {
                return dispatch( websocket.init() );
            },
            filterChanged: ( new_filter ) => {
                return dispatch( input_actions.filterChanged( new_filter ) );
            }
        };
    }
)( Terminal );

export default Terminal;
