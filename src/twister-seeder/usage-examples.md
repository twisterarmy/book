> [!NOTE]
> Ubuntu users may need to free port `53`, which is natively used by the `systemd-resolved` process:
> 
> ```
> #/etc/systemd/resolved.conf
> DNSStubListener=no
> ```

### Firewall
Change the `iptables` rules to make `twister-seeder` DNS accessible from outside:
```
sudo ufw allow 53
```

## Launch

Login as `root` then run:

```
./dnsseed -h seed.domain.org -n ns.domain.org
```

Output example:

```
0/2 available (2 tried in 333s, 0 new, 0 active), 0 banned; 31 DNS requests, 13 db queries
...
```

### Test

Before continue with [systemd](#systemd),\
run on the local/remote host following command when `twister-seed` (`dnsseed`) is running:

``` bash
host -a seed.domain.org ns.domain.org
```

the output appear as follows:

``` bash
Trying "seed.domain.org"
Using domain server:
Name: ns.domain.org
Address: IP#53
Aliases:

;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 18126
;; flags: qr aa rd; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;seed.domain.org.		IN	ANY

;; ANSWER SECTION:
seed.domain.org.	40000	IN	NS	ns.domain.org.
seed.domain.org.	60	IN	A	TWISTER_CORE_IP_1
seed.domain.org.	60	IN	A	TWISTER_CORE_IP_2

Received 99 bytes from IP#53 in 0 ms
```

* if everything is working, `TWISTER_CORE_IP_1` and `TWISTER_CORE_IP_2` should display the real peers who are running their `twister-core` nodes on port `28333`
* if you have any issues with discovering new peers, see [Troubleshooting](Troubleshooting) or open new [Issue](https://github.com/twisterarmy/twister-seeder/issues)

### systemd

``` /etc/systemd/system/twister-seeder.service
# /etc/systemd/system/twister-seeder.service
[Unit]
After=network.target

[Service]
Type=simple
ExecStart=/path-to/twister-seeder/dnsseed -h seed.domain.org -n ns.domain.org
# please note:
# twister-seeder may generate massive output if the StandardOutput is set to a log file!
StandardOutput=null
StandardError=file:/path-to/twister-seeder-errors.log
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
* replace `domain.org` and `/path-to/` by your domain name and path
* `systemctl daemon-reload` - apply systemd update
* `systemctl enable twister-seeder` - launch `twister-seeder` on system startup
* `systemctl start twister-seeder` - start DNS