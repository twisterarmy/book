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

Compiled `dnsseed` binary will be placed in the current `twister-seeder` build directory (see also **Storage location**)

#### Upgrade from repository

Steps to upgrade your existing `twister-seeder` from the repository sources:

1. stop existing `dnsseed` process to continue (if active, run `pgrep dnsseed` to find)
    - `sudo systemctl stop dnsseed` - if you're using `systemd` service
2. `cd twister-seeder` - navigate `twister-seeder` sources directory (which contains old `dnsseed` binary)
3. `git pull` - grab latest updates
4. `make` - build new version
5. start `dnsseed` process
    - `sudo systemctl start dnsseed` - if you're using `systemd` service