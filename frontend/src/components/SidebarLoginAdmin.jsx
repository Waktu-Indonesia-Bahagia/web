import LinkSidebar from './LinkSidebar'
import Logo from '../assets/img/intern.png'
import { faGrip as GambarDashboard } from '@fortawesome/free-solid-svg-icons'
import { faUserGraduate as GambarMahasiswa } from '@fortawesome/free-solid-svg-icons'

const SidebarLoginAdmin = () => {
  return (
    <>
        <nav>
            <div className="nav-top">
                <img src={Logo} alt="Intern" />
            </div>

            <div className="nav-bottom">
                <LinkSidebar className='login' href='/LoginAdmin' icon={GambarDashboard} h1='Login' />
                <LinkSidebar className='register' href='/RegisterAdmin' icon={GambarMahasiswa} h1='Register' />
            </div>
        </nav>
    </>
  )
}

export default SidebarLoginAdmin