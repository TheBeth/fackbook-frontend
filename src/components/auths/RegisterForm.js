import styles from '../../Auth.module.css';

function RegisterForm() {
    return (
        <form className={styles['login-form']}>
            <div className="mb-3">
                <div className="row">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className={`form-control ${styles.input}`}
                            placeholder="First Name"
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className={`form-control ${styles.input}`}
                            placeholder="Last Name"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    placeholder="Email address or phone number"
                />
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className={`form-control ${styles.input}`}
                    placeholder="Password"
                />
            </div>
            <button
                type="button"
                className={`btn ${styles['btn-custom']} btn-lg btn-block mt-3`}
            >
                Register
            </button>
            <div className="text-center pt-3 pb-3">
                <button type="button" className="btn btn-success btn-lg mt-3">
                    Already have an account?
                </button>
            </div>
        </form>
    )
}

export default RegisterForm;