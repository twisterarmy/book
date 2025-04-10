#!/bin/bash

# book

S=https://github.com/twisterarmy/book.wiki.git
T=git/twisterarmy-book
if [ -d "$T" ]; then
    git -C $T pull
else
    git clone $S $T
fi

D=src/about
mkdir -p $D
rm -rf $D/*
cp $T/Home.md $D/index.md
cp $T/Contribution.md $D/contribution.md
cp $T/Build.md $D/build.md
cp $T/Releases.md $D/releases.md

# twister-core

S=https://github.com/miguelfreitas/twister-core.wiki.git
T=git/miguelfreitas-twister-core
if [ -d "$T" ]; then
    git -C $T pull
else
    git clone $S $T
fi

S=https://github.com/twisterarmy/twister-core.wiki.git
T=git/twisterarmy-twister-core
if [ -d "$T" ]; then
    git -C $T pull
else
    git clone $S $T
fi

T=src/twister-core
rm -rf $T
mkdir -p $T/miguelfreitas/CudaMiner-twister
mkdir -p $T/twisterarmy

S=git/miguelfreitas-twister-core
cp $S/Compiling-twister-on-CentOS-6.md $T/miguelfreitas/compiling-twister-on-centos-6.md
cp $S/Compiling-for-Windows.md $T/miguelfreitas/compiling-for-windows.md
cp $S/Building-twister-with-Visual-Studio-2010.md $T/miguelfreitas/building-twister-with-visual-studio-2010.md
cp $S/Build-native-Windows-client-using-Gitian.md $T/miguelfreitas/build-native-windows-client-using-gitian.md
cp $S/libtorrent-build-on-Ubuntu.md $T/libtorrent-build-on-ubuntu.md

cp $S/Popular-accounts-you-would-like-to-follow.md src/popular-accounts-to-follow.md
cp $S/mining.md src/CudaMiner-twister/index.md
cp $S/twister白皮书.md src/twister白皮书.md

S=git/twisterarmy-twister-core
cp $S/Home.md $T/about.md
cp $S/Desktop-bundle.md $T/desktop-bundle.md
cp $S/Build-on-Linux.md $T/twisterarmy/build-on-linux.md
cp $S/Administration.md $T/administration.md
cp $S/Performance.md $T/performance.md
cp $S/Profile.md $T/profile.md
cp $S/Support-the-network.md $T/support-the-network.md
cp $S/Usage.md $T/usage.md

# twister-seeder

S=https://github.com/twisterarmy/twister-seeder.wiki.git
T=git/twisterarmy-twister-seeder
if [ -d "$T" ]; then
    git -C $T pull
else
    git clone $S $T
fi

D=src/twister-seeder
mkdir -p $D
rm -rf $D/*
cp $T/Home.md $D/index.md
cp $T/Announce-new-seed.md $D/announce-new-seed.md
cp $T/Domain-setup.md $D/domain-setup.md
cp $T/Install.md $D/install.md
cp $T/Storage-location.md $D/storage-location.md
cp $T/Troubleshooting.md $D/troubleshooting.md
cp $T/Usage-examples.md $D/usage-examples.md

# twisterad

S=https://github.com/twisterarmy/twisterad.wiki.git
T=git/twisterarmy-twisterad
if [ -d "$T" ]; then
    git -C $T pull
else
    git clone $S $T
fi

D=src/twisterad
mkdir -p $D
rm -rf $D/*
cp $T/Home.md $D/index.md
cp $T/Install.md $D/install.md
cp $T/Usage.md $D/usage.md

# compile

mdbook build