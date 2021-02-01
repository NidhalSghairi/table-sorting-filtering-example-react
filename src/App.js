
import React from 'react'
import initialData from './drivers.json'
import Table from './components/Table'
import styled from 'styled-components'

const AppWrapper = styled.div`
  align-items: center;
  width: 100%;
  margin: 60px 0;
  display: block;
`

const Filter = styled.div`
  display: inline;
 
`

const Input = styled.input`
  width: 100px;
  height: 20px;
`
const App = () => {
  /** 
   * the table data 
   * */
  const [data, setData] = React.useState(initialData)

  /** 
   * columnName represent the name of the column in which we apply filter
   */
  const [columnName, setColumnName] = React.useState(null)

  /**
   * the filter value
   */
  const [columnValue, setColumnValue] = React.useState(null)

  /**
   * sortData is a function used to sort data by a given column
   * @param {string} columnName the column by which we sort the data
   */
  const sortData = (columnName) => {
    let sortedData = data.sort((a, b) =>
      a[columnName] > b[columnName] ? -1 : 1
    )
    setData([...sortedData])
  }

  const handleSelectChange = (e) => {
    setColumnName(e.target.value)
  }

  const handleInputChange = (e) => {
    setColumnValue(e.target.value)
  }


  React.useEffect(() => {
    if (columnValue && columnValue) {
      let filteredData = initialData.filter(
        (row) => row[columnName] == columnValue
      )
      setData([...filteredData])
    }
  }, [columnName, columnValue])

  
  return (
    <AppWrapper>
      <Filter>
        <label>Choose a column to filter with : </label>
        <select value={columnName} onChange={handleSelectChange}>
          {Object.keys(initialData[0]).map((columnName) => {
            return <option value={columnName}>{columnName}</option>
          })}
        </select>

        <label style={{marginLeft:'20px'}}>Choose a value : </label>
        <Input
          value={columnValue}
          onChange={handleInputChange}
        />
      </Filter>

      <Table data={data} sortData={sortData} />
    </AppWrapper>
  )
}

export default App
