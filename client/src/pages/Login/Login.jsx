import './login.css';
import { useState, useEffect } from 'react';

const Login = () => {

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const inputHandler = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    const validate = (values) => {
        const errors = {};
        if(!values.email){
            errors.email = "Email is required";
        }
        if(!values.password){
            errors.password = "Password is required";
        }
        return errors;
    };

    return (
        <div className="l-container">
            <div className="l-wrapper">
                <form className='l-form' onSubmit={handleSubmit}>
                    <h1 className='l-title'>SIGN IN</h1>
                    <input 
                        className='l-input'
                        placeholder="Email"
                        name="email"
                        value={formValues.email} 
                        onChange={inputHandler}
                    />
                    <p className='error-message'>{formErrors.email}</p>
                    <input 
                        className='l-input' 
                        type="password"
                        placeholder="password" 
                        name="password"
                        value={formValues.password} 
                        onChange={inputHandler}
                    />
                    <p className='error-message'>{formErrors.password}</p>
                    <button className='l-button' type="submit">LOGIN</button>
                </form>
            </div>
        </div>
    )
}
export default Login;