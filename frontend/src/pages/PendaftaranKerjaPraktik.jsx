import axios from "axios"
import { useNavigate } from "react-router"
import { useState } from "react"
import { useEffect} from "react"
import { useParams } from "react-router"
import Header from '../components/Header'
import SidebarMahasiswa from '../components/SidebarMahasiswa'
import '../assets/css/PendaftaranKerjaPraktik.css'

const PendaftaranKerjaPraktik = () => {
    const {id} = useParams()
    const [user, setUser] = useState({
        nama: '',
        email: '',
        alamat: '',
        no_telepon: ''
    })

    useEffect(() => {
        axios.get('http://localhost:3000/byiduser/'+id)
        .then(res => {
            console.log(res.data[0])
            setUser(res.data[0])
        })
        .catch(err => console.log(err))
    }, []) 

    const navigate = useNavigate();
    const [values, setValues] = useState({
        nama: '',
        asal_kampus: '',
        no_telepon: '',
        email: '',
        program_pilihan: '',
        surat_permohonan: ''
    })
    const tambahPermohonan = (e) => {
        if (values.program_pilihan === '' || values.program_pilihan === '-') {
            alert('Isi Program Pilihan Terlebih Dahulu!');
            e.preventDefault();
        } else {
            const formData = new FormData()
            formData.append('nama', values.nama)
            formData.append('asal_kampus', values.asal_kampus)
            formData.append('no_telepon', values.no_telepon)
            formData.append('email', values.email)
            formData.append('program_pilihan', values.program_pilihan)
            formData.append('surat_permohonan', values.surat_permohonan)

            axios.post('http://localhost:3000/tambahpermohonan', formData)
            .then(res => {
              console.log(res);
              navigate('/Notifikasi');
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <>
            <Header role='Mahasiswa' user={user.nama} />
            <SidebarMahasiswa idUser={id} />
            <main>
            <div className="box-shadow">
                <div className="box-top">
                    <div className="top-pendaftaran">
                        <div className="alert alert-warning fade show" role="alert">
                            <div className="text">
                                <p>Perhatian! Setelah melakukan pendaftaran, Anda akan menerima informasi lanjutan melalui halaman Notifikasi atau melalui pesan WhatsApp.</p> 
                            </div>

                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>

                    <div className="middle-pendaftaran">
                        <h1>Pendaftaran Praktik Kerja</h1>
                        <p>Selamat Datang di Formulir Pendaftaran</p>
                    </div>

                    <div className="bottom-pendaftaran">
                        <form onSubmit={tambahPermohonan}>
                            <div className="mb-3">
                                <label htmlFor="nama" className="form-label">Nama Lengkap</label>
                                <input type="text" className="form-control" id="nama" name="nama" autoFocus
                                onChange={e => setValues({...values, nama: e.target.value})} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="asal_kampus" className="form-label">Asal Kampus</label>
                                <input type="text" className="form-control" id="asal_kampus" name="asal_kampus"
                                onChange={e => setValues({...values, asal_kampus: e.target.value})} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="no_telepon" className="form-label">Nomor Telepon</label>
                                <input type="number" className="form-control" id="no_telepon" name="no_telepon"
                                onChange={e => setValues({...values, no_telepon: e.target.value})} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Aktif</label>
                                <input type="email" className="form-control" id="email" name="email"
                                onChange={e => setValues({...values, email: e.target.value})} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="program_pilihan" className="form-label">Program Pilihan</label>
                                <select className="form-select" id="program_pilihan" name="program_pilihan" aria-label="Default select example" required onChange={e => setValues({...values, program_pilihan: e.target.value})}>
                                    <option value="-"> - </option>
                                    <option value="Web Development"> Web Development</option>
                                    <option value="Mobile Development">Mobile Development</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="surat_permohonan" className="form-label">Foto Surat Permohonan Magang</label>
                                <input type="file" className="form-control" id="surat_permohonan" name="surat_permohonan"
                                onChange={e => setValues({...values, surat_permohonan: e.target.files[0]})} />
                            </div>

                            <button type="submit" className="btn btn-success">Kirim</button>
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

export default PendaftaranKerjaPraktik