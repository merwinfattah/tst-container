import React from 'react';
import Joi from 'joi-browser';
import Form from './form';
import * as userService from '../services/userService';
import { NavLink, Redirect } from 'react-router-dom';


class RegisterForm extends Form {
    state = {
        data: {
            username: '', password: ''
        },
        errors: {}
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().min(3).label('Password')
    }


    doSubmit = async () => {
        try{
        await userService.register(this.state.data);
        }
        catch (e) {
            alert(e);
        }

    }

    render() { 
        return (
            <div>
            <NavLink className="nav-link" to="/login">login</NavLink>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('username','Username')}
                {this.renderInput('password','Password')}
                {this.renderButton('Register')}
            </form>
            </div>);
    }
}
 
export default RegisterForm;