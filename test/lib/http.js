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

var http = require('http'),
    querystring = require('querystring'),
    concatStream = require('concat-stream');

function get(port, path, cb) {
	http.get('http://localhost:' + port + path, function(res) {
		res.on('error', cb);
		res.pipe(concatStream(function(buf) {
			cb(null, buf.toString());
		}));
	});
};

// The `path` is for the static server
function apiCall(path, selector, cb) {
	get(6850, '/'
	          + querystring.escape('http://localhost:6851' + path)
	          + '?'
	          + querystring.stringify({
		          selector: selector
	          }),
	    cb
	   );
}

module.exports.get = get;
module.exports.apiCall = apiCall;
