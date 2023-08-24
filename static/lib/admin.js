'use strict';

import { save, load } from 'settings';

export function init() {
	handleSettingsForm();
};

function handleSettingsForm() {
	load('mailjet', $('.mailjet-settings'));

	$('#save').on('click', () => {
		save('mailjet', $('.mailjet-settings'));
	});
}
