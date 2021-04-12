/*

Copyright 2021 AJ Jordan <alex@strugee.net>.

This file is part of fulldom-server.

fulldom-server is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

fulldom-server is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public
License along with fulldom-server. If not, see
<https://www.gnu.org/licenses/>.

*/

'use strict';

var path = require('path'),
    assert = require('vows').assert,
    express = require('express');

var withAppSetup = function(batchConfig) {
	batchConfig.topic = function() {
		var app = require('../../lib/app');

		var that = this;
		var server = app.listen(6850, function() {
			app.server = server;
			that.callback(null, app);
		});
		server.on('error', this.callback);
	};

	batchConfig.teardown = function(app) {
		if (app && app.server) {
			app.server.close(this.callback);
		} else {
			this.callback();
		}
	};

	batchConfig["it works"] = function(err, app) {
		assert.ifError(err);
	};

	return {
		"When we set up the app": batchConfig
	};
};

var withStaticServer = function(batchConfig) {
	batchConfig.topic = function() {
		var app = express();

		app.use(express.static(path.join(__dirname, '..', 'html')));

		var that = this;
		var server = app.listen(6851, function() {
			app.server = server;
			that.callback(null, app);
		});
		server.on('error', this.callback);
	};

	batchConfig.teardown = function(app) {
		if (app && app.server) {
			app.server.close(this.callback);
		} else {
			this.callback();
		}
	};

	batchConfig["it works"] = function(err, app) {
		assert.ifError(err);
	};

	return {
		"and we set up a static web server": batchConfig
	};
};

module.exports.withAppSetup = withAppSetup;
module.exports.withStaticServer = withStaticServer;
