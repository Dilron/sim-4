import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginUser, logoutUser} from '../../redDucks/reducer'

class Auth extends Component {
    constructor(props){
        super(props)
        this.state = {
            usernameInput: '',
            passwordInput: '',
            putTarget: '',
            putNew: ''
        }
    }

    handleRegisterUser = async () => {
        const profileProm = await fetch(`https://robohash.org/${this.state.usernameInput}`).catch(err => console.log('error in robo gen: ', err))
        const {usernameInput : username, passwordInput : password} = this.state
        const {url : profileRef} = profileProm
        const newUser = await axios.post('/auth/register', {username, password, profileRef}).catch(err => console.log('error in user registration: ', err))
        console.log('log after axios register ', newUser)
    }

    handleLoginUser = async () => {
        const {usernameInput : username, passwordInput : password} = this.state;
        const loginObj = await axios.post('/auth/login', {username, password}).catch(err => console.log('error on login ', err))
        const {profileRef} = loginObj.data
        this.props.loginUser({username, profileRef})
        console.log('log after axios login', loginObj)
    }

    handlePut = async () => {
        const {putTarget, putNew} = this.state;
        const putReturn = await axios.put('/put', {putTarget, putNew}).catch(err => console.log('error in put: ', err))
        console.log('log put: ', putReturn)
    }

    handleInputUpdate = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return(
            <div>
                <h1>Auth</h1>
                <h3>User: {this.props.reduced.username} </h3>
                <img alt='profile pic' src={this.props.reduced.profileRef} />
                <div>
                    <input type='text' 
                    placeholder='username'
                    name='usernameInput'
                    onChange={this.handleInputUpdate} />
                    <input type='text' 
                    placeholder='password'
                    name='passwordInput'
                    onChange={this.handleInputUpdate} />
                    <button onClick={() => this.handleLoginUser()}>Login</button>
                    <button onClick={() => this.handleRegisterUser()}>Register</button>
                    <input type='text' 
                    placeholder='put target'
                    name='putTarget'
                    onChange={this.handleInputUpdate} />
                    <input type='text' 
                    placeholder='put thing'
                    name='putNew'
                    onChange={this.handleInputUpdate} />
                    <button onClick={() => this.handlePut()}>fire put</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    loginUser,
    logoutUser
}

const mapStateToProps = (reduxState) => {
    return {
        reduced: reduxState.reduced
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)