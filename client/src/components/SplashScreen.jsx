import React, { useEffect, useState } from "react";

const SplashScreen = () => {
  const headingText = "Imagify";
  const lines = ["Welcome to My Imagify Website! 🚀"];

  const [heading, setHeading] = useState("");
  const [firstLine, setFirstLine] = useState("");
  const [secondLine, setSecondLine] = useState("");

  useEffect(() => {
    let h = 0;
    const headingTimer = setInterval(() => {
      h++;
      setHeading(headingText.slice(0, h));
      if (h >= headingText.length) {
        clearInterval(headingTimer);

        // First line typing
        let i = 0;
        const firstTimer = setInterval(() => {
          i++;
          setFirstLine(lines[0].slice(0, i));
          if (i >= lines[0].length) {
            clearInterval(firstTimer);

            // Second line typing (if any)
            let j = 0;
            const secondTimer = setInterval(() => {
              j++;
              setSecondLine(lines[1]?.slice(0, j) || "");
              if (j >= (lines[1]?.length || 0)) {
                clearInterval(secondTimer);
              }
            }, 50);
          }
        }, 50);
      }
    }, 50);

    return () => clearInterval(headingTimer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-50 to-orange-50 text-center px-6 overflow-hidden relative">
      
      {/* Heading typing animation with logo */}
      <h1 className="flex items-center gap-3 text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">
        <img
          src="/favicon.svg" // direct public folder path
          alt="Imagify Logo"
          className="w-12 h-12"
        />
        {heading}
      </h1>

      {/* Robot GIF */}
      {/* <img
        src="/myCutie.gif"
        alt="Cutie Robot"
        className="w-72 sm:w-80 mb-6 animate-bounce-slow"
      /> */}

      {/* <img
  src="/myCutie.gif"
  alt="Cutie Robot"
  className="w-72 sm:w-80 mb-6 animate-bounce-slow drop-shadow-2xl"
  style={{
    filter: "drop-shadow(0 5px 15px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))"
  }}
/> */}

<img
  src="/myCutie.gif"
  alt="Cutie Robot"
  className="w-72 sm:w-80 mb-6 bounce-tilt-glow"
  style={{
    filter: `
      drop-shadow(0 8px 20px rgba(0, 0, 0, 0.5)) /* deep shadow */
      drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)) /* outer glow */
      drop-shadow(0 0 25px rgba(0, 200, 255, 0.5)) /* neon bluish glow */
    `
  }}
/>

<style>
{`
  @keyframes bounceTilt {
    0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg) scale(1); }
    25% { transform: translateY(-8px) rotateX(3deg) rotateY(-3deg) scale(1.02); }
    50% { transform: translateY(0) rotateX(0deg) rotateY(0deg) scale(1); }
    75% { transform: translateY(-8px) rotateX(-3deg) rotateY(3deg) scale(1.02); }
  }
  .bounce-tilt-glow {
    animation: bounceTilt 4s ease-in-out infinite;
    transform-style: preserve-3d;
  }
`}
</style>



      {/* Loading Bar */}
      {/* <div className="w-full max-w-md h-2 bg-gray-200 rounded-full mb-8 overflow-hidden shadow-md">
        <div className="h-full animate-fill bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 bg-[length:200%_100%]"></div>
      </div> */}

      <div className="w-full max-w-sm h-1.5 bg-gray-200 rounded-full mb-8 overflow-hidden shadow-md">
  <div className="h-full animate-fill bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 bg-[length:200%_100%]"></div>
</div>


      {/* Lines */}
      <div className="leading-relaxed max-w-2xl mt-2 space-y-2">
        <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
          {firstLine}
        </div>
        <div className="text-xl sm:text-2xl font-medium text-black">
          {secondLine}
        </div>
      </div>

      <style>{`
        @keyframes fill {
          0% { width: 0%; background-position: 200% 0; }
          100% { width: 100%; background-position: -200% 0; }
        }
        .animate-fill {
          animation: fill 5s ease-in-out forwards;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
