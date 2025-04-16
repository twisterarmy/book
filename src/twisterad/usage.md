## Rotation settings

Check out `config.json` to setup remote or local `twisterd` connection and update default promotions asset!

## CLI arguments

> [!NOTE]
> The arguments in the list are applicable to the stable `0.3.0` version!
> Run `twisterad --help` to get actual options!

``` bash
Usage: twisterad [OPTIONS] --config <CONFIG>

Options:
  -c, --config <CONFIG>        Configuration file, required
  -d, --delay <DELAY>          Rotation queue delay, seconds [default: 60]
      --host <HOST>            RPC host [default: 127.0.0.1]
  -j, --jobs <JOBS>            Processor jobs to mine at once
  -l, --latency <LATENCY>      Miner latency in seconds, useful when blocks are being generated too quickly
  -m, --mode <MODE>            Rotation mode: * `c` - cycle * `s` - stop, disable worker [default: c]
  -p, --password <PASSWORD>    RPC password [default: pwd]
      --port <PORT>            RPC port [default: 28332]
  -r, --rotations <ROTATIONS>  Rotations quantity, before apply rotation `mode`
  -s, --scheme <SCHEME>        RPC scheme [default: http]
  -u, --user <USER>            RPC user [default: user]
  -w, --wait <WAIT>            Wait to server reconnect, seconds [default: 900]
  -h, --help                   Print help
  -V, --version                Print version
```

## systemd

> [!IMPORTANT]
> Current (`0.3.1`) `twisterad` implementation borrows the `twisterd` connection through the RPC API. If you are running `twisterd` as another `systemd` service and want to stop it (either by using `systemctl` command or by `Exit` button on the [Network page](http://127.0.0.1:28332/network.html)), it is important to stop the `twisterad` service first!

To run `twisterad` as the `systemd` unit (background process):

* `cd twisterad` - navigate sources directory
* `cargo build --release` - compile optimized binary
* `useradd twisterad` - create new user for `twisterad` process
* `cp target/release/twisterad /usr/bin/twisterad` - copy binary into native system location
* `chmod 0700 /usr/bin/twisterad` - give required permissions
* `chown twisterad:twisterad /usr/bin/twisterad` - allow user/group access
* `mkdir /var/log/twisterad` - create destination for the logs
* `cp config.json /etc/twisterad.conf` - copy and customize default config

Create new `systemd` configuration file: `nano /etc/systemd/system/twisterad.service`

``` twisterad.service
[Unit]
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=twisterad
Group=twisterad
ExecStart=/usr/bin/twisterad -c /etc/twisterad.conf
StandardOutput=file:/var/log/twisterad/debug.log
StandardError=file:/var/log/twisterad/error.log

[Install]
WantedBy=multi-user.target
```
* to disable debug output, set `null` for `StandardOutput` or `StandardError`

Apply changes:

* `systemctl daemon-reload` - reload unit configuration
* `systemctl enable twisterad` - start on system boot
* `systemctl start twisterad` - launch
* `systemctl status twisterad` - check service status

On change `config.json`:

``` bash
systemctl restart twisterad
```