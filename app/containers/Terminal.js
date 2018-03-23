// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import Routes from '~/routes';

import websocket from '~/actions/websocket';
import input_actions from '~/actions/input';
import output_actions from '~/actions/output';

import Output from '~/components/Output';
import { FilterInput, GoToBottom } from '~/components/Input';
import { Bar, Spacer } from '~/components/Layout';

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
            scroll_lock,
            setScrollLock,

            filter,
            filterChanged
        } = this.props;

        return (
            <div
                id={ styles.terminal_wrap }>
                <Bar>
                    <Spacer />
                    <GoToBottom
                        show={ !scroll_lock }
                        onClick={ () => setScrollLock( true ) } />
                    <FilterInput
                        filter={ filter }
                        filterChanged={ filterChanged } />
                </Bar>
                <Output
                    output={ output }
                    scroll_lock={ scroll_lock }
                    setScrollLock={ setScrollLock } />
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
            filter,
            scroll_lock: state.output.scroll_lock
        };
    },
    ( dispatch, props ) => {
        return {
            initWebsocket: () => {
                return dispatch( websocket.init() );
            },
            filterChanged: ( new_filter ) => {
                return dispatch( input_actions.filterChanged( new_filter ) );
            },
            setScrollLock: ( new_value ) => {
                return dispatch( output_actions.setScrollLock( new_value ) );
            }
        };
    }
)( Terminal );

export default Terminal;
