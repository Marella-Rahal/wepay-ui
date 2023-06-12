import React from "react";
import {motion} from 'framer-motion';
import Image from "next/image";
const markerVariant={
  animate:{
    y:7,
    transition:{
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
}
const Marker = ({ image, color }) => {
  return (
    <>
      <motion.div
      variants={markerVariant}
      animate="animate" 
      className="marker">
        <button
          type="button"
          className="marker-btn after:top-[80%] xs:after:top-[83%] sm:after:top-[85%] hover:bg-none"
          style={{ backgroundColor: color, borderColor: color }}
        >
          <Image 
          src={image}
          width={27}
          height={27} 
          alt="product image" 
          className="rounded-full m-auto" />
        </button>
      </motion.div>
      <style jsx>
        {`
          // the div arround th button
          .marker {
            width: fit-content;
            height: fit-content;
            border-radius: 100%;
            z-index: 0;
          }

          // the button that containes th image
          .marker-btn {
            border: solid 3px;
            border-radius: 100%;
            width: 30px;
            height: 33px;
            padding: 0px;
          }

          // the tooltip
          .marker-btn::after {
            content: " ";
            position: absolute;
            left: 51%;
            margin-left: -10px;
            border-width: 10px;
            border-style: solid;
            border-top-color: inherit;
            border-left-color: transparent;
            border-right-color: transparent;
            border-bottom-color: transparent;
          }

          @media (orientation: landscape) and (max-width: 976px) and (max-height: 500px) {
            .marker-btn::after {
              top: 80%;
            }
          }
        `}
      </style>
    </>
  );
};

export default Marker;
