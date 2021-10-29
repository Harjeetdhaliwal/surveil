import React from 'react'
import TeamStats from '../Stats/Teams/TeamStats'
import TeamTimeBySite from '../Stats/Teams/TeamTimeBySite'
import TeamSelectors from './TeamSelectors'

function Teams() {
	return (
		<>
			<div className="container">
				<div className="row data--item">
					<TeamSelectors />
			  </div>
			</div>
			<div className="container">
			  <div className="row data--item">
					<TeamStats />
			  </div>
			  <div className="row data--item">
			      <div className="col-xs-12">
							<TeamTimeBySite />
						</div>
			  </div>
			</div>
		</>
	)
}

export default Teams
