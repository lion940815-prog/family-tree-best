"use client";

import { useState } from "react";

type Member = {
  id: number;
  name: string;
  age: string;
  gender: "male" | "female";
};

export default function Home() {
  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [idCounter, setIdCounter] = useState(1);

  const addMember = () => {
    if (!name || !age || !gender) return;

    setMembers([
      ...members,
      { id: idCounter, name, age, gender },
    ]);

    setIdCounter(idCounter + 1);
    setName("");
    setAge("");
    setGender("");
  };

  return (
    <div style={styles.container}>
      <h1>護理家庭樹 Genogram</h1>

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
          type="number"
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

        <button onClick={addMember} style={styles.button}>
          新增成員
        </button>
      </div>

      {/* 家庭樹容器 */}
      <div style={styles.treeWrapper}>
        {/* 關係線 SVG */}
        <svg style={styles.svg}>
          {members.length > 1 &&
            members.slice(1).map((m, i) => {
              const fromIndex = 0;
              const toIndex = i + 1;

              const fromPos = getPos(fromIndex);
              const toPos = getPos(toIndex);

              return (
                <line
                  key={m.id}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke="black"
                />
              );
            })}
        </svg>

        {/* 節點 */}
        <div style={styles.grid}>
          {members.map((m) => (
            <div key={m.id} style={styles.node}>
              <div style={m.gender === "male" ? styles.square : styles.circle}>
                <div>{m.gender === "male" ? "□" : "○"}</div>
                <div>{m.name}</div>
                <div>{m.age} 歲</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 計算節點位置（3欄 grid）
  function getPos(index: number) {
    const size = 160;
    const cols = 3;

    const col = index % cols;
    const row = Math.floor(index / cols);

    return {
      x: col * size + 80,
      y: row * size + 80,
    };
  }
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: "Arial",
    padding: 20,
    textAlign: "center",
  },

  form: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },

  input: {
    padding: 8,
    border: "1px solid black",
  },

  button: {
    padding: 8,
    border: "1px solid black",
    background: "white",
    cursor: "pointer",
  },

  treeWrapper: {
    position: "relative",
    width: "100%",
    height: 500,
    marginTop: 20,
  },

  svg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },

  grid: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(3, 160px)",
    justifyContent: "center",
    gap: 40,
  },

  node: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  square: {
    width: 100,
    height: 100,
    border: "2px solid black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  circle: {
    width: 100,
    height: 100,
    border: "2px solid black",
    borderRadius: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};
