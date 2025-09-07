import fetch from "node-fetch";
import readline from "readline";

const URL = "http://localhost:4000";

async function preguntar(pregunta) {
  const response = await fetch(`${URL}/preguntar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pregunta })
  });
  return response.json();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(" Chat iniciado (escribe 'salir' para terminar)\n");

function loop() {
  rl.question("> Tú: ", async (pregunta) => {
    if (pregunta.toLowerCase() === "salir") {
      console.log(" Hasta luego!");
      rl.close();
      return;
    }

    try {
      const data = await preguntar(pregunta);
      console.log(` Respuesta [${data.source}]: ${data.output}\n`);
    } catch (err) {
      console.error(" Error:", err.message);
    }

    loop();
  });
}

loop();
