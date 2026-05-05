"use client";

import { useState } from "react";

type Relation = "self" | "father" | "mother" | "sibling" | "child";

type Member = {
  id: number;
  name: string;
  age: string;
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
    if (!name || !age || !gender || !relation) return;

    setMembers([
      ...members,
      {
        id: idCounter,
        name,
        age,
        gender,
        relation,
      },
    ]);

    setIdCounter(idCounter + 1);
    setName("");
    setAge("");
    setGender("");
    setRelation("self");
  };

  // 分層
  const self = members.find((m) => m.relation === "self");
  const fathers = members.filter((m) => m.relation === "father");
  const mothers = members.filter((m) => m.relation === "mother");
  const siblings = members.filter((m) => m.relation === "sibling");
  const children = members.filter((m) => m.relation === "child");

  return (
    <div style={styles.container}>
      <h2>護理家庭樹 Genogram（樹狀版）</h2>

      {/* 輸入區 */}
      <div style={styles.form}>
        <input
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="年齡"
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
          {/* 父母線 */}
          {self && fathers[0] && drawLine("father", "self")}
          {self && mothers[0] && drawLine("mother", "self")}

          {/* 子女線 */}
          {self &&
            children.map((c) => (
              <line
                key={c.id}
                x1={centerX}
                y1={300}
                x2={getX("child", c.id)}
                y2={450}
                stroke="black"
              />
            ))}

          {/* 兄弟姊妹線 */}
          {self &&
            siblings.map((s) => (
              <line
                key={s.id}
                x1={centerX}
                y1={300}
                x2={getX("sibling", s.id)}
                y2={300}
                stroke="black"
              />
            ))}
        </svg>

        {/* nodes */}
        <div style={styles.layer}>
          {/* 父母 */}
          <div style={styles.row}>
            {fathers.map(renderNode)}
            {mothers.map(renderNode)}
          </div>

          {/* self */}
          <div style={styles.row}>{self && renderNode(self)}</div>

          {/* siblings */}
          <div style={styles.row}>{siblings.map(renderNode)}</div>

          {/* children */}
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
          {isMale ? "□" : "○"}
          <div>{m.name}</div>
          <div>{m.age}歲</div>
          <div style={{ fontSize: 10 }}>{m.relation}</div>
        </div>
      </div>
    );
  }

  function drawLine(type: string, target: string) {
    return (
      <line
        x1={centerX}
        y1={type === "father" || type === "mother" ? 150 : 300}
        x2={centerX}
        y2={300}
        stroke="black"
      />
    );
  }

  const centerX = 300;

  function getX(_type: string, id: number) {
    return 100 + id * 50;
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

  layer: {
    position: "relative",
  },

  row: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    margin: 30,
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
