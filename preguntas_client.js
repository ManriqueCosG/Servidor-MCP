import fetch from "node-fetch";

const URL = "http://localhost:4000";

async function preguntar(pregunta) {
  const response = await fetch(`${URL}/preguntar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pregunta })
  });
  const data = await response.json();
  console.log("Pregunta:", pregunta);
  console.log("Respuesta:", data.output);
}

// Ejemplos
async function test() {
  await preguntar("Qué clima hace hoy en Madrid?");
  await preguntar("Hola Manri");
  await preguntar("Cuántas palabras tiene este texto de ejemplo");
}

test();
