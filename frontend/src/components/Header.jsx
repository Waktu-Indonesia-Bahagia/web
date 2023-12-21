import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser as Profile } from '@fortawesome/free-solid-svg-icons'

const Header = ({role, user}) => {
  return (
    <header>
      <div className="box-shadow">
        <div className="header-left">
          <h1>Infinite Learning</h1>
        </div>

        <div className="header-right">
          <div className="left">
            <FontAwesomeIcon icon={Profile} size="2xl" style={{color: "#333333",}} />
          </div>

          <div className="right">
            <p>{role}</p>
            <p>{user}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header