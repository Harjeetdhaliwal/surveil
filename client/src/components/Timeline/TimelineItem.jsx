import React from 'react'

function TimelineItem(props) {
	return (
		<li>
      <time className="time"><span style={{whiteSpace: "pre"}}>{props.time }</span> <span></span></time>
      <div className="icon bg-icon"><i className="fas fa-chevron-circle-right"></i></div>
      <div className="label">
          <h2 className="align-self-center">Visited: <span style={{color:'Green', fontSize:'1rem'}}>{props.title}</span></h2>
          <h2 className="align-self-center">URL: <span style={{color:'Green', fontSize:'1rem'}}>{props.name}</span></h2>
      </div>
  	</li>
	)
}

export default TimelineItem
