var winston = require.main.require('winston');
var Meta = require.main.require('./src/meta');

var Emailer = module.exports;
var Mailjet = require('node-mailjet');
var server;

Emailer.init = function(params, callback) {
	function render(req, res, next) {
		res.render('admin/plugins/emailer-mailjet', {
			title: 'Emailer (Mailjet)',
		});
	}

	Meta.settings.get('mailjet', function(err, settings) {
		if (!err && settings && settings.apiKey && settings.secretKey) {
			server = Mailjet.apiConnect(settings.apiKey, settings.secretKey);
		} else {
			winston.error('[plugins/emailer-mailjet] API key or SECRET Key not set!');
		}
	});

	params.router.get('/admin/plugins/emailer-mailjet', params.middleware.admin.buildHeader, render);
	params.router.get('/api/admin/plugins/emailer-mailjet', render);

	callback();
};

Emailer.send = function(data, callback) {
	if (!server) {
		winston.error('[emailer.mailjet] Mailjet is not set up properly!')
		return callback(null, data);
	}

	var sendEmail = server.post('send', { version: 'v3.1' });
	var emailData = {
		Messages: [
			{
				From: {
					Email: data.from,
					Name: data.from_name,
				},
				To: [
					{
						Email: data.to,
					}
				],
				'Subject': data.subject,
				TextPart: data.plaintext,
				HTMLPart: data.html,
			}
		]
	};

	sendEmail
		.request(emailData)
		.then(() => {
			callback(null, data);
		})
		.catch((err) => {
			callback(err);
		});
};

Emailer.admin = {
	menu: function(custom_header, callback) {
		custom_header.plugins.push({
			"route": '/plugins/emailer-mailjet',
			"icon": 'fa-envelope-o',
			"name": 'Emailer (Mailjet)'
		});

		callback(null, custom_header);
	}
};
