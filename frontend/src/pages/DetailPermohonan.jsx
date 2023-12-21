import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCheck as Add } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/Permohonan.css'

const DetailPermohonan = () => {
    const {id} = useParams(); 
    const navigate = useNavigate();

    const [values, setValues] = useState({
        nama: '',
        asal_kampus: '',
        no_telepon: '',
        email: '',
        keterangan: '',
        tgl_permohonan: '',
        status: '',
        program_pilihan: '',
        tgl_mulai: new Date().toISOString().substr(0,10),
        tgl_akhir: new Date().toISOString().substr(0,10)
    })

    const [mahasiswa, setMahasiswa] = useState({
        nama: '',
        nip: '',
        telepon: '',
        email: ''
    })

    // Ambil 1 data dari server saat komponen dimuat
    useEffect(() => {
        axios.get('http://localhost:3000/byidpermohonan/'+id)
        .then(res => {
        console.log(res);

        let tglPermohonan = new Date(res.data[0].tgl_permohonan);
        setValues({...values, 
            nama: res.data[0].nama,
            asal_kampus: res.data[0].asal_kampus,
            no_telepon: res.data[0].no_telepon,
            email: res.data[0].email,
            keterangan: res.data[0].keterangan,
            tgl_permohonan: new Date(`${tglPermohonan.getFullYear()} ${tglPermohonan.getMonth() + 1} ${tglPermohonan.getDate() + 1}`).toISOString().substr(0,10),
            status: res.data[0].status,
            program_pilihan: res.data[0].program_pilihan,
            surat_permohonan: res.data[0].surat_permohonan
            })
        })
        .catch(err => console.log(err))
    }, []) 

    const approvePermohonan = (e) => {
        if (values.status === 'Ditolak') {
            navigate('/Permohonan');
            e.preventDefault();
        } else if (values.status === 'Proses') {
            alert('Tentukan Status Permohonan Terlebih Dahulu!');
            navigate('/Permohonan/'+1);
            e.preventDefault();
        } else{
            // tambah mahasiswa baru
            e.preventDefault();
            axios.post('http://localhost:3000/tambahmahasiswapermohonan', values)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err))
            
            // hapus data permohonan
            axios.delete('http://localhost:3000/hapuspermohonan/'+id)
            .then(res => {
                navigate('/Permohonan/'+1);
            })
            .catch(err => console.log(err));

            alert('Data Mahasiswa Berhasil di Terima!');
        }
    }

    let statusMahasiswa;
    if (values.status === 'Di-tolak') {
        statusMahasiswa = 'Tolak';
    } else if (values.status === 'Di-terima') {
        statusMahasiswa = 'Terima'; 
    } else {
        statusMahasiswa = 'Proses'; 
    }

    return (
        <>
            <Header role='Admin' />
            <SidebarAdmin idUser={1} />
            <main>
            <div className="box-shadow">
                <div className="box-top-form-mhs">
                    <div className="top-form-mahasiswa">
                        <h1>Detail Permohonan Mahasiswa</h1>
                        <p>Selamat Datang di Halaman Permohonan Mahasiswa</p>
                    </div>

                    <div className="middle-form-permohonan form-detail">
                        <form onSubmit={approvePermohonan}>
                            <div className="mb-3 rules">
                                <div className="input-status">
                                    <label htmlFor="status" className="form-label">Status Pendaftaran Kerja Praktik | <span>{values.status}</span></label>
                                    <select className="form-select" name="status" id="status" aria-label="Default select example" required>
                                        <option value={values.status}>{values.status}</option>
                                    </select>
                                </div>

                                <div className="approve">
                                    <button type="submit" className="btn btn-success">
                                        <FontAwesomeIcon icon={Add} size="lg" style={{color: "#fff",}} /> {statusMahasiswa}
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="nama" className="form-label">Nama Lengkap</label>
                                <input type="text" className="form-control" id="nama" value={values.nama} disabled 
                                onChange={e => setMahasiswa({...mahasiswa, nama: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="asal_kampus" className="form-label">Asal Kampus</label>
                                <input type="text" className="form-control" id="asal_kampus" value={values.asal_kampus} disabled 
                                onChange={e => setMahasiswa({...mahasiswa, asal_kampus: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telp" className="form-label">Nomor Telepon</label>
                                <input type="text" className="form-control" id="telp" value={values.no_telepon} disabled 
                                onChange={e => setMahasiswa({...mahasiswa, no_telepon: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="text" className="form-control" id="email" value={values.email} disabled 
                                onChange={e => setMahasiswa({...mahasiswa, email: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="keterangan" className="form-label">Keterangan</label>
                                <input type="text" className="form-control" id="keterangan" value={values.keterangan} disabled 
                                onChange={e => setMahasiswa({...values, keterangan: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tgl_permohonan" className="form-label">Tanggal Permohonan</label>
                                <input type="text" className="form-control" id="tgl_permohonan" value={values.tgl_permohonan} disabled />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="program_pilihan" className="form-label">Program Pilihan</label>
                                <input type="text" className="form-control" id="program_pilihan" value={values.program_pilihan} disabled />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="akhir" className="form-label">Foto Surat Permohonan Magang</label>
                                <div className="thumb">
                                    <img src={`http://localhost:3000/images/` + values.surat_permohonan} className="img-fluid" alt="..."></img>
                                </div>
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

export default DetailPermohonan