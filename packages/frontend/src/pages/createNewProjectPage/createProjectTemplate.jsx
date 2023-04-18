import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './createNewProject.css'
import MAIN_CATEGORY from './typeOfMainCategory'
import ProjectTempleteCard from "../../components/projects/projectTempleteCard/projectTempleteCard";
import { updateProjectTemplate, fetchProjectTemplates } from '../../features/projectTemplatesSlice';
import { setShallowCreateProject } from '../../features/projectsSlice';
import { useNavigate } from 'react-router-dom';

const CreateProjectTemplate = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.users.user)
  const shallowEmptyTemplate = {projectData: {
    user_id: user._id,
    name: "เทมเพลตเปล่า",
    industry_ids: [],
    description: "",
    logo_url: "Screenshot 2566-04-15 at 22-fedb.png",
    created_date: new Date(),
    modified_date: new Date(),
    sale_trends: [
      {
        year: 1,
        trend: 40,
        description: "",
      },
      {
        year: 2,
        trend: 60,
        description: "",
      },
      {
        year: 3,
        trend: 80,
        description: "",
      },
    ],
    business_goals: [],
    model_config: {
      projection_period: 3,
      start_date: new Date(),
      currency_id: "63de9a157cc1b590116a6179",
      working_hours: 8,
      income_tax_rate: 15,
      discounting_rate: 8,
    },
    revenue: {
      service_tables: [],
      product_tables: [],
    },
    expense: {
      investment_tables: [],
      fixed_cost_tables: [],
    },
    miscellaneous: {
      equity_contribution: [{
        name: "ฉัน",
        amount: 0,
        date: new Date(),
        repayment:
        {
          period_id: "63de932fd63688ac8b7ed99f",
          start_date: new Date(),
        }
      }],
      debt_issuance: [],
    },
    ffcReason: "",
  }}
  const [searchInput, setSearchInput] = useState('')
  const [selectedMainIndustry, setSelectedMainIndustry] = useState(MAIN_CATEGORY.all)
  const templateList = useSelector(state => state.projectTemplates.projectTemplates)
  const [sortedTemplateList, setSortedTemplateList] = useState(templateList)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let shallowSortedTemplateList = []
    if (selectedMainIndustry.type === MAIN_CATEGORY.all.type) shallowSortedTemplateList = JSON.parse(JSON.stringify(templateList))
    else {
      JSON.parse(JSON.stringify(templateList)).forEach(each => {
        if (each.mainCategory === selectedMainIndustry.type) {
          shallowSortedTemplateList.push(each)
        }
      })
    }
    shallowSortedTemplateList.sort((a, b) => b.selectedCounted - a.selectedCounted);
    setSortedTemplateList(shallowSortedTemplateList)
  }, [selectedMainIndustry])


  const onSearchChange = (val) => {
    setSearchInput(val)
  }
  const onMainCategoryChange = (category) => {
    setSelectedMainIndustry(category)
  }

  const onTemplateClick = (template) => {
    dispatch(updateProjectTemplate({ id: template._id, data: { ...template, selectedCounted: template.selectedCounted + 1 } }))
    dispatch(fetchProjectTemplates())
    dispatch(setShallowCreateProject(template.projectData))
    navigate('/CreateProject')
  }

  return (
    <div >
      <div className='d-flex'>
        {/* Main Category */}
        <div className='main-category-industry ' style={{ width: `200px`, minHeight: '675px' }}>
          <div className='main-category-industry-header fw-bold mb-2 justify-content-center'>หมวดหมู่ธุรกิจ</div>
          <button className='d-flex main-category-industry-text-all' onClick={() => onMainCategoryChange(MAIN_CATEGORY.all)}>
            {MAIN_CATEGORY.all.text}
          </button>
          <button className='main-category-industry-text' onClick={() => onMainCategoryChange(MAIN_CATEGORY.universalIndustry)}>
            {MAIN_CATEGORY.universalIndustry.text}
          </button>
          <button className='main-category-industry-text' onClick={() => onMainCategoryChange(MAIN_CATEGORY.restuarantFoodDrink)}>
            {MAIN_CATEGORY.restuarantFoodDrink.text}
          </button>
          <button className='main-category-industry-text' onClick={() => onMainCategoryChange(MAIN_CATEGORY.healthcareFitness)}>
            {MAIN_CATEGORY.healthcareFitness.text}
          </button>
          <button className='main-category-industry-text' onClick={() => onMainCategoryChange(MAIN_CATEGORY.retail)}>
            {MAIN_CATEGORY.retail.text}
          </button>
          <button className='main-category-industry-text' onClick={() => onMainCategoryChange(MAIN_CATEGORY.service)}>
            {MAIN_CATEGORY.service.text}
          </button>
          <button className='main-category-industry-text' onClick={() => onMainCategoryChange(MAIN_CATEGORY.technology)}>
            {MAIN_CATEGORY.technology.text}
          </button>
          <button className='main-category-industry-text' onClick={() => onMainCategoryChange(MAIN_CATEGORY.realEstate)}>
            {MAIN_CATEGORY.realEstate.text}
          </button>
          <button className='main-category-industry-text' onClick={() => onMainCategoryChange(MAIN_CATEGORY.passiveIncome)}>
            {MAIN_CATEGORY.passiveIncome.text}
          </button>
          <button className='main-category-industry-text' onClick={() => onMainCategoryChange(MAIN_CATEGORY.other)}>
            {MAIN_CATEGORY.other.text}
          </button>
          <div>
          </div>
        </div>

        <div style={{ width: `780px`, marginLeft: '15px', }}>
          {/* Search */}
          <div className=' d-flex align-items-center px-2 ' style={{ height: '60px' }}>
            <input
              style={{ width: '350px', height: '40px', marginRight: '20px', borderColor: "#8c57e8", color: "#8c57e8", }}
              placeholder='ค้นหาตัวอย่างเทมเพลตธุรกิจที่นี่'
              className='template-search-input-style p-2'
              type='text'
              value={searchInput}
              onChange={e => onSearchChange(e.target.value)}
            />
            <div className='d-flex justify-content-center align-items-center'>
              <button className='create-project-template-search-button'>ค้นหา </button>
            </div>
          </div>
          <div className='' >
            <div className="industry-template-list-header">{selectedMainIndustry.text === 'ทั้งหมด' ? "เทมเพลตยอดนิยม" : selectedMainIndustry.text}</div>
            <div className={'template-list'}>
              <div className="container" >
                <div className="row">
                  <div key={'empty-template'} id="cardItem"
                    onClick={() => onTemplateClick(shallowEmptyTemplate)}
                    className="col-xs-3 d-flex justify-content-center align-items-center"
                    style={{ height: "130px", width: '140px' }}>
                    <ProjectTempleteCard data={{...shallowEmptyTemplate, _id:"123"}} />
                  </div>
                  {sortedTemplateList ? sortedTemplateList.map(eachTemplate => (
                    <div key={eachTemplate.id} id="cardItem"
                      onClick={() => onTemplateClick(eachTemplate)}
                      className="col-xs-3 d-flex justify-content-center align-items-center"
                      style={{ height: "130px", width: '140px' }}>
                      <ProjectTempleteCard data={eachTemplate} />
                    </div>
                  )): 'loading'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProjectTemplate