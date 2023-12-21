import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"
import "../assets/css/Permohonan.css"

const EditStatusPermohonan = () => {
  const {id} = useParams(); 
  const navigate = useNavigate();

  const [values, setValues] = useState({
    status: '',
  })

  useEffect(() => {
    axios.get('http://localhost:3000/byidpermohonan/'+id)
    .then(res => {
      console.log(res);
      setValues({...values, status: res.data[0].status})
    })
    .catch(err => console.log(err))
  }, []) 

  const editPermohonan = (e) => {
    if (values.status === '' || values.status === '-') {
      e.preventDefault();
      console.log('KOSONG!');
      alert('Tentukan Status Permohonan!');
    } else {
      e.preventDefault();
      axios.put('http://localhost:3000/editpermohonan/'+id, values)
      .then(res => {
        console.log(res);
        navigate('/Permohonan/'+1);
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <>
        <Header role='Admin' />
        <SidebarAdmin idUser={1} />
        <main>
          <div className="box-shadow">
            <div className="box-top-form-mhs">
                <div className="top-form-mahasiswa">
                    <h1>Kelola Permohonan Mahasiswa</h1>
                    <p>Selamat Datang di Kelola Permohonan Mahasiswa</p>
                </div>

                <div className="middle-form-permohonan">
                    <form onSubmit={editPermohonan}>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status Pendaftaran Kerja Praktik | <span>{values.status}</span></label>
                            <select className="form-select" name="status" id="status" aria-label="Default select example" 
                            onChange={e => setValues({...values, status: e.target.value})}>
                                <option value="-">-</option>
                                <option value="Proses">Proses</option>
                                <option value="Di-terima">Di-terima</option>
                                <option value="Di-tolak">Di-tolak</option>
                            </select>
                        </div>
                        
                        <div className="btns">
                          <button type="submit" className="btn btn-success">Simpan</button>
                          <a href={`/Permohonan/${1}`}>Batal</a>
                        </div>
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

export default EditStatusPermohonan