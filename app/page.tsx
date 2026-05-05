"use client";

import { useState } from "react";

type Relation = "self" | "father" | "mother" | "sibling" | "child";

type Member = {
  id: number;
  name?: string;
  age?: string;
  gender: "male" | "female";
  relation: Relation;
};

export default function Home() {
  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [relation, setRelation] = useState<Relation>("self");
  const [idCounter, setIdCounter] = useState(1);

  const addMember = () => {
    // 👉 只限制「性別與關係」，姓名年齡可空
    if (!gender || !relation) return;

    const newMember: Member = {
      id: idCounter,
      name: name.trim() || "未知",
      age: age.trim() || "未知",
      gender,
      relation,
    };

    setMembers([...members, newMember]);
    setIdCounter(idCounter + 1);

    setName("");
    setAge("");
    setGender("");
    setRelation("self");
  };

  const self = members.find((m) => m.relation === "self");
  const fathers = members.filter((m) => m.relation === "father");
  const mothers = members.filter((m) => m.relation === "mother");
  const siblings = members.filter((m) => m.relation === "sibling");
  const children = members.filter((m) => m.relation === "child");

  return (
    <div style={styles.container}>
      <h2>護理家庭樹 Genogram</h2>

      {/* 輸入 */}
      <div style={styles.form}>
        <input
          placeholder="姓名（可空）"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="年齡（可空）"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={styles.input}
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as any)}
          style={styles.input}
        >
          <option value="">性別（必填）</option>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>

        <select
          value={relation}
          onChange={(e) => setRelation(e.target.value as Relation)}
          style={styles.input}
        >
          <option value="self">個案</option>
          <option value="father">父親</option>
          <option value="mother">母親</option>
          <option value="sibling">兄弟姊妹</option>
          <option value="child">子女</option>
        </select>

        <button onClick={addMember} style={styles.button}>
          新增
        </button>
      </div>

      {/* 樹 */}
      <div style={styles.tree}>
        {[...fathers, ...mothers, self, ...siblings, ...children]
          .filter(Boolean)
          .map((m) => m && renderNode(m))}
      </div>
    </div>
  );

  function renderNode(m: Member) {
    const isMale = m.gender === "male";

    return (
      <div key={m.id} style={styles.node}>
        <div style={isMale ? styles.square : styles.circle}>
          {isMale ? "□" : "○"}
          <div>{m.name || "未知"}</div>
          <div>{m.age || "未知"}歲</div>
          <div style={{ fontSize: 10 }}>{m.relation}</div>
        </div>
      </div>
    );
  }
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: "Arial",
    textAlign: "center",
    padding: 20,
  },

  form: {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },

  input: {
    border: "1px solid black",
    padding: 6,
  },

  button: {
    padding: 6,
    border: "1px solid black",
    background: "white",
    cursor: "pointer",
  },

  tree: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },

  node: {
    textAlign: "center",
  },

  square: {
    border: "2px solid black",
    width: 100,
    height: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  circle: {
    border: "2px solid black",
    width: 100,
    height: 100,
    borderRadius: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};
