# twisterad

Lightweight, in-memory CLI tool & daemon to rotate multiple [twister](https://github.com/twisterarmy/twister-core) ads on single worker,
through modified [Bitcoin Core JSON-RPC API](https://github.com/twisterarmy/rust-twistercore-rpc) library.

## Use cases

* optimal to run as the `systemd` unit that waits for `twisterd` connection and then begins updating promotional messages with each new block found
* supports multiple [options](Usage#cli-arguments), including `--latency` delay in seconds, which is useful for limiting block generation on powerful machines
* written in Rust to ensure memory safety over the long term run, it does not require a disk-based database, making it SSD-friendly for everyday use on your Raspberry Pi!

## How does it work

* after launch, `twisterad` listens for the `twisterd` connection to be established, and then begins rotation according to the configuration and startup arguments
* when `twisterd` connection is lost, `twisterad` will wait for reconnection and continue rotation from the previous memory state. It could be also useful for the desktop users, who running their `twisterd` nodes periodically