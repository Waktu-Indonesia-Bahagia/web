import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Header from "../components/Header"
import SidebarMahasiswa from "../components/SidebarMahasiswa"
import BoxFeature from "../components/BoxFeature"
import '../assets/css/BerandaMahasiswa.css'
import ImgOne from '../assets/img/hero_image_one.png'
import ImgTwo from '../assets/img/hero_image_two.png'
import ImgThree from '../assets/img/hero_image_three.png'
import ImgFour from '../assets/img/hero_image_four.png'
import ImgFeatureDukungan from '../assets/img/dukungan.png'
import ImgFeaturePenjualan from '../assets/img/penjualan.png'
import ImgFeaturePendaftaran from '../assets/img/pendaftaran.png'
import ImgFeatureProduk from '../assets/img/produk.png'
import ImgFeatureKualitas from '../assets/img/kualitas.png'
import ImgFeatureHasil from '../assets/img/hasil.png'
import { faInfinity as Infinity } from '@fortawesome/free-solid-svg-icons'
import { faAnglesRight as BtnRegister } from '@fortawesome/free-solid-svg-icons'
import BoxService from "../components/BoxService"
import WatsonChatbot from "../components/WatsonChatbot"

const BerandaMahasiswa = () => {
  const {id} = useParams()
  const [user, setUser] = useState({
    nama: '',
    email: '',
    alamat: '',
    no_telepon: ''
  })

  useEffect(() => {
    axios.get('http://localhost:3000/byiduser/'+id)
    .then(res => setUser(res.data[0]))
    .catch(err => console.log(err))
  }, [])

  return (
    <>
        <Header role='Mahasiswa' user={user.nama} />
        <SidebarMahasiswa idUser={id} />
        <main>
          <div className="box-shadow">
            <div className="box-top">
              <div className="alert-beranda">
                <div className="alert alert-warning fade show" role="alert">
                  <div className="text">
                    <p>Success!</p> 
                    <p>Selamat Datang {user.nama}</p>
                  </div>

                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              </div>

              <div className="jumbotron-beranda">
                  <div className="title">
                    <h1>Selamat Datang di Layanan Kerja Praktik</h1>
                  </div>
                  
                  <div className="hero-image">
                    <img src={ImgOne} alt="HeroOne" />
                    <img src={ImgTwo} alt="HeroTwo" />
                    <img src={ImgThree} alt="HeroThree" />
                    <img src={ImgFour} alt="HeroFour" />
                  </div>

                  <div className="description">
                    <div className="box">
                      <p>Kami adalah mitra pendidikan Anda, fokus memandu mahasiswa mencari dan menyelesaikan kerja praktik dengan sukses. Kami berkomitmen menyediakan sumber daya yang Anda butuhkan untuk meraih kesuksesan.</p>
                    </div>
                  </div>
              </div>

              <div className="feature-beranda">
                <BoxFeature source={ImgFeatureDukungan} text='Dukungan' description='Kami menyediakan dukungan 24/7 untuk membantu Anda.' />
                <BoxFeature source={ImgFeaturePenjualan} text='Penjualan' description='Bergabung  dan akses ke lowongan kerja praktik terbaik bersama.' />
                <BoxFeature source={ImgFeaturePendaftaran} text='Pendaftaran' description='Proses mudah - mulailah kerja praktik Anda hanya  beberapa klik.' />
                <BoxFeature source={ImgFeatureProduk} text='Produk' description='Aplikasi responsif dengan fitur lengkap dan manajemennya.' />
                <BoxFeature source={ImgFeatureKualitas} text='Kualitas' description='Lowongan kerja praktik kami melewati proses verifikasi ketat.' />
                <BoxFeature source={ImgFeatureHasil} text='Hasil' description='Prioritas kami adalah kesuksesan program kerja praktik Anda.' />
              </div>

              <div className="service">
                <div className="title">
                    <h3>Program Magang</h3>
                </div>

                <div className="boxs">
                  <BoxService logo={Infinity} title='Project Manager' btnIcon={BtnRegister} href={'/PendaftaranKerjaPraktik/'+id}/>
                  <BoxService logo={Infinity} title='Visual Designer' btnIcon={BtnRegister} href={'/PendaftaranKerjaPraktik/'+id}/>
                  <BoxService logo={Infinity} title='UI/UX Designer' btnIcon={BtnRegister} href={'/PendaftaranKerjaPraktik/'+id}/>
                  <BoxService logo={Infinity} title='Web Developer' btnIcon={BtnRegister} href={'/PendaftaranKerjaPraktik/'+id}/>
                  <BoxService logo={Infinity} title='Game Developer' btnIcon={BtnRegister} href={'/PendaftaranKerjaPraktik/'+id}/>
                  <BoxService logo={Infinity} title='Mobile Developer' btnIcon={BtnRegister} href={'/PendaftaranKerjaPraktik/'+id}/>
                  <BoxService logo={Infinity} title='Social Media Specialist' btnIcon={BtnRegister} href={'/PendaftaranKerjaPraktik/'+id}/>
                  <BoxService logo={Infinity} title='Public Relation' btnIcon={BtnRegister} href={'/PendaftaranKerjaPraktik/'+id}/>
                  <BoxService logo={Infinity} title='Event & Community' btnIcon={BtnRegister} href={'/PendaftaranKerjaPraktik/'+id}/>
                  <BoxService logo={Infinity} title='Marketing Communications' btnIcon={BtnRegister} href={'/PendaftaranKerjaPraktik/'+id}/>
                </div>
                </div>
            </div>

            <div className="">
              <WatsonChatbot/>
            </div>

            <div className="box-bottom">
              <p>&copy; 2023 Infinite Learning</p>
            </div>
          </div>
        </main>
    </>
  )
}

export default BerandaMahasiswa