import React, { useState } from 'react';
import './Login.css'
import { firebase, auth } from './firebase';

const Login = () => {
	// Inputs
	const [mynumber, setnumber] = useState("");
	const [otp, setotp] = useState('');
	const [show, setshow] = useState(false);
	const [final, setfinal] = useState('');

	// Sent OTP
	const signin = () => {

		if (mynumber === "" || mynumber.length < 10) return;

		let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
		auth.signInWithPhoneNumber(`+91${mynumber}`, verify).then((result) => {
			setfinal(result);
			alert("code sent")
			setshow(true);
		})
			.catch((err) => {
				alert(err);
				window.location.reload()
			});
	}

	// Validate OTP
	const ValidateOtp = () => {
		if (otp === null || final === null)
			return;
		final.confirm(otp).then((result) => {
			// success
		}).catch((err) => {
			alert("Wrong code");
		})
	}

	return (
		<div classname='login' style={{ "marginTop": "200px" }}>
			<div className='login-container'>
			<center >
				<div style={{ display: !show ? "block" : "none" }}>
					<h2 className='login-login'>Continue With Phone Number</h2>
					<input className='login_phoneContainer' value={mynumber} onChange={(e) => {
					setnumber(e.target.value) }}
						placeholder="phone number" />
					<br /><br />
					<div id="recaptcha-container"></div>
					<button className='login_button' onClick={signin}>Send OTP</button>
				</div>
				<div style={{ display: show ? "block" : "none" }}>
					<input className='login_phoneContainer' type="text" placeholder={"Enter your OTP"}
						onChange={(e) => { setotp(e.target.value) }}></input>
					<br /><br />
					<button className='login_button' onClick={ValidateOtp}>Verify</button>
				</div>
			</center>
			</div>
		</div>
	);
}

export default Login;