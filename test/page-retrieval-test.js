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

const vows = require('vows'),
      assert = vows.assert,
      appUtil = require('./lib/app'),
      httpUtil = require('./lib/http');

vows.describe('page retrieval').addBatch(
	appUtil.withAppSetup(
		appUtil.withStaticServer({
			'and we request a page that doesn\'t use JS': {
				topic: function() {
					httpUtil.apiCall('/basic.html', 'h1', this.callback);
				},
				'it works': function(err, res) {
					assert.ifError(err);
				},
				'it contains the right text': function(err, res) {
					assert.isTrue(res.includes('BASIC_NO_JS'));
				}
			},
			'and we request a page that populates after a delay': {
				topic: function() {
					httpUtil.apiCall('/withjs.html', 'h1', this.callback);
				},
				'it works': function(err, res) {
					assert.ifError(err);
				},
				'it contains the right text': function(err, res) {
					assert.isTrue(res.includes('JS_POPULATED_H1'));
				}
			}
		})
	)
).export(module);
