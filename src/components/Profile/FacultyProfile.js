import React, {useEffect} from 'react';

const check = () => {
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
        document.getElementById("profile-image").style.height = "100px";
        document.getElementById("profile-image").style.width = "100px";
        document.getElementById("profile-image").style.transition = "all 0.4s ease-in-out";
    } else {
        document.getElementById("profile-image").style.height = "200px";
        document.getElementById("profile-image").style.width = "200px";
        document.getElementById("profile-image").style.transition = "all 0.4s ease-in-out";
    }
}

const FacultyProfile = ({name,photo,student_id,email,results}) => {
    
    useEffect(() => {
        window.addEventListener('scroll' , check)
        return () => {
            window.removeEventListener('scroll', check)
        }
    }, [])

    return (
        <div className="column" style={{display: "flex", justifyContent: "center", alignItems: "stretch", flexDirection: "column"}}>
            <div id="profile" className="box is-flex" style={{justifyContent:"center",transition: "all 0.4s ease-in-out", alignItems: "center", 
             width: "100%", top:"7vh", position:"sticky", zIndex:"100", marginTop: "7vh"}}>
                <figure id="profile-image" className="image" style={{height:"200px", width:"200px"}}>
                    <img className="is-rounded" src={photo} alt="Profile Pic"/>
                </figure>
            </div>
            <div className = "box"  style={{marginTop: "0px"}}>
            <div className = "container">
                <div className="table-container" style={{display:"flex", justifyContent:"center", marginTop:"50px"}}>
                    <table className="table is-striped" style={{width:"50%"}}>
                        <tbody>
                            <tr>
                                <th style={{textAlign:"start", fontSize:"20px"}}>Name</th>
                                <td style={{textAlign:"end", fontSize:"20px"}}>{name}</td>
                            </tr>
                            <tr>
                                <th style={{textAlign:"start", fontSize:"20px"}}>Email ID</th>
                                <td style={{textAlign:"end", fontSize:"20px"}}>{email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className = "container" style={{marginTop: "100px", marginBottom: "20px"}}>
                <div style={{textAlign:"center", fontWeight:"bold", fontSize:"40px", marginTop:"20px"}}>
                    PAST EXAMS CONDUCTED
                </div>
                <div className="table-container" style={{display:"flex", justifyContent:"center", marginTop:"50px"}}>
                    <table className="table is-striped is-hoverable" style={{width:"80%", cursor: "pointer"}}>
                        <thead>
                            <tr>
                                <th style={{textAlign:"center", fontSize:"22px"}}>DATE</th>
                                <th style={{textAlign:"center", fontSize:"22px"}}>COURSE</th>
                                <th style={{textAlign:"center", fontSize:"22px"}}>TOTAL MARKS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results ? results.map((data) => (
                                <tr>
                                    <td style={{textAlign:"center", fontSize:"20px"}}>{data.scheduledDate}</td>
                                    <td style={{textAlign:"center", fontSize:"20px"}}>{data.courseName}</td>
                                    <td style={{textAlign:"center", fontSize:"20px"}}>{data.result.totalMarks}</td>
                                </tr>
                            )): ""}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    )
}

export default FacultyProfile;
