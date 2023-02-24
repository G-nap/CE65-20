import axios from "axios";
import React, { useState, useEffect } from "react";
import BizSidebar from "../../../Components/bizSidebar/bizSidebar";
import BizHeader from "../../../Components/bizHeader/bizHeader";
import InfoProject from "../../../Components/infoProject/infoProject";

import AUTH from "../../../Assets/Mock/mockAuth";

function ProjectConfigPage() {
  const [auth, setAuth] = useState(AUTH);
  const [project, setProject] = useState({});
  const [projectID, setParojectID] = useState("63df4d4f1882820b1b4cecc3");

  useEffect(() => {
    axios
      //Path auth first?
      .get(`http://localhost:5000/project/post/${projectID}/`)
      .then((res) => {
        setProject(res.data);
        setParojectID(res.data._id);
        // console.log(res.data.description);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <BizSidebar />
      <div className="pj-config">
        <BizHeader title="Project Configuration" infoPath="/" btnName="Save" />
        {/* <InfoProject/> */}
        
        <InfoProject name={project.name} 
        description={project.description}
        created_date={project.created_date}
        // projection_period={project.model_config.projection_period}
        // working_hours={project.model_config.working_hours}
        // income_tax_rate={project.model_config.income_tax_rate}
        // discounting_rate={project.model_config.discounting_rate}
        />

        
      </div>
    </div>
  );
}

export default ProjectConfigPage;
