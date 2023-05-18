import React, { useEffect, useState } from "react";
import { create, all } from 'mathjs'
import './ffcCard.css'
import { IconContext } from "react-icons";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";

import CombinationCharts from '../../statement/charts/combinationCharts';
import "../../../pages/checkBiz/statementsPage/chartPages/chartPages.css";
import "../../sensitivity/sensitivityEdit/sidebar/sensitivityEditSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProjectById,
    projectUpdated,
    updateProject,
} from "../../../features/projectsSlice";
import EditInputOnSidebar from "../../checkbiz/sidebarEditdata/editInputOnSidebar";
import checkbizFormula from "../../checkbiz/checkbizFormula/checkbizFormula";

// import BarChart from '../../statement/charts/barChart';
// import CombinationChartsMinMax from '../../statement/charts/combinationChartsMinMax';
// import stackedBar from '../../statement/charts/stackedBar';
// import DoughnutChart from '../../statement/charts/doughnutChart';
// import bizSidebar from '../../bizTools/bizSidebar/bizSidebar';
// import statementHearder from '../../statement/statementHearder';
// import sensitivityEditSidebar from '../../sensitivity/sensitivityEdit/sidebar/sensitivityEditSidebar';
// import { AiOutlineDoubleLeft } from "react-icons/ai";
// import BIZTOOL_PAGE_CONFIG from '../../../pages/bizTools/pageConfig';

