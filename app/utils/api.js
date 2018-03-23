export const requestServer = ( path, body, opts={} ) => {
    let headers = {
        'Content-Type': 'application/json'
    };

    if( opts.token ) {
        headers[ 'X-Token' ] = opts.token;
        headers[ 'X-Username' ] = opts.token;
    }

    return fetch( 'https://screeps.com' + path, Object
        .assign( {
            headers: headers,
            body: JSON.stringify( body ),
            method: 'POST'
        }, opts ) 
    );
};
