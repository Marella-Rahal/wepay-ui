import React from 'react'
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ProcessImageUrl = ( {imgURL} ) => {

  return (
    <Popup trigger={<button>صورة الوصل</button>} modal nested>
        {
            (close) => (
                <>
                    <motion.div 
                    initial={{ opacity: 0, y: '-200%', x: '-50%' }}
                    animate={{ opacity: 1, y: '-50%', x: '-50%' }}
                    transition={{ ease: 'easeInOut', duration: 0.7 }}
                    className="fixed z-10 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-gray-50 shadow-2xl rounded-lg w-[90%] md:w-[70%] h-[90%]">
                        <Image
                        src={imgURL}
                        layout='fill'
                        placeholder='blur'
                        blurDataURL={imgURL}
                        className='rounded-lg'/>
                    </motion.div>
                    
                    <div className="z-0 relative w-screen h-screen bg-black opacity-50"></div>
                </>
            )
        }
    </Popup>
  )
}

export default ProcessImageUrl