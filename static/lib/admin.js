'use strict';

import { save, load } from 'settings';

export function init() {
	handleSettingsForm();
};

function handleSettingsForm() {
	load('quickstart', $('.quickstart-settings'));

	$('#save').on('click', () => {
		save('quickstart', $('.quickstart-settings'));
	});
}
