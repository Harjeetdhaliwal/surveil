import React from 'react'

function Landing() {
	return (
		<div className="container col-xl-10 col-xxl-8 px-4 py-5">
	    <div className="row align-items-center g-lg-5 py-5">
	      <div className="col-lg-7 text-center text-lg-start">
					<img src="images/landing.svg" alt="landing" className="landing--image"/>
					<br />
					<br />
	        <p className="col-lg-10 fs-4"><span style={{color:'green'}}>Surveil</span> makes it easier for you to track productivity of your remote workforce. It can track the user activity across browser and provide meaningful insights on how your remote employees spend their time</p>
	      </div>
	      <div className="col-md-10 mx-auto col-lg-5">
	        <form className="p-4 p-md-5 border rounded-3 bg-light">
	          <div className="form-floating mb-3">
	            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
	            <label htmlFor="floatingInput">Email address</label>
	          </div>
	          <div className="form-floating mb-3">
	            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
	            <label htmlFor="floatingPassword">Password</label>
	          </div>
	          <div className="checkbox mb-3">
	            <label>
	              <input type="checkbox" value="remember-me" /> Remember me
	            </label>
	          </div>
	          <button className="w-100 btn btn-lg btn-dark" type="submit">Log in</button>
	          <hr className="my-4" />
	          <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small>
	        </form>
	      </div>
	    </div>
	  </div>
	)
}

export default Landing
