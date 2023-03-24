import React from "react";
import './statement.css'

const cashFlowDocument = () => {
  return (
    <div className="docA4">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">การแสเงิยสด</th>
            <th scope="col">ราคา(บาท)</th>
            <th scope="col">ประเภททรัพย์สิน</th>
            <th scope="col">วันที่</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">กระแสเงินสดจากการดำเนินการ</th>
            <td>20,000</td>
            <td>ทรัพย์สิน</td>
            <td>24/3/2566</td>
          </tr>
          <tr>
            <td>เงินสดรับจากการขายสินค้า</td>
            <td>20,000</td>
            <td>ทรัพย์สิน</td>
            <td>24/3/2566</td>
          </tr>
          <tr>
            <td>เงินสดจ่ายจาการซื้อสินค้า</td>
            <td>20,000</td>
            <td>ทรัพย์สิน</td>
            <td>24/3/2566</td>
          </tr>
          <tr>
            <td>เงินสดจ่ายจากเงินเดือน</td>
            <td>20,000</td>
            <td>ทรัพย์สิน</td>
            <td>24/3/2566</td>
          </tr>
          <tr>
            <th scope="row">การแสเงินสดจากกิจกรรมลงทุน</th>
            <td>20,000</td>
            <td>ทรัพย์สิน</td>
            <td>24/3/2566</td>
          </tr>
          <tr>
            <td>เงินสดรับจากการขายที่ดิน</td>
            <td>20,000</td>
            <td>ทรัพย์สิน</td>
            <td>24/3/2566</td>
          </tr>
          <tr>
            <td>เงินสดจ่ายจากการขายอุปกรณ์</td>
            <td>20,000</td>
            <td>ทรัพย์สิน</td>
            <td>24/3/2566</td>
          </tr>
          <tr>
            <th scope="row">กระแสเงินสดจากกิจกรรมการจัดหาเงิน</th>
            <td>20,000</td>
            <td>ทรัพย์สิน</td>
            <td>24/3/2566</td>
          </tr>
          <tr>
            <td>เงินสดจ่ายจากการชำระเงินกู้</td>
            <td>50,000</td>
            <td>ทรัพย์สิน</td>
            <td>24/3/2566</td>
          </tr>
          <tr>
            <td>เงินสดรับจากการขายหุ้น</td>
            <td>150,000</td>
            <td>ทรัพย์สิน</td>
            <td>24/3/2566</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default cashFlowDocument;
