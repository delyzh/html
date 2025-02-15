class JsonRpcClient {

  constructor(host, port, basePath = '/', doken = '', serviceName = '') {
    this.host = host;
    this.port = port;
    this._doken = doken;
    this._serviceName = serviceName;
    this._basePath = (host.startsWith('http') ? host : `http://${host}`) + `:${port}${basePath}`;
  }

  async call(method, params)  {
    return await this._doFetch(method, params)
  }

  async _doFetch(method, params)  {
    const body = {
      jsonrpc: '2.0',
      id: Date.now(),
      serviceName: this._serviceName,
      method,
      params,
    }
    return await fetch(this._basePath, {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'text/plain,text/html,application/json;charset=UTF-8;',
        doken: this._doken,
      },
      method: 'POST',
      body: JSON.stringify(body)
    }).then(res => res.json())
  }
  async doFetchStream(method, params)  {
    const body = {
      jsonrpc: '2.0',
      id: Date.now(),
      serviceName: this._serviceName,
      method,
      params,
    }
    return await fetch(this._basePath, {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'text/plain,text/html,application/json;charset=UTF-8;',
        doken: this._doken,
      },
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}


class StorageClient extends JsonRpcClient{

  constructor(doc) {
    super('127.0.0.1', 38081, '/kvoragerpc', 'svdf8933')
    this._doc = doc;
  }
  async get(key) {
    return await this.call('get', {doc: this._doc, key});
  }
  async set(key, value) {
    return await this.call('set', {doc: this._doc, key, value});
  }
  async keys(keyPrefix) {
    return await this.call('keys', {doc: this._doc, key: 'key', keyPrefix});
  }
}

async function init() {

  const storageClient = new StorageClient('note');
  // const set = await storageClient.set('bbb', '22223333')
  const set = await storageClient.keys('', '22223333')
  const get = await storageClient.get('bbb')

  console.log('set', set);
  console.log('get', get);
}


const denoClient = new JsonRpcClient('127.0.0.1', 38086);
const mysqlClient = new JsonRpcClient('127.0.0.1', 38086, '/', '', 'mysql');

const DenoClient = {
	  client: denoClient,
    async run(params) {
        return await denoClient.call('run', params);
    },
    async runWithOutput(params) {
        return await denoClient.doFetchStream('runWithStream', params);
    }
};

class MysqlClient {

  constructor(config) {
    this._config = config;
    this.client = mysqlClient;
  }

  async query(sql) {
    return await this.client.call('query', [this._config, sql]);
  }

  async execute(sql) {
    return await this.client.call('execute', [this._config, sql]);
  }
}


export { JsonRpcClient, StorageClient, DenoClient, MysqlClient} ;