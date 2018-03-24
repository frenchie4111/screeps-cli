const path = require( 'path' ),
    fs = require( 'fs' ),
    _ = require( 'underscore' );

let stacktrace = require( 'stack-trace' );

// HACK: Undefine fetch so source-map doesn't think we are in browser mode
let old_fetch = global.fetch;
global.fetch = null;
const sourceMap = require('source-map');
global.fetch = old_fetch;

let consumer = null;
let rel = null;

let init = ( file_path, opts={ rel: 'webpack:///' } ) => {
    if( consumer ) return consumer;

    rel = opts.rel;
    let source_map_file_path = path.join( __dirname, '../', '../', 'screeps', 'dist', 'main', 'main.js.map' );
    let raw_source_map = fs.readFileSync( source_map_file_path ).toString();

    new sourceMap.SourceMapConsumer( raw_source_map )
        .then( ( new_consumer ) => {
            consumer = new_consumer;
        } )
        .catch( ( err ) => console.error( err ) );
};

let convertSourceMap = ( unconverted_error_stack ) => {
    if( !consumer ) {
        return unconverted_error_stack
    }
    let error_name = unconverted_error_stack.split( '\n' )[ 0 ];

    let stacktrace_lines = stacktrace.parse( { stack: unconverted_error_stack } );
    let converted_lines = _
        .chain( stacktrace_lines )
        .map( ( original_stack_trace_line ) => {
            let converted_line = consumer
                .originalPositionFor( { 
                    line: original_stack_trace_line.lineNumber, 
                    column: original_stack_trace_line.columnNumber 
                } );
            converted_line.original = original_stack_trace_line;
            return converted_line;
        } )
        .map( ( converted_line ) => {
            if( converted_line.source ) {
                return `    at ${ converted_line.name || '<Anonymous>' } (${ converted_line.source.replace( rel, '' ) }:${ converted_line.line }:${ converted_line.column })`;
            } else {
                if( converted_line.original.functionName ) {
                    return `    at ${ converted_line.original.functionName } (${ converted_line.original.fileName }:${ converted_line.original.lineNumber }:${ converted_line.original.columnNumber })`;
                } else {
                    return `    at ${ converted_line.original.fileName }:${ converted_line.original.lineNumber }:${ converted_line.original.columnNumber }`;
                }
            }
        } )
        .value();

    return [ error_name ].concat( converted_lines ).join( '\n' );
}

init();
export default { convertSourceMap };
