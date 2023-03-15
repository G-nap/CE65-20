import React from 'react'
import BIZTOOL_PAGE_CONFIG from '../../../../../../pages/bizTools/pageConfig'

const BiztoolRow = (props) => {
  return (
    <div>
      {props.type == BIZTOOL_PAGE_CONFIG.revenue.type}
    </div>
  )
}

export default BiztoolRow
