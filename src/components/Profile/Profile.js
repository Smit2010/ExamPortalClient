import React from 'react'

function Profile({name,photo,student_id,email}) {
    
    window.onscroll = () => {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.getElementById("profile-image").style.height = "100px";
            document.getElementById("profile-image").style.width = "100px";
            document.getElementById("profile-image").style.transition = "all 0.4s ease-in-out";
        } else {
            document.getElementById("profile-image").style.height = "200px";
            document.getElementById("profile-image").style.width = "200px";
            document.getElementById("profile-image").style.transition = "all 0.4s ease-in-out";
        }
    }

    return (
        <div className="container" style={{width:"100%"}}>
            <div id="profile" className="box is-flex" style={{justifyContent:"center",transition: "all 0.4s ease-in-out", width: "100%",left:0, top:0, position:"fixed", zIndex:"100"}}>
                <figure id="profile-image" className="image" style={{height:"200px", width:"200px"}}>
                    <img className="is-rounded" src={photo} alt=""/>
                </figure>
            </div>
            
            <div className = "container" style={{marginTop: "300px"}}>
                <div style={{textAlign:"center", fontWeight:"bold", fontSize:"40px", marginTop:"20px"}}>
                    PERSONAL DETAILS
                </div>
                <div className="table-container" style={{display:"flex", justifyContent:"center", marginTop:"50px"}}>
                    <table className="table is-striped is-hoverable" style={{width:"80%"}}>
                        <tbody>
                            <tr>
                                <th style={{textAlign:"center", fontSize:"20px"}}>Name</th>
                                <td style={{textAlign:"center", fontSize:"20px"}}>{name}</td>
                            </tr>
                            <tr>
                                <th style={{textAlign:"center", fontSize:"20px"}}>Student ID</th>
                                <td style={{textAlign:"center", fontSize:"20px"}}>{student_id}</td>
                            </tr>
                            <tr>
                                <th style={{textAlign:"center", fontSize:"20px"}}>Email ID</th>
                                <td style={{textAlign:"center", fontSize:"20px"}}>{email}</td>
                            </tr>
                            <tr>
                                <th style={{textAlign:"center", fontSize:"20px"}}>Email ID</th>
                                <td style={{textAlign:"center", fontSize:"20px"}}>{email}</td>
                            </tr>
                            <tr>
                                <th style={{textAlign:"center", fontSize:"20px"}}>Email ID</th>
                                <td style={{textAlign:"center", fontSize:"20px"}}>{email}</td>
                            </tr>
                            <tr>
                                <th style={{textAlign:"center", fontSize:"20px"}}>Email ID</th>
                                <td style={{textAlign:"center", fontSize:"20px"}}>{email}</td>
                            </tr>
                            <tr>
                                <th style={{textAlign:"center", fontSize:"20px"}}>Email ID</th>
                                <td style={{textAlign:"center", fontSize:"20px"}}>{email}</td>
                            </tr>
                            <tr>
                                <th style={{textAlign:"center", fontSize:"20px"}}>Email ID</th>
                                <td style={{textAlign:"center", fontSize:"20px"}}>{email}</td>
                            </tr>
                            <tr>
                                <th style={{textAlign:"center", fontSize:"20px"}}>Email ID</th>
                                <td style={{textAlign:"center", fontSize:"20px"}}>{email}</td>
                            </tr>
                            <tr>
                                <th style={{textAlign:"center", fontSize:"20px"}}>Email ID</th>
                                <td style={{textAlign:"center", fontSize:"20px"}}>{email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className = "container" style={{marginTop: "100px", marginBottom: "20px"}}>
                <div style={{textAlign:"center", fontWeight:"bold", fontSize:"40px", marginTop:"20px"}}>
                    PAST EXAMS PERFORMANCE
                </div>
                <div className="table-container" style={{display:"flex", justifyContent:"center", marginTop:"50px"}}>
                    <table className="table is-striped is-hoverable" style={{width:"80%"}}>
                        <thead>
                            <tr>
                                <th style={{textAlign:"center", fontSize:"22px"}}>DATE</th>
                                <th style={{textAlign:"center", fontSize:"22px"}}>SUBJECT</th>
                                <th style={{textAlign:"center", fontSize:"22px"}}>MARKS</th>
                                <th style={{textAlign:"center", fontSize:"22px"}}>AVERAGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{textAlign:"center", fontSize:"20px"}}>12-12-12</td>
                                <td style={{textAlign:"center", fontSize:"20px"}}>Maths</td>
                                <td style={{textAlign:"center", fontSize:"20px"}}>100</td>
                                <td style={{textAlign:"center", fontSize:"20px"}}>100</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:"center", fontSize:"20px"}}>12-12-12</td>
                                <td style={{textAlign:"center", fontSize:"20px"}}>Maths</td>
                                <td style={{textAlign:"center", fontSize:"20px"}}>100</td>
                                <td style={{textAlign:"center", fontSize:"20px"}}>100</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:"center", fontSize:"20px"}}>12-12-12</td>
                                <td style={{textAlign:"center", fontSize:"20px"}}>Maths</td>
                                <td style={{textAlign:"center", fontSize:"20px"}}>100</td>
                                <td style={{textAlign:"center", fontSize:"20px"}}>100</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Profile
