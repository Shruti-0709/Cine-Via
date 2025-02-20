import React from 'react'
import Pagination from "@material-ui/lab/Pagination";
function PageControl({ setPage, numOfPages = 10 }) {
  const changePages = (e)=>{
    setPage(e);
    window.scroll(0,0);
  }
  return (
    <div className='w-full flex justify-center'>
      <Pagination count={numOfPages} variant="outlined" shape="rounded" onChange={(e) => changePages(e.target.textContent)}/> 
    </div>
  )
}

export default PageControl;