import React from 'react'
import dynamic from 'next/dynamic'

function NoSSRWrapper(props) {
  return (
    <>{props.children}</>
  )
}

export default dynamic(()=> Promise.resolve(NoSSRWrapper),{
  ssr:false
})  