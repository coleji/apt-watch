const exec = require("child_process").exec;

exec("sudo apt-get dist-upgrade -s", (err, stdout, etderr) => {
    const stdoutTrim = stdout.trim();
    const regex = /(The following packages were automatically installed and are no longer required:\n(.*?)\nUse 'apt autoremove' to remove them.\n)?(The following NEW packages will be installed:\n(.*?)\n)?(The following packages will be upgraded:\n(.*?)\n)?(\d+) upgraded, (\d+) newly installed, (\d+) to remove and (\d+) not upgraded./gms;
    const result = regex.exec(stdoutTrim);
    console.log("regex result: ", result);
    console.log("Autoremove: ", result[2]);
    console.log("new: ", result[4]);
    console.log("upgrade: ", result[6])
})