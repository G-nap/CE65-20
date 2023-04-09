/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import "./infoProject.css";
import BizTextInfo from "../bizTextInfo/bizTextInfo";
import makeAnimated from 'react-select/animated';
import Select from 'react-select'

import BizLogo from "../bizLogo/bizLogo";
import "./infoProject.css";

import { projectUpdated, updateProject } from "../../../features/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { WEB_URL } from "../../../webConfig";
import axios from "axios";
import timeToShow from "../../common/timeToShow";
import BiztoolPopup from "../../common/biztoolPopup";
import BusinessGoalContent from "../../projects/businessGoal/businessGoalContent";
import CashflowContent from "../../projects/businessGoal/cashflowContent";
// import InitialPeriodMonths from "../../investmentProject/initialPeriodMonths";

function infoProject(props) {
  const animatedComponents = makeAnimated();
  const INDUSTRY_CREATE_URL = "http://localhost:5000/industry/post/"
  const CURRENCY_CREATE_URL = "http://localhost:5000/currency/post/"

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const industries = useSelector(state => state.industries.industries)
  const currencies = useSelector(state => state.currencies.currencies)
  const selectedProject = useSelector(state => state.projects.selectedProject)
  const [projectShallow, setProjectShallow] = useState()
  const [industryOptions, setIndustryOptions] = useState([])
  const [currencyOptions, setCurrencyOptions] = useState([])

  const [selectedCurrencyId, setSelectedCurrencyId] = useState(selectedProject.model_config.currency_id)
  const [selectedIndustryIds, setSelectedIndustryIds] = useState(selectedProject.industry_ids)

  const [selectedCurrency, setSelectedCurrency] = useState()
  const [selectedIndustries, setSelectedIndustries] = useState([])

  const [isLoaded, setIsLoaded] = useState(false)
  const [counter, setCounter] = useState(0)
  const [doSubmitCheck, setDoSubmitCheck] = useState(false)
  const round = selectedProject.industry_ids.length + 4

  const [file, setFile] = useState()
  const [imageUrl, setImageUrl] = useState("")
  const [imageName, setImageName] = useState("")
  const [projectionPeriod, setprojectionPeriod] = useState()
  const [saleTrends, setSaleTrends] = useState()
  const [selectedBusinessGoals, setselectedBusinessGoals] = useState()
  // const [fixedCostTables, setFixedCostTables] = useState()
  const [debtIssuanceRows, setDebtIssuanceRows] = useState()

  const getCurrencyById = async (id) => {
    let shallowSelectedCurrency = {}
    await axios.get(`${CURRENCY_CREATE_URL}${id}`)
      .then(res => {
        shallowSelectedCurrency = [{ value: res.data._id, label: res.data.name.local }]
        setSelectedCurrency(shallowSelectedCurrency)
      })
      .catch(err => false);
  }

  const getIndustryByIds = async () => {
    let shallowSelectedIndustry = selectedIndustries
    await selectedProject.industry_ids.forEach(id => {
      axios.get(`${INDUSTRY_CREATE_URL}${id}`)
        .then(res => {
          shallowSelectedIndustry.push({ value: res.data._id, label: res.data.name.th })
        })
        .catch(err => false);
    })
    setSelectedIndustries(shallowSelectedIndustry)
  }

  const resetValue = () => {
    setFile(null)
    setCounter(0)
    setImageName("")
    setImageUrl("")
    setDoSubmitCheck(false)
    setSelectedIndustryIds(selectedProject.industry_ids)
    setSelectedCurrencyId(selectedProject.model_config.currency_id)
    setSelectedCurrency()
    setSelectedIndustries([])
  }


  useEffect(() => {
    if (counter < round) {

      getCurrencyById(selectedProject.model_config.currency_id)
      getIndustryByIds(selectedProject.industry_ids)

      const shallowIndustryOptions = industries.map((each) => {
        return { value: each._id, label: each.name.th }
      })
      const shallowCurrencyOptions = currencies.map((each) => {
        return { value: each._id, label: each.name.local }
      })
      setCurrencyOptions(shallowCurrencyOptions)
      setIndustryOptions(shallowIndustryOptions)
      setprojectionPeriod(selectedProject.model_config.projection_period)
      setSaleTrends(selectedProject.sale_trends)
      setDebtIssuanceRows(JSON.parse(JSON.stringify(selectedProject.miscellaneous.debt_issuance)))
      setselectedBusinessGoals(JSON.parse(JSON.stringify(selectedProject.business_goals ? selectedProject.business_goals : [])))
      setCounter(counter + 1)
    }
    else if (doSubmitCheck) {
      // alert(JSON.stringify(selectedBusinessGoals));

      if (imageUrl !== "") {
        dispatch(updateProject({ id: selectedProject._id, data: { ...projectShallow, logo_url: imageUrl, business_goals: selectedBusinessGoals } }))
        dispatch(projectUpdated({ ...projectShallow, logo_url: imageUrl, business_goals: (selectedBusinessGoals) }))
        console.log('with img');

      } else {
        dispatch(updateProject({ id: selectedProject._id, data: { ...projectShallow, business_goals: selectedBusinessGoals } }))
        dispatch(projectUpdated({ ...projectShallow, business_goals: selectedBusinessGoals }))
        console.log('no img');

      }
      resetValue()
    }
    if (saleTrends === undefined) {
      setSaleTrends(selectedProject.sale_trends)
    }
    setCounter(counter + 1)
  }, [isLoaded, selectedCurrency, selectedIndustries, imageName, doSubmitCheck, projectionPeriod])

  // const doSubmitOld = (event) => {
  //   if (file) uploadData()
  //   const ToUploadProjectShallow = {
  //     ...selectedProject,
  //     user_id: selectedProject.user_id,
  //     name: event.name,
  //     industry_ids: selectedIndustryIds,
  //     description: event.description,
  //     logo_url: imageUrl !== '' ? imageUrl : selectedProject.logo_url,
  //     created_date: selectedProject.created_date,
  //     modified_date: new Date(),
  //     model_config: {
  //       projection_period: projectionPeriod,
  //       start_date: event.start_date,
  //       currency_id: selectedCurrencyId,
  //       working_hours: Number(event.working_hours),
  //       income_tax_rate: Number(event.income_tax_rate),
  //       discounting_rate: Number(event.discounting_rate),
  //     },
  //     sale_trends: JSON.parse(JSON.stringify(saleTrends)),
  //     business_goals: JSON.parse(JSON.stringify(selectedBusinessGoals)),
  //     expense: {
  //       ...selectedProject.expense,
  //       fixed_cost_tables: fixedCostTables
  //     }
  //   }
  //   setDoSubmitCheck(true)
  //   setProjectShallow(ToUploadProjectShallow)
  // }
  const doSubmit = (event) => {
    if (file) uploadData()
    const ToUploadProjectShallow = {
      ...selectedProject,
      user_id: selectedProject.user_id,
      name: event.name,
      industry_ids: selectedIndustryIds,
      description: event.description,
      logo_url: imageUrl !== '' ? imageUrl : selectedProject.logo_url,
      created_date: selectedProject.created_date,
      modified_date: new Date(),
      model_config: {
        projection_period: projectionPeriod,
        start_date: event.start_date,
        currency_id: selectedCurrencyId,
        working_hours: Number(event.working_hours),
        income_tax_rate: Number(event.income_tax_rate),
        discounting_rate: Number(event.discounting_rate),
      },
      sale_trends: JSON.parse(JSON.stringify(saleTrends)),
      business_goals: JSON.parse(JSON.stringify(selectedBusinessGoals)),
      miscellaneous: {
        ...selectedProject.miscellaneous,
        debt_issuance: debtIssuanceRows

      }
    }
    setDoSubmitCheck(true)
    setProjectShallow(ToUploadProjectShallow)
  }
  const uploadData = async () => {
    const formData = new FormData();
    formData.append("image", file);
    axios.post("http://localhost:5000/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then(res => {
      setImageUrl(res.data.filename)
    })
  }

  const onUploadChange = (e) => {
    setImageName(e.target.value)
    setFile(e.target.files[0])
  }

  const onCurrencyChange = (e) => {
    setSelectedCurrencyId(e.value)
  }

  const onIndustryChange = (e) => {
    const shallowSelectedIndustryIds = e.map((each) => {
      return each.value
    })
    setSelectedIndustryIds(shallowSelectedIndustryIds)
  }

  // const onProjectionPeriodChangeOld = (e) => {
  //   let shallowSaleTrends = []
  //   if (e.target.value !== '') {
  //     for (let i = 0; i < e.target.value; i++) {
  //       if (i <= projectionPeriod - 1) {
  //         shallowSaleTrends.push(saleTrends[i])
  //       }
  //       else {
  //         let shallowSaleTrend = {
  //           year: i + 1,
  //           trend: 0,
  //           description: "",
  //         }
  //         shallowSaleTrends.push(shallowSaleTrend)

  //       }
  //     }
  //     let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.fixed_cost_tables))
  //     shallowTables = shallowTables.map((eachTable => {
  //       eachTable.fixed_costs.map(eachRow => {
  //         const shallowNumbersTrends = []
  //         for (let i = 0; i < InitialPeriodMonths([
  //           "มกราคม",
  //           "กุมภาพันธ์",
  //           "มีนาคม",
  //           "เมษายน",
  //           "พฤษภาคม",
  //           "มิถุนายน",
  //           "กรกฏาคม",
  //           "สิงหาคม",
  //           "กันยายน",
  //           "ตุลาคม",
  //           "พฤศจิกายน",
  //           "ธันวาคม",
  //         ],
  //           selectedProject.model_config.start_date,
  //           selectedProject.model_config.projection_period).length; i++) {
  //           if(i< eachRow.number.length) shallowNumbersTrends.push(eachRow.number[i])
  //           else shallowNumbersTrends.push(1)
  //         }
  //         return { ...eachRow, number: shallowNumbersTrends }
  //       })
  //       return eachTable
  //     }
  //     ))

  //     setFixedCostTables(shallowTables)
  //     setSaleTrends(shallowSaleTrends)
  //     setprojectionPeriod(e.target.value)
  //   }
  // }
  const onProjectionPeriodChange = (e) => {
    if (e.target.value !== '') {
      let shallowSaleTrends = []
      for (let i = 0; i < e.target.value; i++) {
        if (i <= projectionPeriod - 1) {
          shallowSaleTrends.push(saleTrends[i])
        }
        else {
          let shallowSaleTrend = {
            year: i + 1,
            trend: 0,
            description: "",
          }
          shallowSaleTrends.push(shallowSaleTrend)

        }
      }

      let shallowDebtIssuances = []
      shallowDebtIssuances = JSON.parse(JSON.stringify(debtIssuanceRows)).map((eachDebtIssuance, index) => {
        const shallowDebtIssuancePayments = []
        for (let i = 0; i < e.target.value; i++) {
          if (i <= projectionPeriod - 1) {
            shallowDebtIssuancePayments.push(eachDebtIssuance.payments[i])
          }
          else {
            let shallowDebtIssuancePayment = {
              year: i + 1,
              amount: 0,
            }
            shallowDebtIssuancePayments.push(shallowDebtIssuancePayment)
          }
        }
        eachDebtIssuance.payments = shallowDebtIssuancePayments
        return eachDebtIssuance
      })

      setDebtIssuanceRows(shallowDebtIssuances)
      setSaleTrends(shallowSaleTrends)
      setprojectionPeriod(e.target.value)
    }
  }
  const [selectBusinessGoalState, setSelectBusinessGoalState] = useState(false)
  const [setCashflowState, setSetCashflowState] = useState(false)
  const [cashflowStateType, setCashflowStateType] = useState()
  const [currenCashflowData, setCurrenCashflowData] = useState()
  const handleCashflowState = (type, data) => {
    setCashflowStateType(type === 'yearly' ? 'รายปี' : 'รายเดือน')
    setCurrenCashflowData(data)
    setSetCashflowState(true)
  }
  const updateSaletrends = (shallowSaleTrends) => {
    setIsLoaded(!isLoaded)
    setSaleTrends(shallowSaleTrends)
  }
  const onEachSaleTrendChange = (index, value) => {
    const shallowSaleTrends = saleTrends
    shallowSaleTrends[index].trend = value
    updateSaletrends(shallowSaleTrends)
  }

  const addBusinessGoalHandle = (selectedGoal) => {
    let shallowBusienssGoals = JSON.parse(JSON.stringify(selectedBusinessGoals))
    let shallowSelectedGoal = JSON.parse(JSON.stringify(selectedGoal))
    if (!shallowBusienssGoals.find(each => each.name.en === shallowSelectedGoal.name.en)) {
      // alert(JSON.stringify(shallowSelectedGoal))
      shallowBusienssGoals.push(JSON.parse(JSON.stringify(shallowSelectedGoal)))
      // alert(JSON.stringify(selectedGoal))
      // alert(JSON.stringify(shallowBusienssGoals))
      setselectedBusinessGoals(JSON.parse(JSON.stringify(shallowBusienssGoals)))
      setSelectBusinessGoalState(false)
    }
    else alert('ไม่สามารถเพิ่มเป้าหมายซ้ำได้ กรุณาเลือกเป้าหมายอื่น')
    // dispatch(projectUpdated())
  }

  const setCashflow = (newData) => {
    const shallowBusienssGoals = JSON.parse(JSON.stringify(selectedBusinessGoals))
    const shallowBusienssGoals2 = JSON.parse(JSON.stringify(shallowBusienssGoals)).map(each => {
      return each.name.en === newData.name.en ? newData : each
    })
    setselectedBusinessGoals(JSON.parse(JSON.stringify(shallowBusienssGoals2)))
  }

  return (
    <div className="new-invest-form">
      <BiztoolPopup
        preTitle='+เพิ่มเป้าหมาย'
        title="เป้าหมายธุรกิจ"
        content={<BusinessGoalContent
          projectionPeriod={projectionPeriod}
          addBusinessGoalHandle={addBusinessGoalHandle}
          close={setSelectBusinessGoalState} />}
        trigger={selectBusinessGoalState}
        close={() => setSelectBusinessGoalState(false)}
      />
      <BiztoolPopup
        preTitle='เป้าหมายธุรกิจ'
        title={`กระแสเงินสด${cashflowStateType}`}
        content={<CashflowContent
          data={currenCashflowData}
          setCashflow={setCashflow}
          projectionPeriod={projectionPeriod}
          onChangeHandle={() => alert(`CF ${cashflowStateType}`)}
          close={setSetCashflowState} />}
        trigger={setCashflowState}
        close={() => setSetCashflowState(false)}
      />
      {counter >= round &&
        <form onSubmit={handleSubmit(doSubmit)}>
          <div className="d-flex label-newInvest-pj">
            <div>
              <div className="input-container">
                <BizTextInfo title="ชื่อธุรกิจ" />
                <input
                  defaultValue={selectedProject.name}
                  className="input-newInvest-pj"
                  style={{ width: "280px" }}
                  type="name"
                  {...register('name', { required: true })}
                  required
                />
              </div>
              <div className="d-flex flex-col">
                <div className="input-container ">
                  <div className="label-newInvest-pj">โลโก้ธุรกิจ </div>
                  {selectedProject.logo_url === "" ? <BizLogo /> :
                    <div>
                      <div className="LogoImageStyle">
                        <img alt={selectedProject.logo_url} src={`${WEB_URL}${selectedProject.logo_url}`}
                          className='mw-100 mh-100'
                        />
                      </div>
                      <div>{imageName !== '' ? `รูปโลโกที่เลือก: ${imageName}` : "คุณยังไม่ได้เลือกรูปโลโกใหม่"}</div>
                    </div>
                  }
                  <div>
                    <button
                      htmlFor="getFiles"
                      type="button"
                      className="btn btn-primary"
                      onClick={() => document.getElementById('getFiles').click()}
                    >อัพโหลดรูปภาพ</button>
                    <input
                      name="logo"
                      type="file"
                      id="getFiles"
                      style={{ display: "none" }}
                      onChange={(e) => onUploadChange(e)}
                    />
                  </div>
                </div>
                <div className="flex-col">
                  <div className="input-container">
                    <BizTextInfo title="วันเริ่มดำเนินธุรกิจ" />
                    <input
                      defaultValue={timeToShow("input-date",
                        selectedProject.model_config.start_date)}
                      className="input-newInvest-pj-xx[small"
                      type="date"
                      {...register('start_date', { required: true })}
                      required
                    />
                    {/* {"oo"} */}
                  </div>
                  <div className="input-container">
                    <BizTextInfo title="ระยะเวลาประเมินธุรกิจ" />
                    <input
                      defaultValue={selectedProject.model_config.projection_period}
                      onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                      className="input-newInvest-pj-small"
                      type="projection_period"
                      onChange={(e) => onProjectionPeriodChange(e)}
                      required
                    />
                  </div>
                  <div className="input-container">
                    <BizTextInfo title="สกุลเงิน" />
                    {counter > round + 1 &&
                      <Select
                        defaultValue={selectedCurrency}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        name="currency_id"
                        options={currencyOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e) => onCurrencyChange(e)}
                      />
                    }
                  </div>
                  <div className="input-container">
                    <BizTextInfo title="ชั่วโมงทำงาน/วัน" />
                    <input
                      defaultValue={
                        selectedProject.model_config.working_hours}
                      onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                      // placeholder="8 ชม./วัน"
                      className="input-newInvest-pj-small"
                      type="working_hours"
                      {...register('working_hours', { required: true })}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="input-container">
                <BizTextInfo title="คำอธิบายเกี่ยวกับธุรกิจ" />
                <textarea
                  defaultValue={selectedProject.description}
                  className="input-newInvest-pj"
                  style={{ height: "143px", width: "250px" }}
                  type="description"
                  {...register('description', { required: false })}
                />
              </div>
              <BizTextInfo title="ประเภทธุรกิจ" />
              {counter > round + 1 &&
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  defaultValue={selectedIndustries}
                  name="industry_ids"
                  options={industryOptions}
                  className="basic-multi-select min-w-select"
                  classNamePrefix="select"
                  onChange={(e) => onIndustryChange(e)}
                />
              }
              <div className="d-flex flex-col">
                <div className="input-container">
                  <BizTextInfo title="ภาษีเงินได้ (%)" />
                  <input
                    defaultValue={selectedProject.model_config.income_tax_rate}
                    onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                    className="input-newInvest-pj-small"
                    type="income_tax_rate"
                    {...register('income_tax_rate', { required: true })}
                    required
                  />
                </div>
                <div className="input-container">
                  <BizTextInfo title="อัตราเงินคิดลด (%)" />
                  <input
                    defaultValue={selectedProject.model_config.discounting_rate}
                    onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                    className="input-newInvest-pj-small"
                    type="discounting_rate"
                    {...register('discounting_rate', { required: true })}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn login-butt">
                บันทึกการแก้ไข
              </button>
            </div>
          </div >
          <div className="d-flex mt-2">
            <div className="w-100 ">
              <div className="text-center">แนวโน้มยอดขาย</div>
              {saleTrends ? saleTrends.map((eachTrend, index) =>
                <div className="d-flex" key={index}>
                  <div className="w-50 sale-trend-box">{`ปีที่ ${eachTrend.year}`}</div>
                  <input
                    className="sale-trend-input"
                    type='sale_trends'
                    value={eachTrend.trend}
                    id={`sale_trends_${eachTrend.year - 1}`}
                    onChange={(e) => onEachSaleTrendChange(eachTrend.year - 1, e.target.value)}
                    onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                  // required
                  />
                </div>
              ) : "Loading"}
            </div>
            <div className="w-100 ">
              <div className="text-center ">เป้าหมายธุรกิจ</div>
              {selectedBusinessGoals ? selectedBusinessGoals.map((eachGoal, index) => (
                <div className="d-flex" key={index}>
                  <div
                    key={eachGoal._id}
                    className="w-50 business-goal-box">
                    {eachGoal.name.th}
                  </div>
                  {(eachGoal.name.en !== 'Yearly Cashflow' && eachGoal.name.en !== 'Monthly Cashflow') && <input
                    className="business-goal-input"
                    defaultValue={eachGoal.detail.value}
                    type='business_goal'
                    onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                    required
                  />}
                  {(eachGoal.name.en === 'Yearly Cashflow' || eachGoal.name.en === 'Monthly Cashflow') && <button
                    onClick={() => handleCashflowState(eachGoal.name.en === 'Yearly Cashflow' ? 'yearly' : 'monthly', eachGoal)}
                    className="sale-trend-input">
                    แก้ไข
                  </button>}
                </div>
              ))
                : null}
              <button
                className="add-business-goal-button"
                onClick={() => setSelectBusinessGoalState(true)}
              >
                + เพิ่มเป้าหมายธุรกิจ
              </button>
            </div>
          </div>
        </form >
      }
    </div >
  );
}

export default infoProject;
