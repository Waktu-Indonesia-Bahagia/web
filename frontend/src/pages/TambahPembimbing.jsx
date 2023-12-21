import axios from "axios"
import { useNavigate } from "react-router"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"

const TambahPembimbing = () => {
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

  const navigate = useNavigate();
  const [values, setValues] = useState({
    nama: '',
    nip: '',
    telepon: '',
    email: ''
  })
  const tambahPembimbing = (e) => { 
      e.preventDefault();
      axios.post('http://localhost:3000/tambahpembimbing', values)
      .then(res => {
        console.log(res);
        navigate(`/Pembimbing/`+id);
      })
      .catch(err => console.log(err))
  }

  return (
    <>
        <Header role='Admin' user={user.nama} />
        <SidebarAdmin idUser={id} />
        <main>
          <div className="box-shadow">
            <div className="box-top-form-mhs">
                <div className="top-form-mahasiswa">
                    <h1>Tambah Pembimbing</h1>
                    <p>Selamat Datang di Kelola Pembimbing</p>
                </div>

                <div className="middle-form-mahasiswa">
                    <form onSubmit={tambahPembimbing}>
                        <div className="mb-3">
                            <label htmlFor="nama" className="form-label">Nama Lengkap</label>
                            <input type="text" className="form-control" id="nama" required placeholder="Masukan Nama" autoFocus
                            onChange={e => setValues({...values, nama: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nip" className="form-label">NIP</label>
                            <input type="text" className="form-control" id="nip" required placeholder="Masukan NIP" 
                            onChange={e => setValues({...values, nip: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telepon" className="form-label">Nomor Telepon</label>
                            <input type="text" className="form-control" id="telepon" required placeholder="Masukan Nomor Telepon" 
                            onChange={e => setValues({...values, telepon: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" required placeholder="Masukan Email" 
                            onChange={e => setValues({...values, email: e.target.value})}
                            />
                        </div>

                        <button type="submit" className="btn btn-success">Simpan</button>
                    </form>
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

export default TambahPembimbing