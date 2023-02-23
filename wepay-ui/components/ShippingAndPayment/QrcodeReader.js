import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
const QrReader = dynamic(()=>import('react-qr-scanner'),{
    ssr:false
})

const QrcodeReader = (props) => {

  return (
    
    <QrReader
    delay='500'
    style={{width:'100%',height:'100%'}}
    onScan={data=> data? props.setCode(data.text):''}
    onError={(error)=>console.log(error)}
    />
  
  )
}

export default QrcodeReader