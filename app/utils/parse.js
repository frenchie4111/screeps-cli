import _ from 'underscore';

const OPEN_BRACKETS = [ '[', '{' ];
const CLOSE_BRACKETS = [ ']', '}' ];

const parseJSONFromLine = ( line ) => {
    let characters = line.split( '' );

    let bracket_count = 0;
    let possible_json_positions = [];
    characters
        .forEach( ( char, i ) => {
            if( OPEN_BRACKETS.includes( char ) ) {
                if( bracket_count === 0 ) {
                    possible_json_positions.push( [ i ] );
                }
                bracket_count ++;
            }
            if( CLOSE_BRACKETS.includes( char ) ) {
                bracket_count --;
                if( bracket_count === 0 ) {
                    possible_json_positions[ possible_json_positions.length - 1 ].push( i );
                }
            }
        } );

    let json = [];
    _
        .forEach( possible_json_positions, ( position ) => {
            let substr = line.substr( position[ 0 ], position[ 1 ] - position[ 0 ] + 1 );
            try {
                let parsed = JSON.parse( substr );
                json.push( parsed );
            } catch( e ) {
                
            }
        } );

    return json;
};

export default { parseJSONFromLine };
