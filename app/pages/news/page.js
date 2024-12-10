import Header from '../../components/Header';
import ExchangeRate from '../../components/ExchangeRate';
import Weather from '../../components/Weather'; // Import Weather
import './news.css';

export default function New(){
   const newsList = [
      "Viện Kiểm sát Hàn Quốc điều tra cựu nghị sĩ đang cầm quyền về nghi ngờ can thiệp trong quá trình tiến cử",
      "Một người Hàn Quốc nằm trong danh sách dự lễ trao giải Nobel Hòa bình 2024",
      "Đảng cầm quyền Hàn Quốc có khả năng khởi động các cuộc thảo luận riêng với Chính phủ và giới y tế",
      "Phó Tổng thống Mỹ chỉ trích cựu Tổng thống Donald Trump vì coi nhẹ đồng minh Hàn-Mỹ",
      "Bắc Triều Tiên thành lập cơ quan mới đối phó với Hàn Quốc",
  ];
    return(
 <div>
    <Header/>
    {/*hàng 1  */}
<div className="flex justify-between mx-auto max-w-7xl container">
   {/* Ô1  */}
      <div className="div1">
       <h1> Thiết quân lệnh được ban hành hại Hàn Quốc </h1>
      </div>
   {/* Ô 2 */}
   <div className="div2">
            <h2 className="news-title">Tin Nóng</h2>
            <ul className="news-list">
                {newsList.map((item, index) => (
                    <li key={index} className="news-item">{item}</li>
                ))}
            </ul>
        </div>
</div>
{/* hàng 2 */}
<div className="flex justify-between mx-auto max-w-7xl container">
   
   {/* Ô 3 */}
   <div className="div3"> 
                <Weather />
      </div>
   
   
   {/* Ô 4 */}
   <div className="div4">
                <ExchangeRate />
            </div>

</div>
{/* hàng 3 */}
<div className="flex justify-between mx-auto max-w-7xl container">
   {/* Ô 5 */}
   <div className="div5"> 3</div>
   {/* Ô 6 */}
   <div className="div6">4</div>
</div>
 </div>


    );

}