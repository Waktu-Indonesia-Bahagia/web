import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useParams } from "react-router"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"

const EditPembimbing = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/read/'+id)
    .then(res => {
      console.log(res);
      setValues({...values, nama: res.data[0].nama, nip: res.data[0].nip, telepon: res.data[0].telepon, email: res.data[0].email})
    })
    .catch(err => console.log(err))
  }, []) 

  const [values, setValues] = useState({
    nama: '',
    nip: '',
    telepon: '',
    email: ''
  })

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3000/editpembimbing/'+id, values)
    .then(res => {
      console.log(res);
      navigate(`/Pembimbing/`+1);
    })
    .catch(err => console.log(err))
  }

  return (
    <>
        <Header role='Admin'/>
        <SidebarAdmin idUser={id} />
        <main>
          <div className="box-shadow">
            <div className="box-top-form-mhs">
                <div className="top-form-mahasiswa">
                    <h1>Edit Pembimbing</h1>
                    <p>Selamat Datang di Kelola Pembimbing</p>
                </div>

                <div className="middle-form-mahasiswa">
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label htmlFor="nama" className="form-label">Nama Lengkap</label>
                            <input type="text" className="form-control" id="nama" placeholder="Masukan Nama" autoFocus value={values.nama}
                            onChange={e => setValues({...values, nama: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nip" className="form-label">NIP</label>
                            <input type="text" className="form-control" id="nip" placeholder="Masukan NIP" value={values.nip}
                            onChange={e => setValues({...values, nip: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telepon" className="form-label">Nomor Telepon</label>
                            <input type="text" className="form-control" id="telepon" placeholder="Masukan Nomor Telepon" value={values.telepon}
                            onChange={e => setValues({...values, telepon: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Masukan Email" value={values.email}
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

export default EditPembimbing