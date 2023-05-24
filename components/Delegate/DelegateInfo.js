import React from 'react';

function DelegateInfo( { delegate } ) {

  return (
    <div
      className="w-[190px] h-[240px] rounded-lg bg-effectColor text-center text-white flex flex-col items-center justify-center space-y-2 p-2 mx-[14px] my-7"
      style={{ boxShadow: '1px 1px 7px 5px rgba(0,0,0,0.15)' }}
    >
      <div className='w-fit h-fit'>
        <img
          src={delegate.dealerImgURL}
          className="w-[75px] h-[75px] rounded-full bg-white shadow-md"
        />
      </div>

      <div>{delegate.fullName}</div>
      <div>{delegate.city}-{delegate.address}</div>
      <div>{delegate.phoneNumber}</div>
    </div>
  );
}

export default DelegateInfo;
