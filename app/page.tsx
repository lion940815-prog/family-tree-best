<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<title>家庭樹產生器（護理用）</title>
<style>
  #tree { margin-top: 20px; }
  .person {
    display: inline-block;
    padding: 10px;
    margin: 10px;
    border: 2px solid #000;
    text-align: center;
    border-radius: 10px;
    width: 80px;
  }
  .male { border-radius: 0px; }     /* 男性 = 方框 */
  .female { border-radius: 50px; }  /* 女性 = 圓形 */
  .main { border: 3px solid red; }  /* 個案 */
</style>
</head>
<body>

<h2>護理用家庭樹產生器</h2>

姓名：<input id="name">
性別：
<select id="gender">
  <option value="male">男</option>
  <option value="female">女</option>
</select>
年齡：<input id="age" type="number" min="0">
關係：
<select id="relation">
  <option value="self">個案</option>
  <option value="father">父親</option>
  <option value="mother">母親</option>
  <option value="brother">兄弟</option>
  <option value="sister">姊妹</option>
  <option value="son">兒子</option>
  <option value="daughter">女兒</option>
</select>

<button onclick="addPerson()">新增</button>

<div id="tree"></div>

<script>
let members = [];

function addPerson() {
  let name = document.getElementById("name").value;
  let gender = document.getElementById("gender").value;
  let age = document.getElementById("age").value;
  let relation = document.getElementById("relation").value;

  members.push({ name, gender, age, relation });
  renderTree();
}

function renderTree() {
  let tree = document.getElementById("tree");
  tree.innerHTML = "";

  members.forEach(m => {
    let div = document.createElement("div");
    div.classList.add("person");
    div.classList.add(m.gender);
    if (m.relation === "self") div.classList.add("main");
    div.innerHTML = `${m.name}<br>${m.age}歲<br>${translate(m.relation)}`;
    tree.appendChild(div);
  });
}

function translate(r) {
  const map = {
    self: "個案",
    father: "父",
    mother: "母",
    brother: "兄弟",
    sister: "姊妹",
    son: "子",
    daughter: "女"
  };
  return map[r] || r;
}
</script>

</body>
</html>
