<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <title>家庭樹建立系統</title>
    <style>
        body {
            font-family: Arial;
            padding: 20px;
        }
        input, select, button {
            margin: 5px;
            padding: 5px;
        }
        .card {
            border: 1px solid #ccc;
            padding: 10px;
            margin-top: 10px;
            width: 250px;
        }
    </style>
</head>

<body>

<h2>家庭樹輸入系統</h2>

<label>姓名：</label>
<input type="text" id="name">

<label>年齡：</label>
<input type="number" id="age">

<label>性別：</label>
<select id="gender">
    <option value="男">男</option>
    <option value="女">女</option>
</select>

<button onclick="addPerson()">新增成員</button>

<h3>家庭成員</h3>
<div id="familyList"></div>

<script>
    let family = [];

    function addPerson() {
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const gender = document.getElementById("gender").value;

        if (!name || !age) {
            alert("請輸入姓名與年齡");
            return;
        }

        const person = {
            name: name,
            age: age,
            gender: gender
        };

        family.push(person);
        renderFamily();

        // 清空輸入
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
    }

    function renderFamily() {
        const list = document.getElementById("familyList");
        list.innerHTML = "";

        family.forEach((p, index) => {
            list.innerHTML += `
                <div class="card">
                    <b>${p.name}</b><br>
                    年齡：${p.age}<br>
                    性別：${p.gender}
                </div>
            `;
        });
    }
</script>

</body>
</html>
