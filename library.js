const winston = require.main.require('winston');
const Meta = require.main.require('./src/meta');

const Emailer = module.exports;
const { Client } = require('node-mailjet');
let mailJet;

Emailer.init = async function (params) {
	function render(req, res, next) {
		res.render('admin/plugins/emailer-mailjet', {
			title: 'Emailer (Mailjet)',
		});
	}

	const settings = await Meta.settings.get('mailjet');
	if (settings && settings.apiKey && settings.secretKey) {
		mailJet = new Client({
			apiKey: settings.apiKey,
			apiSecret: settings.secretKey
		});
	} else {
		winston.error('[plugins/emailer-mailjet] API key or SECRET Key not set!');
	}

	params.router.get('/admin/plugins/emailer-mailjet', params.middleware.admin.buildHeader, render);
	params.router.get('/api/admin/plugins/emailer-mailjet', render);
};

Emailer.send = async function (data) {
	if (!mailJet) {
		winston.error('[emailer.mailjet] Mailjet is not set up properly!')
		return data;
	}

	const emailData = {
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

	await mailJet.post('send', { version: 'v3.1' })
		.request(emailData);
	return data;
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
