import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router"
import Header from "../components/Header"
import SidebarMahasiswa from "../components/SidebarMahasiswa"
import Link from "../components/Link"
import '../assets/css/Profile.css'
import FotoProfile from '../assets/img/foto_profile.png'

const UbahProfileMahasiswa = () => {
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

  const navigate = useNavigate()
  const editProfil = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3000/editprofil/'+id, user)
    .then(res => {
      alert('Profil Berhasil di Perbaharui!')
      navigate('/ProfileMahasiswa/'+id);
    })
    .catch(err => console.log(err))
  }
  
  return (
    <>
        <Header role='Mahasiswa' user={user.nama} />
        <SidebarMahasiswa idUser={id} />
        <main>
          <div className="box-shadow">
            <div className="box-top-mhs">
                <div className="top-profil">
                    <h1>Pengaturan Profil</h1>
                    <p>Manage Profil Anda</p>
                </div>

                <div className="middle-main middle-profil">
                    <div className="link">
                      <Link to={`/ProfileMahasiswa/${id}`} text='Profile' />
                      <Link to={`/UbahProfileMahasiswa/${id}`} text='Ubah Profile' />
                    </div>
                </div>

                <div className="bottom-profil">
                  <div className="top">
                    <div className="thumb">
                      <img src={FotoProfile} alt="Foto Profile" />
                    </div>

                    <div className="description">
                      <h1>{user.nama}</h1>
                      <p>{user.asal_kampus}</p>
                    </div>
                  </div>

                  <div className="bottom">
                    <form onSubmit={editProfil}>
                        <div className="mb-3">
                            <label htmlFor="nama" className="form-label">Nama Lengkap</label>
                            <input type="text" className="form-control" id="nama" value={user.nama} autoFocus 
                            onChange={e => setUser({...user, nama: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" value={user.email} 
                            onChange={e => setUser({...user, email: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="asal_kampus" className="form-label">Asal Kampus</label>
                            <input type="text" className="form-control" id="asal_kampus" value={user.asal_kampus} autoFocus 
                            onChange={e => setUser({...user, asal_kampus: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="no_telepon" className="form-label">Nomor Telepon</label>
                            <input type="number" className="form-control" id="no_telepon" value={user.no_telepon} 
                            onChange={e => setUser({...user, no_telepon: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="alamat" className="form-label">Alamat</label>
                            <input type="text" className="form-control" id="alamat" value={user.alamat} 
                            onChange={e => setUser({...user, alamat: e.target.value})}/>
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

export default UbahProfileMahasiswa