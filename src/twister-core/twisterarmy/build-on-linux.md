## Fedora / Debian / Ubuntu

> [!NOTE]
> Tested on a pristine `amd64`, `armhf`:
> * Debian 12
> * Fedora 41
> * Ubuntu
>   * `20.04`
>   * `22.04`
>   * `24.04`

**System dependencies**

Debian / Ubuntu
``` bash
sudo apt install git autoconf automake build-essential libtool\
                 libboost-all-dev libssl-dev libdb++-dev libminiupnpc-dev
```

Fedora
``` bash
sudo dnf install git autoconf automake libtool make\
                 boost-devel openssl-devel libdb-cxx-devel miniupnpc-devel
```

**Build steps**

1. Build [twister-core](https://github.com/twisterarmy/twister-core)
    - `sudo useradd -m twister` - create new user with home directory (set password with `sudo passwd twister`)
    - `su twister` - login and navigate (with `cd`) into the home dir `/home/twister` to continue
    - `git clone https://github.com/twisterarmy/twister-core.git`
    - `cd twister-core`
    - `./autotool.sh`
    - `./configure`
        - ARM only: `./configure --with-boost-libdir=/usr/lib/arm-linux-gnueabihf --disable-sse2`
    - `make`
2. Setup [twister-html](https://github.com/twisterarmy/twister-html) (web UI)
    - `mkdir ~/.twister`
    - `echo -e "rpcuser=user\nrpcpassword=pwd\nrpcallowip=127.0.0.1" > ~/.twister/twister.conf`
    - `chmod 600 ~/.twister/twister.conf`
    - `git clone https://github.com/twisterarmy/twister-html.git ~/.twister/html`
3. Launch twister
    - `./twisterd`
    - open [http://127.0.0.1:28332](http://127.0.0.1:28332)
        - enter `user` and `pwd` in the authorization dialog
    - create your account!