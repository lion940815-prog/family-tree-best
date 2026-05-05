"use client";

import { useState } from "react";

type Relation =
  | "self"
  | "father"
  | "mother"
  | "spouse"
  | "sibling"
  | "child";

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
    if (!gender || !relation) return;

    const newMember: Member = {
      id: idCounter,
      name: name.trim() || undefined,
      age: age.trim() || undefined,
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

  const deleteMember = (id: number) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const self = members.find((m) => m.relation === "self");
  const fathers = members.filter((m) => m.relation === "father");
  const mothers = members.filter((m) => m.relation === "mother");
  const spouse = members.find((m) => m.relation === "spouse");
  const siblings = members.filter((m) => m.relation === "sibling");
  const children = members.filter((m) => m.relation === "child");

  return (
    <div style={styles.container}>
      <h2>護理家庭樹 Genogram</h2>

      {/* 輸入區 */}
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
          <option value="">性別</option>
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
          <option value="spouse">配偶</option>
          <option value="sibling">兄弟姊妹</option>
          <option value="child">子女</option>
        </select>

        <button onClick={addMember} style={styles.button}>
          新增
        </button>
      </div>

      {/* 樹狀圖 */}
      <div style={styles.treeWrapper}>
        <svg style={styles.svg}>
          {/* 父母 → 個案 */}
          {self &&
            fathers.map(() => (
              <line
                key={"father-line"}
                x1={centerX}
                y1={120}
                x2={centerX}
                y2={240}
                stroke="black"
              />
            ))}

          {self &&
            mothers.map(() => (
              <line
                key={"mother-line"}
                x1={centerX}
                y1={120}
                x2={centerX}
                y2={240}
                stroke="black"
              />
            ))}

          {/* 個案 → 子女 */}
          {self &&
            children.map((_, i) => (
              <line
                key={"child-" + i}
                x1={centerX}
                y1={360}
                x2={200 + i * 120}
                y2={500}
                stroke="black"
              />
            ))}
        </svg>

        {/* 分層 Layout */}
        <div style={styles.layout}>
          {/* 父母層 */}
          <div style={styles.row}>
            {fathers.map(renderNode)}
            {mothers.map(renderNode)}
          </div>

          {/* 配偶（左右個案） */}
          <div style={styles.spouseRow}>
            <div>{spouse && renderNode(spouse)}</div>
            <div>{self && renderNode(self)}</div>
          </div>

          {/* 兄弟姊妹 */}
          <div style={styles.row}>{siblings.map(renderNode)}</div>

          {/* 子女 */}
          <div style={styles.row}>{children.map(renderNode)}</div>
        </div>
      </div>
    </div>
  );

  function renderNode(m: Member) {
    const isMale = m.gender === "male";

    return (
      <div key={m.id} style={styles.node}>
        <div style={isMale ? styles.square : styles.circle}>
          <div>{isMale ? "□" : "○"}</div>

          {m.name && <div>{m.name}</div>}
          {m.age && <div>{m.age}歲</div>}

          <div style={{ fontSize: 10 }}>{m.relation}</div>

          {/* 刪除 */}
          <button
            onClick={() => deleteMember(m.id)}
            style={styles.deleteBtn}
          >
            刪除
          </button>
        </div>
      </div>
    );
  }
}

const centerX = 300;

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

  treeWrapper: {
    position: "relative",
    height: 600,
  },

  svg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  layout: {
    position: "relative",
  },

  row: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    margin: 25,
  },

  spouseRow: {
    display: "flex",
    justifyContent: "center",
    gap: 80,
    margin: 25,
    alignItems: "center",
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

  deleteBtn: {
    marginTop: 4,
    fontSize: 10,
    border: "1px solid black",
    background: "white",
    cursor: "pointer",
  },
};
