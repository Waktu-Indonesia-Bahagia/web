import LinkSidebar from './LinkSidebar'
import Logo from '../assets/img/intern.png'
import { faGrip as GambarDashboard } from '@fortawesome/free-solid-svg-icons'
import { faUserGraduate as GambarMahasiswa } from '@fortawesome/free-solid-svg-icons'
import { faFileInvoice as GambarPermohonan } from '@fortawesome/free-solid-svg-icons'
import { faUsers as GambarPembimbing } from '@fortawesome/free-solid-svg-icons'
import { faCertificate as GambarSertifikat } from '@fortawesome/free-solid-svg-icons'
import { faGear as GambarPengaturan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SidebarAdmin = ({idUser}) => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true

    const handleLogout = () => {
        axios.get('http://localhost:3000/logout')
        .then(res => {
            if (res.data.Status) {
                navigate('/LoginAdmin')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <nav>
                <div className="nav-top">
                    <img src={Logo} alt="Intern" />
                </div>

                <div className="nav-bottom">
                    <LinkSidebar className='dashboard' href={`/Dashboard/${idUser}`} icon={GambarDashboard} h1='Dashboard' />
                    <LinkSidebar className='mahasiswa' href={`/Mahasiswa/${idUser}`} icon={GambarMahasiswa} h1='Mahasiswa' />
                    <LinkSidebar className='permohonan' href={`/Permohonan/${idUser}`} icon={GambarPermohonan} h1='Permohonan' />
                    <LinkSidebar className='pembimbing' href={`/Pembimbing/${idUser}`} icon={GambarPembimbing} h1='Pembimbing' />
                    <LinkSidebar className='sertifikat' href={`/Sertifikat/${idUser}`} icon={GambarSertifikat} h1='Sertifikat' />
                    <LinkSidebar className='pengaturan' href={`/ProfileAdmin/${idUser}`} icon={GambarPengaturan} h1='Pengaturan' />


                    <div className="link-keluar">
                        <div className="line"></div>

                        <Link className='keluar' onClick={handleLogout}>
                            <div className="center">
                                <h1>Keluar</h1>
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default SidebarAdmin