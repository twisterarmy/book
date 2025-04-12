## Binaries

Some pre-compiled binaries available at the [Releases page](https://github.com/twisterarmy/twister-seeder/releases)

## Build from source

### Debian / Ubuntu

Install required dependencies:

``` bash
sudo apt install build-essential libboost-all-dev libssl-dev
```

Log in as `root` and ensure you are in the `/root` directory, then follow steps:

1. `git clone https://github.com/twisterarmy/twister-seeder.git`
2. `cd twister-seeder`
3. `make`

Compiled `dnsseed` binary will be placed in the current `twister-seeder` build location!