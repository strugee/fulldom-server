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
