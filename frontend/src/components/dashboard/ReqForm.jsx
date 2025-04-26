import React from "react";

export default function ReqForm({reqData}) {
  return (
    <div className="req-form">
      <form>
        <div className="flex items-center flex-wrap gap-3">
          <div className="field flex-1">
            <label htmlFor="teacher-name">Teacher name</label>
            <div className="input">
              <input type="text" id="teacher-name" placeholder="Enter you name" required value={reqData ? reqData.teacher : ''} readOnly={reqData}/>
            </div>
          </div>
          <div className="field flex-1">
            <label htmlFor="type">Type</label>
            <div className="input">
              <select id="type" required value={reqData ? reqData.type : ''} readOnly={reqData} disabled={reqData}>
                <option value="TP">TP</option>
                <option value="TD">TD</option>
                <option value="Cours">Cours</option>
                <option value="examen">examen</option>
              </select>
            </div>
          </div>
          <div className="field flex-1">
            <label htmlFor="quantity">Quantity</label>
            <div className="input">
              <input type="text" id="quantity" placeholder="Enter you name" required value={reqData ? reqData.quantity : ''} readOnly={reqData}/>
            </div>
          </div>
        </div>

        <div className="field">
            <label htmlFor="description">Description</label>
            <div className="input">
              <textarea className="w-full h-30 max-h-70" type="text" id="description" placeholder="Write a Description about your file or request?" required value={reqData ? reqData.description : ''} readOnly={reqData}/>
            </div>
          </div>
      </form>
    </div>
  );
}
