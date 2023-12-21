// Library
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Login & Register
import LoginAdmin from './pages/LoginAdmin'
import LoginMahasiswa from './pages/LoginMahasiswa'
import RegisterAdmin from './pages/RegisterAdmin'
import RegisterMahasiswa from './pages/RegisterMahasiswa'
// Admin
import Dashboard from "./pages/Dashboard"
import Mahasiswa from './pages/Mahasiswa'
import TambahMahasiswa from './pages/TambahMahasiswa'
import EditMahasiswa from './pages/EditMahasiswa'
import Permohonan from './pages/Permohonan'
import EditStatusPermohonan from './pages/EditStatusPermohonan'
import DetailPermohonan from './pages/DetailPermohonan'
import Pembimbing from './pages/Pembimbing'
import TambahPembimbing from './pages/TambahPembimbing'
import EditPembimbing from './pages/EditPembimbing'
import Sertifikat from './pages/Sertifikat'
import TambahSertifikat from './pages/TambahSertifikat'
import EditSertifikat from './pages/EditSertifikat'
import ProfileAdmin from './pages/ProfileAdmin'
import UbahProfileAdmin from './pages/UbahProfileAdmin'
// Mahasiswa
import BerandaMahasiswa from './pages/BerandaMahasiswa'
import PendaftaranKerjaPraktik from './pages/PendaftaranKerjaPraktik'
import Notifikasi from './pages/Notifikasi'
import ProfileMahasiswa from './pages/ProfileMahasiswa'
import UbahProfileMahasiswa from './pages/UbahProfileMahasiswa'
// CSS
import './assets/css/Reset.css'
import './assets/css/App.css'
import './assets/css/Form.css'
import './assets/css/Responsive.css'

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            {/* Login & Register */}
            <Route path='/LoginAdmin' element={<LoginAdmin/>}/>
            <Route path='/' element={<LoginMahasiswa/>}/>
            <Route path='/RegisterMahasiswa' element={<RegisterMahasiswa/>}/>
            <Route path='/RegisterAdmin' element={<RegisterAdmin/>}/>

            {/* Admin */}
            <Route path='/Dashboard/:id' element={<Dashboard/>}/>
            <Route path='/Mahasiswa/:id' element={<Mahasiswa/>}/>
            <Route path='/tambahmahasiswa/:id' element={<TambahMahasiswa/>}/>
            <Route path='/editmahasiswa/:id' element={<EditMahasiswa/>}/>
            <Route path='/Permohonan/:id' element={<Permohonan/>}/>
            <Route path='/EditStatusPermohonan/:id' element={<EditStatusPermohonan/>}/>
            <Route path='/DetailPermohonan/:id' element={<DetailPermohonan/>}/>
            <Route path='/Pembimbing/:id' element={<Pembimbing/>}/>
            <Route path='/tambahpembimbing/:id' element={<TambahPembimbing/>}/>
            <Route path='/editpembimbing/:id' element={<EditPembimbing/>}/>
            <Route path='/Sertifikat/:id' element={<Sertifikat/>}/>
            <Route path='/tambahsertifikat/:id' element={<TambahSertifikat/>}/>
            <Route path='/editsertifikat/:id' element={<EditSertifikat/>}/>
            <Route path='/ProfileAdmin/:id' element={<ProfileAdmin/>}/>
            <Route path='/UbahProfileAdmin/:id' element={<UbahProfileAdmin/>}/>

            {/* Mahasiswa */}
            <Route path='/BerandaMahasiswa/:id' element={<BerandaMahasiswa/>}/>
            <Route path='/PendaftaranKerjaPraktik/:id' element={<PendaftaranKerjaPraktik/>}/>
            <Route path='/Notifikasi/:id' element={<Notifikasi/>}/>
            <Route path='/ProfileMahasiswa/:id' element={<ProfileMahasiswa/>}/>
            <Route path='/UbahProfileMahasiswa/:id' element={<UbahProfileMahasiswa/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
