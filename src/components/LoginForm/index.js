// Write your JS code here
import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    const {username} = this.state

    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    const {password} = this.state
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.setState({errorMsg: data.error_msg, showErrorMsg: true})
    }
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="label-text" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          className="user-input"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label className="label-text" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          className="user-input"
          id="username"
          placeholder="Username"
          onChange={this.onChangeUsername}
          value={username}
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    return (
      <div className="login-form-container">
        <div className="image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-mobile-image"
            alt="website logo"
          />

          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
            alt="website login"
            className="login-image"
          />
        </div>

        <form className="form-container" onClick={this.onSubmitForm}>
          <div className="login-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              className="login-website-logo-desktop-image"
              alt="website logo"
            />
          </div>
          <div className="input-container">{this.renderUsername()}</div>
          <div className="input-container">{this.renderPassword()}</div>
          <button className="login-button" type="submit">
            Login
          </button>
          {showErrorMsg && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
