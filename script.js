let alarmTimeout;
let alarmAudio = new Audio();
let repeatAlarm = false;

document.getElementById('set-alarm').addEventListener('click', () => {
    const minutes = parseInt(document.getElementById('alarm-time').value, 10);
    const soundFile = document.getElementById('alarm-sound').files[0];
    repeatAlarm = document.getElementById('repeat-alarm').checked;

    if (isNaN(minutes) || minutes < 1 || minutes > 1440) {
        alert("1분에서 1440분(24시간) 사이로 입력해주세요.");
        return;
    }

    if (soundFile) {
        const fileURL = URL.createObjectURL(soundFile);
        alarmAudio.src = fileURL;
    } else {
        alarmAudio.src = "default-alarm.mp3"; // 기본 알람 소리 (미리 준비된 파일)
    }

    document.getElementById('status').innerText = `알람이 ${minutes}분 후에 울립니다.`;
    
    alarmTimeout = setTimeout(playAlarm, minutes * 60 * 1000);
});

document.getElementById('stop-alarm').addEventListener('click', () => {
    clearTimeout(alarmTimeout);
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    document.getElementById('status').innerText = "알람이 정지되었습니다.";
});

function playAlarm() {
    alarmAudio.play();
    document.getElementById('status').innerText = "⏰ 알람이 울립니다!";

    if (repeatAlarm) {
        alarmTimeout = setTimeout(playAlarm, 60 * 1000); // 1분마다 반복
    }
}
