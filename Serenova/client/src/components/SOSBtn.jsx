import whatsapp from "../assets/whatsapp.png";
import { WHATSAPP_ALERT_MESSAGE } from "../utils/config";

const SOSBtn = () => {
  const handleConnect = async () => {
    const confirmed = window.confirm(
      "Serenova is requesting to open WhatsApp Web. Do you want to continue?"
    );

    if (!confirmed) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;

        const mapsUrl = `https://www.google.com/maps?q=${lat},${long}`;
        const message = `${encodeURIComponent(
          WHATSAPP_ALERT_MESSAGE
        )}, my coordinates are (${lat}, ${long}), location: ${mapsUrl}`;

        // Open WhatsApp with message
        window.open(`https://wa.me/?text=${message}`, "_blank");
      },
      (error) => {
        alert("Unable to retrieve location. Please enable location access.");
        console.error("Geolocation error:", error);
      }
    );
  };

  return (
    <div className="flex items-center justify-center bg-red-500 rounded-full mr-4 p-2 font-bold text-white gap-1">
      <img src={whatsapp} className="w-6" />
      <button onClick={handleConnect}>Emergency SOS</button>
    </div>
  );
};

export default SOSBtn;
