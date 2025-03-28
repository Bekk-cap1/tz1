import { useNavigate } from 'react-router-dom';
import './Home.scss'

function Home(){
    const navigate = useNavigate()
    return(
        <div className="Home">
            <div className="container">
                <div className="container__inner">
                    <h1>Хочешь поделиться идеями с предпринимателями?</h1>
                    <button onClick={()=>navigate('/enterpriners')}>Да</button>
                </div>
            </div>
        </div>
    )
}

export default Home;