import './Home.css';
import miFoto from "../assets/images/miFoto.jpg";
import MainBanner from "../common/MainBanner.tsx";

function Home() {
    return (
        <>
           <MainBanner />
           <div>
               <section className="about-me">
                   <h2>Sobre mí</h2>
                   <img src={miFoto} alt="Mi Foto" className="about-me-image" />
                   <p>Nombre: Victor Collazos</p>
                   <p>Edad: 19 años</p>
                   <p>Carrera: Diseño y Desarrollo de Simuladores y Videojuegos</p>
               </section>
           </div>
        </>
    );
}

export default Home;