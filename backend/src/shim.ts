import * as crypto from 'crypto';

// Polyfill global crypto for Node 18
if (!global.crypto) {
    // @ts-ignore
    global.crypto = crypto;
}
