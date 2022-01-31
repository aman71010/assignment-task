import { useState, useEffect } from 'react';

const AddUser = () => {

    const [formValues, setFormValues] = useState({
        username: '',
        number: '',
        email: '',
        address: '',
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
        const emailRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        const mobRegex = /^[1-9]{1}[0-9]{9}$/;
        const usernameRegex = /^[a-zA-Z0-9]{4,30}$/
        if(!values.username){
            errors.username = "Username is required";
        }else if(values.username.length < 5) {
            errors.username = "Username must be more than 4 characters";
        }
        else if(!usernameRegex.test(values.username)){
            errors.username = "Username contains only alphanumeric characters";
        }
        if(!values.number){
            errors.number = "Mobile Number is required";
        }else if(!mobRegex.test(values.number)){
            errors.number = "Mobile Number is not valid";
        }
        if(!values.email){
            errors.email = "Email is required";
        }else if(!emailRegex.test(values.email)){
            errors.email = "Email is not valid";
        }
        if(!values.address){
            errors.address = "Address is required";
        }
        return errors;
    };

    return (
        <div className="l-container">
            <div className="l-wrapper">
                <form className='l-form' onSubmit={handleSubmit}>
                    <h1 className='l-title'>Add User</h1>
                    <input 
                        className='l-input'
                        placeholder="Username"
                        name="username"
                        value={formValues.username} 
                        onChange={inputHandler}
                    />
                    <p className='error-message'>{formErrors.username}</p>
                    <input 
                        className='l-input' 
                        type="number"
                        placeholder="Mobile Number" 
                        name="number"
                        value={formValues.number} 
                        onChange={inputHandler}
                    />
                    <p className='error-message'>{formErrors.number}</p>
                    <input 
                        className='l-input' 
                        type="email"
                        placeholder="Email" 
                        name="email"
                        value={formValues.email} 
                        onChange={inputHandler}
                    />
                    <p className='error-message'>{formErrors.email}</p>
                    <input 
                        className='l-input'
                        placeholder="Address" 
                        name="address"
                        value={formValues.address} 
                        onChange={inputHandler}
                    />
                    <p className='error-message'>{formErrors.address}</p>
                    <button className='l-button' type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default AddUser;