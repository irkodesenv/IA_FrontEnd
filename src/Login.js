import { useEffect, useState } from 'react';
import './App.css';
import apiInstance from './utils/api-instance';

function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmitLogin = async (e) => {
    e.preventDefault(); // Certifique-se de prevenir o comportamento padrão do formulário
    const form_data = {
      username: login,
      password: senha
    }

    await apiInstance.post("v1/usuario/auth_user/", form_data)
    
  }

  return (
    <div className="App">
      <div className="authentication-wrapper authentication-cover">

        <div className="authentication-inner row m-0">

          <div className="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5">
            <div className="w-100 d-flex justify-content-center">
              <img
                src="./static/assets/img/illustrations/IA.png"
                className="img-fluid"
                alt="Login image"
                width="950"
                data-app-dark-img="illustrations/boy-with-rocket-dark.png"
                data-app-light-img="illustrations/boy-with-rocket-light.png" />
            </div>
          </div>

          <div className="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-12 p-6">
            <div className="w-px-400 mx-auto mt-12 pt-5">
              <h4 className="mb-1">IRKO IA</h4>
              <p className="mb-6">Para acessar, basta inserir o login e senha da sua máquina. </p>

              <form id="formAuthentication" className="mb-6" onSubmit={handleSubmitLogin}>
                <div className="mb-6">
                  <label htmlFor="username" className="form-label">Login</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={(e) => setLogin(e.target.value)}
                    required
                    autoFocus />
                </div>
                <div className="mb-6 form-password-toggle">
                  <label className="form-label" htmlFor="password">Senha</label>
                  <div className="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      onChange={(e) => setSenha(e.target.value)}
                      required
                      aria-describedby="password" />
                  </div>
                </div>                

                <button type="submit" className="btn btn-primary d-grid w-100">Entrar</button>
              </form>      

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
