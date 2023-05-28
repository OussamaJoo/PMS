import React, { useRef } from 'react'
import {ReactToPrint} from 'react-to-print';
import { useReactToPrint } from "react-to-print";

const ComponentToPrint = () => {
    const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  return (
    <div>
       <div className="bg-gray-200 p-6">
      <button
        type="button"
        className="bg-gray-500 border border-gray-500 p-2 mb-4"
        onClick={handlePrint}
      >
        {" "}
        Print Resume{" "}
      </button>
      
    </div>
        

        <div ref={componentRef}>hello world</div>
      </div>
  )
}

export default ComponentToPrint