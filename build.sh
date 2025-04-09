#!/bin/bash

S=https://github.com/twisterarmy/book.wiki.git
T=src/about
if [ -d "$T" ]; then
    git -C $T pull
else
    git clone $S $T
fi

S=https://github.com/twisterarmy/twister-core.wiki.git
T=src/twister-core
if [ -d "$T" ]; then
    git -C $T pull
else
    git clone $S $T
fi

S=https://github.com/twisterarmy/twister-seeder.wiki.git
T=src/twister-seeder
if [ -d "$T" ]; then
    git -C $T pull
else
    git clone $S $T
fi

mdbook build

find book/ -name ".git" -type d -exec rm -rf {} +