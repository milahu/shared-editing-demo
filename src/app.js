window.global = window;

import { Buffer } from "buffer";
//window.Buffer = Buffer;
globalThis.Buffer = Buffer; // vitejs https://github.com/vitejs/vite/discussions/2785
// TODO globalThis may need polyfill https://issueexplorer.com/issue/vitejs/vite/4973
// not working
// TypeError: Cannot read properties of undefined (reading 'isBuffer')
// node_modules/core-util-is/lib/util.js (util.js:103)
// Buffer.isBuffer -> Buffer is undefined
// -> manually insert require into source files, see patched files in /patches/

import * as IPFS from 'ipfs';
//import * as IPFS from 'ipfs-core';
//import * as IPFS from 'ipfs-http-client-lite'; // browser. different api

// not working
// fix ReferenceError: global is not defined at readable-stream via node:stream via ipfs
// https://stackoverflow.com/a/54214926/10440128
//window.global = window;
// -> vite.config.js

// ipfs-core.js is produced by: npm run build:ipfs
// https://github.com/DougAnderson444/ipfs-vite-svelte-kit
////import IPFS from './modules/ipfs-core/ipfs-core.js';
// WONTFIX Error: Dynamic require of "util" is not supported

import * as Y from 'yjs';

// https://github.com/ipfs-shipyard/shared-editing-demo/pull/11

// requires yjs@12 see https://github.com/yjs/yjs/issues/141

import Y from "yjs";
import y_ipfs_connector from "y-ipfs-connector";
import y_text from "y-text";
import y_array from "y-array";
import y_memory from "y-memory";

Y.extend(y_ipfs_connector, y_text, y_array, y_memory );

// https://github.com/ipfs-shipyard/y-ipfs-connector
// TODO update dependencies https://github.com/ipfs-shipyard/y-ipfs-connector/pull/16

function repo () {
  return 'ipfs/yjs-demo/' + Math.random()
  //return 'ipfs/yjs-demo/' + 'my_secret_token_sdjkfjaje9efiaosdjfsaj'
}

async function main() {

  console.log('IPFS', IPFS);

  //const ipfs = new IPFS({ // TypeError: IPFS is not a constructor
  //const ipfs = IPFS({
  const r = repo();
  console.log(`ipfs repo = ${r}`);
  const ipfs = await IPFS.create({
    repo: r,
    EXPERIMENTAL: {
      pubsub: true
    },
    // https://github.com/ipfs-shipyard/shared-editing-demo/pull/11
    // overload the default config
    config: {
      Addresses: {
        Swarm: [
          '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star/'
        ]
      },
    },
  })

  console.log('ipfs', ipfs);

  // https://github.com/ipfs/js-ipfs/issues/1762
  // ipfs is ready after await IPFS.create

  const info = await ipfs.id()

  console.log('IPFS node ready with address ' + info.id)

  Y({
    db: {
      name: 'memory'
    },
    connector: {
      name: 'ipfs',
      room: 'ipfs-yjs-demo',
      ipfs: ipfs
    },
    share: {
      textfield: 'Text'
    }
  }).then((y) => {
    y.share.textfield.bind(document.getElementById('textfield'))
  })

}

main();
