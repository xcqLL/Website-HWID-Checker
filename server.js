const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/hwid', (req, res) => {
    exec('wmic csproduct get uuid', (error, stdout, stderr) => {
        const smbios = stdout.trim();
        exec('wmic baseboard get serialnumber', (error, stdout, stderr) => {
            const baseboard = stdout.trim();
            exec('wmic diskdrive get serialnumber', (error, stdout, stderr) => {
                const diskdrive = stdout.trim();
                exec('wmic memorychip get serialnumber', (error, stdout, stderr) => {
                    const ram = stdout.trim();
                    exec('wmic path Win32_NetworkAdapter where "PNPDeviceID like \'%%PCI%%\' AND NetConnectionStatus=2 AND AdapterTypeID=\'0\'" get MacAddress', (error, stdout, stderr) => {
                        const mac = stdout.trim();
                        res.json({ smbios, baseboard, diskdrive, ram, mac });
                    });
                });
            });
        });
    });
});

app.get('/volumes', (req, res) => {
    exec('vol c:', (error, stdout, stderr) => {
        const volumeC = stdout.trim();
        exec('vol d:', (error, stdout, stderr) => {
            const volumeD = stdout.trim();
            exec('vol e:', (error, stdout, stderr) => {
                const volumeE = stdout.trim();
                exec('vol f:', (error, stdout, stderr) => {
                    const volumeF = stdout.trim();
                    res.json({ volumeC, volumeD, volumeE, volumeF });
                });
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
