import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Tbody = ({ data, display, status }) => {
  return (
    <tbody>
      {status === 'process' ? (
        Array.from({ length: 10 }).map((_, rowIdx) => (
          <tr key={rowIdx}>
            {display.map((_, colIdx) => (
              <td key={colIdx}>
                <Skeleton height={24} width={180} />
              </td>
            ))}
          </tr>
        ))
      ) : data.length ? (
        data.map((data, index) => {
          return (
            <tr key={index}>
              {Object.keys(data).map(
                (key) =>
                  display.indexOf(key) > -1 && (
                    <td key={key}>
                      {key === 'date' ? (
                        new Date(data[key]).toLocaleDateString()
                      ) : key === 'id' ? (
                        <Link to={`/students/detail/${data.id}`}>
                          <button className="btn btn-sm btn-link">Detail</button>
                        </Link>
                      ) : (
                        data[key]
                      )}
                    </td>
                  ),
              )}
            </tr>
          )
        })
      ) : (
        <tr>
          <td colSpan={display.length} className="text-center text-muted">
            Tidak Ditemukan Data
          </td>
        </tr>
      )}
    </tbody>
  )
}

export default Tbody
