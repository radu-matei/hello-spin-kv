# Hello, Spin and Fermyon Cloud Key/Value

This is a very simple demonstration of using the Spin Key/Value store to persist non-relational data.

This example shows a counter written in TypeScript, and adds an explorer UI to introspect the contents of the store.

### Building

Prerequisites:

- [Spin](https://developer.fermyon.com/spin)
- [the Spin JavaScript toolchain](https://developer.fermyon.com/spin/javascript-components)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

First, make sure to install the dependencies of the TypeScript project:

```bash
$ cd counter && npm install
```

You can now build and run the application:

```bash
$ spin build
# skip checking for explorer auth when running locally
$ spin up --env SPIN_APP_KV_SKIP_AUTH=1
```

### Deploying to Fermyon Cloud

When deploying to [Fermyon Cloud](https://fermyon.com/cloud), you can pass the credential pair together with the `spin deploy` command:

```bash
# change the value to your desired basic auth credentials
$ export KV_CREDENTIALS="user:password"
$ spin deploy --key-value kv-credentials=$KV_CREDENTIALS
Uploading kv-spin-app version 0.1.0+ra13476e...
Deploying...
Waiting for application to become ready......... ready
Available Routes:
  kv-explorer: https://kv-spin-app-xxxx.fermyon.app/internal/kv-explorer (wildcard)
  counter: https://kv-spin-app-xxxx.fermyon.app (wildcard)
```

Once the application is deployed, 

```bash
$ curl https://kv-spin-app-xxxx.fermyon.app
Count is: 1
$ curl https://kv-spin-app-xxxx.fermyon.app
Count is: 2
$ curl https://kv-spin-app-xxxx.fermyon.app
Count is: 3
```

You can access the KV explorer using the credentials you configured.

### Running Locally with a Redis Backend

If you don't want to use the built-in implementation of the KV store, when running locally you can provide a runtime configuration file that specifies the URL of a Redis instance to be used for persisting the data — all without changing or recompiling your application.

With a Redis instance running locally, we can specify the following configuration:

```toml
# runtime-config.toml
[key_value_store.default]
type = "redis"
url = "redis://127.0.0.1:6379"
```

Then start the application:

```bash
spin up --env SPIN_APP_KV_SKIP_AUTH=1 --runtime-config-file runtime-config.toml

Storing default key-value data to Redis
Logging component stdio to ".spin/logs/"

Serving http://127.0.0.1:3000
Available Routes:
  kv-explorer: http://127.0.0.1:3000/internal/kv-explorer (wildcard)
  counter: http://127.0.0.1:3000 (wildcard)
```
