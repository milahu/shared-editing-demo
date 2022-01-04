// https://github.com/vitejs/vite/issues/3817#issuecomment-864450199

import process from "process";
import { Buffer } from "buffer";
//import EventEmitter from "events";

window.Buffer = Buffer;
window.process = process;
//window.EventEmitter = EventEmitter;

globalThis.Buffer = Buffer; // vitejs https://github.com/vitejs/vite/discussions/2785
