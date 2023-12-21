import axios from "axios"
import { useNavigate } from "react-router"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"

const TambahMahasiswa = () => {
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
        asal_kampus: '',
        no_telepon: '',
        email: '',
        program_pilihan: '',
        keterangan: '',
        tgl_mulai: '',
        tgl_akhir: '',
        status: '',
    })
    const tambahMahasiswa = (e) => {
        if (values.program_pilihan === '' || values.program_pilihan === '-') {
            alert('Tentukan Program Pilihan!')
            e.preventDefault();
        } else if (values.keterangan === '' || values.keterangan === '-') {
            alert('Tentukan Keterangan!')
            e.preventDefault();
        } else if (values.status === '' || values.status === '-') {
            alert('Tentukan Status!')
            e.preventDefault();
        } else {
            e.preventDefault();
            axios.post('http://localhost:3000/tambahmahasiswa', values)
            .then(res => {
                console.log(res);
                navigate('/Mahasiswa/'+id);
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <>
            <Header role='Admin' user={user.nama} />
            <SidebarAdmin idUser={id} />
            <main>
            <div className="box-shadow">
                <div className="box-top-form-mhs">
                    <div className="top-form-mahasiswa">
                        <h1>Tambah Mahasiswa</h1>
                        <p>Selamat Datang di Kelola Detail Mahasiswa</p>
                    </div>

                    <div className="middle-form-mahasiswa">
                        <form onSubmit={tambahMahasiswa}>
                            <div className="mb-3">
                                <label htmlFor="nama" className="form-label">Nama Lengkap</label>
                                <input type="text" className="form-control" id="nama" placeholder="Masukan Nama" autoFocus required
                                onChange={e => setValues({...values, nama: e.target.value})}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="asal_kampus" className="form-label">Asal Kampus</label>
                                <input type="text" className="form-control" id="asal_kampus" placeholder="Masukan Asal Kampus" 
                                onChange={e => setValues({...values, asal_kampus: e.target.value})} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="no_telepon" className="form-label">Nomor Telepon</label>
                                <input type="text" className="form-control" id="no_telepon" placeholder="Masukan Nomor Telepon" 
                                onChange={e => setValues({...values, no_telepon: e.target.value})} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Masukan Email" 
                                onChange={e => setValues({...values, email: e.target.value})} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="program_pilihan" className="form-label">Program Pilihan</label>
                                <select className="form-select" id="program_pilihan" name="program_pilihan" aria-label="Default select example" required onChange={e => setValues({...values, program_pilihan: e.target.value})}>
                                    <option value="-"> - </option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile Development">Mobile Development</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="keterangan" className="form-label">Keterangan</label>
                                <select className="form-select" id="keterangan" name="keterangan" aria-label="Default select example" required onChange={e => setValues({...values, keterangan: e.target.value})}>
                                    <option value="-"> - </option>
                                    <option value="Magang">Magang</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tgl_mulai" className="form-label">Jadwal Mulai</label>
                                <input type="date" className="form-control" id="tgl_mulai" 
                                onChange={e => setValues({...values, tgl_mulai: e.target.value})} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tgl_akhir" className="form-label">Jadwal Akhir</label>
                                <input type="date" className="form-control" id="tgl_akhir" 
                                onChange={e => setValues({...values, tgl_akhir: e.target.value})} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Status Program</label>
                                <select className="form-select" id="status" name="status" aria-label="Default select example" required onChange={e => setValues({...values, status: e.target.value})}>
                                    <option value="-"> - </option>
                                    <option value="Aktif">Aktif</option>
                                    <option value="Tidak-Aktif">Tidak-Aktif</option>
                                </select>
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

export default TambahMahasiswa