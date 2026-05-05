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

  const [lines, setLines] = useState<
    { x1: number; y1: number; x2: number; y2: number }[]
  >([]);

  const refs = useRef<Record<number, HTMLDivElement | null>>({});

  const addMember = () => {
    if (!gender) return;

    setMembers((prev) => [
      ...prev,
      {
        id: Date.now(),
        gender,
        relation,
      },
    ]);
  };

  // 👉 每次畫面更新就重算線
  useEffect(() => {
    const newLines: any[] = [];

    const getCenter = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    };

    const selfEl = Object.values(refs.current).find(
      (el) => el?.dataset.role === "self"
    );

    if (!selfEl) return;

    const selfPos = getCenter(selfEl);

    members.forEach((m) => {
      const el = refs.current[m.id];
      if (!el) return;

      const pos = getCenter(el);

      // 父母 / 配偶 → self
      if (["father", "mother", "spouse"].includes(m.relation)) {
        newLines.push({
          x1: pos.x,
          y1: pos.y,
          x2: selfPos.x,
          y2: selfPos.y,
        });
      }

      // self → child
      if (m.relation === "child") {
        newLines.push({
          x1: selfPos.x,
          y1: selfPos.y,
          x2: pos.x,
          y2: pos.y,
        });
      }
    });

    setLines(newLines);
  }, [members]);

  const self = members.find((m) => m.relation === "self");

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

        <button onClick={addMember}>新增</button>
      </div>

      {/* 線 */}
      <svg style={styles.svg}>
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="black"
          />
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
              ...(m.relation === "self"
                ? styles.self
                : m.gender === "male"
                ? styles.square
                : styles.circle),
            }}
          />
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { textAlign: "center", fontFamily: "Arial" },

  form: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    marginBottom: 20,
  },

  svg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    pointerEvents: "none",
  },

  board: {
    position: "relative",
    height: 500,
  },

  node: {
    width: 40,
    height: 40,
    position: "absolute",
    border: "2px solid black",
  },

  square: {},
  circle: { borderRadius: "50%" },

  self: {
    backgroundColor: "black",
  },
};
