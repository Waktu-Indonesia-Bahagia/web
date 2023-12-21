import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"
import Pagination from "../components/Pagination"
import '../assets/css/Mahasiswa.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusMinus as Add } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare as Update } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan as Delete } from '@fortawesome/free-solid-svg-icons'

const Mahasiswa = () => {
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

  const [data, setData] = useState([]);
  // Ambil data dari server saat komponen dimuat
  useEffect(() => {
    axios.get('http://localhost:3000/Mahasiswa') 
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

  const hapusMahasiswa = (id) => {
    axios.delete('http://localhost:3000/hapusmahasiswa/'+id)
    .then(res => {
      location.reload();
    })
    .catch(err => console.log(err));
  }

  return (
    <>
        <Header role='Admin' user={user.nama} />
        <SidebarAdmin idUser={id} />
        <main>
          <div className="box-shadow">
            <div className="box-top-mhs">
                <div className="top-mahasiswa">
                    <h1>Mahasiswa</h1>
                    <p>Selamat Datang di Halaman Mahasiswa</p>
                </div>

                <div className="middle-main middle-mahasiswa">
                    <div className="left">
                        <form>
                            <input type="text" name="search" id="search" placeholder="Cari" />
                        </form>
                    </div>

                    <div className="right">
                        <a href={`/tambahmahasiswa/${id}`}>
                            <FontAwesomeIcon icon={Add} size="sm" style={{color: "#333333",}} />
                            <p>Tambah</p>
                        </a>
                    </div>
                </div>

                <div className="bottom-mahasiswa">
                  <div className="tbl-mhs">
                    <div className="shadow">
                      <div className="tbl-head">
                          <p>No</p>
                          <p>Nama</p>
                          <p>Asal Kampus</p>
                          <p>Telp</p>
                          <p>Email</p>
                          <p>Program Pilihan</p>
                          <p>Keterangan</p>
                          <p>Mulai</p>
                          <p>Akhir</p>
                          <p>Status</p>
                          <p>Aksi</p>
                      </div>

                      <div className="tbl-body">
                        {data.map((mahasiswa, index) => {
                          
                        let waktuMulai = new Date(mahasiswa.tgl_mulai);
                        let waktuAkhir = new Date(mahasiswa.tgl_akhir);

                        return (
                          <>
                            <div className="rows">
                              <p>{index + 1}</p>
                              <p>{mahasiswa.nama}</p>
                              <p>{mahasiswa.asal_kampus}</p>
                              <p>{mahasiswa.no_telepon}</p>
                              <p className="email">{mahasiswa.email}</p>
                              <p className="email">{mahasiswa.program_pilihan}</p>
                              <p>{mahasiswa.keterangan}</p>
                              <p>{`${waktuMulai.getDate()}/${waktuMulai.getMonth() + 1}/${waktuMulai.getFullYear()}`}</p>
                              <p>{`${waktuAkhir.getDate()}/${waktuAkhir.getMonth() + 1}/${waktuAkhir.getFullYear()}`}</p>
                              <p>{mahasiswa.status}</p>
                              <p className="aksi">
                                <Link to={`/editmahasiswa/${mahasiswa.id}`}>
                                  <FontAwesomeIcon icon={Update} size="lg" style={{color: "#ffa200",}} />
                                </Link>
                                <Link onClick={ () => hapusMahasiswa(mahasiswa.id)}>
                                  <FontAwesomeIcon icon={Delete} size="lg" style={{color: "#ff0000",}} />
                                </Link>
                              </p>
                            </div>
                          </>
                          )
                        })}
                      </div>

                      <Pagination />
                    </div>
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

export default Mahasiswa