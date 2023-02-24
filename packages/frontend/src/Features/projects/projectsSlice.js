import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const PROJECTS_URL = 'http://localhost:5000/project/post';

const initialState = {
  projects: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await axios.get(PROJECTS_URL)
  return response.data
})

export const addNewProject = createAsyncThunk('projects/addNewProject', async (initialProject) => {
  const response = await axios.post(PROJECTS_URL, initialProject)
  console.log(response.data)
  return response.data 
})

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    projectAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name, description, created_date,projection_period,currency_id,working_hours,industry_ids,income_tax_rate,discounting_rate) {
        return {
          payload: {
            model_config: {
              projection_period,
              // start_date:"2023-02-04T17:00:00.000Z",
              created_date,
              currency_id,
              working_hours,
              income_tax_rate,
              discounting_rate,
            },
            revenue: {
              service_tables: [
                {
                  name: "ค่าบริการ",
                  description: "",
                  color: "#FFFFFF",
                  text_color: "#000000",
                  services: [
                    {
                      name: "บริการทำสีผมหญิง",
                      unit: 2,
                      unit_name: "ที่นั่ง",
                      serve_per_unit: 10,
                      revenue_per_service: 1500,
                      cost_per_service: 0.6,
                      price_increase: 0.02,
                      price_increase_period_id: "63de932fd63688ac8b7ed99f",
                      cost_increase: 0.02,
                      cost_increase_period_id: "63de932fd63688ac8b7ed99f",
                      start_date: "2023-02-04T17:00:00.000Z",
                      seasonal_trends: [
                        0.7, 0.7, 0.7, 0.9, 1, 1, 1, 1, 1, 1, 0.8, 0.7,
                      ],
                      _id: "63df522b1882820b1b4ced08",
                    },
                    {
                      name: "บริการทำสีผมชาย",
                      unit: 2,
                      unit_name: "ที่นั่ง",
                      serve_per_unit: 10,
                      revenue_per_service: 1500,
                      cost_per_service: 0.6,
                      price_increase: 0.02,
                      price_increase_period_id: "63de932fd63688ac8b7ed99f",
                      cost_increase: 0.02,
                      cost_increase_period_id: "63de932fd63688ac8b7ed99f",
                      start_date: "2023-02-04T17:00:00.000Z",
                      seasonal_trends: [
                        0.7, 0.7, 0.7, 0.9, 1, 1, 1, 1, 1, 1, 0.8, 0.7,
                      ],
                      _id: "63df522b1882820b1b4ced09",
                    },
                    {
                      name: "บริการตัดผมชาย",
                      unit: 3,
                      unit_name: "ที่นั่ง",
                      serve_per_unit: 20,
                      revenue_per_service: 600,
                      cost_per_service: 0.6,
                      price_increase: 0.02,
                      price_increase_period_id: "63de932fd63688ac8b7ed99f",
                      cost_increase: 0.02,
                      cost_increase_period_id: "63de932fd63688ac8b7ed99f",
                      start_date: "2023-02-04T17:00:00.000Z",
                      seasonal_trends: [
                        0.7, 0.7, 0.7, 0.9, 1, 1, 1, 1, 1, 1, 0.8, 0.7,
                      ],
                      _id: "63df522b1882820b1b4ced0a",
                    },
                    {
                      name: "บริการทำผมหญิง",
                      unit: 3,
                      unit_name: "ที่นั่ง",
                      serve_per_unit: 15,
                      revenue_per_service: 600,
                      cost_per_service: 0.6,
                      price_increase: 0.02,
                      price_increase_period_id: "63de932fd63688ac8b7ed99f",
                      cost_increase: 0.02,
                      cost_increase_period_id: "63de932fd63688ac8b7ed99f",
                      start_date: "2023-02-04T17:00:00.000Z",
                      seasonal_trends: [
                        0.7, 0.7, 0.7, 0.9, 1, 1, 1, 1, 1, 1, 0.8, 0.7,
                      ],
                      _id: "63df522b1882820b1b4ced0b",
                    },
                  ],
                  _id: "63df522b1882820b1b4ced07",
                },
              ],
              product_tables: [
                {
                  name: "สินค้าเสริมความงาม",
                  description: "",
                  color: "#FFFFFF",
                  text_color: "#000000",
                  products: [
                    {
                      days_of_inventory: {
                        days: 0,
                        months: 48,
                      },
                      name: "มาส์กหน้า",
                      revenue_per_unit: 1000,
                      cost_per_service: 0.7,
                      price_increase: 0.01,
                      price_increase_period_id: "63de932fd63688ac8b7ed99f",
                      cost_increase: 0.01,
                      cost_increase_period_id: "63de932fd63688ac8b7ed99f",
                      start_date: "2023-02-04T17:00:00.000Z",
                      seasonal_trends: [
                        0.7, 0.7, 0.7, 0.9, 1, 1, 1, 1, 1, 1, 0.8, 0.7,
                      ],
                      _id: "63df522b1882820b1b4ced05",
                    },
                    {
                      days_of_inventory: {
                        days: 0,
                        months: 48,
                      },
                      name: "แฮนด์ครีม",
                      revenue_per_unit: 1500,
                      cost_per_service: 0.6,
                      price_increase: 0.01,
                      price_increase_period_id: "63de932fd63688ac8b7ed99f",
                      cost_increase: 0.01,
                      cost_increase_period_id: "63de932fd63688ac8b7ed99f",
                      start_date: "2023-02-04T17:00:00.000Z",
                      seasonal_trends: [
                        0.7, 0.7, 0.7, 0.9, 1, 1, 1, 1, 1, 1, 0.8, 0.7,
                      ],
                      _id: "63df522b1882820b1b4ced06",
                    },
                  ],
                  _id: "63df522b1882820b1b4ced04",
                },
              ],
            },
            expense: {
              investment_tables: [
                {
                  name: "ร้านตัดผม",
                  description: "",
                  color: "#FFFFFF",
                  text_color: "#000000",
                  investments: [
                    {
                      name: "ค่าที่ดิน",
                      amount: 750000,
                      account_id: "63de8eead63688ac8b7ed990",
                      is_initial: true,
                      start_date: "2023-02-04T17:00:00.000Z",
                      _id: "63df522b1882820b1b4ced26",
                    },
                    {
                      name: "ค่าก่อสร้าง",
                      amount: 100000,
                      account_id: "63de8eead63688ac8b7ed990",
                      is_initial: true,
                      start_date: "2023-02-04T17:00:00.000Z",
                      _id: "63df522b1882820b1b4ced27",
                    },
                    {
                      name: "ค่าเฟอร์นิเจอร์",
                      amount: 150000,
                      account_id: "63de8eead63688ac8b7ed990",
                      is_initial: true,
                      start_date: "2023-02-04T17:00:00.000Z",
                      _id: "63df522b1882820b1b4ced28",
                    },
                    {
                      name: "ค่าเครื่องมือช่าง",
                      amount: 60000,
                      account_id: "63de8eead63688ac8b7ed990",
                      is_initial: true,
                      start_date: "2023-02-04T17:00:00.000Z",
                      _id: "63df522b1882820b1b4ced29",
                    },
                  ],
                  _id: "63df522b1882820b1b4ced25",
                },
                {
                  name: "อื่นๆ",
                  description: "",
                  color: "#FFFFFF",
                  text_color: "#000000",
                  investments: [
                    {
                      name: "ซอฟแวร์บัญชี",
                      amount: 25000,
                      account_id: "63de8f09d63688ac8b7ed992",
                      is_initial: true,
                      start_date: "2023-02-04T17:00:00.000Z",
                      _id: "63df522b1882820b1b4ced2b",
                    },
                    {
                      name: "ประกันสินค้า",
                      amount: 30000,
                      account_id: "63de8f09d63688ac8b7ed992",
                      is_initial: true,
                      start_date: "2023-02-04T17:00:00.000Z",
                      _id: "63df522b1882820b1b4ced2c",
                    },
                    {
                      name: "ค่าโปรโมทร้าน",
                      amount: 200000,
                      account_id: "63de8f09d63688ac8b7ed992",
                      is_initial: true,
                      start_date: "2023-02-04T17:00:00.000Z",
                      _id: "63df522b1882820b1b4ced2d",
                    },
                  ],
                  _id: "63df522b1882820b1b4ced2a",
                },
              ],
              fixed_cost_tables: [
                {
                  name: "เงินเดือน",
                  description: "",
                  color: "#FFFFFF",
                  text_color: "#000000",
                  fixed_costs: [
                    {
                      name: "ผู้จัดการ",
                      amount: 30000,
                      period_id: "63de92ebd63688ac8b7ed999",
                      number: [
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced0e",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced0f",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced10",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced11",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced12",
                        },
                      ],
                      start_date: "2023-02-04T17:00:00.000Z",
                      cost_increase: 0.01,
                      cost_increase_period_id: "63de932fd63688ac8b7ed99f",
                      _id: "63df522b1882820b1b4ced0d",
                    },
                    {
                      name: "พนักงานต้อนรับ",
                      amount: 19000,
                      period_id: "63de92ebd63688ac8b7ed999",
                      number: [
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced14",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced15",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced16",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced17",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced18",
                        },
                      ],
                      start_date: "2023-02-04T17:00:00.000Z",
                      cost_increase: 0.01,
                      cost_increase_period_id: "63de932fd63688ac8b7ed99f",
                      _id: "63df522b1882820b1b4ced13",
                    },
                    {
                      name: "ช่างตัดผมชาย",
                      amount: 25000,
                      period_id: "63de92ebd63688ac8b7ed999",
                      number: [
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced1a",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced1b",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced1c",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced1d",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced1e",
                        },
                      ],
                      start_date: "2023-02-04T17:00:00.000Z",
                      cost_increase: 0.01,
                      cost_increase_period_id: "63de932fd63688ac8b7ed99f",
                      _id: "63df522b1882820b1b4ced19",
                    },
                    {
                      name: "ช่างตัดผมหญิง",
                      amount: 25000,
                      period_id: "63de92ebd63688ac8b7ed999",
                      number: [
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced20",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced21",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced22",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced23",
                        },
                        {
                          one: 1,
                          two: 1,
                          three: 1,
                          four: 1,
                          five: 1,
                          six: 1,
                          seven: 1,
                          eight: 1,
                          nine: 1,
                          ten: 1,
                          eleven: 1,
                          twelve: 1,
                          _id: "63df522b1882820b1b4ced24",
                        },
                      ],
                      start_date: "2023-02-04T17:00:00.000Z",
                      cost_increase: 0.01,
                      cost_increase_period_id: "63de932fd63688ac8b7ed99f",
                      _id: "63df522b1882820b1b4ced1f",
                    },
                  ],
                  _id: "63df522b1882820b1b4ced0c",
                },
              ],
            },
            miscellaneous: {
              equity_contribution: [
                {
                  name: "ฉัน",
                  amount: 500000,
                  date: "2023-02-04T17:00:00.000Z",
                  _id: "63df522b1882820b1b4ced31",
                },
                {
                  name: "ภรรยาของฉัน",
                  amount: 200000,
                  date: "2023-02-04T17:00:00.000Z",
                  _id: "63df522b1882820b1b4ced32",
                },
              ],
              equity_repayment: [
                {
                  repayment: {
                    period_id: "63de932fd63688ac8b7ed99f",
                    start_date: "2023-02-04T17:00:00.000Z",
                  },
                  name: "ภรรยาของฉัน",
                  share: 0.8,
                  _id: "63df522b1882820b1b4ced30",
                },
              ],
              debt_issuance: [
                {
                  name: "ธนาคารกุ้งไทย",
                  amount: 2000000,
                  apr: 0.075,
                  period_id: "63de932fd63688ac8b7ed99f",
                  payments: [
                    {
                      name: "Rainbow QuickCash",
                      date: "2023-02-04T17:00:00.000Z",
                      amount: 200000,
                      _id: "63df522b1882820b1b4ced2f",
                    },
                  ],
                  _id: "63df522b1882820b1b4ced2e",
                },
              ],
            },
            _id: nanoid(),
            user_id: "63de88dd7e267c38c5cdf616",
            name,
            industry_ids,
            description,
            logo_url:
              "https://img.freepik.com/premium-vector/barber-shop-icon-logo-vector-icon-template_598213-1562.jpg?w=2000",
            created_date: "2023-02-04T17:00:00.000Z",
            modified_date: new Date().toISOString(),
            sale_trends: [
              {
                year: 1,
                trend: 0.4,
                description: "",
                _id: "63df522b1882820b1b4cecfd",
              },
              {
                year: 2,
                trend: 0.5,
                description: "",
                _id: "63df522b1882820b1b4cecfe",
              },
              {
                year: 3,
                trend: 0.6,
                description: "",
                _id: "63df522b1882820b1b4cecff",
              },
              {
                year: 4,
                trend: 0.7,
                description: "",
                _id: "63df522b1882820b1b4ced00",
              },
              {
                year: 5,
                trend: 0.8,
                description: "",
                _id: "63df522b1882820b1b4ced01",
              },
            ],
            business_goals: [
              {
                business_goal_id: "63de98ba7cc1b590116a616b",
                goal: {
                  val: 1000000,
                },
                _id: "63df522b1882820b1b4ced02",
              },
              {
                business_goal_id: "63de992e7cc1b590116a616d",
                goal: {
                  val: 4,
                },
                _id: "63df522b1882820b1b4ced03",
              },
            ],
            __v: 0,
          },
        };
      },
    },

    extraReducers(builder) {
      builder
          .addCase(fetchProjects.pending, (state, action) => {
              state.status = 'loading'
          })
          .addCase(fetchProjects.fulfilled, (state, action) => {
              state.status = 'succeeded'
              // Adding date and reactions
              let min = 1;
              const loadedProjects = action.payload.map(project => {
                project.date = sub(new Date(), { minutes: min++ }).toISOString();       
                  return project;
              });

              // Add any fetched posts to the array
              state.projects = state.projects.concat(loadedProjects)
          })
          .addCase(fetchProjects.rejected, (state, action) => {
              state.status = 'failed'
              state.error = action.error.message
          })
          .addCase(addNewProject.fulfilled, (state, action) => {
              // Fix for API post IDs:
              // Creating sortedPosts & assigning the id 
              // would be not be needed if the fake API 
              // returned accurate new post IDs
              const sortedProjects = state.posts.sort((a, b) => {
                  if (a.id > b.id) return 1
                  if (a.id < b.id) return -1
                  return 0
              })
              action.payload.id = sortedProjects[sortedProjects.length - 1].id + 1;
              // End fix for fake API post IDs 

              action.payload.userId = Number(action.payload.userId)
              action.payload.date = new Date().toISOString();       
              console.log(action.payload)
              state.posts.push(action.payload)
          })
  }

  },
});

export const selectAllProjects = (state) => state.projects;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { projectAdded } = projectsSlice.actions

export default projectsSlice.reducer