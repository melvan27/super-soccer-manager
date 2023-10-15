import React, { useState } from 'react';

const UserForm = ({ initialForm, isRegistering, submitHandler, errors }) => {
  const [form, setForm] = useState(initialForm);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    submitHandler(form);
  };
  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={onSubmitHandler}>
        <div className="card-body">
          {isRegistering && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input input-bordered"
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className="text-error">{errors.firstName}</p>}
            </div>
          )}
          {isRegistering && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input input-bordered"
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className="text-error">{errors.lastName}</p>}
            </div>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input input-bordered"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-error">{errors.email}</p>}
          </div>
          {isRegistering && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="input input-bordered"
                value={form.username}
                onChange={handleChange}
              />
              {errors.username && <p className="text-error">{errors.username}</p>}
            </div>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-error">{errors.password}</p>}
          </div>
          {isRegistering && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="input input-bordered"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="text-error">{errors.confirmPassword}</p>}
            </div>
          )}
          {isRegistering ? null : (
            <div className="form-control">
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
          )}
          <div className="form-control mt-6">
            <button className="btn btn-primary">
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
