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

> [!IMPORTANT]
> Make sure you have at least 1 GB of memory to compile twister or connect a temporary swap file (see the **Administration** page) before continue!

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
        - use `-rpcallowip=*` mask if you want to connect remotely with a dynamic IP address, but make sure you have provided strong credentials along with an SSL certificate (see the **Remote Node** page for more details)
    - `chmod 600 ~/.twister/twister.conf`
    - `git clone https://github.com/twisterarmy/twister-html.git ~/.twister/html`
3. Launch twister
    - `./twisterd`
    - open [http://127.0.0.1:28332](http://127.0.0.1:28332) or [http://[::1]:28332](http://[::1]:28332)
        - enter `user` and `pwd` in the authorization dialog
    - create your account!

### Systemd example

Optionally, setup `systemd` service by pasting following text into the file `/etc/systemd/system/twister-core.service`

``` /etc/systemd/system/twister-core.service
[Unit]
After=network.target

[Service]
Type=simple
User=twister
Group=twister
ExecStart=/home/twister/twister-core/twisterd -printtoconsole
StandardOutput=null
StandardError=file:/home/twister/twister-core-errors.log
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
> [!NOTE]
> * The `ExecStart` command contains the `-printtoconsole` option, which routes the debug output to `StandardOutput` instead of the `debug.log` file, then disables it by setting to the `null` value
> * The example above requires a previously created `twister.conf` file that contains RPC credentials defined in the previous steps. Alternatively, you may forcefully overwrite them by using the custom `-rpcuser`, `-rpcpassword`, and `-rpcallowip` arguments (see `./twisterd --help` for more details)
> * Support the network by open port `28333` and append `-port=28333` to `ExecStart` if you're running the node as a public peer

Then enable and start the service:

1. `systemctl daemon-reload`
2. `systemctl enable twister-core`
3. `systemctl start twister-core`
4. `systemctl status twister-core`

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