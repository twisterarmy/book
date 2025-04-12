To build libtorrent on 32b Ubuntu:
   
    sudo apt-get install autoconf libtool libssl-dev libboost-all-dev
    cd libtorrent
    ./bootstrap.sh --with-boost-libdir=/usr/lib/i386-linux-gnu
    ./configure --enable-logging --enable-debug --enable-dht --with-boost-libdir=/usr/lib/i386-linux-gnu

To build libtorrent on 64b Ubuntu:

    sudo apt-get install autoconf libtool libssl-dev libboost-all-dev
    cd libtorrent
    ./bootstrap.sh --with-boost-libdir=/usr/lib/x86_64-linux-gnu/
    ./configure --enable-logging --enable-debug --enable-dht --with-boost-libdir=/usr/lib/x86_64-linux-gnu/