import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const BoxService = ({logo, title, btnIcon, href}) => {
  return (
    <>
        <div className="box-service">
            <div className="top">
                <div className="left">
                    <FontAwesomeIcon icon={logo} size="lg" style={{color: "#333333",}} />
                </div>

                <div className="right">
                    <p>{title}</p>
                    <p>Magang</p>
                </div>
            </div>

            <div className="bottom">
                <Link to={href} href="/PendaftaranKerjaPraktik">
                    <FontAwesomeIcon icon={btnIcon} size="sm" style={{color: "#fff",}} />
                    Daftar
                </Link>
            </div>
        </div>
    </>
  )
}

export default BoxService