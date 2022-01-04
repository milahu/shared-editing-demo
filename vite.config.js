
import polyfillNode from 'rollup-plugin-polyfill-node';

import * as processPolyfillBroken from 'process/browser.js';

const processPolyfill = { ...processPolyfillBroken, env: {} };

import { Buffer as bufferPolyfill } from "buffer";

import inject from '@rollup/plugin-inject'

export default {

  // fix ReferenceError: global is not defined at readable-stream via node:stream via ipfs
  // https://github.com/bevacqua/dragula/issues/602#issuecomment-912863804
  define: {
    global: {}, // should be window -> window.global = window
    process: processPolyfill,
    Buffer: bufferPolyfill,
  },

  resolve: {
    alias: {
      // https://github.com/vitejs/vite/issues/5398#issuecomment-950288364

      // NOTE this requires a patched version of vite
      // https://github.com/vitejs/vite/pull/6364

      // manually installed polyfilles from https://cnpmjs.org/package/@alphabetabc/node-browserify-polyfill

      stream: 'stream-browserify',
      http: 'http-browserify',
      https: 'https-browserify',
      process: 'process/browser',
      os: 'os-browserify/browser',


/*
      'node:stream': 'stream-browserify',
      //'readable-stream': 'stream-browserify',
      'node:util': 'util',
      'node:url': 'url',
      //'node:net': 'net-browserify', // TODO net.isIP polyfill
      net: 'net-browserify', // TODO net.isIP polyfill

      'web-streams-polyfill': 'web-streams-polyfill/es6', // no effect
      // WONTFIX Error: Dynamic require of "util" is not supported
*/
    },
  },

  plugins: [
    polyfillNode(),
  ],

  build: {
    rollupOptions: {
      plugins: [
        //polyfillNode(), // not working?

        inject({ Buffer: ['buffer', 'Buffer'] }),
        // https://github.com/vitejs/vite/discussions/2785#discussioncomment-1450965
        // https://giters.com/solana-labs/wallet-adapter/issues/35

      ]
    },
  },

  optimizeDeps: {
    include: [
      'y-ipfs-connector', // SyntaxError: The requested module y-ipfs-connector/src/index.js does not provide an export named 'default'
      //'core-util-is', // TypeError: Cannot read properties of undefined (reading 'isBuffer') @ Buffer.isBuffer -> Buffer is undefined
    ],
    exclude: [
      // The libraries that need shimming should be excluded from dependency optimization.
      // https://github.com/vitejs/vite/discussions/3126#discussioncomment-655531
      //'web3',
      //'y-ipfs-connector', // SyntaxError: The requested module y-ipfs-connector/src/index.js does not provide an export named 'default'
    ], 

    allowNodeBuiltins: ['core-util-is']

  },

}
