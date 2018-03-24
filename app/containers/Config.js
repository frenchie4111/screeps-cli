// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import _ from 'underscore';

import { Bar, Spacer } from '~/components/Layout';

import config from '~/utils/config';

import styles from './Config.scss';

class Config extends Component {
    render() {
        const {
            handleSubmit
        } = this.props;

        return (
            <div
                id={ styles.config_wrap }>
                <Bar>
                    Screeps CLI Config
                </Bar>

                <form
                    onSubmit={ handleSubmit }>
                    <div>
                        <label htmlFor="token">
                            Screeps API Token
                        </label>
                        <Field name="token" component="input" type="text" />
                    </div>

                    <div>
                        <label htmlFor="token">
                            SourceMap Path
                        </label>
                        <Field name="sourcemap.path" component={
                            ( field ) => {
                                console.log( field );
                                return (
                                    <div
                                        className={ styles.field_file_input }>
                                        <input
                                            type="file"
                                            onChange={
                                                ( e ) => {
                                                    e.preventDefault();
                                                    let files = _.map( e.target.files, file => file.path )
                                                    field.input.onChange( files[ 0 ] )
                                                }
                                            }
                                            id="Config_sourcemap_path_file_select"
                                            style={ { display: 'none' } } />
                                        <input 
                                            type="button"
                                            value="Browse..."
                                            onClick={ () => {
                                                // HACK: So that we can hide the selected file
                                                document.getElementById( 'Config_sourcemap_path_file_select' ).click();
                                            } } />
                                        { field.input.value }
                                    </div>
                                );
                            }
                        } />
                    </div>

                    <div>
                        <label htmlFor="sourcemap.rel">
                            SourceMap Relative Path (Will be cleared from filepaths in error output)
                        </label>
                        <Field name="sourcemap.rel" component="input" type="text" />
                    </div>

                    <input type="submit" value="Save" />
                    <Link to="/">
                        Quit
                    </Link>
                </form>
            </div>
        );
    }
};

Config = reduxForm( {
    form: 'config',
    onSubmit: ( values ) => {
        config.set( 'token', values.token );
        console.log( values );
        config.set( 'sourcemap.path', values.sourcemap.path );
        config.set( 'sourcemap.rel', values.sourcemap.rel );
    }
} )( Config );

Config = connect(
    () => {
        return {
            initialValues: config.get()
        };
    }
)( Config );

export default Config;
