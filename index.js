/**
 * Sarcastik-CMS
 */

/**
 * Declare Globals
 */
_ = require('underscore');
config = require('./config.json');

/**
 * Initialize Hapi
 */
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 8080 });

/**
 * Handle Authentication
 */
server.register(require('hapi-auth-jwt2'), function(err){
	if(err){
		throw err;
	} else{
		server.auth.strategy('jwt', 'jwt', {
			key: config.JWTEncryptionKey,
			validateFunc : function(decoded, request, callback){
				// Check if the token has a username
				// TODO: actually check that the token is valid
				if (decoded.username) {
					return callback(null, true);
				}
				else {
					return callback(null, false);
				}
			},
			verifyOptions : {
				algorithms: [config.JWTAlgorithm]
			}
		});

		//Use JWT for authentication
		server.auth.default('jwt');
	}
});

/**
 * Add Routes
 */
server.register([
	{register: require('./routes/index')}
]);

/**
 * Start the Server
 */
server.start((err) => {

	if (err) {
		throw err;
	}
	console.log('Sarcastik-CMS running at:', server.info.uri);
});