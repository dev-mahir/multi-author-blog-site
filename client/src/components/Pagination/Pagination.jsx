import React from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const Pagination = ({ page, setPage, count, limit }) => {

  const pageCount = Number(count / limit);


  let pageItem = [];
  for (let i = 0; i < pageCount; i++) {
    pageItem.push(i)
  }
  

  return (
    <div className='pagination'>
      <ul>

        <li>
          <button onClick={() => setPage(page - 1)} disabled={page > 1 ? false : true}>
            <BsChevronLeft />
          </button>
        </li>


        {pageItem.map((item, index) =>
          <li key={index} className={`${(page === item + 1) ? "active" : ""}`} >
            <button onClick={() => setPage(item + 1)}>{item + 1}</button>
          </li>
        )}



        <li>
          <button onClick={() =>setPage(page + 1)}  disabled={ page === count ? true : false}>
            <BsChevronRight />
          </button>
        </li>

      </ul>

    </div>
  )
}

export default Pagination