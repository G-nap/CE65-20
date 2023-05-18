import React, { useEffect, useState } from "react";
import TitleFFC from "../titleFFC/titleFFC";
import "./ffcOne.css";
import {
  fetchProjectById,
  projectUpdated,
  updateProject,
} from "../../../features/projectsSlice";
import { useDispatch, useSelector } from "react-redux";

function ffcOne() {

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
    let shallowMiscellaneousTables = JSON.parse(
      JSON.stringify(selectedProject.miscellaneous.ffcReason)
    );

    shallowMiscellaneousTables = shallowMiscellaneousTables.map((eachReason) => {
      // each.ffcReason
    
        // if (eachReason.ffcReason !== amountPerUnit) {
          eachReason.ffcReason = amountPerUnit;
        // }

      return eachReason;
    });


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
      miscellaneous: {
        ffcReason: shallowMiscellaneousTables
      }
    };
    dispatch(projectUpdated(shallowSelectedProject));
    dispatch(
      updateProject({ id: selectedProject._id, data: shallowSelectedProject })
    );
  };

  return (
    <div className="ffc-content">
      <div className="ffc-body-content">
        <div>
          <div>
            <TitleFFC title="เหตุผลในการลงทุน" />
          </div>
          <textarea
            className="input-newInvest-pj"
            style={{ height: "300px", width: "1000px", fontSize: "14px", padding: "10px" }}
            type="textarea"
            name="uname"
            required
            defaultValue={tableMiscellaneousData.ffcReason}
            onChange={(event) =>
              onValChange(
                // tableService._id,
                // eachService._id,
                event.target.value
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ffcOne;
