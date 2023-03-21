const BIZTOOL_PAGE_CONFIG = {
    projectConfig: {
      type: { page: "page-config", pageConfig: "page-config" },
      title: "เกี่ยวกับธุรกิจ",
    },
    totalInvestment: {
      type: { page: "total-investment", totalInvestment: "total-investment" },
      title: "ต้นทุนธุรกิจ",
      addTableHandleFunction: (input) => {
        alert("popup!");
      },
      onChangeHandle: (table, row, col, value) => {
        console.log(`talble #${table}`);
        console.log(`${row}, ${col}, ${value}`);
      },
      tableStyle: {
        showColumnHeader: true,
        column: [
          {
            colId: 1,
            title: "ชื่อตาราง",
            width: 300,
            type: "text",
            backgroundColor: "#ffffff",
            color: "#000000",
            editable: true,
          },
          {
            colId: 2,
            title: "จำนวน(บาท)",
            width: 200,
            type: "money",
            backgroundColor: "#ffffff",
            color: "#000000",
            editable: true,
          },
          {
            colId: 3,
            title: "ประเภทสินทรัพย์",
            width: 200,
            type: "dropdown",
            backgroundColor: "#ffffff",
            color: "#000000",
            enumData: [
              {
                title: "สินทรัพย์ถาวรที่มีตัวตน",
                value: 1,
              },
              {
                title: "สินทรัพย์ไม่มีตัวตน",
                value: 2,
              },
              {
                title: "สินทรัพย์ถาวร",
                value: 3,
              },
            ],
            editable: true,
          },
          {
            colId: 4,
            title: "วันที่ลงทุน",
            width: 200,
            type: "date",
            backgroundColor: "#ffffff",
            color: "#000000",
            editable: true,
          },
        ],
      },
    },
    operationCost: {
      type: { page: "operation-cost", operationCost: "operation-cost" },
      title: "ค่าใช้จ่ายประจำ",
      addTableHandleFunction: (input) => {
        alert("popup!");
      },
      onChangeHandle: (table, row, col, value) => {
        console.log(`talble #${table}`);
        console.log(`${row}, ${col}, ${value}`);
      },
      tableStyle: {
        showColumnHeader: true,
        column: [
          {
            colId: 1,
            title: "เงินเดือน",
            width: 200,
            type: "text",
            backgroundColor: "#ffffff",
            color: "#000000",
            editable: true,
          },
          {
            colId: 2,
            title: "จำนวน(บาท)",
            width: 100,
            type: "money",
            backgroundColor: "#ffffff",
            color: "#000000",
            editable: true,
          },
          {
            colId: 3,
            title: "อัตราเพิ่มขึ้น",
            width: 150,
            type: "percent",
            backgroundColor: "#ffffff",
            color: "#000000",
            editable: true,
          },
          {
            colId: 4,
            title: "รอบละ(เดือน)",
            width: 120,
            type: "dropdown",
            backgroundColor: "#ffffff",
            color: "#000000",
            enumData: [
              {
                title: 1,
                value: 1,
              },
              {
                title: 3,
                value: 2,
              },
              {
                title: 12,
                value: 3,
              },
            ],
            editable: true,
          },
          {
            colId: 5,
            title: "จำนวน(หน่วย)",
            width: 660,
            type: "cost-table",
            backgroundColor: "#ffffff",
            color: "#000000",
            enumData: [
              {
                title: 1,
                value: 1,
              },
              {
                title: 3,
                value: 2,
              },
              {
                title: 12,
                value: 3,
              },
            ],
            editable: true,
          },
        ],
      },
    },
    revenue: {
      type: {
        page: "revenue",
        product: "revenue-product",
        service: "revenue-service",
      },
      title: "รายรับ",
      addTableHandleFunction: {
        addTableHandleServiceFunction: (input) => {
          alert("service");
        },
        addTableHandleProductFunction: (input) => {
          alert("product");
        },
      },
      onChangeHandle: {
        onServiceChangeHandle: (table, row, col, value) => {
          console.log(`${row}, ${col}, ${value}`);
        },
        onProductChangeHandle: (table, row, col, value) => {
          console.log(`${row}, ${col}, ${value}`);
        },
      },
      tableStyle: {
        productTableStyle: {
          showColumnHeader: true,
          column: [
            {
              colId: 1,
              title: "ชื่อตาราง",
              width: 200,
              type: "text",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 2,
              title: "อายุสินค้า(เดือน)",
              width: 115,
              type: "money",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 3,
              title: "รายได้เฉลี่ย(บาท)/วัน",
              width: 140,
              type: "money",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 4,
              title: "ต้นทุน/หน่วย",
              width: 90,
              type: "percent",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 5,
              title: "อัตราเพิ่มของราคาขาย",
              width: 150,
              type: "percent",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 6,
              title: "อัตราเพิ่มของต้นทุน",
              width: 140,
              type: "percent",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 7,
              title: "เริ่มขายตั้งแต่",
              width: 150,
              type: "dropdown",
              backgroundColor: "#ffffff",
              color: "#000000",
              enumData: [
                {
                  title: "ปี",
                  value: 1,
                },
                {
                  title: "เดือน",
                  value: 2,
                },
                {
                  title: "วัน",
                  value: 3,
                },
              ],
              editable: true,
            },
            {
              colId: 8,
              title: "แนวโน้มการขายรายเดือน",
              width: 180,
              type: "dropdown",
              backgroundColor: "#ffffff",
              color: "#000000",
              enumData: [
                {
                  title: "ปี",
                  value: 1,
                },
                {
                  title: "เดือน",
                  value: 2,
                },
                {
                  title: "วัน",
                  value: 3,
                },
              ],
              editable: true,
            },
          ],
        },
        serviceTableStyle: {
          showColumnHeader: true,
          column: [
            {
              colId: 1,
              title: "ชื่อตาราง",
              width: 200,
              type: "text",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 2,
              title: "จำนวน(หน่วย)",
              width: 100,
              type: "money",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 3,
              title: "หน่วย",
              width: 70,
              type: "text",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 4,
              title: "บริการได้(หน่วย)/วัน",
              width: 140,
              type: "money",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 5,
              title: "รายได้เฉลี่ย/วัน/บริการ",
              width: 160,
              type: "money",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 6,
              title: "ต้นทุน/หน่วย",
              width: 100,
              type: "percent",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 7,
              title: "อัตราเพิ่มของราคาขาย",
              width: 150,
              type: "dropdown",
              backgroundColor: "#ffffff",
              color: "#000000",
              enumData: [
                {
                  title: "ปี",
                  value: 1,
                },
                {
                  title: "เดือน",
                  value: 2,
                },
                {
                  title: "วัน",
                  value: 3,
                },
              ],
              editable: true,
            },
            {
              colId: 8,
              title: "อัตราเพิ่มของต้นทุน",
              width: 150,
              type: "dropdown",
              backgroundColor: "#ffffff",
              color: "#000000",
              enumData: [
                {
                  title: "ปี",
                  value: 1,
                },
                {
                  title: "เดือน",
                  value: 2,
                },
                {
                  title: "วัน",
                  value: 3,
                },
              ],
              editable: true,
            },
            {
              colId: 9,
              title: "เริ่มบริการ/ผลิต",
              width: 150,
              type: "date",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
          ],
        },
      },
    },
    miscellaneous: {
      type: {
        page: "miscellaneous",
        equityContribution: "miscellaneous-equity-contribution",
        equityRepayment: "miscellaneous-equity-repayment",
        debtIssuance: "miscellaneous-debt-issuance",
      },
      title: "เงินกู้และหุ้นส่วน",
      addTableHandleFunction: {
        addTableHandleEquityContributionFunction: (input) => {
          alert("EquityContribution");
        },
        addTableHandleEquityRepaymentFunction: (input) => {
          alert("EquityRepayment");
        },
        addTableHandleDebtIssuanceFunction: (input) => {
          alert("DebtIssuance");
        },
      },
      onChangeHandle: {
        onEquityContributionChangeHandle: (table, row, col, value) => {
          console.log(`${row}, ${col}, ${value}`);
        },
        onEquityRepaymentChangeHandle: (table, row, col, value) => {
          console.log(`${row}, ${col}, ${value}`);
        },
        onDebtIssuanceChangeHandle: (table, row, col, value) => {
          console.log(`${row}, ${col}, ${value}`);
        },
      },
      tableStyle: {
        equityContributionTableStyle: {
          showColumnHeader: true,
          column: [
            {
              colId: 1,
              title: "รายชื่อผู้ถือหุ้น",
              width: 600,
              type: "text",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 2,
              title: "จำนวน(บาท)",
              width: 200,
              type: "money",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 3,
              title: "วันที่ลงทุน",
              width: 220,
              type: "date",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
          ],
        },
        equityRepaymentTableStyle: {
          showColumnHeader: true,
          column: [
            {
              colId: 1,
              title: "รายชื่อผู้รับปันผล",
              width: 600,
              type: "text",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 2,
              title: "สัดส่วนผู้ถือหุ้น",
              width: 200,
              type: "money",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 3,
              title: "วันที่ปันผล",
              width: 220,
              type: "date",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
          ],
        },
        debtIssuanceTableStyle: {
          showColumnHeader: true,
          column: [
            {
              colId: 1,
              title: "การกู้ยืม",
              width: 200,
              type: "text",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 2,
              title: "จำนวน(บาท)",
              width: 120,
              type: "money",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 3,
              title: "วันเริ่มกู้",
              width: 150,
              type: "date",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 4,
              title: "ดอกเบี้ย/ปี",
              width: 140,
              type: "percent",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
            {
              colId: 5,
              title: "งวดดอกเบี้ย",
              width: 160,
              type: "dropdown",
              backgroundColor: "#ffffff",
              color: "#000000",
              enumData: [
                {
                  title: "3 เดือน",
                  value: 1,
                },
                {
                  title: "1 ไตรมาส",
                  value: 2,
                },
                {
                  title: "1 ปี",
                  value: 3,
                },
              ],
              editable: true,
            },
            {
              colId: 6,
              title: "การชำระเงิน",
              width: 250,
              type: "text",
              backgroundColor: "#ffffff",
              color: "#000000",
              editable: true,
            },
          ],
        },
      },
    },
    ffc: {
      type: { page: "ffc", ffc: "ffc" },
      title: "Financial Feasibility Canvas",
    },
    statement: {
      type: { page: "statement", statement: "statement" },
      title: "เอกสารการเงิน",
    },
  };
  
  export default BIZTOOL_PAGE_CONFIG;
  