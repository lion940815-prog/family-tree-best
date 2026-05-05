"use client";

import { useState } from "react";

type Member = {
  name: string;
  gender: "male" | "female";
  age: string;
  relation: string;
};

export default function Home() {
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState<Member>({
    name: "",
    gender: "male",
    age: "",
    relation: "",
  });

  const addMember = () => {
    if (!form.name || !form.age) return;

    setMembers([...members, form]);
    setForm({ name: "", gender: "male", age: "", relation: "" });
  };

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🧬 家庭樹（Genogram）</h1>

      {/* 輸入區 */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="姓名"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          value={form.gender}
          onChange={(e) =>
            setForm({ ...form, gender: e.target.value as any })
          }
          style={{ marginLeft: 10 }}
        >
          <option value="male">男</option>
          <option value="female">女</option>
        </select>

        <input
          placeholder="年齡"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          style={{ marginLeft: 10 }}
        />

        <input
          placeholder="關係（例如：父親/母親/子女）"
          value={form.relation}
          onChange={(e) => setForm({ ...form, relation: e.target.value })}
          style={{ marginLeft: 10 }}
        />

        <button onClick={addMember} style={{ marginLeft: 10 }}>
          加入
        </button>
      </div>

      {/* 家庭樹顯示 */}
      <div>
        <h2>家庭成員</h2>

        {members.length === 0 && <p>尚未新增資料</p>}

        {members.map((m, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
              borderRadius: 8,
              width: 300,
            }}
          >
            <p>姓名：{m.name}</p>
            <p>性別：{m.gender === "male" ? "男" : "女"}</p>
            <p>年齡：{m.age}</p>
            <p>關係：{m.relation}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
