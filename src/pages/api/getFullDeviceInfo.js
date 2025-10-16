// frontend/utils/getFullDeviceInfo.js
export const getFullDeviceInfo = async () => {
  const ua = navigator.userAgent;
  const screen = window.screen;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};

  const deviceInfo = {
    browser: navigator.appName,
    browserVersion: navigator.appVersion,
    userAgent: ua,
    vendor: navigator.vendor,
    os: navigator.platform,
    deviceType: /Mobile|Android/.test(ua)
      ? "mobile"
      : /iPad|Tablet/.test(ua)
      ? "tablet"
      : "desktop",
    cores: navigator.hardwareConcurrency,
    memoryGB: navigator.deviceMemory,
    screenResolution: `${screen.width}x${screen.height}`,
    pixelRatio: window.devicePixelRatio,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    online: navigator.onLine,
    connectionType: connection.effectiveType || "unknown",
    cookiesEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack === "1",
  };

  // Precise geolocation
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true })
      );
      deviceInfo.preciseLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        mapLink: null,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        heading: position.coords.heading,
        speed: position.coords.speed,
      };
    } catch (err) {
      deviceInfo.preciseLocation = { error: err.message };
    }
  } else {
    deviceInfo.preciseLocation = { error: "Geolocation not supported" };
  }

  return deviceInfo;
};
