import EmergencyNums from "../components/EmergencyNums";

const Help = () => {

  const nums = [["Women helpline",1091], ["Senior citizen helpline", 14567],["Child Abuse helpline",1098], ["Police",100], ["Fire",101], ["Ambulance",102], ["Traffic Police",103], ["Health",104], ["Disaster management",108], ["Railway",131], ["Domestic abuse",181], ["Anti corruption",1031], ["Road accident",1073], ["Anti terror",1090]];
  
  return (
    <div className="flex flex-col gap-[2rem] my-[2rem]">
      <h1 className="text-center text-3xl font-bold">
        📞 EMERGENCY/HELPLINE NUMBERS 📞
      </h1>
      <div className="flex justify-evenly items-start p-[2rem]">
        <EmergencyNums nums={nums}/>
      </div>
    </div>
  );
};

export default Help;
