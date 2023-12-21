import axios from "axios"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"
import BoxSertifikat from "../components/BoxSertifikat"
import '../assets/css/Sertifikat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusMinus as Add } from '@fortawesome/free-solid-svg-icons'

const Sertifikat = () => {
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
    axios.get('http://localhost:3000/Sertifikat') 
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

  return (
    <>
        <Header role='Admin' user={user.nama} />
        <SidebarAdmin idUser={id} />
        <main>
          <div className="box-shadow">
            <div className="box-top-mhs">
                <div className="top-sertifikat">
                    <h1>Sertifikat</h1>
                    <p>Selamat Datang di Halaman Sertifikat</p>
                </div>

                <div className="middle-main middle-sertifikat">
                    <div className="left">
                        <form>
                            <input type="text" name="search" id="search" placeholder="Cari" />
                        </form>
                    </div>

                    <div className="right">
                        <a href={`/tambahsertifikat/${id}`}>
                            <FontAwesomeIcon icon={Add} size="sm" style={{color: "#333333",}} />
                            <p>Tambah</p>
                        </a>
                    </div>
                </div>

                <div className="bottom-sertifikat">
                  {data.map((sertifikat, index) => {
                    let date = new Date(sertifikat.tanggal);
                    console.log(sertifikat.file_sertifikat)

                    let numberMonth = date.getMonth();
                    const monthNames = [
                      "Januari", "Februari", "Maret", "April", "Mei", 
                      "Juni", "Juli", "Agustus", "September",
                      "Oktober", "November", "Desember"
                    ];

                    return (
                      <>
                        <BoxSertifikat key={index} thumbnail={sertifikat.file_sertifikat} nama={sertifikat.nama} keahlian={sertifikat.keahlian} tanggal={`${monthNames[numberMonth]} ${date.getFullYear()}`} id={sertifikat.id} />
                      </>
                    )
                  })}
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

export default Sertifikat