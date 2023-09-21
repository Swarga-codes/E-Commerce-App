import React, { useRef } from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import OrderPlaceAnim from '../../assets/placed_order.json'
function OrderPlaced() {
  return (
    <div className='Orderplaced'>
    <Player
    autoplay
    loop
    src={OrderPlaceAnim}
    style={{ height: '300px', width: '300px' }}

    >
  </Player>
    <h1 className='text-center text-3xl font-semibold'>Order Placed Successfully!</h1>
    <p className='text-center text-m text-blue-600 cursor-pointer underline'>Check My Orders</p>
    </div>
  )
}

export default OrderPlaced