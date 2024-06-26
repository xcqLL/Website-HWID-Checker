document.addEventListener('DOMContentLoaded', () => {
    fetch('/hwid')
        .then(response => response.json())
        .then(data => {
            document.getElementById('smbios-output').textContent = data.smbios;
            document.getElementById('baseboard-output').textContent = data.baseboard;
            document.getElementById('diskdrive-output').textContent = data.diskdrive;
            document.getElementById('ram-output').textContent = data.ram;
            document.getElementById('mac-output').textContent = data.mac;
        });

    const volumeSection = document.getElementById('volume-section');
    const checkVolumesBtn = document.getElementById('check-volumes-btn');

    checkVolumesBtn.addEventListener('click', () => {
        if (volumeSection.style.display === 'none') {
            fetch('/volumes')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('volume-c-output').textContent = data.volumeC;
                    document.getElementById('volume-d-output').textContent = data.volumeD;
                    document.getElementById('volume-e-output').textContent = data.volumeE;
                    document.getElementById('volume-f-output').textContent = data.volumeF;
                    volumeSection.style.display = 'block';
                    checkVolumesBtn.textContent = 'Hide Volume IDs';
                });
        } else {
            volumeSection.style.display = 'none';
            checkVolumesBtn.textContent = 'Check Volume IDs';
        }
    });
});
