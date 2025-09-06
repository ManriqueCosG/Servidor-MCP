import fetch from "node-fetch";

const URL = "http://localhost:4000";

async function invoke(tool, input) {
  const response = await fetch(`${URL}/invoke/${tool}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  const data = await response.json();
  console.log(data);
}

async function test() {
  console.log("Probando 'saludar'...");
  await invoke("saludar", { nombre: "Manri" });

  console.log("Probando 'contar_palabras'...");
  await invoke("contar_palabras", { texto: "Hola mundo desde MCP en Windows" });

  console.log("Probando 'clima'...");
  await invoke("clima", { ciudad: "Madrid" });
}

test();
