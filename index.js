/**
 * Sarcastik-CMS
 */

/**
 * Declare Globals
 */
_ = require('underscore');

/**
 * Initialize Hapi
 */
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 8080 });

/**
 * Add Routes
 */
server.route({
	method: 'GET',
	path: '/',
	handler: function (request, reply) {
		reply('Sarcastik-CMS');
	}
});

/**
 * Start the Server
 */
server.start((err) => {

	if (err) {
		throw err;
	}
	console.log('Sarcastik-CMS running at:', server.info.uri);
});