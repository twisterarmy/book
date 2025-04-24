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

> [!TIP]
> Refer to the **Custom dependencies** page if you encounter any issues with the system repository versions or if you want to build a specific library from source!

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

    - Setup systemd service by pasting following text into the file `/etc/systemd/system/twister-core.service`
```
[Unit]
After=network.target

[Service]
Type=simple
User=twister
Group=twister
ExecStart=/home/twister/twister-core/twisterd -port=28333 -rpcuser=user -rpcpassword=pwd -rpcallowip=127.0.0.1
StandardOutput=null
StandardError=file:/home/twister/twister-core/twister-core-errors.log
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
Inside that file, check/replace usernames, paths and `pwd`. Then enable and start the service:

`systemctl daemon-reload; systemctl enable twister-core; systemctl start twister-core; systemctl status twister-core`

### Upgrade from repository

Steps to upgrade your existing `twister-core` and `twister-html` from the repository sources:

1. stop running `twisterd` process to continue (if active, run `pgrep twisterd` to find)
    - `sudo systemctl stop twister-core` - if you're using `systemd` service
2. `cd twister-core` - navigate `twister-core` sources directory (which contains old `twisterd` binary)
3. `git pull` - grab latest updates
4. `make` - build new version
5. `cd ~/.twister/html` - navigate `twister-html` installation directory
6. `git pull` - grab latest `twister-html` changes
8. start `twister-core` process
    - `sudo systemctl start twister-core` - if you're using `systemd` service