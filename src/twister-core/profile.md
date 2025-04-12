## Profile data

> [!CAUTION]
> * never share your private key or any profile data with others!
> * you cannot change your credentials on leak, as permanently stored on the blockchain.

Typically, user data is created upon the first launch and stored in the home directory of the user who runs the `twisterd` process:

``` bash
/home/username/.twister
```
> [!TIP]
> The hidden files may be invisible by default.\
> In the [Nautilus](https://apps.gnome.org/en/Nautilus/) file manager, you can toggle the visibility of hidden files by using the `Ctrl+H` keyboard shortcut.

### ~/.twister contents

> [!IMPORTANT]
> Do not manually operate with the following files without understanding what you are doing!\
> If you want to modify something or copy the entire folder, first stop the active `twisterd` process using `systemd` API or by clicking the `Exit` button on the [Network page](http://127.0.0.1:28332/network.html).

* `/blocks`, `/chainstate` - blockchain data
* `/database` - application state database
* `/html` - default location for the [twister-html](https://github.com/twisterarmy/twister-html) web UI, may not be here if `twisterd` has been launched with the `-htmldir` [argument](#cli-arguments)
* `debug.log` - contains recent RPC requests
* `peers.dat` - the known peers database, along with the current network state, could be useful for initial connection to old peers without working [DNS seeds](https://twisterarmy.github.io/network) (by copying it into the new `twister-core` profile)
* `twister.conf` - stores `twisterd` launch options used instead of some [CLI arguments](#cli-arguments)
* `twisterwallet.dat` - contains user private keys, it is same as `wallet.dat` in Bitcon, keep in safe place!
* `.lock` - prevents `twisterd` from being launched twice at the same time

## Backup

Similar to a Bitcoin, which uses `~/.bitcoin/wallet.dat`, twister manages your accounts using the `~/.twister/twisterwallet.dat` file. 

To backup a specified username (public key) in twister, you should know its password (private key) that was previously registered on the twister blockchain, which was also displayed in the success alert when the account was created.

> [!IMPORTANT]
> If you lose the private / public key pair for account, you will no longer be able to use it!

### Web UI

To export your private key for an active user:

1. navigate to the [Home page](http://127.0.0.1:28332/home.html)
2. select from the main menu `Setup account`
3. press `Secret Key` button
4. your private key will be displayed below, copy it to a safe place.

### Files to backup

An additional backup of the profile folder is not really required, as the blockchain and other data can be downloaded from the network during the initialization of a new wallet.

Optionally, you may archive the entire `.twister` folder or just copy `twisterwallet.dat` to use your wallet on another twister node without having to download the blockchain or import the public/private key pair in the web UI.

### How to store backup

Similar to Bitcoin, you can keep your profile data in digital form (by using [KeePassXC](https://keepassxc.org/)) or you even can simply print the public/private key pair on paper.