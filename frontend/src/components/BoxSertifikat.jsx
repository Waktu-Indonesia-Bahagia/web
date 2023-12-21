import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock as Clock } from '@fortawesome/free-solid-svg-icons'
import { faInfinity as Infinite } from '@fortawesome/free-solid-svg-icons'

const BoxSertifikat = ({key, thumbnail, nama, keahlian, tanggal, id}) => {
    const hapusSertifikat = (id) => {
        axios.delete('http://localhost:3000/hapussertifikat/'+id)
        .then(res => {
            location.reload();
        })
        .catch(err => console.log(err));
    }

    return (
        <>
            <div key={key} className="card-sertifikat">
                <div className="top">
                    <img src={`http://localhost:3000/images/` + thumbnail} alt="Thumbnail" />
                </div>

                <div className="bottom">
                    <div className="name">
                        <p>{nama}</p>
                    </div>

                    <div className="title-course">
                        <p>{keahlian}</p>
                    </div>

                    <div className="description">
                        <div className="desc-left">
                            <FontAwesomeIcon icon={Infinite} size="xs" style={{color: "#333333",}} />
                            <p>Infinite Learning</p>
                        </div>
                        
                        <div className="desc-right">
                            <FontAwesomeIcon icon={Clock} size="xs" style={{color: "#333333",}} />
                            <p>{tanggal}</p>
                        </div>
                    </div>

                    <div className="action">
                        <Link to={`/editsertifikat/${id}`} className='update'>Edit</Link>
                        <Link onClick={ () => hapusSertifikat(id)} className='delete'>Hapus</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BoxSertifikat