import { useEffect, useState } from 'react';
import './App.css';
import apiInstance from './utils/api-instance';

function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [flagSenhaInvalida, setFlagSenhaInvalida] = useState(false)

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
  
    fetch('http://127.0.0.1:8000/api/v1/token/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: login,
          password: senha
      })
    })
    .then(response => {
      const statusCode = response.status;
      return response.json().then(data => ({
        statusCode: statusCode,
        data: data
      }));
    })
    .then(result => {     
      const { statusCode, data } = result;
  
      if (statusCode === 200) {
        setFlagSenhaInvalida(false)
        // Armazena o token JWT no localStorage ou sessionStorage
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        
        window.location.href = '/Chat'; 
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setFlagSenhaInvalida(true)
      }
    })
    .catch(error => console.error('Erro no login:', error));
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
                  <label htmlFor="username" className="form-label" style={{fontSize: 16}}>Login</label>
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
                  <label className="form-label" htmlFor="password" style={{fontSize: 16}}>Senha</label>
                  <div className="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      onChange={(e) => setSenha(e.target.value)}
                      required
                      aria-describedby="password" />
                  </div>
                </div>   
                {
                  flagSenhaInvalida ? (
                      <div class="alert alert-danger alert-dismissible" role="alert">
                      Login e/ou senha inválido!
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div> 
                  ):("")
                }
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
