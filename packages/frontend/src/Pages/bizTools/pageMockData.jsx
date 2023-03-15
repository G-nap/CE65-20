const BIZTOOL_PAGE_MOCKDATA = {
    pageConfig: {
        data: {
        },
    },
    totalInvestment: {
        data: [
            {
                tableId: 1,//_id-
                title: "ร้านตัดผม", //name-
                rowData: [//investments-
                    {
                        rowId: 1,//_id-
                        data:
                            [
                                { colId: 1, val: "ค่าที่ดิน" }, //name _id
                                { colId: 2, val: 1200000 }, //amount
                                { colId: 3, val: "สินทรัพย์ถาวรที่มีตัวตน" }, //account_id
                                { colId: 4, val: new Date() }, //start_date
                            ]
                    },
                    {
                        rowId: 2,
                        data:
                            [
                                { colId: 1, val: "ค่าก่อสร้าง" },
                                { colId: 2, val: 1000000 },
                                { colId: 3, val: "สินทรัพย์ถาวรที่มีตัวตน" },
                                { colId: 4, val: new Date() },
                            ]
                    },
                    {
                        rowId: 3,
                        data:
                            [
                                { colId: 1, val: "ค่าเฟอร์นิเจอร์​" },
                                { colId: 2, val: 75000 },
                                { colId: 3, val: "สินทรัพย์ถาวรที่มีตัวตน" },
                                { colId: 4, val: new Date() },
                            ]
                    },
                    {
                        rowId: 3,
                        data:
                            [
                                { colId: 1, val: "ค่าเครื่องมือช่าง​" },
                                { colId: 2, val: 70000 },
                                { colId: 3, val: "สินทรัพย์ถาวรที่มีตัวตน" },
                                { colId: 4, val: new Date() },
                            ]
                    },
                ]
            },
            {
                tableId: 2,
                title: "รายการสินค้า ชุดที่ 2",
                rowData: [
                    {
                        rowId: 1,
                        data:
                            [
                                { colId: 1, val: "สินค้า D" },
                                { colId: 2, val: "2 ปี" },
                                { colId: 3, val: [60, 70, 80] },
                                { colId: 4, val: new Date() },
                            ]
                    },
                    {
                        rowId: 2,
                        data:
                            [
                                { colId: 1, val: "สินค้า E" },
                                { colId: 2, val: "3 ปี" },
                                { colId: 3, val: [60, 80, 90] },
                                { colId: 4, val: new Date() },
                            ]
                    },
                    {
                        rowId: 3,
                        data:
                            [
                                { colId: 1, val: "สินค้า F" },
                                { colId: 2, val: "4 ปี" },
                                { colId: 3, val: [50, 60, 70] },
                                { colId: 4, val: new Date() },
                            ]
                    },
                ]
            },
        ]
    },
    operationCost: {
        data: [

        ],
    },
    revenue: {
        data: {
            serviceData: [
                {
                    tableId: 1, //_id
                    title: "ค่าบริการ",//name
                    rowData: [//services
                        {
                            rowId: 1,
                            data:
                                [
                                    { colId: 1, val: "บริการทำสีผมหญิง" }, //name
                                    { colId: 2, val: 2 }, //unit
                                    { colId: 3, val: "ที่นั่ง" }, //unit_name
                                    { colId: 4, val: 10 }, //serve_per_unit
                                    { colId: 5, val: 1500 }, //revenue_per_service
                                    { colId: 6, val: 60 }, //cost_per_service
                                    { colId: 7, val: "ปี" },
                                    { colId: 8, val: "ปี" },
                                    { colId: 9, val: new Date() }, //start_date
                                ]
                        },
                        {
                            rowId: 2,
                            data:
                                [
                                    { colId: 1, val: "บริการทำสีผมชาย" },
                                    { colId: 2, val: 2 },
                                    { colId: 3, val: "ที่นั่ง" },
                                    { colId: 4, val: 10 },
                                    { colId: 5, val: 1500 },
                                    { colId: 6, val: 60 },
                                    { colId: 7, val: "ปี" },
                                    { colId: 8, val: "ปี" },
                                    { colId: 9, val: new Date() },
                                ]
                        },
                        {
                            rowId: 3,
                            data:
                                [
                                    { colId: 1, val: "บริการตัดผมชาย" },
                                    { colId: 2, val: 3 },
                                    { colId: 3, val: "ที่นั่ง" },
                                    { colId: 4, val: 10 },
                                    { colId: 5, val: 1500 },
                                    { colId: 6, val: 60 },
                                    { colId: 7, val: "ปี" },
                                    { colId: 8, val: "ปี" },
                                    { colId: 9, val: new Date() },
                                ]
                        },
                        {
                            rowId: 4,
                            data:
                                [
                                    { colId: 1, val: "บริการตัดผมหญิง" },
                                    { colId: 2, val: 3 },
                                    { colId: 3, val: "ที่นั่ง" },
                                    { colId: 4, val: 10 },
                                    { colId: 5, val: 1500 },
                                    { colId: 6, val: 60 },
                                    { colId: 7, val: "ปี" },
                                    { colId: 8, val: "ปี" },
                                    { colId: 9, val: new Date() },
                                ]
                        },
                    ]
                },
            ],
            productData: [

            ],
        }
    },
    miscellaneous: {
        data: [

        ],
    },
}

export default BIZTOOL_PAGE_MOCKDATA