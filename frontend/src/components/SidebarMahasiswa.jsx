import LinkSidebar from './LinkSidebar'
import Logo from '../assets/img/intern.png'
import { faHouse as GambarBeranda } from '@fortawesome/free-solid-svg-icons'
import { faIdCard as GambarPendaftaran } from '@fortawesome/free-solid-svg-icons'
import { faBell as GambarNotif } from '@fortawesome/free-solid-svg-icons'
import { faGear as GambarPengaturan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SidebarMahasiswa = ({idUser}) => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true

    const handleLogout = () => {
        axios.get('http://localhost:3000/logout')
        .then(res => {
            if (res.data.Status) {
                navigate('/')
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
                    <LinkSidebar className='beranda' href={`/BerandaMahasiswa/${idUser}`} icon={GambarBeranda} h1='Beranda' />
                    <LinkSidebar className='pendaftarankerjapraktik' href={`/PendaftaranKerjaPraktik/${idUser}`} icon={GambarPendaftaran} h1='Pendaftaran' />
                    <LinkSidebar className='notif' href={`/Notifikasi/${idUser}`} icon={GambarNotif} h1='Notifikasi' />
                    <LinkSidebar className='pengaturan' href={`/ProfileMahasiswa/${idUser}`} icon={GambarPengaturan} h1='Pengaturan' />

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

export default SidebarMahasiswa