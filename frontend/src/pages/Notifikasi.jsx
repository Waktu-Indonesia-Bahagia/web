import axios from "axios"
import { useState } from "react"
import { useEffect} from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router"
import Header from '../components/Header'
import SidebarMahasiswa from '../components/SidebarMahasiswa'
import '../assets/css/Notifikasi.css'

const Notifikasi = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    nama: '',
    email: '',
    alamat: '',
    no_telepon: ''
  })
  useEffect(() => {
    axios.get('http://localhost:3000/byiduser/'+id)
    .then(res => {
      setUser(res.data[0])
    })
    .catch(err => console.log(err))
  }, []) 

  const [permohonan, setPermohonan] = useState({
    status: ''
  })
  useEffect(() => {
    axios.get('http://localhost:3000/byidpermohonan/'+id)
    .then(res => setPermohonan(res.data[0]))
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <>
        <Header role='Mahasiswa' user={user.nama} />
        <SidebarMahasiswa idUser={id} />
        <main>
          <div className="box-shadow">
            <div className="box-top">
                <div className="top-notifikasi">
                    <h1>Notifikasi</h1>
                    <p>Selamat Datang di Pusat Notifikasi Kami</p>
                </div>

                <div className="bottom-notifikasi">
                  <div className="alert alert-success" role="alert">
                    <div className="top">
                      <h4 className="alert-heading">Hello Sobat Infinite Learning!</h4>
                      <p>Setelah melakukan pendaftaran, Kaamu akan menerima informasi lanjutan melalui halaman ini atau melalui pesan WhatsApp. Penting bagi Anda untuk secara rutin memeriksa halaman ini guna mendapatkan pembaruan informasi terbaru.</p>
                    </div>

                    <hr />

                    <div className="bottom">
                      <p className="mb-0"><span>{permohonan ? permohonan.status.toUpperCase() : console.log('Tidak ada status!') }!</span> Informasi mengenai status pendaftaran kerja praktik Anda akan ditampilkan di sini!</p>
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

export default Notifikasi