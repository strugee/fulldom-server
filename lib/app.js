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

var fs = require('fs');
var path = require('path');
var express = require('express');
var compression= require('compression');
var phantomjs = require('phantomjs-prebuilt');

var app = express();

app.set('query parser', 'simple');
app.use(compression());

app.get('/:url', function(req, res, next) {
	if (!req.query.selector) {
		res.statusCode = 400;
		res.end('"selector" query string parameter not specified.');
		return;
	}

	var program = phantomjs.exec(path.join(__dirname, '../lib/phantomjs.js'), req.params.url, req.query.selector);
	program.stdout.pipe(res);
	program.on('exit', function() {
		res.end();
	});
});

module.exports = app;
