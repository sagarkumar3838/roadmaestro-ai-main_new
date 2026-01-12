import React from "react";

const SplashLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-background">
      <div className="w-96 h-96 rounded-full overflow-hidden flex items-center justify-center shadow-2xl bg-card/80">
        <video
          src="/Assests/video/Mentor_AI.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SplashLoader;


