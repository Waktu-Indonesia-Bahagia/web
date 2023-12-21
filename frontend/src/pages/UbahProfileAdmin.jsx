import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"
import Link from "../components/Link"
import '../assets/css/Profile.css'
import FotoProfile from '../assets/img/foto_profile.png'

const UbahProfileAdmin = () => {
  const {id} = useParams()
  const [user, setUser] = useState({
    nama: '',
    email: '',
    alamat: '',
    no_telepon: ''
  })

  useEffect(() => {
    axios.get('http://localhost:3000/byiduser/'+id)
    .then(res => setUser(res.data[0]))
    .catch(err => console.log(err))
  }, []) 

  const navigate = useNavigate()
  const editProfil = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3000/editprofiladmin/'+id, user)
    .then(res => {
      alert('Profil Berhasil di Perbaharui!')
      navigate('/ProfileAdmin/'+id);
    })
    .catch(err => console.log(err))
  }

  return (
    <>  
        <Header role='Admin' user={user.nama} />
        <SidebarAdmin idUser={id} />
        <main>
          <div className="box-shadow">
            <div className="box-top-mhs">
                <div className="top-profil">
                    <h1>Pengaturan Profil</h1>
                    <p>Manage Profil Anda</p>
                </div>

                <div className="middle-main middle-profil">
                    <div className="link">
                      <Link to={`/ProfileAdmin/${id}`} text='Profile' />
                      <Link to={`/UbahProfileAdmin/${id}`} text='Ubah Profile' />
                    </div>
                </div>

                <div className="bottom-profil">
                  <div className="top">
                    <div className="thumb">
                      <img src={FotoProfile} alt="Foto Profile" />
                    </div>

                    <div className="description">
                      <p>Admin</p>
                      <h1>{user.nama}</h1>
                    </div>
                  </div>

                  <div className="bottom">
                    <form onSubmit={editProfil}>
                        <div className="mb-3">
                            <label htmlFor="nama" className="form-label">Nama Lengkap</label>
                            <input type="text" className="form-control" id="nama" autoFocus value={user.nama}
                            onChange={e => setUser({...user, nama: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="Email" value={user.email}
                            onChange={e => setUser({...user, email: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="alamat" className="form-label">Alamat</label>
                            <input type="text" className="form-control" id="alamat" value={user.alamat}
                            onChange={e => setUser({...user, alamat: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="no_telepon" className="form-label">Nomor Telepon</label>
                            <input type="number" className="form-control" id="no_telepon" value={user.no_telepon}
                            onChange={e => setUser({...user, no_telepon: e.target.value})}/>
                        </div>

                        <div className="box">
                          <button type="submit" className="btn btn-success">Simpan</button>
                        </div>
                    </form>
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

export default UbahProfileAdmin