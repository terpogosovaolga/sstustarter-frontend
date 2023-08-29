import React from 'react';
import HeaderMainPage from "../components/HeaderMainPage";
import Categories from '../components/homepage/Categories';
import Footer from '../components/Footer';
import '../assets/style/index.css';
import Populars from '../components/homepage/Populars/index.jsx';
import serverURL from '../serveraddress';
import axios from 'axios';


function Home() {
   
    const [isLoading, setIsLoading] = React.useState(true);
    const [categories, setCategories] = React.useState([]);


    React.useEffect(() => {
        setIsLoading(true);
        axios
            .get(serverURL+"themes")
            .then(response => {
                setCategories(response.data.themes);
                console.log(response.data);
            });
    }, []); // пустой массив рендерит один раз; если внутри переменная, значит следит за ее изменениями


    

    return (
        <>
            <HeaderMainPage/>
            <main>
            <div className="container">
                { isLoading && <Categories categories={categories}/>} 
                <Populars/> 
            </div>
            </main>
            <Footer />
        </>
    );
}

export default Home;