const ffcCard = (props) => {

    const cbf = checkbizFormula();
    const totalInvestment = cbf.calculateInvestment();
    const { totalRevenue, totalRevenue_MIN } = cbf.calculateRevenue();
    const totalFixedCost = cbf.calculateTotalFixdcost();

    const yearRange = cbf.calculateYearRange();

    const { totalRevenue_year, } = cbf.calculateRevenue_fix();
    const totalCFO = cbf.calculateCFO();
    const totalCFI = cbf.calculateCFI2();
    const { totalCFF, totalIncomeDebt, totalExpendDebt } = cbf.calculateCFF();
    let netIncome = (totalRevenue_year.map((each, i) => each - totalFixedCost[i]))
    let CfoCfi = netIncome.map((cfo, index) => cfo + totalCFI[index]);
    let netCashflow = totalCFF.map((cff, index) => cff + CfoCfi[index]);


    let initialInvestment = totalCFI[0];

    const { inv_names, inv_amounts } = cbf.calculateInitialInvestment_for_chart();
    const { expense_names, expense_amounts } = cbf.calculateFixedCost_for_chart();
    const { revenue_service_names, revenue_service_amounts } = cbf.calculateRevenue_service_for_chart();
    const { revenue_product_names, revenue_product_amounts } = cbf.calculateRevenue_product_for_chart();



    // const NPV = cbf.calculateNPV(initialInvestment, cashFlows, discountRate);


    const [chart, setChart] = useState(false);


    const dispatch = useDispatch();
    const selectedProject = useSelector(
        (state) => state.projects.selectedProject
    );
    const [isLoaded, setIsLoaded] = useState({ user: false, projects: false });
    const [reload, setReload] = useState(false);


    useEffect(() => {

        if (isLoaded.projects) {
            dispatch(fetchProjectById(selectedProject._id));
            setIsLoaded({ user: true, project: true });
        }
        if (!reload) {
            dispatch(fetchProjectById(selectedProject._id));
            setReload(true);
        }
        setModelConfig(selectedProject.model_config);
        setTableRevenueData(selectedProject.revenue);
        setTableExpenseData(selectedProject.expense);
        setTableMiscellaneousData(selectedProject.miscellaneous);
    }, [selectedProject]);

    const [modelConfig, setModelConfig] = useState(
        selectedProject.model_config
    );
    const [tableRevenueData, setTableRevenueData] = useState(
        selectedProject.revenue
    );
    const [tableExpenseData, setTableExpenseData] = useState(
        selectedProject.expense
    );
    const [tableMiscellaneousData, setTableMiscellaneousData] = useState(
        selectedProject.miscellaneous
    );

    const onValChange = (tableID, unitID, amountPerUnit) => {
        let shallowServiceTables = JSON.parse(
            JSON.stringify(selectedProject.revenue.service_tables)
        );
        let shallowProductTables = JSON.parse(
            JSON.stringify(selectedProject.revenue.product_tables)
        );
        let shallowFixedCostTables = JSON.parse(
            JSON.stringify(selectedProject.expense.fixed_cost_tables)
        );
        let shallowInvestmentTables = JSON.parse(
            JSON.stringify(selectedProject.expense.investment_tables)
        );

        shallowServiceTables = shallowServiceTables.map((eachTableService) => {
            if (eachTableService._id === tableID) {
                eachTableService.services = eachTableService.services.map(
                    (eachService) => {
                        if (eachService._id === unitID) {
                            if (eachService.revenue_per_service !== amountPerUnit) {
                                eachService.revenue_per_service = amountPerUnit;
                            }
                        }
                        return eachService;
                    }
                );
            }
            return eachTableService;
        });

        shallowProductTables = shallowProductTables.map((eachTableProduct) => {
            if (eachTableProduct._id === tableID) {
                eachTableProduct.products = eachTableProduct.products.map(
                    (eachProduct) => {
                        if (eachProduct._id === unitID) {
                            if (eachProduct.revenue_per_unit !== amountPerUnit) {
                                eachProduct.revenue_per_unit = amountPerUnit;
                            }
                        }
                        return eachProduct;
                    }
                );
            }
            return eachTableProduct;
        });

        shallowFixedCostTables = shallowFixedCostTables.map(
            (eachTableFixedCost) => {
                if (eachTableFixedCost._id === tableID) {
                    eachTableFixedCost.fixed_costs = eachTableFixedCost.fixed_costs.map(
                        (eachFixedCost) => {
                            if (eachFixedCost._id === unitID) {
                                if (eachFixedCost.amount !== amountPerUnit) {
                                    eachFixedCost.amount = amountPerUnit;
                                }
                            }
                            return eachFixedCost;
                        }
                    );
                }
                return eachTableFixedCost;
            }
        );


        // Find the index of the table with the matching ID
        const tableIndex = shallowInvestmentTables.findIndex((table) => table._id === tableID);

        // Update the investment table if found
        if (tableIndex !== -1) {
            shallowInvestmentTables[tableIndex] = {
                ...shallowInvestmentTables[tableIndex],
                investments: shallowInvestmentTables[tableIndex].investments.map((eachInvestment) => {
                    if (eachInvestment._id === unitID) {
                        if (eachInvestment.amount !== amountPerUnit) {
                            eachInvestment.amount = amountPerUnit;
                        }
                    }
                    return eachInvestment;
                }),
            };
        }

        let shallowSelectedProject = {
            ...selectedProject,
            revenue: {
                service_tables: shallowServiceTables,
                product_tables: shallowProductTables,
            },
            expense: {
                fixed_cost_tables: shallowFixedCostTables,
                investment_tables: shallowInvestmentTables,
            },
        };
        dispatch(projectUpdated(shallowSelectedProject));
        dispatch(
            updateProject({ id: selectedProject._id, data: shallowSelectedProject })
        );
    };


    function calculateCashFlows(initialInvestment, annualGrowthRate, numberOfYears) {
        let cashFlows = [];
        let currentCashFlow = initialInvestment;

        for (let i = 0; i < numberOfYears; i++) {
            cashFlows.push(currentCashFlow);
            currentCashFlow = currentCashFlow * (1 + annualGrowthRate);
        }

        return cashFlows;
    }

    function calculateNPV(initialInvestment, cashFlows, discountRate) {
        let presentValueOfCashFlows = 0
        for (let i = 0; i < cashFlows.length; i++) {
            presentValueOfCashFlows += cashFlows[i] / Math.pow((1 + discountRate), i + 1)
        }
        const netPresentValue = presentValueOfCashFlows - initialInvestment
        console.log(`NPV : ${initialInvestment} ,[ ${cashFlows} ], ${discountRate}`)

        return netPresentValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    }

    const math = create(all)

    function calculateIRR(cashFlows) {
        const math = require('mathjs');

        const irr = math.finance.IRR(cashFlows);

        return irr.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    }



    function calculatePaybackPeriod(initialInvestment, cashFlows) {
        let cumulativeCashFlow = -initialInvestment // Add the initial investment as a negative cash flow
        let paybackPeriod = 0

        for (let i = 0; i < cashFlows.length; i++) {
            cumulativeCashFlow += cashFlows[i]
            if (cumulativeCashFlow >= 0) {
                paybackPeriod += i + (cumulativeCashFlow - cashFlows[i]) / cashFlows[i + 1]
                break
            }
        }

        return paybackPeriod.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    }

    function calculateProfitabilityIndex(initialInvestment, cashFlows, discountRate) {
        let presentValueOfCashFlows = 0
        for (let i = 0; i < cashFlows.length; i++) {
            presentValueOfCashFlows += cashFlows[i] / Math.pow((1 + discountRate), i + 1)
        }
        const netPresentValue = presentValueOfCashFlows - initialInvestment
        const profitabilityIndex = netPresentValue / initialInvestment
        return profitabilityIndex.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    }



    return (
        <div className="ffc-card-container">
            <div>
                <div className='d-flex justify-content-between'>
                    <div className="ffc-table-name">{props.tableName ? props.tableName : "tableName"}</div>
                    <div className='d-flex'>
                        <IconContext.Provider value={{ color: "#9fa7c2" }}>
                            <FaThList onClick={() => setChart(false)} />&nbsp;
                            <BsFillBarChartFill onClick={() => setChart(true)} />
                        </IconContext.Provider>
                    </div>
                </div>
                <hr style={{ margin: "2px" }}></hr>
                <div>
                    {chart ?
                        <div className="ffc-card-body-chart">
                            {props.type == "total-investment" &&
                                <div>
                                    <CombinationCharts
                                        className="combination-charts"
                                        data_type={props.type}
                                        inv_names={inv_names}
                                        inv_amounts={inv_amounts}
                                    />
                                </div>
                            }
                            {props.type == "expense" &&
                                <div>
                                    <CombinationCharts
                                        className="combination-charts"
                                        data_type={props.type}
                                        expense_names={expense_names}
                                        expense_amounts={expense_amounts}
                                    />
                                </div>
                            }
                            {props.type == "revenue-service" &&
                                <div>

                                    <CombinationCharts
                                        className="combination-charts"
                                        data_type={props.type}
                                        revenue_service_names={revenue_service_names}
                                        revenue_service_amounts={revenue_service_amounts}
                                    />
                                </div>
                            }
                            {props.type == "revenue-product" &&
                                <div>

                                    <CombinationCharts
                                        className="combination-charts"
                                        data_type={props.type}
                                        revenue_product_names={revenue_product_names}
                                        revenue_product_amounts={revenue_product_amounts}
                                    />
                                </div>
                            }
                            {props.type == "cashflow" &&
                                <div>
                                    <CombinationCharts
                                        data_type="cashflow"
                                        totalCFO={totalCFO}
                                        totalCFI={totalCFI}
                                        totalCFF={totalCFF}
                                        yearRange={yearRange}
                                    />
                                </div>
                            }

                        </div>
                        :
                        <div className='ffc-card-body'>
                            {props.type === "revenue" &&
                                <table className="table table-sm ffc-table-text">
                                    <thead>
                                        <tr>
                                            {/* <th style={{ width: "390px" }} scope="col">name</th>
                                            <th style={{ width: "390px" }} className="text-left" scope="col">amount</th>
                                            <th sstyle={{ width: "390px" }} cope="col">start_date</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableRevenueData.service_tables.map((table) => (
                                            <React.Fragment key={table._id}>
                                                {table.services.map((each) => (
                                                    <tr key={each._id}>
                                                        <td>{each.name}</td>
                                                        <td>{each.revenue_per_service}</td>
                                                        <td>{each.start_date.substring(0, 10)}</td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                        {tableRevenueData.product_tables.map((table) => (
                                            <React.Fragment key={table._id}>
                                                {table.products.map((each) => (
                                                    <tr key={each._id}>
                                                        <td>{each.name}</td>
                                                        <td>{each.revenue_per_unit}</td>
                                                        <td>{each.start_date.substring(0, 10)}</td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>

                            }
                            {props.type === "revenue-service" &&
                                <table className="table table-sm ffc-table-text">
                                    <thead>
                                        <tr>
                                            {/* <th style={{ width: "390px" }} scope="col">name</th>
                                            <th style={{ width: "390px" }} className="text-left" scope="col">amount</th>
                                            <th sstyle={{ width: "390px" }} cope="col">start_date</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableRevenueData.service_tables.map((table) => (
                                            <React.Fragment key={table._id}>
                                                {table.services.map((each) => (
                                                    <tr key={each._id}>
                                                        <td>{each.name}</td>
                                                        <td>{each.revenue_per_service}</td>
                                                        <td>{each.start_date.substring(0, 10)}</td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>

                            }
                            {props.type === "revenue-product" &&
                                <table className="table table-sm ffc-table-text">
                                    <thead>
                                        <tr>
                                            {/* <th style={{ width: "390px" }} scope="col">name</th>
                                            <th style={{ width: "390px" }} className="text-left" scope="col">amount</th>
                                            <th sstyle={{ width: "390px" }} cope="col">start_date</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableRevenueData.product_tables.map((table) => (
                                            <React.Fragment key={table._id}>
                                                {table.products.map((each) => (
                                                    <tr key={each._id}>
                                                        <td>{each.name}</td>
                                                        <td>{each.revenue_per_unit}</td>
                                                        <td>{each.start_date.substring(0, 10)}</td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            }
                            {props.type === "fixed-cost" &&
                                tableExpenseData.fixed_cost_tables.map((tableFixedCost) => (
                                    <div key={tableFixedCost._id}>
                                        {/* <div className="total-text">{tableFixedCost.name}</div> */}
                                        {tableFixedCost.fixed_costs.map((eachFixedCost) => (
                                            <div key={eachFixedCost._id}>
                                                {eachFixedCost.name !== "" && (
                                                    <EditInputOnSidebar
                                                        name={eachFixedCost.name}
                                                        type="text"
                                                        defaultValue={eachFixedCost.amount}
                                                        className="chart-input"
                                                        onChange={(event) =>
                                                            onValChange(
                                                                tableFixedCost._id,
                                                                eachFixedCost._id,
                                                                event.target.value
                                                            )
                                                        }
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            {props.type === "expense" &&
                                <table className="table table-sm ffc-table-text">
                                    <thead>
                                        <tr>
                                            {/* <th style={{ width: "390px" }} scope="col">name</th>
                                            <th style={{ width: "390px" }} className="text-left" scope="col">amount</th>
                                            <th sstyle={{ width: "390px" }} cope="col">start_date</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableExpenseData.fixed_cost_tables.map((tableFixedCost) => (
                                            <React.Fragment key={tableFixedCost._id}>
                                                {tableFixedCost.fixed_costs.map((eachFixedCost) => (
                                                    <tr key={eachFixedCost._id}>
                                                        <td>{eachFixedCost.name}</td>
                                                        <td>{eachFixedCost.amount}</td>
                                                        <td>{eachFixedCost.start_date.substring(0, 10)}</td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            }
                            {props.type === "total-investment" &&
                                <table className="table table-sm ffc-table-text">
                                    {/* {calculateInitialInvestment()} */}
                                    <thead>
                                        <tr>
                                            {/* <th style={{ width: "390px" }} scope="col">name</th>
                                            <th style={{ width: "390px" }} className="text-left" scope="col">amount</th>
                                            <th sstyle={{ width: "390px" }} cope="col">start_date</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableExpenseData.investment_tables.map((table) => (
                                            <React.Fragment key={table._id}>
                                                {table.investments.map((each) => (
                                                    <tr key={each._id}>
                                                        <td>{each.name}</td>
                                                        <td>{cbf.moneyDisplay(each.amount)}</td>
                                                        <td>{each.start_date.substring(0, 10)}</td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                        <tr>
                                            {/* <th>เงินลงทุนสุทธิ</th>
                                            <th>{totalCFI}</th> */}
                                        </tr>
                                    </tbody>
                                </table>
                            }
                            {props.type === "cashflow" &&
                                <table className="table table-sm ffc-table-text">
                                    {/* {calculateInitialInvestment()} */}
                                    <thead>
                                        <tr className="table">
                                            <th scope="col" className="dov-name-cell">รายการ</th>
                                            {yearRange.map((i) => (
                                                <th scope="col" className="dov-money-cell">{i}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <th className="dov-name-cell">กระแสเงินสดจากกิจกรรมดำเนินงาน</th>
                                        {/* <tr>
                                            <td className="dov-name-cell">ค่าเสื่อมราคาและการจัดจำหน่าย</td>
                                            {(calculateCashFlows(totalInvestment, 0.7, 4)).map(eachYear => (
                                                // yearRange.map((i) => (
                                                <td scope="col" className="dov-money-cell">{eachYear}</td>
                                                // ))
                                            ))}
                                        </tr> */}
                                        <tr>
                                            <td className="dov-name-cell">ต้นทุนทางการเงิน</td>
                                            {totalFixedCost.map((i) => (
                                                <td scope="col" className="dov-money-cell">{i.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="dov-name-cell">รายได้ทางการเงิน</td>
                                            {totalRevenue.map((i) => (
                                                <td scope="col" className="dov-money-cell">{i.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            ))}
                                        </tr>
                                        <th className="dov-name-cell">กระแสเงินสดจากกิจกรรมลงทุน</th>
                                        <tr>
                                            <td className="dov-name-cell">ค่าใช้จ่ายการลงทุน</td>
                                            {totalInvestment.map((i) => (
                                                <td scope="col" className="dov-money-cell">{i.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            ))}
                                        </tr>

                                        <th className="dov-name-cell">กระแสเงินสดจากกิจกรรมจัดหาเงิน</th>
                                        <tr>
                                            <td className="dov-name-cell">เงินสดรับจากการชำระเงินกู้</td>
                                            {totalIncomeDebt.map(eachYear => (
                                                // yearRange.map((i) => (
                                                <td scope="col" className="dov-money-cell">{eachYear.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                // ))
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="dov-name-cell">เงินสดจ่ายจากการกู้ยืม</td>
                                            {totalExpendDebt.map(eachYear => (
                                                // yearRange.map((i) => (
                                                <td scope="col" className="dov-money-cell">{eachYear.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                // ))
                                            ))}
                                        </tr>
                                        <tr>
                                            <th className="dov-name-cell">กระแสเงินสดสุทธิ</th>
                                            {netCashflow.map(eachYear => (
                                                // yearRange.map((i) => (
                                                <th scope="col" className="dov-money-cell">{eachYear.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</th>
                                                // ))
                                            ))}
                                        </tr>


                                        {/* {tableRevenueData.service_tables.map((table) => (
                                            <React.Fragment key={table._id}>
                                                {table.services.map((each) => (
                                                    <tr key={each._id}>
                                                        <td className="dov-name-cell">{each.name}</td>
                                                        {yearRange.map((i) => (
                                                            <td scope="col" className="dov-money-cell">{each.revenue_per_service.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))} */}



                                    </tbody>
                                </table>
                            }
                            {props.type === "financial-return" &&
                                <table className="table table-sm ffc-table-text">
                                    {/* {calculateInitialInvestment()} */}
                                    <thead>
                                        <tr>
                                            {/* <th style={{ width: "390px" }} scope="col">Financial Return</th>
                                            <th style={{ width: "190px" }} className="text-left" scope="col">Best Case</th> */}
                                            {/* <th sstyle={{ width: "190px" }} cope="col">Average</th>
                                            <th sstyle={{ width: "190px" }} cope="col">Worst Case</th>
                                            <th sstyle={{ width: "90px" }} cope="col">xxxx</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Net Present value (NPV)</td>
                                            {/* <td></td>
                                            <td></td>
                                            <td></td> */}
                                            {console.log("totalInvestment" + totalInvestment)}
                                            <td>{calculateNPV(initialInvestment, netCashflow, modelConfig.discounting_rate / 100)}</td>
                                            {/* <td>{calculateNPV(initialInvestment, cashFlows, discountRate)}</td> */}
                                        </tr>
                                        {/* <tr>
                                            <td>Internal rate of return (IRR)</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>{calculateIRR(calculateCashFlows(200000,0.7,4)(calculateCashFlows(200000,0.7,4)))}</td>
                                        </tr> */}
                                        <tr>
                                            <td>Payback period</td>
                                            {/* <td></td>
                                            <td></td>
                                            <td></td> */}
                                            {/* <td>{calculatePaybackPeriod(initialInvestment, cashFlows)}</td> */}
                                            <td>{calculatePaybackPeriod(initialInvestment, netCashflow)}</td>
                                        </tr>
                                        <tr>
                                            <td>profitability index (PI)</td>
                                            {/* <td></td>
                                            <td></td>
                                            <td></td> */}
                                            {/* <td>{calculateProfitabilityIndex(initialInvestment, cashFlows, discountRate)}</td> */}
                                            <td>{calculateProfitabilityIndex(initialInvestment, netCashflow, modelConfig.discounting_rate / 100)}</td>
                                        </tr>
                                    </tbody>

                                </table>
                            }
                            {props.type === "entrepreneurial-decision" &&
                                <table className="table table-sm ffc-table-text">
                                    {/* {calculateInitialInvestment()} */}
                                    <thead>
                                        <tr>
                                            {/* <th style={{ width: "390px" }} scope="col">Financial Return</th>
                                            <th style={{ width: "190px" }} className="text-left" scope="col">Best Case</th> */}
                                            {/* <th sstyle={{ width: "190px" }} cope="col">Average</th>
                                            <th sstyle={{ width: "190px" }} cope="col">Worst Case</th>
                                            <th sstyle={{ width: "90px" }} cope="col">xxxx</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ประมาณการเงินลงทุน</td>
                                            {/* <td></td>
                                            <td></td>
                                            <td></td> */}
                                            {console.log("totalInvestment" + initialInvestment)}
                                            <td>{initialInvestment}</td>
                                            {/* <td>{calculateNPV(initialInvestment, cashFlows, discountRate)}</td> */}
                                        </tr>
                                        {/* <tr>
                                            <td>Internal rate of return (IRR)</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>{calculateIRR(calculateCashFlows(200000,0.7,4)(calculateCashFlows(200000,0.7,4)))}</td>
                                        </tr> */}
                                        <tr>
                                            <td>ประมาณการค่าใช้จ่ายแต่ละปี</td>
                                            {/* <td></td>
                                            <td></td>
                                            <td></td> */}
                                            {/* <td>{calculatePaybackPeriod(initialInvestment, cashFlows)}</td> */}
                                            <td>{calculatePaybackPeriod(initialInvestment, calculateCashFlows(initialInvestment, 0.7, 4))}</td>
                                        </tr>
                                        {/* <tr>
                                            <td>ประมาณการเติบโตของค่าใช้จ่ายต่อปี</td>
                                            <td>{calculateProfitabilityIndex(totalInvestment, calculateCashFlows(initialInvestment, 0.7, 4), 0.7)}</td>
                                        </tr> */}
                                       
                                    </tbody>

                                </table>
                            }

                        </div>
                    }
                </div>
            </div>
        </div>

    )
}

export default ffcCard