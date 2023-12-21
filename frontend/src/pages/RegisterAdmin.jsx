import axios from "axios"
import { useNavigate } from "react-router"
import { useState } from "react"
import '../assets/css/LoginMahasiswa.css'

const RegisterAdmin = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    nama: '',
    email: '',
    password: '',
    role: 'admin'
  })
  const handleRegister = (e) => { 
      e.preventDefault();
      axios.post('http://localhost:3000/register_admin', values)
      .then(res => {
        console.log(res);
        alert('Selamat Anda Telah Melakukan Pendaftaran!')
        navigate('/LoginAdmin');
      })
      .catch(err => console.log(err))
  }

  return (
    <>  
      <main className="login-register">
        <div className="box-shadow">
          <div className="box-top">
              <div className="top-profil">
                  <h1>Register Admin</h1>
              </div>

              <div className="bottom-profil">
                <div className="main">
                  <div className="alert">
                    <p>Helo! Selamat Datang Admin 🤩</p>
                  </div>
                  <div className="box-login">
                      <div className="title">
                        <h1>Daftar</h1>
                        <p>Hello! Selamat Datang Admin</p>
                      </div>

                      <div className="inputs">
                        <form onSubmit={handleRegister}>
                          <div className="mb-3">
                            <input type="text" className="form-control" id="nama" placeholder="Nama" autoFocus required
                            onChange={e => setValues({...values, nama: e.target.value})}/>
                          </div>

                          <div className="mb-3">
                            <input type="email" className="form-control" id="email" placeholder="Email" required
                            onChange={e => setValues({...values, email: e.target.value})}/>
                          </div>

                          <div className="mb-3">
                            <input type="password" className="form-control" id="password" placeholder="Kata Sandi" required
                            onChange={e => setValues({...values, password: e.target.value})}/>
                          </div>

                          <div className="mb-3">
                            <input type="text" className="form-control" id="role" hidden
                            onChange={e => setValues({...values, role: e.target.value})}/>
                          </div>

                          <div className="submit-btn">
                            <button className="submit-link">Daftar</button>
                            <p>Sudah Terdaftar? <a href="/LoginAdmin">Masuk</a></p>
                          </div>
                        </form>
                      </div>

                      {/* <div className="with-google">
                        <p>Lanjut dengan</p>
                        <a href="#">
                          <img src={Google} alt="" />
                          Masuk dengan Google
                        </a>
                      </div> */}
                    </div>
                </div>
              </div>
          </div>

          <div className="box-bottom">
            <p>&copy; 2023 Infinite Learning</p>
          </div>
        </div>
      </main>
    </>
  )
}

export default RegisterAdmin