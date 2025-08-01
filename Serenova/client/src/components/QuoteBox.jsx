/* eslint-disable react/prop-types */
import { Quote } from 'lucide-react'

const QuoteBox = ({quote, bcolor, bgcolor}) => {
  return (
    <div className={`flex justify-center items-start w-[15rem] h-fit p-4 border-2 ${bcolor} rounded-lg gap-4 ${bgcolor}`}>
        <div className='h-full'>
            <Quote color='red' size={20}/>
        </div>
      <h1 className='text-lg font-semibold'>{quote}</h1>
    </div>
  )
}

export default QuoteBox
