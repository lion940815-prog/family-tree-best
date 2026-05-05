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

    const newMember: Member = {
      id: idCounter,
      name,
      age,
      gender,
    };

    setMembers([...members, newMember]);
    setIdCounter(idCounter + 1);

    setName("");
    setAge("");
    setGender("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>護理家庭樹 Genogram</h1>

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
          <option value="">選擇性別</option>
          <option value="male">男性</option>
          <option value="female">女性</option>
        </select>

        <button onClick={addMember} style={styles.button}>
          新增家庭成員
        </button>
      </div>

      {/* 家庭樹顯示 */}
      <div style={styles.tree}>
        {members.map((m) => (
          <div key={m.id} style={styles.nodeWrapper}>
            {m.gender === "male" ? (
              <div style={{ ...styles.square, borderColor: "#4a90e2" }}>
                <div style={styles.symbol}>♂</div>
                <div>{m.name}</div>
                <div>{m.age}歲</div>
              </div>
            ) : (
              <div style={{ ...styles.circle, borderColor: "#e94e77" }}>
                <div style={styles.symbol}>♀</div>
                <div>{m.name}</div>
                <div>{m.age}歲</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: "Arial",
    padding: 30,
    textAlign: "center",
  },
  title: {
    marginBottom: 20,
  },
  form: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 30,
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    minWidth: 120,
  },
  button: {
    padding: 10,
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  tree: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },
  nodeWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  square: {
    width: 110,
    height: 110,
    border: "3px solid",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#f5faff",
  },

  circle: {
    width: 110,
    height: 110,
    border: "3px solid",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#fff5f8",
  },

  symbol: {
    fontSize: 18,
    fontWeight: "bold",
  },
};
