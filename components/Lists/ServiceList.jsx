import React, { useState } from 'react'
import styles from './list.module.css'
import { ActionIcon, List } from '@mantine/core'
import { Plus, Trash } from 'tabler-icons-react'
import ServiceModal from '../Modals/ServiceModal'
import { showModal } from '../Modals'
import DeleteServiceModal from '../Modals/DeleteServiceModal'
import { actions } from 'components/util/store'
import { isMobile } from 'react-device-detect'

const ServiceList = ({items, title, id}) => {

	const [display,setDisplay] = useState('none')
	const toggleDisplay = () =>{
		display === 'none' ? setDisplay('block') : setDisplay('none')
	}


  return (
		<div className={styles.main}>
			<h3 
				className={styles.service} 
				onClick={toggleDisplay}>{title}
			</h3>
			<List style={{display:display}}>
				{
				  items.map((item,index)=>{
					  const {name, price, duration} = item
					  return (
						 <List.Item 
						 	onClick={()=>{
								actions.set('controls.duration', duration)
								actions.set('controls.name', name)
								actions.set('controls.description', name)
								if(isMobile)actions.set('controls.view', 'calendar')
							}} 
							key={index}
							className={styles.listItem}	
							>
								<h5>{name}</h5>
								<div className={styles.details}>
									<div>Duration {duration}min</div>
									<div>Price {price}€</div>
								</div>
						 </List.Item>
					  )
				  })
			  }
				<div style={{display:'flex', justifyContent:'center'}}>
					<ActionIcon
						style={{margin:'0 3px'}}
						size="xs"
						variant="filled"
						color="primary"
						onClick={() => showModal(ServiceModal,{ id, items })}
						>
						<Plus />
					</ActionIcon>
					<ActionIcon
						size="xs"
						variant="filled"
						color="primary"
						onClick={() => showModal(DeleteServiceModal,{id, items})}
						>
						<Trash />
					</ActionIcon>
				</div>
			</List>
	 </div>
  )
}

export default ServiceList