# Tips for hacking on the codebase

## Running the tests

    $ npm test

## I'm not getting responses on Linux! / I'm getting PhantomJS libssl_config.so errors!

Try running the tests with `OPENSSL_CONF=/etc/ssl` set in the environment. I have no idea why this works.
