"use client";

import { useState } from "react";

type Relation = "self" | "father" | "mother" | "spouse" | "child" | "sibling";

type Member = {
  id: number;
  gender: "male" | "female";
  relation: Relation;
};

export default function Home() {
  const [members, setMembers] = useState<Member[]>([]);
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [relation, setRelation] = useState<Relation>("self");
  const [idCounter, setIdCounter] = useState(1);

  const addMember = () => {
    if (!gender || !relation) return;

    setMembers([
      ...members,
      {
        id: idCounter,
        gender,
        relation,
      },
    ]);

    setIdCounter(idCounter + 1);
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
  const children = members.filter((m) => m.relation === "child");
  const siblings = members.filter((m) => m.relation === "sibling");

  return (
    <div style={styles.container}>
      <h2>護理家庭樹 Genogram</h2>

      {/* 輸入 */}
      <div style={styles.form}>
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
          {fathers.map((_, i) => (
            <line key={"f" + i} x1={300} y1={80} x2={300} y2={200} stroke="black" />
          ))}
          {mothers.map((_, i) => (
            <line key={"m" + i} x1={300} y1={80} x2={300} y2={200} stroke="black" />
          ))}

          {/* 配偶線 */}
          {spouse && (
            <line x1={200} y1={200} x2={400} y2={200} stroke="black" />
          )}

          {/* 子女 */}
          {children.map((_, i) => (
            <line
              key={"c" + i}
              x1={300}
              y1={260}
              x2={200 + i * 120}
              y2={380}
              stroke="black"
            />
          ))}
        </svg>

        {/* 節點 */}
        <div style={styles.layout}>
          {/* 父母 */}
          <div style={styles.row}>{fathers.map(renderSquare)}</div>
          <div style={styles.row}>{mothers.map(renderCircle)}</div>

          {/* 配偶 + 個案 */}
          <div style={styles.spouseRow}>
            {spouse && renderNode(spouse)}
            {self && renderSelf(self)}
          </div>

          {/* 兄弟姊妹 */}
          <div style={styles.row}>{siblings.map(renderNode)}</div>

          {/* 子女 */}
          <div style={styles.row}>{children.map(renderNode)}</div>
        </div>
      </div>
    </div>
  );

  function renderSelf(m: Member) {
    return <div style={styles.blackSquare} />;
  }

  function renderNode(m: Member) {
    return m.gender === "male" ? (
      <div style={styles.square} />
    ) : (
      <div style={styles.circle} />
    );
  }

  function renderSquare() {
    return <div style={styles.square} />;
  }

  function renderCircle() {
    return <div style={styles.circle} />;
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
    gap: 10,
    justifyContent: "center",
    marginBottom: 20,
  },

  input: {
    border: "1px solid black",
    padding: 6,
  },

  button: {
    border: "1px solid black",
    padding: 6,
    background: "white",
  },

  treeWrapper: {
    position: "relative",
    height: 500,
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
    margin: 20,
  },

  spouseRow: {
    display: "flex",
    justifyContent: "center",
    gap: 80,
    margin: 20,
    alignItems: "center",
  },

  square: {
    width: 40,
    height: 40,
    border: "2px solid black",
  },

  circle: {
    width: 40,
    height: 40,
    border: "2px solid black",
    borderRadius: "50%",
  },

  blackSquare: {
    width: 40,
    height: 40,
    backgroundColor: "black",
  },
};
