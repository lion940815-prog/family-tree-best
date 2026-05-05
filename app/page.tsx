"use client";

import { useState } from 'react';

export default function FamilyTreePage() {
  // 1. 狀態定義
  const [proband, setProband] = useState({ age: '', gender: 'male' });
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ relation: '', gender: 'male' });

  // 2. 邏輯處理
  const addMember = () => {
    if (!newMember.relation.trim()) {
      alert("請輸入關係內容");
      return;
    }
    const memberToAdd = {
      ...newMember,
      id: Date.now(),
    };
    setMembers([...members, memberToAdd]);
    setNewMember({ relation: '', gender: 'male' }); // 重設輸入框
  };

  const deleteMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  // 3. 繪圖參數
  const centerX = 200;
  const centerY = 200;
  const radius = 120;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* 控制面板 */}
        <div className="w-full md:w-80 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-4 text-slate-800">1. 個案設定</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">年齡</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={proband.age}
                  onChange={(e) => setProband({...proband, age: e.target.value})}
                  placeholder="例如: 25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">性別</label>
                <select 
                  className="w-full p-2 border rounded-lg outline-none"
                  value={proband.gender}
                  onChange={(e) => setProband({...proband, gender: e.target.value})}
                >
                  <option value="male">男性 (正方形)</option>
                  <option value="female">女性 (圓形)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-4 text-slate-800">2. 新增成員</h2>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="關係 (如: 父親)" 
                className="w-full p-2 border rounded-lg outline-none"
                value={newMember.relation}
                onChange={(e) => setNewMember({...newMember, relation: e.target.value})}
              />
              <select 
                className="w-full p-2 border rounded-lg outline-none"
                value={newMember.gender}
                onChange={(e) => setNewMember({...newMember, gender: e.target.value})}
              >
                <option value="male">男性</option>
                <option value="female">女性</option>
              </select>
              <button 
                onClick={addMember}
                className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 transition font-medium"
              >
                加入家庭樹
              </button>
            </div>
          </div>

          {/* 成員清單 */}
          <div className="space-y-2">
            {members.map((m) => (
              <div key={m.id} className="flex items-center justify-between bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-sm text-sm">
                <span>{m.relation} - {m.gender === 'male' ? '男' : '女'}</span>
                <button onClick={() => deleteMember(m.id)} className="text-red-400 hover:text-red-600 transition">
                  刪除
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 畫布區域 */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center p-4 min-h-[500px]">
          <div className="mb-4 text-slate-400 text-sm font-medium tracking-widest uppercase">Family Tree Visualization</div>
          
          <svg width="400" height="400" viewBox="0 0 400 400" className="bg-slate-50 rounded-xl">
            {/* 連接線 */}
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

            {/* 成員圖形 */}
            {members.map((m, index) => {
              const angle = (index / members.length) * 2 * Math.PI;
              const x = centerX + radius * Math.cos(angle);
              const y = centerY + radius * Math.sin(angle);
              return (
                <g key={`node-${m.id}`}>
                  {m.gender === 'male' ? (
                    <rect x={x-15} y={y-15} width="30" height="30" fill="white" stroke="#1e293b" strokeWidth="2" />
                  ) : (
                    <circle cx={x} cy={y} r="15" fill="white" stroke="#1e293b" strokeWidth="2" />
                  )}
                  <text x={x} y={y+35} textAnchor="middle" fontSize="12" className="fill-slate-500 font-medium">
                    {m.relation}
                  </text>
                </g>
              );
            })}

            {/* 個案圖形 (置頂繪製) */}
            <g>
              {proband.gender === 'male' ? (
                <rect x={centerX-20} y={centerY-20} width="40" height="40" fill="#000" />
              ) : (
                <circle cx={centerX} cy={centerY} r="20" fill="#000" />
              )}
              <text x={centerX} y={centerY+45} textAnchor="middle" fontSize="14" className="fill-slate-900 font-bold">
                個案 {proband.age ? `(${proband.age})` : ''}
              </text>
            </g>
          </svg>

          {/* 圖例 */}
          <div className="mt-8 flex gap-6 text-xs text-slate-400 border-t pt-4 w-full justify-center">
            <div className="flex items-center"><div className="w-3 h-3 bg-black mr-2"></div> 個案 (實心)</div>
            <div className="flex items-center"><div className="w-3 h-3 border border-slate-800 mr-2"></div> 男性 (方)</div>
            <div className="flex items-center"><div className="w-3 h-3 border border-slate-800 rounded-full mr-2"></div> 女性 (圓)</div>
          </div>
        </div>

      </div>
    </div>
  );
}
