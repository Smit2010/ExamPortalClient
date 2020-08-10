import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import './styles.css'

const SideBar = ({list}) => {
    //const isAuthenticated = this.props.isAuthenticated;
    return (
        <div className="card" style={{height: "93vh"}}>
            <div className="column" style={{padding: 0}}>
                {list.map((item) => (
                    <div className="listButton columns is-vcentered" style={{ height: 60, margin:0, padding: "5% 0"}} >
                        <div className="column is-narrow" style={{height: "100%", alignItems: "center", justifyContent: "center", display: "flex", padding: "5% 0", marginLeft: 20}}>
                            <div>
                                <span className="icon">
                                    <i className="fas fa-bars fa-lg"/>
                                </span>
                            </div>
                        </div>
                        <div className="column is-8" style={{ height: "100%", padding: 0, alignItems: "center", justifyContent: "center", display: "flex" }}>
                            <span>
                                    <p style={{color: "black"}}>{"Create"}</p>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
    
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(
	connect(mapStateToProps)(SideBar)
);