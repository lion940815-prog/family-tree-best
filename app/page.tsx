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

    setMembers([...members, { id, gender, relation }]);
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
      w: 600,
      h: 450,
      parentY: 60,
      midY: 200,
      childY: 340,
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2>專題級 Genogram</h2>

      {/* 控制區 */}
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

      {/* 畫布 */}
      <div style={styles.canvas}>
        <svg width="600" height="450" style={styles.svg}>
          {/* 父母 → 個案 */}
          {(fathers.length || mothers.length) > 0 && (
            <line x1={300} y1={80} x2={300} y2={200} stroke="black" />
          )}

          {/* 個案 → 子女 */}
          {children.map((_, i) => (
            <line
              key={i}
              x1={300}
              y1={220}
              x2={200 + i * 120}
              y2={340}
              stroke="black"
            />
          ))}

          {/* 配偶線 */}
          {spouse && (
            <line x1={220} y1={200} x2={380} y2={200} stroke="black" />
          )}
        </svg>

        {/* 父母 */}
        <div style={{ ...styles.row, top: layout.parentY }}>
          {fathers.map(renderNode)}
          {mothers.map(renderNode)}
        </div>

        {/* 配偶 + 個案 */}
        <div style={{ ...styles.midRow, top: layout.midY }}>
          {spouse && renderNode(spouse)}
          {self && renderSelf(self)}
        </div>

        {/* 子女 */}
        <div style={{ ...styles.row, top: layout.childY }}>
          {children.map(renderNode)}
        </div>
      </div>
    </div>
  );
}

/* ✅ 性別決定形狀（這次正確） */
function renderNode(m: Member) {
  return m.gender === "male" ? (
    <div style={styles.square} />
  ) : (
    <div style={styles.circle} />
  );
}

/* 個案：不改形狀，只做黑色填滿 */
function renderSelf(_: Member) {
  return <div style={styles.self} />;
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
    border: "1px solid #ccc",
  },

  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
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
