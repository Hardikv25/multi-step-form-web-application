import React from 'react'
import BasicInfo from './basic-information/page'
import withSmartNavigation from '../../withSmartNavigation'

const Page = () => {
  return (
    <div>
      <BasicInfo/>
    </div>
  )
}

export default withSmartNavigation(Page)
