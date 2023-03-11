import React from 'react';
import { useSelector } from "react-redux";
import { BsFillPeopleFill } from 'react-icons/bs';
import { RiArticleLine } from "react-icons/ri";
import Chart from 'react-apexcharts';
import { FaEye, FaRegCaretSquareRight, FaTag } from "react-icons/fa";


const DashboardContent = () => {
  const { views } = useSelector(state => state.dashboard);
  const { count } = useSelector(state => state.article);
  const { category } = useSelector(state => state.cat);
  const { tag } = useSelector(state => state.tag);
  // const chartOptions = {
  //   series: [
  //     {
  //       name: "Visitor",
  //       data: [12, 1254, 562, 465, 214, 554, 555, 4, 414, 11, 14, 4]
  //     }
  //   ],
  //   options: {
  //     color: ["#181ee8", "#181ee8"],
  //     chart: {
  //       background: 'transparent'
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     stroke: {
  //       curve: "smooth"
  //     },
  //     xaxis: {
  //       categories: ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  //     },
  //     legend: {
  //       position: "top"
  //     },
  //     grid: {
  //       show: 'false'
  //     }
  //   }
  // }
  return (
    <div className='dashboard_content dashboard_index'>

      <div className="dashboard_elements">
        <div className="cards">

          <div className="single-card">
            <div className="card_icon">
              <FaEye />
            </div>
            <div className="card_info">
              <h2>{views}</h2>
              <span>Views</span>
            </div>
          </div>


          {/* dynamic  */}
          <div className="single-card">
            <div className="card_icon">
              <BsFillPeopleFill />
            </div>
            <div className="card_info">
              <h2>23</h2>
              <span>Visitors</span>
            </div>
          </div>
          <div className="single-card">
            <div className="card_icon">
              <RiArticleLine />
            </div>
            <div className="card_info">
              <h2>{count}</h2>
              <span>Articles</span>
            </div>
          </div>
          <div className="single-card">
            <div className="card_icon">
              <FaRegCaretSquareRight />
            </div>
            <div className="card_info">
              <h2>{category?.length}</h2>
              <span>Category</span>
            </div>
          </div>
          <div className="single-card">
            <div className="card_icon">
              <FaTag />
            </div>
            <div className="card_info">
              <h2>{tag?.length}</h2>
              <span>Tag</span>
            </div>
          </div>




        </div>

{/* 
        <div className="card-chart">
          <Chart
            options={chartOptions.options}
            series={chartOptions.series}
            type="bar"
            height="100%"
            width="100%"
          />

        </div> */}


      </div>
    </div>
  )
}

export default DashboardContent