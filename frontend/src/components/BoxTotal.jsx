import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BoxTotal = ({title, number, thumbnail}) => {
  return (
    <>
        <div className="total">
            <div className="top-total">
                <div className="thumbnail">
                    <FontAwesomeIcon icon={thumbnail} size="2xl" style={{color: "#333333",}} />
                </div>

                <div className="description">
                    <h3>{title}</h3>
                    <p>{number}</p>
                </div>
            </div>

            <div className="bottom-total">
                <progress id="file" value={number} max="100"></progress>
            </div>
        </div>
    </>
  )
}

export default BoxTotal