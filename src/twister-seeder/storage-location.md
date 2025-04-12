When launching the `twister-seeder` as the `root` user, current implementation saves data files to the system root (`/`) location instead of the typically expected `/root/*` directory:

* `/dnsseed.dat`
* `/dnsseed.dump`
* `/dnsstats.log`*


By using `systemd` to launch the service, log files will be available in the locations defined in the `StandardOutput` and `StandardError` settings
> [!NOTE]
> `StandardOutput` is not recommended in production, as a functioning `dnsseed` crawler generates massive log output!