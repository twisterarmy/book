##Install the development tools##

    $ sudo yum groupinstall "Development Tools"
or

    $ sudo yum install autoconf automake libtool

##Install the required dependencies##

Because the current version of Berkeley-db and Boost in CentOS 6 is kinds of old, so it's need to compile and install them from source.

First make the working directory.

    $ cd ~
    $ mkdir twister
    $ mkdir twister/deps

Compile Berkeley-db

    $ cd ~/twister
    $ wget http://download.oracle.com/berkeley-db/db-4.8.30.tar.gz
    $ tar -xzf db-4.8.30.tar.gz 
    $ cd db-4.8.30/build_unix/
    $ ../dist/configure --prefix=/home/XXX/twister/deps/ --enable-cxx
    $ make
    $ make install

(Please replace all the 'XXX' in this tutorial with your login name.)

Compile Boost

    $ cd ~/twister
    $ wget http://sourceforge.net/projects/boost/files/boost/1.55.0/boost_1_55_0.tar.bz2/download -O boost_1_55_0.tar.bz2
    $ tar -jxf boost_1_55_0.tar.bz2 
    $ cd boost_1_55_0
    $ ./bootstrap.sh 
    $ ./b2 --prefix=/home/XXX/twister/deps/ link=static runtime-link=static install

The Openssl that in the CentOS repo lacks of some components, so compile and install it from source also.

    $ cd ~/twister
    $ wget https://www.openssl.org/source/openssl-1.0.1i.tar.gz
    $ tar -xzf openssl-1.0.1i.tar.gz 
    $ cd openssl-1.0.1i
    $ ./config --prefix=/home/XXX/twister/deps/ --openssldir=/home/XXX/twister/deps/openssl -fPIC shared
    $ make
    $ make install

##Compile the twister-core##

First install the Git tool if it doesn't install before.

    $ sudo yum install git

Clone the twister-core source from Github.

    $ cd ~/twister
    $ git clone https://github.com/miguelfreitas/twister-core.git
    $ cd twister-core
    $ ./bootstrap.sh \
        --with-openssl=/home/XXX/twister/deps \
        --with-libdb=/home/XXX/twister/deps \
        --with-boost=/home/XXX/twister/deps
    $ make

##Then the web part##

    $ mkdir ~/.twister
    $ git clone https://github.com/miguelfreitas/twister-html.git ~/.twister/html

##Start the twister daemon##

    $ LD_LIBRARY_PATH=/home/XXX/twister/deps/lib/ /home/XXX/twister/twister-core/twisterd -daemon -rpcuser=user -rpcpassword=pwd -rpcallowip=127.0.0.1

Then open browser and goto http://127.0.0.1:28332/ ,enter "user" and "pwd" as the login username and password.

###References:###

 * https://gist.github.com/janx/10465121