## Disk

### Custom profile location

By default, `twisterd` will create a profile directory on the same drive where it is launched.

If you are using a single-board device to run `twisterd` with default startup options, this could lead to many overwrite operations on the built-in SSD storage and reduce its lifespan. To resolve this, launch `./twisterd` with the `-datadir=DATA` [argument](Usage#cli-arguments), where `DATA` is an absolute path to your custom [profile data location](#profile-data). For example, you can specify a location on an external drive (like a USB flash drive) mounted that is easy to replace or extend in size.

#### External drive

> [!CAUTION]
> Following example requires partial root access; an incorrect drive path identification may cause partition damage, data loss, and make your system unbootable!

1. connect your drive then run `parted -l` or `fdisk -l` to find its location (e.g. `/dev/sda` or `/dev/mmcblk0`)
2. navigate to the partition manager for this device using the command `parted /dev/sda`
3. `mklabel gpt` - set partition format
4. `mkpart logical ext4 0% 100%` - to use all available space
5. `print free` check if everything fine here
6. `quit` - save and exit 
7. `mkfs -t ext4 /dev/sda1` - format partition created (replace `/dev/sda1` with your value)
8. `lsblk -o PATH,SIZE,RO,TYPE,MOUNTPOINT,UUID,MODEL` - get partition `UUID`
9. `nano /etc/fstab` - persist on startup

> [!WARNING]
> Before making the following changes, keep in mind that modifying `/etc/fstab` may cause the system to not boot properly if some related external drive is detached!

```
# <file system>                      <mount point> <type> <options>                    <dump> <pass>
...
UUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxx /mnt/sda1     ext4  defaults,noatime,rw,user,auto 0      2
```
* save and exit

10. `mv /home/twister/.twister /mnt/sda1/.twister` - move profile data from the `root` as mounded by this user
11. `chown -R twister:twister /mnt/sda1/.twister` - since you have copied files as the `root`, make sure the `twister` user has permission to access this directory when launching `twisterd`
12. `./twisterd -datadir=/mnt/sda1/.twister` - now run `twisterd` as its regular user

### Free additional space

Before continuing with the options below, try to search for large files inside the user profile under which you are running the `twister-core` service:

1. `su twister` - login to your `twister-core` account
2. `find ~/.twister -type f -size +50M` - search for files larger than 50 MB
3. watch for `.log` files in results to clean up and prioritize their management
4. repeat steps 2-3 for the `/var/log/*` location

#### Clean up the profile cache

> [!NOTE]
> This action is not recommended, as it drops peer exchange metadata and is useful only when you want to free up disk space without deleting the entire `~/.twister` directory with the blockchain and wallet data!

In this case, you can try to remove the contents of the `~/.twister/swarm` folder (after running `systemctl stop twister-core`), as it may grow over time and take up a lot of disk space on older service nodes.

## Memory

### Extend memory by using a swap file

> [!NOTE]
> The permanent use of a swap file is not recommended, especially for single-board devices with integrated SSD storage; use this solution only if you want to extend the existing memory limits temporarily (e.g., to build something) without disabling the active `twisterd` process.

> [!WARNING]
> Some commands below require `root` access: be careful not to overwrite existing `swap` files!

1. `fallocate -l 1G /swapfile` - creates new `swapfile` in the filesystem root
2. `chmod 600 /swapfile` - give the valid permissions
3. `mkswap /swapfile` - format
4. `swapon /swapfile` - enable
5. `free -h` or `swapon --show` or `htop` - make sure the memory has been extended

> [!TIP]
> To make the swap file automatically enabled on system startup, add the following line to `/etc/fstab`:
> 
> > [!WARNING]
> > Before making the following changes, keep in mind that modifying `/etc/fstab` may cause the system to not boot properly if the external drive is detached!
> 
> ``` /etc/fstab 
> # <file system>   <mount point>   <type>   <options>   <dump> <pass>
> /swapfile         none            swap     sw          0      0
> ```

If the `swapfile` is no longer in use, you can safely remove it:

1. `swapoff /swapfile` - await to continue
2. `free -h` or `swapon --show` or `htop` - make sure the `swapfile` was disabled
3. `rm /swapfile` - free disk by removing `swapfile` created in the previous steps

### Limit memory usage for the twisterd process

> [!NOTE]
> Low memory values may cause `twisterd` to become unresponsive to RPC requests or render your public peer unhelpful for the network!

To forcefully restrict memory resources for `twisterd` process, add the following options to the `systemd` service:

``` twister.service
[Service]
MemoryHigh=256M
MemoryMax=512M
MemorySwapMax=512M
```
* save and exit
* `systemctl daemon-reload` - do not forget to reload `systemd` configuration
* `systemctl restart twister` - restart service (where `twister` is the actual service name)

## Useful CLI tools

* `sensors` (`apt install lm-sensors`) - show current CPU temperature (useful for miners)
* `htop`, `btop` - system totals monitor
* `df -h` - show disk usage summary
* `find / -type f -size +50M` - find large files (provide your path and size)