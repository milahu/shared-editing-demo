#! /bin/sh

cat >/dev/null <<EOF

node_modules/.vite/ipfs-core.js:
ValidationError.name = "ValidationError";
Parser.name = "Parser";

node_modules/.pnpm/xml2js@0.1.14/node_modules/xml2js/lib/xml2js.js:
ValidationError.name = 'ValidationError';
Parser.name = 'Parser';

node_modules/.pnpm/joi@17.5.0/node_modules/joi/dist/joi-browser.min.js:
,t.ValidationError.prototype.name="ValidationError"

node_modules/.pnpm/joi@17.5.0/node_modules/joi/lib/errors.js:
exports.ValidationError.prototype.name = 'ValidationError';

node_modules/.pnpm/@hapi+validate@1.1.3/node_modules/@hapi/validate/lib/errors.js:
exports.ValidationError.prototype.name = 'ValidationError';

EOF

sed -i 's|ValidationError.name = "ValidationError";||' node_modules/.vite/ipfs-core.js
sed -i 's|Parser.name = "Parser";||' node_modules/.vite/ipfs-core.js
sed -i "s|ValidationError.name = 'ValidationError';||" node_modules/.pnpm/xml2js@0.1.14/node_modules/xml2js/lib/xml2js.js
sed -i "s|Parser.name = 'Parser';||" node_modules/.pnpm/xml2js@0.1.14/node_modules/xml2js/lib/xml2js.js
sed -i 's|,t.ValidationError.prototype.name="ValidationError"||' node_modules/.pnpm/joi@17.5.0/node_modules/joi/dist/joi-browser.min.js
sed -i 's|exports.ValidationError.prototype.name = 'ValidationError';||' node_modules/.pnpm/joi@17.5.0/node_modules/joi/lib/errors.js
sed -i 's|exports.ValidationError.prototype.name = 'ValidationError';||' node_modules/.pnpm/@hapi+validate@1.1.3/node_modules/@hapi/validate/lib/errors.js

