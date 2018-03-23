import path from 'path';
import fs from 'fs';
import _ from 'underscore';

const CONFIG_PATHS = [
    path.join( process.cwd(), '.screepscli' ),
    '~/.screepscli',
    './.screepscli'
];

const loadToken = async () => {
    let config_path = _
        .find( CONFIG_PATHS, ( possible_config_path ) => {
            return fs.existsSync( possible_config_path )
        } );

    if( !config_path ) throw new Error( 'No config found' );

    console.log( 'Using config path ', config_path );

    return fs.readFileSync( config_path ).toString().trim();
};

export default { loadToken };
