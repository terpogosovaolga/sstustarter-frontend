import Header from "../components/Header";
import Footer from "../components/Footer";
function PageNotFound() {
    return (
        <>
        <Header />
        <main style={{display: "flex", height: "300px", alignItems: "center", justifyContent: "center"}}>
            <div className="container">
                <h1>Страница не найдена</h1>
            </div>
        </main>
        <Footer />
        </>
    );
}

export default PageNotFound;