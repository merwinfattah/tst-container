import React from 'react';
import Joi from 'joi-browser';
import Input from './input';

class Form extends React.Component {
    state = {
        data: {},
        errors: {}
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options );
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value};
        const schema = { [name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    handleChange = e => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) errors[e.currentTarget.name] = errorMessage;
        else delete errors[e.currentTarget.name];

        const data = {...this.state.data};
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ data, errors });
    }

    handleSubmit = e => {

        e.preventDefault();

        const errors = this.validate();
        this.setState({errors : errors || {}});
        if (errors) return;

        this.doSubmit();

    }

    renderButton(label) {
        return <button className="btn btn-primary" disabled={this.validate()}>{label}</button>
    }

    renderInput(name, label, type){
        const {data, errors} = this.state;
        return <Input type={type} name={name} value={data[name]} label={label} onChange={this.handleChange} error={errors[name]} />
    }

}
 
export default Form;