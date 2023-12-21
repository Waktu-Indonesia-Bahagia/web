import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Header from "../components/Header"
import SidebarAdmin from "../components/SidebarAdmin"
import BoxTotal from "../components/BoxTotal"
import '../assets/css/Dashboard.css'
import { faGraduationCap as TotalMahasiswaKP } from '@fortawesome/free-solid-svg-icons'
import { faCheckDouble as TotalMahasiswaAktif } from '@fortawesome/free-solid-svg-icons'
import { faXmark as TotalMahasiswaNonAktif } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots as TotalPermohonan } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  const [ totalMahasiswa, setTotalMahasiswa ] = useState()
  const [ mahasiswaAktif, setMahasiswaAktif ] = useState()
  const [ mahasiswaTidakAktif, setMahasiswaTidakAktif ] = useState()
  const [ totalPermohonan, setTotalPermohonan ] = useState()

  useEffect(() => {
    countMahasiswa()
    countMahasiswaAktif()
    countMahasiswaTidakAktif()
    countPermohonan()
  }, [])

  const countMahasiswa = () => {
    axios.get('http://localhost:3000/totalmahasiswa') 
    .then(res => setTotalMahasiswa(res.data[0].total))
    .catch(err => console.log(err));
  }
  const countMahasiswaAktif = () => {
    axios.get('http://localhost:3000/aktif') 
    .then(res => setMahasiswaAktif(res.data[0].total))
    .catch(err => console.log(err));
  }
  const countMahasiswaTidakAktif = () => {
    axios.get('http://localhost:3000/nonaktif') 
    .then(res => setMahasiswaTidakAktif(res.data[0].total))
    .catch(err => console.log(err));
  }
  const countPermohonan = () => {
    axios.get('http://localhost:3000/totalpermohohanan') 
    .then(res => setTotalPermohonan(res.data[0].total))
    .catch(err => console.log(err));
  }

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

  return (
    <>
        <Header role='Admin' user={user.nama} />
        <SidebarAdmin idUser={id} />
        <main>
          <div className="box-shadow">
            <div className="box-top">
              <div className="top-dashboard">
                <div className="alert alert-warning fade show" role="alert">
                  <div className="text">
                    <p>Success!</p> 
                    <p>
                      Selamat Datang {user.nama}
                    </p>
                  </div>

                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              </div>

              <div className="middle-dashboard">
                <h1>Dashboard</h1>
                <p>Selamat Datang di Halaman Dashboard</p>
              </div>

              <div className="bottom-dashboard">
                <BoxTotal title='Total Mahasiswa Kerja Praktik' number={totalMahasiswa} thumbnail={TotalMahasiswaKP} />
                <BoxTotal title='Total Mahasiswa Aktif' number={mahasiswaAktif} thumbnail={TotalMahasiswaAktif} />
                <BoxTotal title='Total Mahasiswa Non Aktif' number={mahasiswaTidakAktif} thumbnail={TotalMahasiswaNonAktif} />
                <BoxTotal title='Total Permohonan' number={totalPermohonan} thumbnail={TotalPermohonan} />
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

export default Dashboard