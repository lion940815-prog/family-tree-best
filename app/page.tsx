"use client";

import { useEffect, useRef, useState } from "react";

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

  const refs = useRef<Record<number, HTMLDivElement | null>>({});
  const [lines, setLines] = useState<
    { x1: number; y1: number; x2: number; y2: number }[]
  >([]);

  const add = () => {
    if (!gender) return;

    setMembers([
      ...members,
      {
        id: Date.now(),
        gender,
        relation,
      },
    ]);
  };

  const self = members.find((m) => m.relation === "self");

  // ✅ 真正修線（關鍵）
  useEffect(() => {
    const getCenter = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
      };
    };

    const selfEl = Object.values(refs.current).find(
      (el) => el?.dataset.role === "self"
    );

    if (!selfEl) return;

    const s = getCenter(selfEl);

    const newLines: any[] = [];

    members.forEach((m) => {
      const el = refs.current[m.id];
      if (!el) return;

      const p = getCenter(el);

      if (["father", "mother", "spouse"].includes(m.relation)) {
        newLines.push({
          x1: p.x,
          y1: p.y,
          x2: s.x,
          y2: s.y,
        });
      }

      if (m.relation === "child") {
        newLines.push({
          x1: s.x,
          y1: s.y,
          x2: p.x,
          y2: p.y,
        });
      }
    });

    setLines(newLines);
  }, [members]);

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

      {/* SVG 線 */}
      <svg style={styles.svg}>
        {lines.map((l, i) => (
          <line key={i} {...l} stroke="black" />
        ))}
      </svg>

      {/* 節點 */}
      <div style={styles.board}>
        {members.map((m) => (
          <div
            key={m.id}
            ref={(el) => (refs.current[m.id] = el)}
            data-role={m.relation}
            style={{
              ...styles.node,
              ...shape(m.gender),
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ✅ 性別決定形狀（你這點我完全照你要求修正） */
function shape(g: "male" | "female") {
  return g === "male" ? styles.square : styles.circle;
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

  board: {
    position: "relative",
    height: 500,
  },

  svg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    pointerEvents: "none",
  },

  node: {
    width: 40,
    height: 40,
    position: "absolute",
    border: "2px solid black",
  },

  square: {},
  circle: {
    borderRadius: "50%",
  },
};
