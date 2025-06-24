import React from 'react'
import { Table } from 'react-bootstrap'
import Tbody from '../Tbody'
import Thead from '../Thead'
import Pagination from '../Pagination'

const Tables = ({
  withPagination,
  handlePageClick,
  pages,
  data,
  thead,
  tbody,
  status,
}) => {
  return (
    <>
      <div className="p-3 py-2 rounded shadow-sm bg-white">
        <Table responsive striped hover className="w-100">
          <Thead text={thead} />
          <Tbody
            status={status}
            data={data}
            display={tbody}
          />
        </Table>
      </div>
      {withPagination && data.length ? (
        <Pagination pages={pages} handlePageClick={handlePageClick} />
      ) : (
        ''
      )}
    </>
  )
}

export default Tables
