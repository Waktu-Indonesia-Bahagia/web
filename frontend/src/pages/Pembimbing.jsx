import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"
import Pagination from "../components/Pagination"
import '../assets/css/Pembimbing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusMinus as Add } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare as Update } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan as Delete } from '@fortawesome/free-solid-svg-icons'

const Pembimbing = () => {
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
    axios.get('http://localhost:3000/Pembimbing') 
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])
  
  const hapusPembimbing = (id) => {
    axios.delete('http://localhost:3000/delete/'+id)
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
                <div className="top-pembimbing">
                    <h1>Pembimbing</h1>
                    <p>Selamat Datang di Halaman Pembimbing</p>
                </div>

                <div className="middle-main middle-pembimbing">
                    <div className="left">
                        <form>
                            <input type="text" name="search" id="search" placeholder="Cari" />
                        </form>
                    </div>

                    <div className="right">
                        <a href={`/tambahpembimbing/${id}`}>
                            <FontAwesomeIcon icon={Add} size="sm" style={{color: "#333333",}} />
                            <p>Tambah</p>
                        </a>
                    </div>
                </div>

                <div className="bottom-pembimbing">
                  <div className="tbl-mhs">
                    <div className="shadow">
                      <div className="tbl-head">
                          <p className="no">No</p>
                          <p className="nama">Nama</p>
                          <p className="nip">NIP</p>
                          <p className="telp">Telp</p>
                          <p className="email">Email</p>
                          <p className="aksi">Aksi</p>
                      </div>

                      <div className="tbl-body">
                        {data.map((pembimbing, index) => {
                          return (
                          <>
                            <div key={index} className="rows">
                              <p className="no">{index + 1}</p>
                              <p className="nama">{pembimbing.nama}</p>
                              <p className="nip">{pembimbing.nip}</p>
                              <p className="telp">{pembimbing.telepon}</p>
                              <p className="email">{pembimbing.email}</p>
                              <p className="aksi">
                                <Link to={`/editpembimbing/${pembimbing.id}`}>
                                  <FontAwesomeIcon icon={Update} size="lg" style={{color: "#ffa200",}} />
                                </Link>
                                <Link onClick={ () => hapusPembimbing(pembimbing.id)}>
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

export default Pembimbing