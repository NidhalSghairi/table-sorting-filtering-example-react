import React from 'react'
import { Column, Table, SortDirection, AutoSizer } from 'react-virtualized'
import 'react-virtualized/styles.css'
import _ from 'lodash'
import data from './drivers.json'
import styled from 'styled-components'

const Filter = styled.div`
  display: inline;
`

const Input = styled.input`
  width: 100px;
  height: 20px;
`

class App extends React.Component {
  constructor(props) {
    super(props)

    const sortBy = 'NUT'    // the column used to sort data
    const sortDirection = SortDirection.ASC   // sort direction (asc or desc)
    const sortedList = this._sortList({ sortBy, sortDirection })

    this.state = {
      filterName: null,
      filterValue: null,
      sortBy,
      sortDirection,
      sortedList,
    }
  }
  _sortList = ({ sortBy, sortDirection }) => {
    let newList = _.sortBy(data, [sortBy])
    if (sortDirection === SortDirection.DESC) {
      newList.reverse()
    }
    return newList
  }

  _sort = ({ sortBy, sortDirection }) => {
    const sortedList = this._sortList({ sortBy, sortDirection })
    this.setState({ sortBy, sortDirection, sortedList })
  }
  handleSelectChange = (e) => {
    this.setState({ filterName: e.target.value })
  }

  handleInputChange = (e) => {
    this.setState({ filterValue: e.target.value })
  }

  render() {
  
    return (
      <div style={{ height: 400 }}>
        <Filter>
          <label>Choose a column to filter with : </label>
          <select
            value={this.state.filterName}
            onChange={this.handleSelectChange}
          >
            {Object.keys(data[0]).map((columnName) => {
              return <option value={columnName}>{columnName}</option>
            })}
          </select>

          <label style={{ marginLeft: '20px' }}>Choose a value : </label>
          <Input
            value={this.state.filterValue}
            onChange={this.handleInputChange}
          />
        </Filter>
    
        <AutoSizer>
          {() => (
            <Table
              width={20000}
              height={1000}
              headerHeight={60}
              rowHeight={30}
              sort={this._sort}
              sortBy={this.state.sortBy}
              sortDirection={this.state.sortDirection}
              rowCount={data.length}
              rowGetter={({ index }) => 
                this.state.sortedList[index][this.state.filterName] ==
                this.state.filterValue
                  ? this.state.sortedList[index]
                  : ''
              }
            >
              {Object.keys(data[0]).map((column) => {
                return <Column label={column} dataKey={column} width={200} />
              })}
            </Table>
          )}
        </AutoSizer>
        
      </div>
    )
  }
}

export default App
