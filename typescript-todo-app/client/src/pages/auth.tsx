import { Fragment, useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";

enum Page {
  LOGIN,
  REGISTER
}

interface Props {
  setToken: (tokenString: string) => void;
}

function AuthPage({ setToken }: Props) {
  const [page, setPage] = useState<Page>(Page.REGISTER);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [registerMutation, { error: registerError }] = useRegisterMutation();
  const [loginMutation, { error: loginError }] = useLoginMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (page === Page.LOGIN) {
      if (values.email.trim() && values.password.trim()) {
        login(values.email.trim(), values.password.trim());
      }
    } else {
      if (values.email.trim() && values.password.trim() && values.name.trim()) {
        register(values.email.trim(), values.password, values.name.trim());
      }
    }
  };

  const register = async (email: string, password: string, name: string) => {
    registerMutation({
      variables: { email, password, name }
    })
      .then(response => {
        if (response.data?.register?.token)
          setToken(response.data.register.token);
      })
      .catch(error => console.log(error));
  };

  const login = async (email: string, password: string) => {
    loginMutation({
      variables: { email, password }
    })
      .then(response => {
        if (response.data?.login?.token) setToken(response.data.login.token);
      })
      .catch(error => console.log(error));
  };

  let message = registerError
    ? registerError.message
    : loginError
    ? loginError.message
    : "";

  return (
    <Fragment>
      <h1>{page === Page.LOGIN ? "Log in" : "Sign up"}</h1>
      {message && <div className="alert">{message}</div>}
      <form onSubmit={handleSubmit} className="form">
        {/* Name */}
        {page === Page.REGISTER && (
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={values.name}
              onChange={e =>
                setValues(values => ({ ...values, name: e.target.value }))
              }
            />
          </div>
        )}
        {/* Email */}
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={e =>
              setValues(values => ({ ...values, email: e.target.value }))
            }
          />
        </div>
        {/* Password */}
        <div className="form-control">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="password"
            value={values.password}
            onChange={e =>
              setValues(values => ({ ...values, password: e.target.value }))
            }
          />
        </div>
        <div className="form-control">
          <button type="submit">
            {page === Page.LOGIN ? "Log in" : "Sign up"}
          </button>
          <button
            type="button"
            onClick={() =>
              setPage(page =>
                page === Page.LOGIN ? Page.REGISTER : Page.LOGIN
              )
            }
          >
            Switch to {page === Page.LOGIN ? "Sign up" : "Log in"}
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default AuthPage;
