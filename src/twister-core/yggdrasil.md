[Yggdrasil](https://yggdrasil-network.github.io/) is a decentralized IPv6 network that offers an additional layer of privacy for peer-to-peer connections.

According to the original [README](https://github.com/yggdrasil-network/yggdrasil-go#introduction):

> Yggdrasil is an early-stage implementation of a fully end-to-end encrypted IPv6 network. It is lightweight, self-arranging, supported on multiple platforms and allows pretty much any IPv6-capable application to communicate securely with other Yggdrasil nodes. Yggdrasil does not require you to have IPv6 Internet connectivity - it also works over IPv4.

## Usage purposes

Yggdrasil can be useful in situations when you want to:
* hide your real IP address from other (twister) peers;
* bypass ISPs or global firewalls in censored areas;
* build a custom route to the VPN, I2P or Tor proxy;
* remote access to your home node over NAT;
* create a permanent IPv6 address in the `0200::/7` range (based on the private key) to set up a remote peer or firewall for whitelisting;
* run a public peer (accessible to other twister nodes connected to the Yggdrasil network) without needing a dedicated Internet IP address and port forwarding.

> [!IMPORTANT] 
> * Unlike Tor, Yggdrasil is not designed for anonymization; however, it can enhance your routing capabilities when combined with those technologies, but only when configured outside of the twister context!
> * The `twister-core` software does not provide any Yggdrasil features by itself, only IPv6 support. This means that using the Yggdrasil network with twister does not ensure that you are connectable only from this network; the application's behavior in this case requires additional audit.
> * When installing Yggdrasil, make sure your firewall is configured properly, as any service launched on `0.0.0.0` will be visible over NAT, similar to how it would be on the local network. To check which services are listening for external connections, run the command `netstat -tulpn | grep LISTEN`

## IPv6 support

If you are using `twister-core` from the [twisterarmy branch](https://github.com/twisterarmy/twister-core), no additional steps are needed, as it already has the IPv6 enabled out of the box.

However, if you are using the `twister-core` from the [miguelfreitas branch](https://github.com/miguelfreitas/twister-core), you must configure it with the option `--enable-ipv6` (see `./configure --help` for details), then rebuild `twisterd`.

## Install

A pre-compiled Yggdrasil bundle (including the `systemd` asset) should be available from the system repositories. Follow the [official guide](https://yggdrasil-network.github.io/installation.html) to install Yggdrasil on your system. If you want to build it from source, consider using the steps below.

### Build from source

The following example explains the build process for Debian, but it should be compatible with any other Linux distribution.

#### Install Go

Check your current [golang](https://go.dev/) version:

``` bash
go version
```

if it exists, make sure that no other apps are using it, and then remove it:

``` bash
apt remove golang
```
* additionally, cleanup existing binaries with `rm -rf /usr/lib/go-VERSION`

navigate to the current user's home directory (usually it's the root user) with `cd ~`, and then download the latest version for your architecture:

``` bash
wget https://go.dev/dl/go1.24.2.linux-amd64.tar.gz
```
* the latest version is available on the [official website](https://go.dev/dl/) - just replace the value

unarchive then remove `tar.gz` file:

``` bash
tar -xzf go1.24.2.linux-amd64.tar.gz
rm go1.24.2.linux-amd64.tar.gz
```

now, install it in the native system destination:

``` bash
sudo mv go /usr/local/
```

finally, setup the environment:

``` bash
export PATH=$PATH:/usr/local/go/bin
export GOPATH=~/go
source .bashrc
```

check the installation with:

``` bash
go version
```
* as shown in the examples above, it should be `1.24.2`

#### Install Yggdrasil

Yggdrasil usually requires launching from the root user (to init the network interface), so let's continue with the following steps from the root user in its home directory:

1. `git clone https://github.com/yggdrasil-network/yggdrasil-go.git`
2. `cd yggdrasil-go`
3. `./build`

#### Setup connection

First, generate the initial configuration file, which will include a randomly generated private key. This private key will be used as the Yggdrasil network identifier, and used to sign your permanent IPv6 address in the `0200::/7` range.

``` bash
./yggdrasil -genconf > /path/to/yggdrasil.conf
```
* the `/path/to` value is likely your `/root` directory

To connect to the Yggdrasil network with the Internet (overlay mode), refer to the current [public peers](https://publicpeers.neilalexander.dev/) and select the closest one(s), for example `tls://london.sabretruth.org:18472`

Now open your `/path/to/yggdrasil.conf` and add this address into `Peers` array, for example:

``` 
Peers: [
    tls://london.sabretruth.org:18472
]
```
* you may add as many peers as you want

The basic configuration is now set up, and Yggdrasil node is ready to launch!

#### Systemd example

The following example assumes you are running Yggdrasil as the root user:

``` /etc/systemd/system/yggdrasil.service
#/etc/systemd/system/yggdrasil.service
[Unit]
After=network.target

[Service]
Type=simple
ExecStart=/path/to/yggdrasil -useconffile /path/to/yggdrasil.conf
StandardOutput=file:/path/to/yggdrasil-debug.log
StandardError=file:/path/to/yggdrasil-error.log
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
* replace `/path/to` with your value (e.g. `/root/yggdrasil-go`)

To apply `systemd` configuration:

* `systemctl daemon-reload` - reload unit configuration
* `systemctl enable yggdrasil` - start on system boot
* `systemctl start yggdrasil` - launch `yggstack` service
* `systemctl status yggdrasil` - check service status

## Usage examples

### Connect all peers

By launching `twisterd` without additional arguments, you will be able to connect to all network interfaces, including the Yggdrasil one.

If you don't see any connections from the `0200::/7` range yet, visit the [community website](https://twisterarmy.github.io/network#public-peers) and find any peer from the list. After that, copy its `[host]:port` into the `Force connection to peer` field on the web UI [Network page](http://127.0.0.1:28332/network.html).

> [!TIP]
> If you want to remain connectable to all networks while announcing your peer address as Yggdrasil, run `twisterd` with the `-externalip` argument:
>
> ``` bash
> ./twisterd -externalip=[HOST]
> ```
> * to get your current Yggdrasil `[HOST]`, run: `sudo yggdrasilctl getself`

### Connect specified peer only

Run `twisterd` with `-connect=[HOST]:PORT` argument, where the `HOST:PORT` is the target host you want to connect to:

``` bash
./twisterd -connect=[300:17a8:aabf:108f::33]:28333
```

> [!NOTE]
> This option disables finding peers using DNS lookup (`-dnsseed` argument will be ignored)

### Connect some network only

By default, `twisterd` accepts connections from all available network interfaces. This option can be helpful in situations where you are using some [proxy](#connect-with-proxy) that does not support certain address families, such as how [Yggstack](#yggstack) does not support IPv4.

To use only the IPv6 network family, launch `twisterd` with the `-onlynet=IPv6` flag:

``` bash
./twisterd -onlynet=IPv6
```
* `IPv4`|`IPv6`|`Tor` - see also `./twisterd --help`

### Connect with proxy

#### Yggstack

> [!NOTE]
> Keep in mind that the current version of Yggstack has an unresolved connectivity [Issue #8](https://github.com/yggdrasil-network/yggstack/issues/8) that causes disconnections after some time of use. If possible, please prefer the full Yggdrasil node installation instead!

[Yggstack](https://github.com/yggdrasil-network/yggstack) is a proxy server for Yggdrasil that allows you to use this network without installing the full node. It is especially useful in cases where you don't want to grant root access to the Yggdrasil service, as such access is required to operate the network configuration during the startup of a new interface.

According to the [README](https://github.com/yggdrasil-network/yggstack#introduction):
> Yggstack fills the gap by providing SOCKS5 proxy server and TCP port forwarder functionality similar to TOR router. It also can serve as a standalone network node to connect network segments.

**How to use**

First, run `yggstack` with the following arguments (replace the values with your own):

``` bash
./yggstack -useconffile path/to/yggdrasil.conf -socks 127.0.0.1:1080
```
Now start `twisterd` with at least the following setup:

``` bash
./twisterd -proxy=127.0.0.1:1080 -socks=5 -onlynet=IPv6
```
* the `-socks=5` argument is not necessary, as version `5` should be the default (just make sure it is)
* it is important to run connection with `-onlynet=IPv6` because `yggstack` operates with Yggdrasil's IPv6 addresses, while `twisterd` expects all networks by default (see [#16](https://github.com/twisterarmy/twister-core/issues/16) and [onlynet](#connect-some-network-only) argument usage for details)

**Systemd example**

The following example assumes you are running Yggstack from a separate system user with a home directory (created with `useradd -m yggstack`)

``` /etc/systemd/system/yggstack.service
#/etc/systemd/system/yggstack.service
[Unit]
After=network.target

[Service]
Type=simple
User=yggstack
Group=yggstack
ExecStart=/path/to/yggstack -useconffile /path/to/yggdrasil.conf -socks 127.0.0.1:1080
StandardOutput=file:/path/to/debug.log
StandardError=file:/path/to/error.log
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
* replace `/path/to` with your value

To apply `systemd` configuration:

* `systemctl daemon-reload` - reload unit configuration
* `systemctl enable yggstack` - start on system boot
* `systemctl start yggstack` - launch `yggstack` service
* `systemctl status yggstack` - check service status

### Bind on given address

The `bind` argument may be useful in cases where you have more than one IPv4 or IPv6 interface, such as when using Yggdrasil alongside an Internet IPv6 connection, or when Yggdrasil is configured with a subnet mask (e.g., `[300:17a8:aabf:108f::33]`), and you want to use only that specific interface to launch `twisterd` and listen connections on it.

This is also relevant if you are running multiple `twisterd` nodes on the same host and want to bind a static address for a specific RPC API configuration.

``` bash
./twisterd -bind=[HOST]:PORT
```
* to get your current Yggdrasil `[HOST]`, run: `sudo yggdrasilctl getself`

> [!NOTE]
> The `bind` option does not decrease your connectivity level; see [onlynet](#connect-some-network-only) option for that purpose!

## Firewall examples

Some tips for tuning your iptables

### Restrict 0200::/7 range

``` bash
ufw allow from 0200::/7 to any port 28333
```
* where `28333` is the port you want to allow for Yggdrasil peers only

## Public peers

The twister public peers displayed on the [Network page](https://twisterarmy.github.io/network#public-peers) are manually managed to show only those that are actually online.

The following list includes all known peers from that source. Since the Yggdrasil IP address is generated by its owner's private key, it will never expire, and these addresses may come online again at any time. This could be useful when all Internet peers are offline for some reason.

| Host                      | Port, TCP | Port, UDP+TCP | Online |
|:--------------------------|:---------:|:-------------:|:------:|
| [300:17a8:aabf:108f::33]  | 28333     | 29333         | 2025   |
| [301:23b4:991a:634d::33]  | 28333     | 29333         | 2023   |
| [301:5eb5:f061:678e::33]  | 28333     | 29333         | 2023   |

## Related software

Some other Yggdrasil-based software you might want to try:

* [yggstack](https://github.com/yggdrasil-network/yggstack) - access Yggdrasil through SOCKS proxy without exposing your interface to the network;
* [yggmail](https://github.com/neilalexander/yggmail) - end-to-end encrypted email for the mesh networking age;
* [Alfis DNS](https://github.com/Revertron/Alfis/) - a peer-to-peer alternative to centralized DNS providers, with native Yggdrasil support, that is also useful for launching a free, independent DNS seeder for the twister network.