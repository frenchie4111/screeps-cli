import fetch from 'node-fetch';

const requestServer = ( path, body, opts={} ) => {
    let headers = {
        'Content-Type': 'application/json'
    };

    if( opts.token ) {
        headers[ 'X-Token' ] = opts.token;
        headers[ 'X-Username' ] = opts.token;
    }

    let fetch_opts = Object
        .assign( 
            {
                headers: headers,
                body: JSON.stringify( body ),
                method: 'POST'
            }, 
            opts 
        );

    delete fetch_opts.token;

    console.log( fetch_opts );

    return fetch( 'https://screeps.com' + path, fetch_opts );
};

export default { requestServer };
