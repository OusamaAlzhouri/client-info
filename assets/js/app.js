'use strict';

const osEl = document.getElementById('os');
const languageEl = document.getElementById('language');
const browserEl = document.getElementById('browser');
const widthEl = document.getElementById('width');
const heightEl = document.getElementById('height');
const orientationEl = document.getElementById('orientation');
const batteryEl = document.getElementById('battery');
const chargingEl = document.getElementById('charging');
const networkEl = document.getElementById('network');
const networkSection = document.querySelector('.network-status');

function findOS() {
    const agent = navigator.userAgent;
    if (agent.indexOf("Win") !== -1) return "Windows";
    if (agent.indexOf("Mac") !== -1) return "MacOS";
    if (agent.indexOf("Linux") !== -1) return "Linux";
    if (agent.indexOf("Android") !== -1) return "Android";
    if (agent.indexOf("like Mac") !== -1) return "iOS";
    return "Unknown";
}

function findBrowser() {
    const agent = navigator.userAgent;
    if (agent.indexOf("Firefox") > -1) return "Firefox";
    if (agent.indexOf("SamsungBrowser") > -1) return "Samsung Browser";
    if (agent.indexOf("Opera") > -1 || agent.indexOf("OPR") > -1) return "Opera";
    if (agent.indexOf("Trident") > -1) return "Internet Explorer";
    if (agent.indexOf("Edge") > -1) return "Edge";
    if (agent.indexOf("Chrome") > -1) return "Chrome";
    if (agent.indexOf("Safari") > -1) return "Safari";
    return "Unknown";
}

function showSystem() {
    osEl.innerText = findOS();
    languageEl.innerText = navigator.language;
    browserEl.innerText = findBrowser();
}

function showWindow() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    widthEl.innerText = w;
    heightEl.innerText = h;
   
    orientationEl.innerText = (w > h) ? "Landscape" : "Portrait";
}


function showBattery() {
    if (navigator.getBattery) {
        navigator.getBattery().then(function(battery) {
            const level = Math.round(battery.level * 100);
            batteryEl.innerText = level;
            chargingEl.innerText = battery.charging ? "Charging" : "Not Charging";
            battery.addEventListener('levelchange', showBattery);
            battery.addEventListener('chargingchange', showBattery);
        });
    } else {
        batteryEl.innerText = "Not available";
        chargingEl.innerText = "Not available";
    }
}

function showNetwork() {
    if (navigator.onLine) {
        networkEl.innerText = "Online";
        networkSection.style.backgroundColor = "green";
    } else {
        networkEl.innerText = "Offline";
        networkSection.style.backgroundColor = "red";
    }
}

function updateInfo() {
    showSystem();
    showWindow();
    showBattery();
    showNetwork();
}

window.addEventListener('load', updateInfo);

window.addEventListener('resize', showWindow);
window.addEventListener('orientationchange', showWindow);

window.addEventListener('online', showNetwork);
window.addEventListener('offline', showNetwork);
