Remote node running is useful in cases where you want to access twister from a mobile device or support the network by launching a public peer with a web UI.

## Setup with CLI tool

The simplest way to get started on Debian systems is by using the [twister-cli-installer](https://github.com/twisterarmy/twister-cli-installer) script. It provides guiding questions that helps you to build the `twister-core`, `twister-html`, and set up a self-signed TLS certificate for secure connection.

## Manual setup

Login to the remote server as `root` with SSH:

``` bash
ssh root@hostname
```

### Firewall configuration

Open `28332` port for the external access:

``` bash
ufw allow from EXPECTED_REMOTE_IP to any port 28332
```
* replace `EXPECTED_REMOTE_IP` with your value
* the port `28332` may be different if you are running `twisterd` with a custom `-rpcport` argument value

Enable the firewall:

> [!CAUTION]
> If you're enabling `ufw` for the first time, before continuing with the next command, make sure that port `22` (`ssh`) is in the whitelist to prevent connectivity issues!

``` bash
ufw enable
```

Check firewall status:

``` bash
ufw status
```

> [!TIP]
> If you have a dynamic client IP, take a look at [Yggdrasil](https://yggdrasil-network.github.io/), which allows you to generate a permanent static IPv6 address for the local network and whitelist it in the firewall rules; in this case, you may also skip the TLS connection setup, as Yggdrasil encrypts all traffic, including plain HTTP traffic that comes through its tun interface.

### System

#### Create system user

Create separated system user for `twisterd` process:

``` bash
useradd -m twister
```

#### Create systemd unit

It is useful to operate remote `twisterd` process with `systemd`. 
Let's create its configuration file: 

``` /etc/systemd/system/twister.service
[Unit]
After=network.target

[Service]
Type=simple
User=twister
Group=twister
# this option is not necessary
WorkingDirectory=/home/twister
# provide real path or additional arguments here if wanted
ExecStart=/home/twister/twister-core/twisterd
# where to save the logs
StandardOutput=file:/home/twister/twisterd-debug.log
StandardError=file:/home/twister/twisterd-error.log
# you may remove this option to capture the failure event
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
* `systemctl daemon-reload` - apply `systemd` update
* `systemctl enable twister` - launch `twisterd` on system startup

Now login to the system user created:

``` bash
su twister
```
* navigate to the home directory by using the `cd` command without arguments

### User environment setup

> [!NOTE]
> Make sure you are in the `/home/twister` directory, which was created in the previous steps, to continue

#### Install twister-core

Build `twisterd` from the `twister-core` sources inside this home, or simply copy the `twisterd` binary to `/home/twister/twister-core/twisterd` directory (as expected in the `ExecStart` option above).

> [!NOTE]
> If you are copying the binary, do not forget to give it execution permissions:
> ``` bash
> chmod +x path/to/twisterd
> ```

> [!IMPORTANT]
> It is important to init `twisterd` from this user to apply the correct permissions for `systemd` process!

#### Generate self-signed certificate

> [!NOTE]
> You may skip this step if you're using a connection within your local network or if you're connected through encrypted tunnels like a VPN or [Yggdrasil](https://yggdrasil-network.github.io/)

``` bash
openssl req -x509\
            -newkey rsa:4096\
            -keyout /home/twister/.twister/key.pem\
            -out /home/twister/.twister/cert.pem\
            -days 365 -nodes
```
* with the example above, you will want to create a new certificate after `365` days!

#### Setup RPC authorization

Edit your `/home/twister/.twister/twister.conf` file:

```
rpcallowip=EXPECTED_REMOTE_IP
rpcuser=RPC_USER_NAME
rpcpassword=RPC_PASSWORD
rpcsslcertificatechainfile=/home/twister/.twister/cert.pem
rpcsslprivatekeyfile=/home/twister/.twister/key.pem
rpcssl=1
```
* replace `EXPECTED_REMOTE_IP`, `RPC_USER_NAME`, `RPC_PASSWORD` with your values;
* if you have a dynamic client IP, you may use `*` as the `rpcallowip` value, but this option is not recommended without additional firewall rules!
* when using a connection setup with SSL enabled, in some cases, try launching `twisterd` with the `-rpcssl` argument instead of defining it in the `twister.conf` file.

> [!CAUTION]
> The `RPC_USER_NAME` and `RPC_USER_NAME` values are not same as your twister wallet keys - never use the latter for any kind of client authorization!

> [!IMPORTANT]
> For the RPC login, feel free to generate any credentials you like and it's better to make the values stronger than something like `qwerty`!

Now exit from the current user session:

``` bash
exit
```

### Launch twisterd

From the current `root` session, launch our newly created `systemd` service (which will start the `twisterd` process from the `twister` user):

``` bash
systemctl start twister
```
* `systemctl status twister` - check if everything is working

## Testing remote connection

### Web UI

1. Open following address in your browser: `https://SERVER_IP:28332/`
    * or use `http` if the TLS certificate is not in use
2. Enter your `RPC_USER_NAME` and `RPC_PASSWORD` on the authorization dialog

> [!NOTE]
> If you can't authenticate to the Web UI with the correct credentials provided in the `twister.conf`, make sure that your _strong_ login or password in the URL request has special characters encoded (see [2.2. Reserved Characters](https://www.ietf.org/rfc/rfc2396.txt)).

### RPC API

For the RPC API, use the same `RPC_USER_NAME` and `RPC_PASSWORD` for `SERVER_IP:28332` as you would when using the HTTP protocol; also, provide the actual scheme to connect.

> [!NOTE]
> If the connection is configured with a self-signed certificate (as in the examples above), please ensure that your client application is configured to ignore any related warnings.

## Final tips

### Setup host alias

You can access the remote node using hostname alias instead of the IP address by appending the following line to `/etc/hosts`:

``` bash
REMOTE_HOST_IP twister
```
* replace `REMOTE_HOST_IP` with actual IP, then open web UI with [http://twister:28332](http://twister:28332)

### SSH login without password

You can simply log in to the remote host account using your SSH key instead of the system user password.

Run from the client host:

``` bash
ssh-copy-id twister@REMOTE_HOST_IP
```
* where `REMOTE_HOST_IP` is the host IP of your remote twister node
* provide the `-p` argument if your host is configured to use a non-default SSH port (other than `22`)

### Improve security

#### Use strong RPC credentials

Do not use the default `user:pwd` for the remote twister node. Consider using random, strong RPC login credentials when any of your ports are open to external connections.

#### Run public peer with secure options

If you do not plan to use a remote node with an account, run `twisterd` with the `-public_server_mode` argument to restrict unsafe commands (e.g., wallet operations). For more details about this option, see [bitcoinrpc.cpp](https://github.com/twisterarmy/twister-core/blob/twisterarmy/src/bitcoinrpc.cpp#L227), ~227 line.

#### Install fail2ban

If you are running a public peer server with remote control through SSH, consider installing the [fail2ban](http://www.fail2ban.org/) daemon, which will block connections to port `22` (or another port) after an invalid login attempt (for `15` minutes by default).

#### Randomize ports

Use a non-default SSH port to confuse bots and prevent your logs from growing.

#### Prioritize using a firewall

Configure firewall/iptables rules to restrict access by using only whitelisted values.

### Remote host administration

Refer to the **Administration** page for a useful collection of CLI recipes!