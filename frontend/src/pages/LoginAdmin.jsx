import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import '../assets/css/LoginMahasiswa.css'

const LoginAdmin = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('Helo! Selamat Datang Admin 🤩')

  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogin = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3000/adminlogin', values)
      .then(result => {
        if (result.data.loginStatus) {
          navigate('/Mahasiswa/'+result.data.id)
          navigate('/TambahMahasiswa/'+result.data.id)
          navigate('/Permohonan/'+result.data.id)
          navigate('/Pembimbing/'+result.data.id)
          navigate('/TambahPembimbing/'+result.data.id)
          navigate('/Sertifikat/'+result.data.id)
          navigate('/TambahSertifikat/'+result.data.id)
          navigate('/ProfileAdmin/'+result.data.id)
          navigate('/UbahProfileAdmin/'+result.data.id)
          navigate('/Dashboard/'+result.data.id)
        } else {
          setError(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>  
        <main className='login-register'>
          <div className="box-shadow">
            <div className="box-top">
                <div className="top-profil">
                    <h1>Login Admin</h1>
                </div>

                <div className="bottom-profil">
                  <div className="main">
                    <div className="alert">
                      <p>  
                        {error && error}
                      </p> 
                    </div>
                    <div className="box-login">
                        <div className="title">
                          <h1>Login</h1>
                          <p>Silahkan Login Terlebih Dahulu!</p>
                        </div>

                        <div className="inputs">
                          <form onSubmit={handleLogin}>
                            <div className="mb-3">
                              <input type="email" className="form-control" id="email" placeholder="Email" autoFocus 
                              onChange={e => setValues({...values, email: e.target.value})} />
                            </div>

                            <div className="mb-3">
                              <input type="password" className="form-control" id="password" placeholder="Password" 
                              onChange={e => setValues({...values, password: e.target.value})} />
                            </div>

                            <div className="submit-btn">
                              <button className="submit-link">Login</button>
                              <p>Belum Terdaftar? <a href="/RegisterAdmin">Daftar</a></p>
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

export default LoginAdmin