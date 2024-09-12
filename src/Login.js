import { useEffect, useState } from 'react';
import './App.css';

function Login() {
  const [customers, setCustomers] = useState([]);

  /*
  useEffect(() => {
    const loadData = () => {
      fetch('http://localhost:8000/api/process-api/')
      .then(response => response.json())
      .then(data => setCustomers(data))
    }
    loadData();
  }, [])
  */

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
              <p className="mb-6">Para acessar, basta inserir seu login e senha</p>

              <form id="formAuthentication" className="mb-6" action="index.html" method="GET">
                <div className="mb-6">
                  <label htmlFor="email" className="form-label">Email ou usuário</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email-username"
                    placeholder="Enter your email or username"
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
                      aria-describedby="password" />
                    <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                  </div>
                </div>                

                <button className="btn btn-primary d-grid w-100">Entrar</button>
              </form>      

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
