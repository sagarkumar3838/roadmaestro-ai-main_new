"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";
import { Dropdown } from "react-day-picker";
import DropdownCard from "./DropdownCard";

const LearningPath = () => {
  const [isMoving, setIsMoving] = useState(false);

  const handleStart = () => {
    setIsMoving(!isMoving);
  };

  return (
    <div className="relative  max-w-5xl h-[200vh] mx-auto px-4 text-black">
      {/* Title */}
      <div className="mt-42 flex w-fit flex-col items-center justify-center gap-5 text-center">
        <h1 className="font-jakarta-sans relative z-10 text-7xl font-medium tracking-[-0.08em] lg:text-9xl">
          MERN Stack <br /> Learning Journey <br />
          Progression
        </h1>
        <p className="font-jakarta-sans relative z-10 max-w-2xl text-xl font-medium text-[#1F3A4B]">
          Start the movement to see the journey unfold
        </p>
        <button
          type="button"
          onClick={handleStart}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Start movement (by adding class)
        </button>
      </div>

      {/* Step Wrapper */}
      <div className={`step-wrapper ${isMoving ? 'move-line' : ''}`} style={{ margin: '30px', marginBottom: '200px', position: 'relative' }}>
        <article className="linestep linestep1 bottom num" style={{ left: "48%", top: "-2%" }}>
          {/* <span className="num">1</span>
          <p className="bottom">
            Install MongoDB database for your MERN stack applications.
          </p> */}
           <DropdownCard tech="html"/>
        </article>

       

        <article className="linestep linestep2" style={{ right: "-1%", top: "20%" , }}>
          {/* <span className="num">2</span>
          <p className="left">
            Learn Express.js Basics to create server-side logic.
          </p> */}
          <DropdownCard tech="css"/>
        </article>

        <article className="linestep linestep3" style={{ left: "68%", top: "44%" }}>
          {/* <span className="num">3</span>
          <p className="bottom">
            Build React Components for interactive UI.
          </p> */}
          <DropdownCard tech="js"/>
        </article>

        <article className="linestep linestep4" style={{ left: "32%", top: "44.5%" }}>
          {/* <span className="num">4</span>
          <p className="top">
            Integrate Node.js for full-stack functionality.
          </p> */}
          <DropdownCard tech="reactjs"/>
        </article>

        <article className="linestep linestep5" style={{ left: "-1.5%", top: "68%" }}>
          {/* <span className="num">5</span>
          <p className="right">
            RESTful API Development to connect front-end with back-end.
          </p> */}
          <DropdownCard tech="nodejs"/>
        </article>

        <article className="linestep linestep6" style={{ left: "21%", top: "93%" }}>
          {/* <span className="num">6</span>
          <p className="bottom">
            State Management in React using hooks or Redux.
          </p> */}
          <DropdownCard tech="expressjs"/>
        </article>

        <article className="linestep linestep7" style={{ left: "53%", top: "93%" }}>
          {/* <span className="num">7</span>
          <p className="top">
            Deploy Your MERN App on Heroku or similar platforms.
          </p> */}
          <DropdownCard tech="mongodb"/>
        </article>

        <article className="linestep linestep8" style={{ left: "89%", top: "93%" }}>
          {/* <span className="num">8</span>
          <p className="bottom">
            Advanced Features & Optimization for production.
          </p> */}
          <DropdownCard tech="heroku"/>
        </article>

        <article className="linestep linestep8" style={{ left: "102%", top: "90%" }}>
          <span className="num">END</span>
          
          
        </article>

        <svg width="100%" height="auto" viewBox="0 0 1156 608" xmlns="http://www.w3.org/2000/svg">
          <path className="path" d="m560.30957,10.588011c0,0 438.0947,1.90476 439.04708,1.90476c0.95238,0 144.57857,-1.02912 143.80934,137.14269c-0.76923,138.17181 -116.81095,142.30859 -131.61967,143.8923c-14.80873,1.58372 -840.41472,-0.71429 -860.5941,0.71429c-20.17938,1.42858 -148.4991,6.80903 -146.83244,147.05973c1.66666,140.2507 129.52365,152.14266 129.33243,151.27321c0.19122,0.86945 815.268425,2.687632 951.42748, 0, 0, 0, 0, 10.588011c0,0 438.0947 " opacity="0.2" strokeWidth="7" stroke="#999ea6" fill="none" />
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .step-wrapper {
          margin: 120px;
          margin-bottom: 200px;
          position: relative;
        }

        .linestep {
          text-align: center;
          max-width: 550px;
          position: absolute;
        }
        .linestep .num {
          color: #fff;
          border-radius: 200px;
          display: inline-block;
          width: 80px;
          height: 80px;
          text-align: center;
          line-height: 80px;
          font-weight: bold;
          background: #df2049;
        }
        .linestep p {
          width: 250px;
          position: absolute;
          margin-top: 7px;
          font-weight: 500;
          line-height: normal;
          font-size: 18px;
        }
        .linestep p.top {
          bottom: 50px;
          left: -110px;
        }
        .linestep p.bottom {
          left: -110px;
        }
        .linestep p.left {
          width: 200px;
          right: 34px;
          top: -17px;
        }
        .linestep p.right {
          width: 00px;
          left: 34px;
          top: -17px;
        }
        .linestep {
          visibility: hidden;
        }
        .path {
          visibility: hidden;
        }
        .move-line .path {
          visibility: visible;
          stroke-dasharray: 3700;
          stroke-dashoffset: 3700;
          animation: moveline 4s linear forwards;
        }
        .move-line .linestep {
          animation-name: show-step-item;
          animation-duration: 0.2s;
          animation-fill-mode: forwards;
        }
        .move-line .linestep1 {
          animation-delay: 0.4s;
        }
        .move-line .linestep2 {
          animation-delay: 0.8s;
        }
        .move-line .linestep3 {
          animation-delay: 1.2s;
        }
        .move-line .linestep4 {
          animation-delay: 1.6s;
        }
        .move-line .linestep5 {
          animation-delay: 2s;
        }
        .move-line .linestep6 {
          animation-delay: 2.4s;
        }
        .move-line .linestep7 {
          animation-delay: 2.8s;
        }
        .move-line .linestep8 {
          animation-delay: 3.2s;
        }

        @keyframes show-step-item {
          from {
            transform: scale(0.2);
            opacity: 0;
          }
          to {
            visibility: visible;
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes moveline {
          to {
            stroke-dashoffset: 0;
          }
        }
        `
      }} />



    </div>
  );
};

export { LearningPath };

const LinePath = ({
  className,
  scrollYProgress,
}: {
  className: string;
  scrollYProgress: any;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <svg
      width="1278"
      height="2319"
      viewBox="0 0 1278 2319"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="#85b914"
        strokeWidth="20"
        style={{
          pathLength,
          strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
        }}
      />
    </svg>
  );
};
