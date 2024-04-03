import React from "react";

import Logo from "../assets/logo-full.png";

function LoginComponent() {
    
  return (
    <>
      <div className="login-component-logo-area">
        <p>Press (ESC) to close the popup</p>
        <img src={Logo} alt="logo-full" />
      </div>
      <div className="login-component-login-fields-area">
        <form action="">
            <div className="login-component-username-area">
                <label htmlFor="username" className="poppins-light">Username:</label>
                <input type="text" name="username" id="username" placeholder="@rj_prasathu"/>
            </div>
            <div className="login-component-password-area">
                <label htmlFor="username" >Password:</label>
                <input type="password" name="username" id="username" placeholder="******"/>
            </div>
            <div className="login-component-submit-button-area">
                <button>Login</button>
            </div>
            <div className="login-component-register-call-to-action-area">
                <p>Forget Password?</p>
                <p>Already have an account? <a href="">Register here!</a></p>
            </div>
        </form>
      </div>
    </>
  );
}

export default LoginComponent;
