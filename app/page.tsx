"use client";

import { useState } from "react";

type Person = {
  name: string;
  relation: string;
  age: string;
  gender: string;
};

export default function Home() {
  const [caseName, setCaseName] = useState("個案");
  const [caseAge, setCaseAge] = useState("");
  const [caseGender, setCaseGender] = useState("女");

  const [people, setPeople] = useState<Person[]>([]);

  const [form, setForm] = useState<Person>({
    name: "",
    relation: "父親",
    age: "",
    gender: "男",
  });

  const addPerson = () => {
    if (!form.name) return;
    setPeople([...people, form]);
    setForm({ name: "", relation: "父親", age: "", gender: "男" });
  };

  const removePerson = (index: number) => {
    setPeople(people.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: 30, fontFamily: "sans-serif" }}>
      <h1>家庭樹生成系統</h1>

      <h2>個案資料</h2>
      <input
        placeholder="個案名稱"
        value={caseName}
        onChange={(e) => setCaseName(e.target.value)}
      />
      <input
        placeholder="年齡"
        value={caseAge}
        onChange={(e) => setCaseAge(e.target.value)}
      />
      <select value={caseGender} onChange={(e) => setCaseGender(e.target.value)}>
        <option>男</option>
        <option>女</option>
      </select>

      <hr />

      <h2>新增關係者</h2>

      <input
        placeholder="姓名"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <select
        value={form.relation}
        onChange={(e) => setForm({ ...form, relation: e.target.value })}
      >
        <option>父親</option>
        <option>母親</option>
        <option>配偶</option>
        <option>子女</option>
        <option>兄弟姊妹</option>
      </select>

      <input
        placeholder="年齡"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />

      <select
        value={form.gender}
        onChange={(e) => setForm({ ...form, gender: e.target.value })}
      >
        <option>男</option>
        <option>女</option>
      </select>

      <button onClick={addPerson}>新增</button>

      <hr />

      <h2>家庭樹</h2>

      <div
        style={{
          border: "2px solid black",
          padding: 20,
          marginBottom: 20,
          display: "inline-block",
        }}
      >
        <b>{caseName}</b> ({caseGender}, {caseAge}歲)
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {people.map((p, i) => (
          <div
            key={i}
            style={{
              border: "1px solid gray",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <div>{p.name}</div>
            <div>{p.relation}</div>
            <div>{p.gender}</div>
            <div>{p.age}歲</div>
            <button onClick={() => removePerson(i)}>刪除</button>
          </div>
        ))}
      </div>
    </div>
  );
}
