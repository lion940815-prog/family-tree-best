"use client";

import { useMemo, useState } from "react";

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
  const [id, setId] = useState(1);

  const add = () => {
    if (!gender) return;

    setMembers([
      ...members,
      { id, gender, relation },
    ]);

    setId(id + 1);
    setGender("");
    setRelation("self");
  };

  const self = members.find((m) => m.relation === "self");
  const fathers = members.filter((m) => m.relation === "father");
  const mothers = members.filter((m) => m.relation === "mother");
  const spouse = members.find((m) => m.relation === "spouse");
  const children = members.filter((m) => m.relation === "child");

  const layout = useMemo(() => {
    return {
      fatherY: 60,
      midY: 200,
      childY: 340,
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2>Genogram</h2>

      {/* 控制 */}
      <div style={styles.form}>
        <select value={gender} onChange={(e) => setGender(e.target.value as any)}>
          <option value="">性別</option>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>

        <select value={relation} onChange={(e) => setRelation(e.target.value as Relation)}>
          <option value="self">個案</option>
          <option value="father">父親</option>
          <option value="mother">母親</option>
          <option value="spouse">配偶</option>
          <option value="child">子女</option>
        </select>

        <button onClick={add}>新增</button>
      </div>

      {/* 樹 */}
      <div style={styles.canvas}>
        <svg style={styles.svg}>
          {/* 父母 → self */}
          {(fathers.length > 0 || mothers.length > 0) && (
            <line x1={300} y1={80} x2={300} y2={200} stroke="black" />
          )}

          {/* self → children */}
          {children.map((_, i) => (
            <line
              key={i}
              x1={300}
              y1={240}
              x2={200 + i * 120}
              y2={340}
              stroke="black"
            />
          ))}

          {/* spouse 線 */}
          {spouse && (
            <line x1={220} y1={200} x2={380} y2={200} stroke="black" />
          )}
        </svg>

        {/* 父母 */}
        <div style={{ ...styles.row, top: layout.fatherY }}>
          {fathers.map((m) => renderNode(m))}
          {mothers.map((m) => renderNode(m))}
        </div>

        {/* 配偶 + 個案 */}
        <div style={{ ...styles.midRow, top: layout.midY }}>
          {spouse && renderNode(spouse)}
          {self && renderSelf()}
        </div>

        {/* 子女 */}
        <div style={{ ...styles.row, top: layout.childY }}>
          {children.map((m) => renderNode(m))}
        </div>
      </div>
    </div>
  );

  function renderSelf() {
    return <div style={styles.self} />;
  }

  function renderNode(m: Member) {
    return m.gender === "male" ? (
      <div style={styles.square} />
    ) : (
      <div style={styles.circle} />
    );
  }
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    textAlign: "center",
    fontFamily: "Arial",
  },

  form: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },

  canvas: {
    position: "relative",
    width: 600,
    height: 450,
    margin: "0 auto",
    border: "1px solid #ddd",
  },

  svg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },

  row: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: 40,
  },

  midRow: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: 80,
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

  self: {
    width: 40,
    height: 40,
    backgroundColor: "black",
  },
};
