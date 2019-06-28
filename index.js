const exec = require("child_process").exec;

const test = `
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Calculating upgrade... Done
The following packages were automatically installed and are no longer required:
  libavahi-client3 libavahi-common-data libavahi-common3 libnl-3-200 libvirt0 libxen-4.6 libxen-dev libxenstore3.0 libyajl2 pkg-config
Use 'apt autoremove' to remove them.
The following NEW packages will be installed:
  linux-headers-4.4.0-154 linux-headers-4.4.0-154-generic linux-image-4.4.0-154-generic linux-modules-4.4.0-154-generic
The following packages will be upgraded:
  linux-headers-generic linux-headers-virtual linux-image-virtual linux-virtual snapd ubuntu-core-launcher
6 upgraded, 4 newly installed, 0 to remove and 0 not upgraded.
Inst ubuntu-core-launcher [2.38] (2.39.2ubuntu0.2 Ubuntu:16.04/xenial-updates [amd64]) []
Inst snapd [2.38] (2.39.2ubuntu0.2 Ubuntu:16.04/xenial-updates [amd64])
Inst linux-headers-4.4.0-154 (4.4.0-154.181 Ubuntu:16.04/xenial-updates [all])
Inst linux-headers-4.4.0-154-generic (4.4.0-154.181 Ubuntu:16.04/xenial-updates [amd64])
Inst linux-modules-4.4.0-154-generic (4.4.0-154.181 Ubuntu:16.04/xenial-updates [amd64])
Inst linux-image-4.4.0-154-generic (4.4.0-154.181 Ubuntu:16.04/xenial-updates [amd64])
Inst linux-virtual [4.4.0.151.159] (4.4.0.154.162 Ubuntu:16.04/xenial-updates [amd64]) []

`

function castToList(pkgList) {
    return (pkgList || "").split(" ").filter(s => s.length > 0).map(s => s.trim())
}

exec("sudo apt-get dist-upgrade -s", (err, stdout, etderr) => {
    const stdoutTrim = stdout.trim();
    const regex = /(The following packages were automatically installed and are no longer required:\n(.*?)\nUse 'apt autoremove' to remove them.\n)?(The following NEW packages will be installed:\n(.*?)\n)?(The following packages will be upgraded:\n(.*?)\n)?(\d+) upgraded, (\d+) newly installed, (\d+) to remove and (\d+) not upgraded./gms;
    const result = regex.exec(stdoutTrim);
    console.log("Autoremove: ", castToList(result[2]));
    console.log("new: ", castToList(result[4]));
    console.log("upgrade: ", castToList(result[6]));
    console.log("raw apt-get output: ", stdoutTrim);
})