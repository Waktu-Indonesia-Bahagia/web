import axios from "axios"
import { useNavigate } from "react-router"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"

const TambahSertifikat = () => {
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
    keahlian: '',
    file_sertifikat: ''
  })
  const tambahSertifikat = (e) => {
      e.preventDefault();
      const formData = new FormData()
      formData.append('nama', values.nama)
      formData.append('keahlian', values.keahlian)
      formData.append('file_sertifikat', values.file_sertifikat)

      axios.post('http://localhost:3000/tambahsertifikat', formData)
      .then(res => {
        console.log(res);
        navigate('/Sertifikat/'+id);
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
                    <h1>Tambah Sertifikat</h1>
                    <p>Selamat Datang di Kelola Sertifikat</p>
                </div>

                <div className="middle-form-mahasiswa">
                    <form onSubmit={tambahSertifikat}>
                        <div className="mb-3">
                            <label htmlFor="nama" className="form-label">Nama Lengkap</label>
                            <input type="text" className="form-control" id="nama" placeholder="Masukan Nama" name="nma" autoFocus 
                            onChange={e => setValues({...values, nama: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="keahlian" className="form-label">Keahlian</label>
                            <input type="text" className="form-control" id="keahlian" placeholder="Masukan keahlian"  name="keahlian"
                            onChange={e => setValues({...values, keahlian: e.target.value})} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="file_sertifikat" className="form-label">File Sertifikat</label>
                          <input type="file" className="form-control" id="file_sertifikat" name="file_sertifikat"
                          onChange={e => setValues({...values, file_sertifikat: e.target.files[0]})} />
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

export default TambahSertifikat