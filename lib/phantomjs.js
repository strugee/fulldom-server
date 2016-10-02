/*

Copyright 2016 Alex Jordan <alex@strugee.net>.

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

var system = require("system");

// https://newspaint.wordpress.com/2013/04/05/waiting-for-page-to-load-in-phantomjs/

function waitFor( page, selector, expiry, callback ) {
	// try and fetch the desired element from the page
	var result = page.evaluate(
		function (selector) {
			return document.querySelector( selector );
		}, selector
	);

	// if desired element found then call callback after 50ms
	if ( result ) {
		window.setTimeout(
			function () {
				callback( true );
			},
			50
		);
		return;
	}

	// determine whether timeout is triggered
	var finish = (new Date()).getTime();
	if ( finish > expiry ) {
		callback( false );
		return;
	}

	// haven't timed out, haven't found object, so poll in another 100ms
	window.setTimeout(
		function () {
			waitFor( page, selector, expiry, callback );
		},
		100
	);
}

var page = require('webpage').create();
page.open(system.args[1], function(status) {
	waitFor(page, system.args[2], (new Date()).getTime() + 30000, function(status) {
		if (status) {
			console.log(page.evaluate(function() {
				return new XMLSerializer().serializeToString(document);
			}));

			phantom.exit();
		} else {
			phantom.exit(1);
		}
	});
});
