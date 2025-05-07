## Launch

The twister node is usually launched from the same or a separate system user, and never from root.

If you want to run it from a separate user, just create the user with `useradd -m twister`, then log in and build the `twister-core` inside this directory to have valid permissions out of the box.

To launch, run following command:

``` bash
./twisterd
```

### Startup options

> [!NOTE]
> As `twisterd` uses patched [libtorrent/DHT](https://github.com/twisterarmy/twister-core/tree/twisterarmy/libtorrent) features (which run on ports `29333` and `4433`/`4434`), some original `bitcoind` options, such as `-bind`, `-externalip`, etc., are not fully integrated yet and may behave unexpectedly! See [#243](https://github.com/miguelfreitas/twister-core/issues/243#issuecomment-132237989), [#254](https://github.com/miguelfreitas/twister-core/issues/254) and PR [#20](https://github.com/twisterarmy/twister-core/pull/20), [#25](https://github.com/twisterarmy/twister-core/pull/25) for details.

If you want to run `twisterd` using a proxy, bind the connection to a specified network interface, or configure other settings, consider using the following options:

``` bash
-?                     This help message
-conf=<file>           Specify configuration file (default: ~/.twister/twister.conf)
-pid=<file>            Specify pid file (default: twisterd.pid)
-gen                   Generate coins (default: 0)
-datadir=<dir>         Specify data directory
-htmldir=<dir>         Specify HTML directory to serve (default: <data>/html)
-dbcache=<n>           Set database cache size in megabytes (default: 25)
-timeout=<n>           Specify connection timeout in milliseconds (default: 5000)
-proxy=<ip:port>       Connect through socks proxy
-socks=<n>             Select the version of socks proxy to use (4-5, default: 5)
-tor=<ip:port>         Use proxy to reach tor hidden services (default: same as -proxy)
-dns                   Allow DNS lookups for -addnode, -seednode and -connect
-port=<port>           Listen for connections on <port> (default: 28333 or testnet: 18333)
-maxconnections=<n>    Maintain at most <n> connections to peers (default: 125)
-addnode=<ip>          Add a node to connect to and attempt to keep the connection open
-connect=<ip>          Connect only to the specified node(s)
-seednode=<ip>         Connect to a node to retrieve peer addresses, and disconnect
-externalip=<ip>       Specify your own public address
-onlynet=<net>         Only connect to nodes in network <net> (IPv4, IPv6, Tor, Ygg or Yggdrasil)
-multiconnperip        Enable libtorrent multiple connections per ip (default: 0)
-discover              Discover own IP address (default: 1 when listening and no -externalip)
-checkpoints           Only accept block chain matching built-in checkpoints (default: 1)
-listen                Accept connections from outside (default: 1 if no -proxy or -connect)
-bind=<addr>           Bind to given interface address and always listen on it
-dnsseed               Find peers using DNS lookup (default: 1 unless -connect)
-banscore=<n>          Threshold for disconnecting misbehaving peers (default: 100)
-bantime=<n>           Number of seconds to keep misbehaving peers from reconnecting (default: 86400)
-maxreceivebuffer=<n>  Maximum per-connection receive buffer, <n>*1000 bytes (default: 5000)
-maxsendbuffer=<n>     Maximum per-connection send buffer, <n>*1000 bytes (default: 1000)
-upnp                  Use UPnP to map the listening port (default: 1 when listening)
-paytxfee=<amt>        Fee per KB to add to transactions you send
-testnet               Use the test network
-debug                 Output extra debugging information. Implies all other -debug* options
-debugnet              Output extra network debugging information
-logtimestamps         Prepend debug output with timestamp
-shrinkdebugfile       Shrink debug.log file on client startup (default: 1 when no -debug)
-printtoconsole        Send trace/debug info to console instead of debug.log file
-regtest               Enter regression test mode, which uses a special chain in which blocks can be solved instantly. This is intended for regression testing tools and app development.
-rpcuser=<user>        Username for JSON-RPC connections
-rpcpassword=<pw>      Password for JSON-RPC connections
-rpcport=<port>        Listen for JSON-RPC connections on <port> (default: 28332 or testnet: 18332)
-rpcallowip=<ip>       Allow JSON-RPC connections from specified IP address
-rpcconnect=<ip>       Send commands to node running on <ip> (default: 127.0.0.1)
-rpcthreads=<n>        Set the number of threads to service RPC calls (default: 10)
-public_server_mode    Limit JSON-RPC execution to public/safe commands only.
-blocknotify=<cmd>     Execute command when the best block changes (%s in cmd is replaced by block hash)
-walletnotify=<cmd>    Execute command when a wallet transaction changes (%s in cmd is replaced by TxID)
-alertnotify=<cmd>     Execute command when a relevant alert is received (%s in cmd is replaced by message)
-upgradewallet         Upgrade wallet to latest format
-keypool=<n>           Set key pool size to <n> (default: 100)
-rescan                Rescan the block chain for missing wallet transactions
-salvagewallet         Attempt to recover private keys from a corrupt twisterwallet.dat
-checkblocks=<n>       How many blocks to check at startup (default: 500, 0 = all)
-checklevel=<n>        How thorough the block verification is (0-4, default: 3)
-txindex               Maintain a full transaction index (default: 0)
-loadblock=<file>      Imports blocks from external blk000??.dat file
-reindex               Rebuild block chain index from current blk000??.dat files
-par=<n>               Set the number of script verification threads (up to 16, 0 = auto, <0 = leave that many cores free, default: 0)

-blockminsize=<n>      Set minimum block size in bytes (default: 0)
-blockmaxsize=<n>      Set maximum block size in bytes (default: 250000)
-blockprioritysize=<n> Set maximum size of high-priority/low-fee transactions in bytes (default: 27000)

-rpcssl                                  Use OpenSSL (https) for JSON-RPC connections
-rpcsslcertificatechainfile=<file.cert>  Server certificate file (default: server.cert)
-rpcsslprivatekeyfile=<file.pem>         Server private key (default: server.pem)
-rpcsslciphers=<ciphers>                 Acceptable ciphers (default: TLSv1+HIGH:!SSLv2:!aNULL:!eNULL:!AH:!3DES:@STRENGTH)
```

## Web UI

Web user interface is the original way to interact with the twister P2P network.

If you have installed [twister-core](https://github.com/twisterarmy/twister-core) using the instructions from this book, you already have [twister-html](https://github.com/twisterarmy/twister-html) client included in your installation. Simply open [http://127.0.0.1:28332](http://127.0.0.1:28332) in your browser after [launching twisterd](#launch)!

After the first launch, take a look at following pages:

* [Network](http://127.0.0.1:28332/network.html) - where you can check your connection details, setup the miner with a promotional message, etc.
* [Options](http://127.0.0.1:28332/options.html) - customize the appearance: theme, information blocks, translation API, feed updates, notification alerts and sounds, massages size limit, WebTorrent feature (for attachments and link shortening) and more;
* Also, refer to the main menu (located in the top right corner, depending on the theme) to further customize your account description, links, avatar and find links to the community resources.

> [!TIP]
> Before you start using the Web UI, please keep the following in mind:
> * The local cache is stored in the browser's local storage;
> * Public data is distributed with other peers through the BitTorrent/DHT swarm, so new publications, profile changes, or direct messaging may take some time, and depend on the current [network status](https://twisterarmy.github.io/network);
> * Permanent data storage (such as user accounts) requires a new block to be mined by other peers or by you;
> * If you have joined the twister network for the first time and encounter any [connection issues](https://github.com/twisterarmy/twister-html/issues/44) while publishing your initial message, please stay online and try to send your message again later!

> [!IMPORTANT]
> Pay attention to what you are publishing!\
> You cannot delete or change your published data later, as it is **permanently** stored on different P2P nodes!

## GUI

At this moment, there is no known graphical interface available yet, but there is some work in progress, and you can join the development:

* [twister-control-center](https://github.com/twisterarmy/twister-control-center) - GTK4 client written in Rust to operate a local or remote `twisterd`

## CLI

Unlike other Bitcoin-based wallets, which usually come with a separate `bitcoin-cli` tool, `twisterd` offers command line interaction through its built-in interface:

first, run the `twisterd` daemon:

``` bash
./twisterd
```

then, from another thread, request any command from the [JSON-RPC API list](#json-rpc) to print the output, for example:

``` bash
./twisterd getbestblockhash
```

## API

### JSON-RPC

#### Commands

> [!CAUTION]
> Some commands below may output sensitive personal data, such as the private key for your account. Please exercise caution when creating an issue report that includes any debug information or when someone requests any data from this asset!

To get a list of all supported commands, run `twisterd` with the `help` argument:

``` bash
./twisterd help
```

``` bash
adddnsseed <seeder>
addnode <node> <add|remove|onetry>
backupwallet <destination>
creategroup <description> [<groupprivkey>]
createrawtransaction <username> <pubKey> [signedByOldKey]
createwalletuser <username> [replacekey]
decoderawtransaction <hex string>
decodeshorturl <twist:xxx> [timeout_sec=90]
dhtget <username> <resource> <s(ingle)/m(ulti)> [timeout_ms] [timeout_multi_ms] [min_multi]
dhtput <username> <resource> <s(ingle)/m(ulti)> <value> <sig_user> <seq>
dhtputraw <hexdata>
dumpprivkey <username>
dumppubkey <username>
dumpwallet <filename>
encryptwallet <passphrase>
follow <username> [follow_username1,follow_username2,...]
getaddednodeinfo <dns> [node]
getbestblockhash
getblock <hash> [verbose=true]
getblockcount
getblockhash <index>
getblocktemplate [params]
getconnectioncount
getdifficulty
getdirectmsgs <localuser> <count_per_user> '[{"username":username,"max_id":max_id,"since_id":since_id},...]'
getfavs <localuser> <count> '{"max_id":max_id,"since_id":since_id}'
getfollowing <username>
getgenerate
getgroupinfo <groupalias>
gethashespersec
getinfo
getlasthave <username> | <groupname> [user1,user2...]
getlastsoftcheckpoint
getmentions <localuser> <count> '{"max_id":max_id,"since_id":since_id}'
getmininginfo
getnumpieces <username>
getpeerinfo
getpieceavailability <username> <k>
getpiecemaxseen <username> <k>
getposts <count> '[{"username":username,"max_id":max_id,"since_id":since_id},...]' [allowed_flags=~2] [required_flags=0]
getpreferredspamlang
getrawmempool
getrawtransaction <username> [verbose=0]
getspammsg
getspamposts <count> [max_id] [since_id]
gettransaction <txid>
gettrendinghashtags <count>
getwork [data]
help [command]
importprivkey <bitcoinprivkey> <username> [rescan=true] [allow_new_user=false]
importwallet <filename>
leavegroup <username> <groupalias>
listgroups [username] [list_only_ignored=false]
listsinceblock [blockhash] [target-confirmations]
listtransactions [account] [count=10] [from=0]
listusernamespartial <username_starts_with> <count> [exact_match=false]
listwalletusers
newdirectmsg <from> <k> <to> <msg> [copy_self=false]
newfavmsg <username> <k> <fav_v_object> [private=false] [comment=''] 
newgroupdescription <username> <k> <groupalias> <description>
newgroupinvite <username> <k> <groupalias> '[<newmember>,...]'
newpostcustom <username> <k> '{"field1":value,"field2":value,...}'
newpostmsg <username> <k> <msg> [reply_n] [reply_k]
newpostraw <username> <k> <hexdata>
newrtmsg <username> <k> <rt_v_object> [comment]
newshorturl <username> <k> <url> [mimetype]
peekpost <username> <k> [field='*'] [timeout_sec=90]
recheckusertorrent <username>
rescandirectmsgs <username>
search <scope> <text> <count> ['{"username":username,"mode":"exact"|"all"|"any","case":"sensitive"|"insensitive","agemin":agemin,"agemax":agemax}']
sendnewusertransaction <username>
sendrawtransaction <hex string>
setgenerate <generate> [genproclimit]
setpreferredspamlang <langcode>
setspammsg <username> <msg> [add|remove|replace]
signmessage <username> <message>
stop
submitblock <hex data> [optional-params-obj]
testvector <username>
torrentstatus <username>
uidtousername <uid>
unfollow <username> [unfollow_username1,unfollow_username2,...]
usernametouid <username> [last=true]
verifychain [check level] [num blocks]
verifymessage <username> <signature> <message>
```

#### Libraries

Use following list of the known JSON-RPC API libraries for twister P2P to create your own application or to obtain implementation examples in different programming languages:

* [twister-php](https://github.com/twisterarmy/twister-php) (PHP 8) - [Composer](https://packagist.org/packages/twisterarmy/twister) library for `twister-core` RPC-JSON API to build interactive web-applications like [twister-rss-bot](https://github.com/twisterarmy/twister-rss-bot/)
* [twistercore-rpc](https://github.com/twisterarmy/rust-twistercore-rpc) (Rust) - Client library / [crate](https://crates.io/crates/twistercore-rpc) with partially covered methods that used in the [twisterad](https://github.com/twisterarmy/twisterad) and [twister-control-center](https://github.com/twisterarmy/twister-control-center) applications, based on the original [Bitcoin Core JSON-RPC API](https://github.com/rust-bitcoin/rust-bitcoincore-rpc)

### RSS

If your `twister-core` is configured with the `--enable-rss` option enabled (which is `yes` by default), you can connect an external RSS application to read the recent feed updates using [http://127.0.0.1:28332/rss](http://127.0.0.1:28332/rss) URL!