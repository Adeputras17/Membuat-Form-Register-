import { useFormik } from "formik"
import * as Yup from 'yup'

const Formreg = () => {

    const doregis = (values) => {
        console.log('form values', values);
        setTimeout(()=>{
            formik.setSubmitting(false);
            formik.resetForm();
        }, 2000);
    }

    const formik = useFormik ({
        initialValues : {
            username : '',
            email : '',
            password : '',
            confirmPassword : '',
            agreement : false
        },

        validationSchema : Yup.object({
            username: Yup.string()
                .required(),
            email: Yup.string()
                .required()
                .email('Invalid email format'),
            password: Yup.string()
                .required()
                .min(8, 'Should more than 8 character')
                .matches(/[a-z]/g, 'Should contain at least 1 lowercase')
                .matches(/[A-Z]/g, 'Should contain at least 1 uppercase')
                .matches(/[1-9]/g, 'Should contain at least 1 number')
                .matches(/^\S*$/, 'Should not contain spaces'),
            confirmPassword: Yup.string()
                .required()
                .oneOf([Yup.ref('password')], 'Password must Match'),
            agreement : Yup.bool()
                .isTrue('Field must be checked')
        }),

        onSubmit : doregis
        
    });
    console.log(formik)

    return (
        <div className="form">
            <h1>REGISTER FORM</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label className="label-required">Username</label>
                    <input
                        type="text"
                        name="username"
                        {...formik.getFieldProps('username')}
                    />
                    {formik.touched.username && formik.errors.username && <div className="error">{formik.errors.username}</div>}
                </div>

                <div className="form-group">
                    <label className="label-required">Email</label>
                    <input
                        type="text"
                        name="email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}
                </div>

                <div className="form-group">
                    <label className="label-required">password</label>
                    <input
                        type="password"
                        name="password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && <div className="error">{formik.errors.password}</div>}
                </div>

                <div className="form-group">
                    <label className="label-required">confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="error">{formik.errors.confirmPassword}</div>}
                </div>
                <div className="form-group">
                    <input
                        id="agreement"
                        type="checkbox"
                        name="agreement"
                        checked = {formik.values.agreement}
                        {...formik.getFieldProps('agreement')}
                    />
                    <label htmlFor="agreement" className="label-required">I Agree To Term Of Service</label>
                    {formik.touched.agreement && formik.errors.agreement && <div className="error">{formik.errors.agreement}</div>}
                </div>
                <button type="submit" disabled={formik.isSubmitting}>Register</button>
            </form>
        </div>
    )
}
export default Formreg