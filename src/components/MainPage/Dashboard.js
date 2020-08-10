import React, { useState } from 'react'
import '../../Style/Dashboard.css'
import Header from './Header';
import MainContainer from './MainContainer';
import Sidebar from './Sidebar';

function Dashboard() {
    const [vis,setVis] = useState(1);
    return (
        <div className="dashboard">
            <Header show={setVis} curr_vis={vis} />
            <div className="dashboard__page">
                <Sidebar add_class={vis ? "sidebar" : "sidebar__remove"} />
                <MainContainer />
            </div>
        </div>
    )
}
export default Dashboard
