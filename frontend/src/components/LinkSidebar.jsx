import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LinkSidebar = ({className, href, icon, h1}) => {
  return (
    <>
        <a className={className} href={href}>
            <div className="left">
                <div className="box">
                    <FontAwesomeIcon icon={icon} size="xl" style={{color: "#fff",}} />
                </div>
            </div>

            <div className="right">
                <h1>{h1}</h1>
            </div>
        </a>
    </>
  )
}

export default LinkSidebar