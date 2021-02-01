import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

const Table = ({ data, sortData }) => {
  
  /**
   * columnsNames is an array that contains all columns names of the table
   */
  const [columnsNames, setColumnsNames] = React.useState([])

  React.useEffect(() => {
    setColumnsNames(Object.keys(data[0]))
  }, [])

  const getHeader = () => {
    return columnsNames.map((key, index) => {
      return (
        <th>
          <Button key={index} onClick={() => sortData(key)}>
            {key}
          </Button>
        </th>
      )
    })
  }
  /** a function used to creates rows filled with the given data */
  const getRowsData = () => {
    return data.map((row, index) => {
      return (
        <tr key={index}>
          {columnsNames.map((key, keyIndex) => {
            return <td key={keyIndex}>{row[key]}</td>
          })}
        </tr>
      )
    })
  }
  return (
    <table>
      <thead>
        <tr>{getHeader()}</tr>
      </thead>
      <tbody>{getRowsData()}</tbody>
    </table>
  )
}

Table.propTypes = {
  /**
   * the used data
   */
  data: PropTypes.arrayOf(
    PropTypes.object
  ),
  /**
   * Function triggered to sort data
   */
  sortData: PropTypes.func.isRequired
}
export default Table
