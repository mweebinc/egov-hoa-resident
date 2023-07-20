import React from "react";
import {Link} from "react-router-dom";
import BasePage from "../../base/BasePage";
import SignUpPresenter from "./SignUpPresenter";
import {signUpUseCase} from "../../usecases/user";
import {updateObjectUseCase} from "../../usecases/object";
import {Button} from "nq-component";
import withRouter from "../../withRouter";
import FormFactory from "../../components/FormFactory";
import schemaSignup from "./schemaSignup";

class SignUpPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new SignUpPresenter(this, signUpUseCase(), updateObjectUseCase());
        this.state = {progress: false};
    }

    formSubmit(e) {
        e.preventDefault();
        this.presenter.submit(this.state.user);
    }

    onChange(value, field) {
        this.presenter.onChange(value, field);
    }

    render() {
        return (
            <div className="vh-100">
                <div className="d-flex h-100">
                    <div className="m-auto container p-3 p-lg-5">
                        <div className="bg-white shadow rounded p-3 p-lg-5">
                            <div className="row">
                                <div className="col-md-6 border-end border-1">
                                    <div className="h-100 d-flex align-items-center">
                                        <div className="text-center p-3 w-100">
                                            <img
                                                className="img-fluid login-img mb-3 w-50"
                                                alt="company logo"
                                                src="/logo.png"/>
                                            <h1 className="fw-bold text-black">Homeowner Association</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 p-3 px-lg-5 py-lg-4">
                                    <h2 className="fw-bold mb-3">Register</h2>
                                    <form onSubmit={this.formSubmit.bind(this)}>
                                        <div className="row g-3">
                                            <FormFactory
                                                object={{}}
                                                schema={schemaSignup}
                                                onChange={this.onChange.bind(this)}
                                            />
                                            <div className="col-md-12">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="signup_cb_terms"
                                                    />
                                                    <label
                                                        className="form-check-label fs-xs"
                                                        htmlFor="signup_cb_terms"
                                                    >
                                                        By submitting this form, you agree to our
                                                        <br/>
                                                        <Link to="/terms" target="_blank">
                                                            Terms and Conditions.
                                                        </Link>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <Button
                                                    progress={this.state.progress}
                                                    type="submit"
                                                    className="btn btn-primary w-50">
                                                    {this.state.progress ? 'Please wait...' : 'SIGNUP'}
                                                </Button>
                                            </div>
                                            <div className="text-center">
                                            <span className="fs-sm">
                                              Already have an account?
                                              <Link to="/signin" className="ms-1">
                                                Sign in
                                              </Link>
                                            </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUpPage);
