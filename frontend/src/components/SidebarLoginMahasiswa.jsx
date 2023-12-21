import LinkSidebar from './LinkSidebar'
import Logo from '../assets/img/intern.png'
import { faGrip as GambarDashboard } from '@fortawesome/free-solid-svg-icons'
import { faUserGraduate as GambarMahasiswa } from '@fortawesome/free-solid-svg-icons'

const SidebarLoginMahasiswa = () => {
  return (
    <>
        <nav>
            <div className="nav-top">
                <img src={Logo} alt="Intern" />
            </div>

            <div className="nav-bottom">
                <LinkSidebar className='login' href='/' icon={GambarDashboard} h1='Login' />
                <LinkSidebar className='register' href='/RegisterMahasiswa' icon={GambarMahasiswa} h1='Register' />
            </div>
        </nav>
    </>
  )
}

export default SidebarLoginMahasiswa