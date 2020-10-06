/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"standardlistitems/z_StandardList/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});