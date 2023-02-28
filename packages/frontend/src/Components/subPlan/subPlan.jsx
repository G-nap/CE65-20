import React from "react";
import "./subPlan.css";
import Bizbtn from "../bizbtn/bizbtn";
import { BsFillCheckSquareFill } from "react-icons/bs";

function subPlan() {
  return (
    <div>
      <div className="sub">
        <div className="sub-card">

          <div className="d-flex ">
            <div className="sub-card-logo"> </div>
            <div className="sub-card-txt-h1">Plan</div>
          </div>
          <div className="sub-card-txt-price">$ 0</div>
          <div className="d-flex mb-2">
            <div className="d-flex flex-column sub-card-icon">
              <div className="mb-1"><BsFillCheckSquareFill /></div>
              <div className="mb-1"><BsFillCheckSquareFill /></div>
              <div className="mb-1"><BsFillCheckSquareFill /></div>
              <div className="mb-1"><BsFillCheckSquareFill /></div>
         
            </div>
            <div>
              <div className="sub-card-txt-p mb-1">Investment Project</div>
              <div className="sub-card-txt-p mb-1">Unlimited Project</div>
              <div className="sub-card-txt-p mb-1">Financial Feasibility Canvas</div>
              <div className="sub-card-txt-p mb-1">Compare Project</div>
              </div>
          </div>

          <Bizbtn name="Start trial" />
        </div>
      </div>
    </div>
  );
}

export default subPlan;
