The [twister-seedrs](https://github.com/twisterarmy/twister-seedrs) is a DNS seeder for [twister-core](https://github.com/twisterarmy/twister-core) written in Rust,
based on the original Bitcoin [DNSSeedrs](https://github.com/achow101/dnsseedrs) source.

This project was created as an alternative to the legacy [twister-seeder](https://github.com/twisterarmy/twister-seeder) written in C++.

## Install

### Stable

``` bash
cargo install twister-seedrs
```

### Repository

* `git clone https://github.com/twisterarmy/twister-seedrs.git`
* `git checkout twister` - make sure you are using the `twister` network implementation (default branch)
* `cargo build --release` - see `target/*` directory to get the compiled binary!

## Usage

``` bash
sudo twister-seedrs -s 94.140.114.251:28333 -s 209.209.8.80:28333\
                    seed.example.com ns.example.com john.doe.example.com
```

> [!TIP]
> Run `twister-seedrs --help` to get all available options!

> [!NOTE]
> * current implementation (by `dnsseedrs`) requires at least few initial peers (`--seednode` values) during the first launch!
> * the original [bitcoin crate](https://crates.io/crates/bitcoin/) is still in use and requires a separate fork for the twister network, at least to redefine the hardcoded network magic bytes (which is temporarily hardcoded in `crawl.rs`, line `112`)