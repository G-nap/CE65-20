import React from 'react'
import BiztoolTable from './biztoolTable/biztoolTable'

const BiztoolTableList = (props) => {
  return (
    <div>
      {/* {JSON.stringify(props.data)} */}
      {props.data.map((eachTable) =>
        <BiztoolTable
          key={eachTable._id}
          eachTable={eachTable}
          type={props.type}
          tableStyle={props.tableStyle} 
          onChangeHandle={props.onChangeHandle}
          />
      )}
    </div>
  )
}

export default BiztoolTableList