"use client";
import React, { useState } from 'react';

const FamilyTreeApp = () => {
  const [proband, setProband] = useState({ age: '', gender: 'male' });
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ relation: '', gender: 'male' });

  // 新增成員
  const addMember = () => {
    if (!newMember.relation) return;
    setMembers([...members, { ...newMember, id: Date.now() }]);
    setNewMember({ relation: '', gender: 'male' });
  };

  // 刪除成員
  const deleteMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  // 定義圖形參數
  const centerX = 200;
  const centerY = 200;
  const radius = 120; // 成員分布半徑

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 p-8 font-sans">
      
      {/* 左側控制面板 */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-lg mb-6 md:mb-0">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">家庭樹產生器</h2>
        
        {/* 個案輸入 */}
        <div className="mb-8 p-4 border border-blue-100 rounded-lg bg-blue-50">
          <h3 className="font-semibold mb-3 text-blue-800">個案資訊 (Proband)</h3>
          <input 
            type="number" placeholder="年齡" 
            className="w-full p-2 mb-2 border rounded"
            onChange={(e) => setProband({...proband, age: e.target.value})}
          />
          <select 
            className="w-full p-2 border rounded"
            onChange={(e) => setProband({...proband, gender: e.target.value})}
          >
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
        </div>

        {/* 成員輸入 */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-700">新增家庭成員</h3>
          <input 
            type="text" placeholder="與個案關係 (如：父親)" 
            className="w-full p-2 mb-2 border rounded"
            value={newMember.relation}
            onChange={(e) => setNewMember({...newMember, relation: e.target.value})}
          />
          <select 
            className="w-full p-2 mb-3 border rounded"
            value={newMember.gender}
            onChange={(e) => setNewMember({...newMember, gender: e.target.value})}
          >
            <option value="male">男性 (正方形)</option>
            <option value="female">女性 (圓形)</option>
          </select>
          <button 
            onClick={addMember}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            加入成員
          </button>
        </div>

        {/* 成員列表 */}
        <div className="space-y-2 overflow-y-auto max-h-60">
          {members.map(m => (
            <div key={m.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
              <span>{m.relation} ({m.gender === 'male' ? '男' : '女'})</span>
              <button 
                onClick={() => deleteMember(m.id)}
                className="text-red-500 hover:text-red-700 font-bold px-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 右側畫布 */}
      <div className="w-full md:w-2/3 flex flex-col items-center justify-center bg-white ml-0 md:ml-8 rounded-xl shadow-inner overflow-hidden border border-gray-200">
        <h3 className="my-4 text-gray-500">家庭結構圖</h3>
        <svg width="400" height="400" viewBox="0 0 400 400" className="border border-dashed border-gray-300">
          
          {/* 繪製連接線 */}
          {members.map((m, index) => {
            const angle = (index / members.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            return (
              <line 
                key={`line-${m.id}`} 
                x1={centerX} y1={centerY} x2={x} y2={y} 
                stroke="#cbd5e1" strokeWidth="2" 
              />
            );
          })}

          {/* 繪製個案 (Proband) - 黑色填滿 */}
          {proband.gender === 'male' ? (
            <rect x={centerX-20} y={centerY-20} width="40" height="40" fill="black" />
          ) : (
            <circle cx={centerX} cy={centerY} r="20" fill="black" />
          )}
          <text x={centerX} y={centerY+40} textAnchor="middle" fontSize="12" className="fill-gray-600">
            個案 ({proband.age})
          </text>

          {/* 繪製成員 */}
          {members.map((m, index) => {
            const angle = (index / members.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            return (
              <g key={`node-${m.id}`}>
                {m.gender === 'male' ? (
                  <rect x={x-15} y={y-15} width="30" height="30" fill="white" stroke="black" strokeWidth="2" />
                ) : (
                  <circle cx={x} cy={y} r="15" fill="white" stroke="black" strokeWidth="2" />
                )}
                <text x={x} y={y+35} textAnchor="middle" fontSize="12" className="fill-gray-600 font-medium">
                  {m.relation}
                </text>
              </g>
            );
          })}
        </svg>
        
        <div className="my-6 flex gap-4 text-sm text-gray-500">
          <div className="flex items-center"><div className="w-3 h-3 bg-black mr-2"></div> 個案</div>
          <div className="flex items-center"><div className="w-3 h-3 border border-black mr-2"></div> 男性 (方)</div>
          <div className="flex items-center"><div className="w-3 h-3 border border-black rounded-full mr-2"></div> 女性 (圓)</div>
        </div>
      </div>
    </div>
  );
};

export default FamilyTreeApp;
