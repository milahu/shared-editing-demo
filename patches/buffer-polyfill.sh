#! /bin/sh

s="var Buffer = require('buffer').Buffer // FIXME polyfill\n\n"

firstline=$(echo -e "$s" | head -n1)

#./node_modules/.pnpm/core-util-is@1.0.3/node_modules/core-util-is/lib/util.js
#./node_modules/.pnpm/verror@1.10.0/node_modules/core-util-is/lib/util.js


read -d '' paths <<EOF
ipfs-pubsub-room/src/encoding.js
y-ipfs-connector/src/encode.js
buffer/index.js
core-util-is/lib/util.js
EOF

find_args=('-L' './node_modules/' '-type' 'f')
first=true
for p in $paths
do
  $first || find_args+=('-or')
  first=false
  echo "p = $p"
  find_args+=("-path" "*/$p")
done

echo find "${find_args[@]}"
#find "${find_args[@]}"; exit

find "${find_args[@]}" | while read f
do
  head -n1 "$f" | grep "$firstline" >/dev/null && {
    echo "skip $f"
    continue # inject only once
  }
  echo "patch $f"
  sed -i "1s;^;$s;" "$f"
done
