import React from 'react'
import Header from '../Header/header'
import CoverPictureStyle from './_components/CoverPictureStyle'
import LeftEditSide from './_components/LeftEditSide'
import RightSide from './_components/RightSide'

function viewPage() {
  return (
    <div className='responsive w-screen h-screen '>
      <Header /> 
      <CoverPictureStyle />
      <div className='absolute top-[20%] w-[100%] z-index-30 flex gap-[24px] justify-center'>
        <div>
        <LeftEditSide/>
        </div>
        <div>
          <RightSide/>
        </div>
      </div>
    </div>
  )
}

export default viewPage