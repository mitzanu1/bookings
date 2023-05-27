import React, { useState } from 'react'

const List = ({items, title}) => {

	const [display,setDisplay] = useState('none')
	const toggleDisplay = () =>{
		display === 'none' ? setDisplay('block') : setDisplay('none')
	}
  return (
		<div>
			<h4 onClick={toggleDisplay}>{title}</h4>
			<ul style={{display:display}}>
				{items.map((item,index)=>{
					const {name, price, duration, onClick} = item
					return (
						<li onClick={()=>onClick(duration,name)} key={index} style={{textAlign:'center'}}>
								<h6>{name}</h6>
								<div style={{display:'flex', justifyContent:'space-around'}}>
									<div>Duree {duration} min</div>
									<div>{price}</div>
								</div>
						</li>
					)
				})
			}
			</ul>
	 </div>
  )
}

export default List