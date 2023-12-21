import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useParams } from "react-router"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"

const EditMahasiswa = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/byidmahasiswa/'+id)
        .then(res => {
        console.log(res);

        let tglMulai = new Date(res.data[0].tgl_mulai);
        let tglAkhir = new Date(res.data[0].tgl_akhir);
        setValues({
                ...values, 
                nama: res.data[0].nama, 
                asal_kampus: res.data[0].asal_kampus, 
                no_telepon: res.data[0].no_telepon, 
                email: res.data[0].email,
                program_pilihan: res.data[0].program_pilihan,
                keterangan: res.data[0].keterangan,
                tgl_mulai: new Date(`${tglMulai.getFullYear()} ${tglMulai.getMonth() + 1} ${tglMulai.getDate() + 1}`).toISOString().substr(0,10),
                tgl_akhir: new Date(`${tglAkhir.getFullYear()} ${tglAkhir.getMonth() + 1} ${tglAkhir.getDate() + 1}`).toISOString().substr(0,10),
                status: res.data[0].status
            })
        })
        .catch(err => console.log(err))
    }, []) 

    const [values, setValues] = useState({
        nama: '', 
        asal_kampus: '', 
        no_telepon: '', 
        email: '',
        program_pilihan: '',
        keterangan: '',
        tgl_mulai: '',
        tgl_akhir: '',
        status: ''
    })

    const editMahasiswa = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/editmahasiswa/'+id, values)
        .then(res => {
          console.log(res);
          navigate(`/Mahasiswa/`+1);
        })
        .catch(err => console.log(err))
      }

      let status = values.status === 'Aktif' ? 'Tidak-Aktif' : 'Aktif';
      let programPilihan = values.program_pilihan === 'Web Development' ? 'Mobile Development' : 'Web Development';

    return (
        <>
            <Header role='Admin' />
            <SidebarAdmin idUser={1} />
            <main>
            <div className="box-shadow">
                <div className="box-top-form-mhs">
                    <div className="top-form-mahasiswa">
                        <h1>Edit Mahasiswa</h1>
                        <p>Selamat Datang di Kelola Detail Mahasiswa</p>
                    </div>

                    <div className="middle-form-mahasiswa">
                        <form onSubmit={editMahasiswa}>
                            <div className="mb-3">
                                <label htmlFor="nama" className="form-label">Nama Lengkap</label>
                                <input type="text" className="form-control" id="nama" placeholder="Masukan Nama" autoFocus value={values.nama}
                                onChange={e => setValues({...values, nama: e.target.value})}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="asal_kampus" className="form-label">Asal Kampus</label>
                                <input type="text" className="form-control" id="asal_kampus" placeholder="Masukan Asal Kampus" 
                                onChange={e => setValues({...values, asal_kampus: e.target.value})} value={values.asal_kampus} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="no_telepon" className="form-label">Nomor Telepon</label>
                                <input type="text" className="form-control" id="no_telepon" placeholder="Masukan Nomor Telepon" 
                                onChange={e => setValues({...values, no_telepon: e.target.value})} value={values.no_telepon} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Masukan Email" 
                                onChange={e => setValues({...values, email: e.target.value})} value={values.email} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="program_pilihan" className="form-label">Program Pilihan</label>
                                <select className="form-select" id="program_pilihan" name="program_pilihan" aria-label="Default select example" onChange={e => setValues({...values, program_pilihan: e.target.value})}>
                                    <option value={values.program_pilihan}>{values.program_pilihan}</option>
                                    <option value={programPilihan}>{programPilihan}</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="keterangan" className="form-label">Keterangan</label>
                                <select className="form-select" id="keterangan" name="keterangan" aria-label="Default select example"  onChange={e => setValues({...values, keterangan: e.target.value})}>
                                    <option value={values.keterangan}>{values.keterangan}</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tgl_mulai" className="form-label">Jadwal Mulai</label>
                                <input type="date" className="form-control" id="tgl_mulai" 
                                onChange={e => setValues({...values, tgl_mulai: e.target.value})} value={values.tgl_mulai} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tgl_akhir" className="form-label">Jadwal Akhir</label>
                                <input type="date" className="form-control" id="tgl_akhir" value={values.tgl_akhir} 
                                onChange={e => setValues({...values, tgl_akhir: e.target.value})}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Status Program</label>
                                <select className="form-select" id="status" name="status" aria-label="Default select example" onChange={e => setValues({...values, status: e.target.value})}>
                                    <option value={values.status}>{values.status}</option>
                                    <option value={status}>{status}</option>
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

export default EditMahasiswa