import React from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';

const ReactPaginateComponent = (props) => {
  return (
        <ReactPaginate
        breakLabel={<span>...</span>}
        nextLabel={
            props.LastArrow && (
            <BsChevronRight />
            )
        }
        forcePage={props.currentPage} // Set the current active page
        onPageChange={props.handleChange}
        pageRangeDisplayed={1} // Display 1 page buttons on either side of the active page button
        marginPagesDisplayed={1} // Display 1 page button on either side of the first and last page buttons
        pageCount={props.pageCount }
        previousLabel={
            props.FirstArrow && ( 
            <BsChevronLeft />
            )
        }
        containerClassName="flex items-center justify-center space-x-1 md:space-x-3 pt-3 text-[grey] dark:text-white"
        pageClassName="text-[grey] bg-textColor2 text-sm flex items-center justify-center rounded-lg px-3 py-2 select-none"
        activeClassName={`text-[white] bg-gradient-to-b ${ props.type == 'action' ? 'from-gradientTo' : 'from-gradientFrom' } to-gradientTo`}
        />
  )
}

export default ReactPaginateComponent