#!/bin/bash

# chmod u+x
find ./ -depth -name "*.js" -exec sh -c 'mv "$1" "${1%.js}.jsx"' _ {} \;

