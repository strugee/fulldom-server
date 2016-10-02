# fulldom-server

Proxy-like server that will show you the DOM of a page after JS runs

Especially useful when combined with [Huginn][1]'s `WebsiteAgent`. See [cantino/huginn#888][2]

## Installing

    $ [sudo] npm install -g fulldom-server

## Running

Simple usage:

    $ fulldom-server

This will give you a fulldom server running on port 8000, bound to `0.0.0.0`. You can override these defaults with CLI options:

    $ fulldom-server -p 1337 -a localhost

This tells fulldom to bind to port 1337 on localhost only.

You can also do the same thing with environment variables, if that's your cup of tea:

    $ FULLDOM_PORT=1337 FULLDOM_ADDRESS=localhost fulldom-server

And last but not least, you can configure fulldom with a JSON configuration file at `/etc/fulldom.json` (or whatever is specified with `--config` or `-c`):

    $ cat /etc/fulldom.json
	{
		"port: 1337,
		"address: "localhost"
	}
	$ fulldom-server

The configuration keys are the same as the long-form CLI options (e.g. `--port` on the CLI corresponds to `port` in JSON).

See `fulldom-server --help` for details.

## Warning

fulldom relies on [PhantomJS][3] and thus has to spawn a new process for each and every incoming request.

Please keep this in mind if you plan to publicly deploy fulldom or use it in production.

## Usage

tl;dr: do an HTTP GET on `/<url>?selector=<selector>` to get the serialized DOM of `<url>` as soon as `<selector>` appears in the document.

fulldom exposes a single endpoint at `/<url>` which, when sent an HTTP GET request, will give you back the serialized DOM of the page at `<url>` when the page's JS has "finished running". As it is essentially impossible to determine when that happens you need to specify a CSS selector, the presence of which will be used as a heuristic for when the page is "loaded". For example, if you are trying to scrape an image gallery, but the gallery is filled in via JS, you might use `img` as your selector. In this case fulldom will load the gallery and wait until there is at least one match for the `img` selector, then serialize the gallery's DOM and return it to you in an HTTP response.

Note that both `<url>` and `<selector>` should be percent-encoded - you need to be particularly careful to encode `/`s. ProTip™: `:` is `%3A`, and `/` is `%2F`.

## Author

Alex Jordan <alex@strugee.net>

## License

AGPL 3.0+

 [1]: https://github.com/cantino/huginn
 [2]: https://github.com/cantino/huginn/issues/888
 [3]: http://phantomjs.org/
