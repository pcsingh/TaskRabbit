import React, { useState , useEffect} from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signup } from "../actions/auth";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";

const SignUpComponent = ({signup, isAuthenticated}) => {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [formIsValid, setFormValid]=useState(false)
    const [enteredName, setEnteredName] = useState("");
    const emailChangeHandler=(event)=>{
        setEnteredEmail(event.target.value)
    }
    const passwordChangeHandler=(event)=>{
        setEnteredPassword(event.target.value)
    }
    const nameChangeHandler=(event)=>{
        setEnteredName(event.target.value)
    }
    useEffect(()=>{
        //Adding Debounce
        const identifier=setTimeout(()=>{
            setFormValid(
                enteredEmail.includes('@') && enteredPassword.length>0 && enteredEmail.trim().length>0
            )
        }, 500)
        
        return ()=>{
            clearTimeout(identifier)
        }
    }, [enteredEmail, enteredPassword])
    const history = useNavigate();
    const onFormSubmitHandler = async (e) => {
		e.preventDefault();
		await signup(enteredEmail, enteredPassword, enteredName);
        history.push('/login')
	};
    if (isAuthenticated) {
		return <Navigate to="/task" />;
	}
    return (
        <>
            <div className="container-fluid back-bg" style={{ backgroundImage: 'url("img/main-bg.jpg")' }}>
                <div className="container contactbg">
                    <div className="row">
                        <div className="col-md-6" style={{ borderRight: '1px solid #cccccc' }}>
                            <img src="img/bg-right.jpg" width="100%" height="auto" alt="some" />
                        </div>
                        <div className="col-md-6">
                            <form id="contact" action method="post" style={{ padding: '50px 40px 0px 20px' }} onSubmit={onFormSubmitHandler}>
                                <h3 className="signuptitle">SignUp</h3>
                                <fieldset>
                                    <input placeholder="Email" type="text" tabIndex={1} required autofocus value={enteredEmail} onChange={emailChangeHandler} />
                                </fieldset>
                                <fieldset>
                                    <input placeholder="Name" type="text" tabIndex={2} required value={enteredName} onChange={nameChangeHandler} />
                                </fieldset>
                                <fieldset>
                                    <input placeholder="Password" type="password" tabIndex={5} required value={enteredPassword} onChange={passwordChangeHandler}/>
                                </fieldset>
                                <fieldset>
                                    {formIsValid? (<><button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Signup!</button></>): (<><button name="submit" type="submit" id="contact-submit" data-submit="...Sending" disabled>Signup!</button></>)}
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
SignUpComponent.propTypes = {
	signup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    signup
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);