import React from "react";
import "./subscriptionUserBanner.css";
import { SiMastercard } from "react-icons/si";

function subscriptionUserBanner() {
  return (
    <div className="subscript-banner">
      <div className="t-box">
        <div className="sub-banner-text-p mb-1">Your Subscription Plan</div>
        <div className="sub-banner-text-h2">Free trial</div>
      </div>
      <div className="t-box2">
        <div>
          <div className="sub-banner-text-h3 mb-3">Payment</div>
          <div className="master-card-text">
            <div>
              <div>
                <SiMastercard /> 
                &nbsp;Mastercard ending in 7317
              </div>
              <div>Expires: 03/2026</div>
            </div>
          </div>
          <div className="mb-2">Next Billing is on 10 Oct 2022</div>
          <a href="">
            <div>Update</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default subscriptionUserBanner;
