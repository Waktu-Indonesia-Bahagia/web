import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"
import Pagination from "../components/Pagination"
import '../assets/css/Permohonan.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan as Delete } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope as Message } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo as Detail } from '@fortawesome/free-solid-svg-icons'

const Permohonan = () => {
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
  useEffect(() => {
    axios.get('http://localhost:3000/Permohonan') 
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

  const hapusPermohonan = (id) => {
    axios.delete('http://localhost:3000/hapuspermohonan/'+id)
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
                <div className="top-permohonan">
                    <h1>Permohonan</h1>
                    <p>Selamat Datang di Halaman Permohonan</p>
                </div>

                <div className="middle-main middle-permohonan">
                    <div className="left">
                        <form>
                            <input type="text" name="search" id="search" placeholder="Cari" />
                        </form>
                    </div>
                </div>

                <div className="bottom-permohonan">
                  <div className="tbl-mhs">
                    <div className="shadow">
                      <div className="tbl-head">
                          <p>No</p>
                          <p>Nama</p>
                          <p>Asal Kampus</p>
                          <p>Telp</p>
                          <p>Email</p>
                          <p>Keterangan</p>
                          <p>Permohonan</p>
                          <p>Program Pilihan</p>
                          <p>Status</p>
                          <p>Aksi</p>
                          <p>Detail</p>
                      </div>

                      <div className="tbl-body">
                        {data.map((permohonan, index) => {
                        let date = new Date(permohonan.tgl_permohonan);
                        return (
                        <>
                          <div key={index} className="rows">
                            <p>{index + 1}</p>
                            <p>{permohonan.nama}</p>
                            <p>{permohonan.asal_kampus}</p>
                            <p>{permohonan.no_telepon}</p>
                            <p className="email">{permohonan.email}</p>
                            <p>{permohonan.keterangan}</p>
                            <p>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</p>
                            <p>{permohonan.program_pilihan}</p>
                            <p>{permohonan.status}</p>
                            <p className="aksi">
                              <Link onClick={ () => hapusPermohonan(permohonan.id)}>
                                <FontAwesomeIcon icon={Delete} size="lg" style={{color: "#ff0000",}} />
                              </Link>
                              <Link to={`/EditStatusPermohonan/${permohonan.id}`}>
                                <FontAwesomeIcon icon={Message} size="lg" style={{color: "#204483",}} />
                              </Link>
                            </p>
                            <p className="detail">
                              <Link to={`/DetailPermohonan/${permohonan.id}`}>
                                Detail <FontAwesomeIcon icon={Detail} style={{color: "#204483",}} />
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

export default Permohonan