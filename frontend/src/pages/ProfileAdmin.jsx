import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"
import Link from "../components/Link"
import '../assets/css/Profile.css'
import FotoProfile from '../assets/img/foto_profile.png'

const ProfileAdmin = () => {
  const {id} = useParams()
  const [user, setUser] = useState({
    nama: '',
    asal_kampus: '',
    email: '',
    alamat: '',
    no_telepon: ''
  })

  useEffect(() => {
    axios.get('http://localhost:3000/byiduser/'+id)
    .then(res => setUser(res.data[0]))
    .catch(err => console.log(err))
  }, []) 

  return (
    <>  
        <Header role='Admin' user={user.nama} />
        <SidebarAdmin idUser={id} />
        <main>
          <div className="box-shadow">
            <div className="box-top-mhs">
                <div className="top-profil">
                    <h1>Pengaturan Profil</h1>
                    <p>Selamat Datang di Profil Utama</p>
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
                    <form>
                        <div className="mb-3">
                            <label htmlFor="nama" className="form-label">Nama Lengkap</label>
                            <input type="text" className="form-control" id="nama" value={user.nama} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="Email" value={user.email} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="alamat" className="form-label">Alamat</label>
                            <input type="text" className="form-control" id="alamat" value={user.alamat} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telp" className="form-label">Nomor Telepon</label>
                            <input type="telp" className="form-control" id="telp" value={user.no_telepon} disabled />
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

export default ProfileAdmin