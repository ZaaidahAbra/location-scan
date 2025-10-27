<template>
  <div class="scanner-container">
    <h1>📍 Employee Location Tracker</h1>

    <div v-if="!scanning">
      <button @click="startScan">Start QR Scan</button>
    </div>

    <!-- QR Reader container -->
    <div v-show="scanning" id="qr-reader" style="width: 300px; margin: 20px auto;"></div>

    <p class="status">{{ statusMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Html5Qrcode } from "html5-qrcode";

// Reactive variables
const scanning = ref(false);
const statusMessage = ref("Ready to scan. Click 'Start QR Scan'.");
let html5QrCode = null;

// Start QR scanner
const startScan = async () => {
  const qrElement = document.getElementById("qr-reader");
  if (!qrElement) {
    statusMessage.value = "QR reader element not found!";
    return;
  }

  scanning.value = true;
  statusMessage.value = "Initializing QR Scanner...";

  html5QrCode = new Html5Qrcode("qr-reader");

  const config = { fps: 10, qrbox: { width: 250, height: 250 } };

  html5QrCode
    .start(
      { facingMode: "environment" },
      config,
      async (decodedText) => {
        // Stop scanner once QR is read
        await html5QrCode.stop();
        scanning.value = false;

        const employeeId = parseInt(decodedText.trim());
        statusMessage.value = `QR scanned! Employee ID: ${employeeId}`;

        // Get user location
        if (!navigator.geolocation) {
          statusMessage.value = "Geolocation not supported by browser!";
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            statusMessage.value = "Sending location to backend...";

            try {
              const res = await fetch("http://localhost:5000/api/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ employee_id: employeeId, latitude, longitude }),
              });

              const data = await res.json();

              statusMessage.value = res.ok
                ? data.message
                : `Error: ${data.error}`;
            } catch (err) {
              statusMessage.value = "Network error: " + err.message;
            }
          },
          g
        );
      },
      (errorMessage) => {
        // Optional: show scanning feedback
      }
    )
    .catch((err) => {
      scanning.value = false;
      statusMessage.value = "Error starting QR scanner: " + err.message;
    });
};

// Ensure component is mounted before using DOM
onMounted(() => {
  statusMessage.value = "Ready to scan. Click 'Start QR Scan'.";
});
</script>

<style scoped>
.scanner-container {
  text-align: center;
  margin-top: 50px;
  font-family: "Segoe UI", sans-serif;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.status {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
}
</style>
