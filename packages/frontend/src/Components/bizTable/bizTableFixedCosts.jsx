/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { bizTableInvestmentData } from "./bizTableInvestmentData";
import "./bizTableInvestment.css";
import { AiFillDownCircle, AiFillUpCircle } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";

function bizTableFixedCosts() {
  const [fixedCostsData, setfixedCostsData] = useState([]);
  const [fixedCostsTable, setfixedCostsTable] = useState([]);
  const [projectID, setProjectID] = useState("63df4d4f1882820b1b4cecc3");
  const [investTableTitle, setInvestTableTitle] = useState("");

  const [toggle, setToggle] = React.useState(true);
  const [text, setText] = React.useState("");

  function toggleInput() {
    setToggle(false);
  }

  function handleChange(event) {
    setText(event.target.value);
  }

  useEffect(() => {
    axios
      //Path auth first?
      .get(`http://localhost:5000/project/post/${projectID}/`)
      .then((res) => {
        // for (let i = 0; i < investData.length; i++) {
        setfixedCostsData(res.data.expense.fixed_cost_tables[0].investments);
        // setInvestData((investData) => [
        //   ...investData,
        //   res.data.expense.investment_tables[0].investments,
        // ]);
        // }
        // setInvestData(res.data.expense.investment_tables);
        // setInvestDataTable(res.data.expense.investment_tables);
        setProjectID(res.data._id);
        setInvestTableTitle(res.data.expense.fixed_cost_tables[0].name);
        // setInvestTableTitle(investTableTitle => [res.data.expense.investment_tables[i].name]);
        console.log(res.data.expense.fixed_cost_tables.length);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    // for (let i = 0; i < investData.length; i++) {
    //   console.log(investData.expense);
    // }
    // setInvestDataTable(investData);
  }, []);
  return (
    <div class="bt">
      <table class="table container tb-con tb-color">
        <h1>{fixedCostsData.name}</h1>
        {console.log("investData", fixedCostsData)}
        {/* {console.log("investDataTable" , investDataTable[0].investments[0].name)} */}
        <thead>
          <tr className="tb-head-color-red">
            <th scope="col">
              <AiFillUpCircle />
              &nbsp;{investTableTitle}
            </th>
            <th scope="col" className="t-num">
              จำนวน(บาท)(THB)
            </th>
            <th scope="col" className="t-num">
              ประเภทสินทรัพย์
            </th>
            <th scope="col" className="t-num">
              วันที่ลงทุน
            </th>
          </tr>
        </thead>
        <tbody className="tb-color">
          {/* {investData.investment.map((i) => {
            return (
              <div> */}
          {fixedCostsData.map((d) => {
            return (
              <tr key={d._id}>
                <th className="table-secondary tb-text-normal t-text">
                  {toggle ? (
                    <p onDoubleClick={toggleInput}>{d.name}</p>
                  ) : (
                    <input type="text" value={d.name} onChange={handleChange} />
                  )}
                </th>
                <td className="table-secondary tb-text-normal t-num">
                  {/* {d.amount} */}
                  {toggle ? (
                    <p onDoubleClick={toggleInput}>{d.amount}</p>
                  ) : (
                    <input type="text" value={d.amount} onChange={handleChange} />
                  )}
                </td>
                <td className="table-secondary tb-text-normal t-num">
                  {/* {d.account_id} */}
                  {toggle ? (
                    <p onDoubleClick={toggleInput}>{d.account_id}</p>
                  ) : (
                    <input type="text" value={d.account_id} onChange={handleChange} />
                  )}
                </td>
                <td className="table-secondary tb-text-normal t-num">
                  {/* {d.start_date} */}
                  {toggle ? (
                    <p onDoubleClick={toggleInput}>{d.start_date}</p>
                  ) : (
                    <input type="text" value={d.start_date} onChange={handleChange} />
                  )}
                </td>
              </tr>
            );
          })}
          {/* </div>
            );
          })} */}
          {/* <th>
            {toggle ? (
              <p onDoubleClick={toggleInput}>{text}</p>
            ) : (
              <input type="text" value={text} onChange={handleChange} />
            )}
          </th> */}
          <th>+&nbsp;เพิ่มรายการการลงทุนใน&nbsp;{investTableTitle}</th>
        </tbody>
      </table>
    </div>
  );
}

export default bizTableFixedCosts;
