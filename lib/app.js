/*

Copyright 2016x Alex Jordan <alex@strugee.net>.

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

var express = require('express');
var compression= require('compression');
var Browser = require('zombie');

var app = express();

app.use(compression());

app.get('/:url', function(req, res, next) {
	var browser = new Browser();

	browser.visit(req.params.url);
	browser.wait();
	browser.on('idle', function() {
		res.end(browser.html());
		next();
	}.bind(browser));
});

module.exports = app;
