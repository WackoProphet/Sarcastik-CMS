/**
 * Index Routes
 */
var Joi = require('joi');
var jwt = require('jsonwebtoken');

exports.register = function(server, options, next) {
	server.route([
		{
			method: 'GET',
			path: '/',
			config : {
				auth: false,
				handler: function (request, reply) {
					reply('Sarcastik-CMS');
				}
			}
		},
		{
			method  : 'POST',
			path    : '/login',
			config  : {
				auth: false,
				validate : {
					payload : {
						username : Joi.string().required(),
						password : Joi.string().required()
					}
				},
				handler : function(request, reply) {
					// TODO: Verify the user's credentials in request.payload

					// Strip the password before it gets added to the token
					request.payload = _.omit(request.payload, 'password');

					// Create auth token
					jwt.sign(request.payload, config.JWTEncryptionKey, {algorithm: config.JWTAlgorithm}, function(token) {
						// TODO: Store the token for future verification

						// Respond with the auth token
						reply({
							statusCode : 200,
							message : 'Successful Login',
							token : token
						});
					});
				}
			}
		},
		{
			method  : 'GET',
			path    : '/whoami',
			config  : {
				handler : function(request, reply){
					// Respond with the user's credentials from the auth token
					reply(request.auth.credentials);
				}
			}
		}
	]);
	next();
};

exports.register.attributes = {
    name: 'index'
};