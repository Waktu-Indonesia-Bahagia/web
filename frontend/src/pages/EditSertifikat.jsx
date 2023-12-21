import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"

const EditSertifikat = () => {
  const {id} = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/byidsertifikat/'+id)
    .then(res => {
      console.log(res);
      setValues({...values, nama: res.data[0].nama, keahlian: res.data[0].keahlian})
    })
    .catch(err => console.log(err))
  }, []) 

  const [values, setValues] = useState({
    nama: '',
    keahlian: ''
  })

  const editSertifikat = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3000/editsertifikat/'+id, values)
    .then(res => {
      console.log(res);
      navigate('/Sertifikat/'+1);
    })
    .catch(err => console.log(err))
  }

  return (
    <>
        <Header role='Admin' />
        <SidebarAdmin idUser={1} />
        <main>
          <div className="box-shadow">
            <div className="box-top-form-mhs">
                <div className="top-form-mahasiswa">
                    <h1>Edit Sertifikat</h1>
                    <p>Selamat Datang di Kelola Sertifikat</p>
                </div>

                <div className="middle-form-mahasiswa">
                    <form onSubmit={editSertifikat}>
                        <div className="mb-3">
                            <label htmlFor="nama" className="form-label">Nama Lengkap</label>
                            <input type="text" className="form-control" id="nama" placeholder="Masukan Nama" autoFocus name="nama" value={values.nama}
                            onChange={e => setValues({...values, nama: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="keahlian" className="form-label">Keahlian</label>
                            <input type="text" className="form-control" id="keahlian" placeholder="Masukan keahlian" name="keahlian" value={values.keahlian}
                            onChange={e => setValues({...values, keahlian: e.target.value})} />
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

export default EditSertifikat