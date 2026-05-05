"use client";

import { useState } from "react";

type Relation = "self" | "father" | "mother" | "spouse" | "child";

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
    if (!gender) return;

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

  const self = members.find((m) => m.relation === "self");
  const fathers = members.filter((m) => m.relation === "father");
  const mothers = members.filter((m) => m.relation === "mother");
  const spouse = members.find((m) => m.relation === "spouse");
  const children = members.filter((m) => m.relation === "child");

  return (
    <div style={styles.container}>
      <h2>Genogram</h2>

      {/* 控制區 */}
      <div style={styles.form}>
        <select value={gender} onChange={(e) => setGender(e.target.value as any)} style={styles.input}>
          <option value="">性別</option>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>

        <select value={relation} onChange={(e) => setRelation(e.target.value as Relation)} style={styles.input}>
          <option value="self">個案</option>
          <option value="father">父親</option>
          <option value="mother">母親</option>
          <option value="spouse">配偶</option>
          <option value="child">子女</option>
        </select>

        <button onClick={addMember} style={styles.button}>
          新增
        </button>
      </div>

      {/* 圖 */}
      <div style={styles.canvas}>
        <svg style={styles.svg}>

          {/* 父母 → self */}
          {self &&
            fathers.map((_, i) => (
              <line key={"f" + i} x1={300} y1={80} x2={300} y2={180} stroke="black" />
            ))}

          {self &&
            mothers.map((_, i) => (
              <line key={"m" + i} x1={300} y1={80} x2={300} y2={180} stroke="black" />
            ))}

          {/* spouse ↔ self */}
          {self && spouse && (
            <line x1={200} y1={200} x2={400} y2={200} stroke="black" />
          )}

          {/* self → children */}
          {self &&
            children.map((_, i) => (
              <line
                key={"c" + i}
                x1={300}
                y1={220}
                x2={200 + i * 120}
                y2={350}
                stroke="black"
              />
            ))}
        </svg>

        {/* 節點（完全對齊座標） */}
        <div>
          {/* 父母 */}
          <div style={{ position: "absolute", left: 260, top: 40 }}>
            {fathers.map(renderNode)}
          </div>

          <div style={{ position: "absolute", left: 340, top: 40 }}>
            {mothers.map(renderNode)}
          </div>

          {/* 配偶 */}
          {spouse && (
            <div style={{ position: "absolute", left: 200, top: 180 }}>
              {renderNode(spouse)}
            </div>
          )}

          {/* self（黑色實心方形） */}
          {self && (
            <div style={{ position: "absolute", left: 280, top: 180 }}>
              <div style={styles.blackSquare} />
            </div>
          )}

          {/* children */}
          {children.map((c, i) => (
            <div
              key={c.id}
              style={{ position: "absolute", left: 200 + i * 120, top: 350 }}
            >
              {renderNode(c)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderNode(m: Member) {
  if (m.gender === "male") return <div style={styles.square} />;
  return <div style={styles.circle} />;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: "Arial",
    textAlign: "center",
  },

  form: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
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

  canvas: {
    position: "relative",
    height: 500,
  },

  svg: {
    position: "absolute",
    width: "100%",
    height: "100%",
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
