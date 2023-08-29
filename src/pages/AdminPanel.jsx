import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UsersBlock from "../components/AdminPanelBlocks/UsersBlock";
import AdminMenu from "../components/AdminPanelBlocks/AdminMenu";
import SettingsBlock from '../components/AdminPanelBlocks/SettingsBlock';
import StatisticsBlock from '../components/AdminPanelBlocks/StatisticsBlock'
import "../assets/style/admin.css";
import "../assets/style/user.css";
import "../assets/style/general.css";
function AdminPanel() {

    const [section, setSection] = useState("settings");

    return (
        <>
        < Header />
        <main>
            <div className="container">
                <section className="adminpanel">
                    <AdminMenu sec={section} setSec={setSection}/>

                    {
                        section === "users" && 
                        <UsersBlock />
                    }

                    {
                        section == "settings" &&
                        <SettingsBlock />
                    }
                    {
                        section == "statistics" &&
                        <StatisticsBlock />
                    }
                </section>
            </div>
        </main>
        <Footer />
        </>
    );
}

export default AdminPanel;