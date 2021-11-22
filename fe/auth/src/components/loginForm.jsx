import React from 'react';
import Joi from 'joi-browser';
import Form from './form';
import * as loginService from '../services/loginService';
import { NavLink } from 'react-router-dom';

class LoginForm extends Form {
    state = {
        data: {
            username: '', password: ''
        },
        errors: {}
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }


    doSubmit = async () => {
        // call API server
        try {
        const { data: jwt } = await loginService.login(this.state.data);
        localStorage.setItem('token', jwt);
        this.props.history.push('/successPage');
        }
        catch (e) {
            if (e.response && e.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = e.response.data;
                this.setState({ errors });
            }
            alert(e);
        }
            
    }

    render() { 
        return (
            <div>
            <NavLink className="nav-link" to="/register">register</NavLink>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('username','Username')}
                {this.renderInput('password','Password', 'password')}
                {this.renderButton('Login')}
            </form>
            </div>);
    }
}
 
export default LoginForm;