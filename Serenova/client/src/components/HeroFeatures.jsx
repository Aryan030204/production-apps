import {
  ShieldCheck,
  AlertTriangle,
  MapPinned,
  Users,
  PenTool,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: <MapPinned size={32} />,
    title: "AI-Powered Safe Route Planner",
    desc: "Suggests the safest route using real-time crime data, street lighting, and crowd density.",
  },
  {
    icon: <AlertTriangle size={32} />,
    title: "Real-Time Reporting",
    desc: "Anonymously report incidents, creating a heatmap of high-risk areas.",
  },
  {
    icon: <PenTool size={32} />,
    title: "Survivor Storytelling Blog",
    desc: "A safe space for survivors to share stories and access healing resources.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Emergency SOS and Live Tracking",
    desc: "SOS button and live location sharing for immediate help during emergencies.",
  },
  {
    icon: <Users size={32} />,
    title: "Crowdsourced Safety Feedback",
    desc: "Rate routes, share safety tips, and improve recommendations with community input.",
  },
  {
    icon: <Smartphone size={32} />,
    title: "Easy-to-Use Interface",
    desc: "Simple, intuitive design with clear navigation for all users.",
  },
];

const HeroFeatures = () => {
  return (
    <div className="flex flex-col w-full items-center px-4 py-8">
      <h1 className="text-4xl lg:text-5xl font-bold text-center mb-12">
        Our Features
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-6 rounded-3xl border-2 border-black text-white bg-gradient-to-tr from-purple-600 to-purple-500 transition-transform hover:scale-105 hover:shadow-xl cursor-pointer min-h-[16rem]"
          >
            <div className="mb-4 text-white">{feature.icon}</div>
            <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
            <p className="font-serif text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeatures;
