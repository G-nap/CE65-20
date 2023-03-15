import React, { useState, useEffect, useRef } from "react";
import BizSidebar from "../../../components/bizTools/bizSidebar/bizSidebar";
import BiztoolHeader from "../../../components/investmentProject/biztoolHeader/biztoolHeader";
import BiztoolBody from "../../../components/investmentProject/biztoolBody/biztoolBody";
import BIZTOOL_PAGE_CONFIG from "../pageConfig";
import BIZTOOL_PAGE_MOCKDATA from "../pageMockData";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByUsername } from "../../../features/usersSlice";
import {
  fetchProjectsByUserId,
  setSelectedProject,
  fetchProjectById,
} from "../../../features/projectsSlice";

function MiscellaneousPage() {
  const [newProjectPopupState, setNewProjectPopupState] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.users.auth);
  const user = useSelector((state) => state.users.user);
  const projects = useSelector((state) => state.projects.projects);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const [isLoaded, setIsLoaded] = useState({ user: false, projects: false });
  const isAlert = useRef(false);

  useEffect(() => {
    if (auth.username) {
      if (auth.token != "") {
        if (!isLoaded.user) {
          dispatch(
            fetchUserByUsername({ username: auth.username, token: auth.token })
          );
          setIsLoaded({ user: true, projects: false });
        }
      }

      // if(isLoaded) console.log(JSON.stringify(user));
      if (isLoaded.user) {
        if (isLoaded.projects) {
          // dispatch(fetchProjectsByUserId(user._id))
          dispatch(fetchProjectById(selectedProject));

          setIsLoaded({ user: true, project: true });
        }
        // else console.log(JSON.stringify(projects))
        console.log(JSON.stringify(selectedProject.revenue.service_tables));
        // console.log(JSON.stringify(selectedProject.expense.investment_tables));
      }
    } else navigate("/login");
  }, [auth.token, user, newProjectPopupState]);

  // const [tableData, setTableData] = useState(BIZTOOL_PAGE_MOCKDATA.miscellaneous.data)
  const [tableData, setTableData] = useState({
    equity_contribution_tables: [
      {
        equity_contributions: selectedProject.miscellaneous.equity_contribution,
      },
    ],
    equity_repayment_tables: [
      {
        equity_repayments: selectedProject.miscellaneous.equity_repayment,
      },
    ],
    debt_issuance_tables: [
      {
        debt_issuances: selectedProject.miscellaneous.debt_issuance,
      },
    ],
  });
  const [config, setConfig] = useState(BIZTOOL_PAGE_CONFIG.miscellaneous);

  return (
    <div className="d-flex ">
      <BizSidebar />
      <div className="p-4 biztool-body-width">
        <BiztoolHeader type={config.type} title={config.title} />
        <BiztoolBody
          type={config.type}
          tableStyle={config.tableStyle}
          tableData={tableData}
          onChangeHandle={config.onChangeHandle}
        />
      </div>
    </div>
  );
}

export default MiscellaneousPage;
