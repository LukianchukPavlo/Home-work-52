import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSignInMutation } from '../../app/store/api/auth';
import type { ISignIn } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';


export const SignIn = () => {
  const [signIn, { isLoading, isError, isSuccess, error }] = useSignInMutation()
  const navigate = useNavigate();
  
  
  
  const initialValues: ISignIn = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required field'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required field'),
  });

  const onSubmit = async (values:ISignIn, { resetForm }: any) => {
    try {
      await signIn(values).unwrap();
      resetForm();
    } catch (error) {
      
    };
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Sign in successful!");
      navigate("/boards");
    }
    if (isError && error) {
      const err = error as FetchBaseQueryError;
      const message =
        (err.data as { message?: string })?.message || "Sign in failed";
      toast.error(message);
    }
  }, [isSuccess, isError, error, navigate]);

  return (
    <>
    
    <div className="max-w-[400px] mx-auto mt-12 p-8 rounded-xl bg-[#f0fff4] shadow-md hover:shadow-lg transition-all duration-300 font-sans">
      <h2 className="text-center text-[#2e7d32] mb-6 font-bold text-[1.8rem]">
        Sign In
      </h2>

      <Formik<ISignIn>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty, errors, touched }) => (
          <Form noValidate className="space-y-4">

            {/* Email */}
            <div>
              <label className="font-semibold block mb-1">Email</label>
              <Field
                name="email"
                type="email"
                placeholder="email@example.com"
                className={`w-full border-2 rounded-lg px-3 py-2 transition-all duration-300
                  ${touched.email && errors.email
                    ? 'border-red-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-300'
                    : 'border-[#a5d6a7] focus:border-[#66bb6a] focus:outline-none focus:ring-2 focus:ring-[#66bb6a]/50'
                  }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-700 text-sm mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-semibold block mb-1">Password</label>
              <Field
                name="password"
                type="password"
                placeholder="******"
                className={`w-full border-2 rounded-lg px-3 py-2 transition-all duration-300
                  ${touched.password && errors.password
                    ? 'border-red-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-300'
                    : 'border-[#a5d6a7] focus:border-[#66bb6a] focus:outline-none focus:ring-2 focus:ring-[#66bb6a]/50'
                  }`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-700 text-sm mt-1 focus:outline-none"
              />
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                disabled={!(isValid && dirty) || isLoading}
                className="w-full bg-[#2e7d32] text-white border-2 border-[#2e7d32] font-semibold py-2.5 rounded-lg
                           transition-all duration-300 
                           hover:bg-[#1b5e20] hover:border-[#1b5e20]
                           focus:outline-none focus:border-[#66bb6a] focus:ring-2 focus:ring-[#66bb6a]/50
                           disabled:opacity-50 disabled:cursor-not-allowed
                           no-browser-focus"
              >
                Sign In
              </button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
    <footer>
      
    </footer>
    </>
  );
};