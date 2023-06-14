import React from 'react'
import ServiceList from './ServiceList'
import styles from './list.module.css'

function CategoryList({services}) {

  return (
    <div className={styles.list}>
      {
        services.map((item)=>{
          const { category, service, _id } = item
          return (
            <ServiceList
              key={_id}
              title={category}
              items={service}
              id={_id} 
            />
          )
        })
      }
  </div>
  )
}

export default CategoryList



