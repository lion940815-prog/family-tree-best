<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <title>Genogram 家庭樹（護理作業版）</title>
  <style>
    body {
      font-family: Arial;
      padding: 20px;
      background: #f7f7f7;
    }

    .panel {
      background: white;
      padding: 15px;
      border-radius: 10px;
      margin-bottom: 20px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    input, select, button {
      margin: 5px;
      padding: 6px;
    }

    .node {
      display: inline-block;
      padding: 10px;
      margin: 10px;
      border-radius: 10px;
      min-width: 120px;
      text-align: center;
      position: relative;
      background: #e3f2fd;
      border: 2px solid #90caf9;
    }

    .female {
      background: #fce4ec;
      border-color: #f48fb1;
    }

    .male {
      background: #e3f2fd;
    }

    #canvas {
      position: relative;
      min-height: 400px;
      background: white;
      border-radius: 10px;
      padding: 20px;
    }

    svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  </style>
</head>
<body>

<h2>🧬 護理作業專用家庭樹（Genogram）</h2>

<div class="panel">
  <h3>新增家庭成員</h3>
  <input id="name" placeholder="姓名" />
  <input id="age" type="number" placeholder="年齡" />
  <select id="gender">
    <option value="male">男</option>
    <option value="female">女</option>
  </select>
  <button onclick="addPerson()">新增</button>
</div>

<div class="panel">
  <h3>建立關係</h3>
  <select id="from"></select>
  <select id="relation">
    <option value="spouse">配偶</option>
    <option value="parent">父母 → 子女</option>
  </select>
  <select id="to"></select>
  <button onclick="addRelation()">建立關係</button>
</div>

<div id="canvas">
  <svg id="lines"></svg>
</div>

<script>
let people = [];
let relations = [];

function addPerson() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;

  if (!name) return alert("請輸入姓名");

  const id = Date.now();
  people.push({ id, nam
