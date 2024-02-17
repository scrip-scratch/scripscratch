import { useState } from "react";
import { Layout } from "../components/Layout";
import { authApi } from "../api/AuthApi";

export const Login = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    const response = await authApi.loginAsync({ login, password });
    console.log(response); // TODO:DELETE DEV LOG
  };

  return (
    <Layout>
      <form className="login-form">
        <div>
          <label htmlFor="login">Login</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Submit
        </button>
      </form>
    </Layout>
  );
};
