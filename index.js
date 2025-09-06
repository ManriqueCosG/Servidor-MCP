import express from "express";
import bodyParser from "body-parser";
import { saludar } from "./tools/saludar.js";
import { contar_palabras } from "./tools/contar_palabras.js";
import { clima } from "./tools/clima.js";

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

const tools = {
  saludar,
  contar_palabras,
  clima
};

// Endpoint para invocar herramientas directamente
app.post("/invoke/:tool", async (req, res) => {
  const toolName = req.params.tool;
  const input = req.body;

  if (tools[toolName]) {
    try {
      const output = await tools[toolName](input);
      res.json({ output });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(404).json({ error: "Herramienta no encontrada" });
  }
});

// ✅ Nuevo endpoint para preguntas en lenguaje natural
app.post("/preguntar", async (req, res) => {
  const { pregunta } = req.body;
  let respuesta;

  // Analizar la pregunta para decidir herramienta
  if (/clima/i.test(pregunta)) {
    // Extraer ciudad (simple, ejemplo)
    const ciudadMatch = pregunta.match(/en (\w+)/i);
    const ciudad = ciudadMatch ? ciudadMatch[1] : "Madrid";
    respuesta = await clima({ ciudad });
  } else if (/hola|saludar/i.test(pregunta)) {
    const nombreMatch = pregunta.match(/hola (\w+)/i);
    const nombre = nombreMatch ? nombreMatch[1] : "amigo";
    respuesta = saludar({ nombre });
  } else if (/palabras/i.test(pregunta)) {
    respuesta = contar_palabras({ texto: pregunta });
  } else {
    respuesta = "No sé cómo responder esa pregunta 😅";
  }

  res.json({ output: respuesta });
});

app.listen(PORT, () => {
  console.log(`Servidor MCP HTTP corriendo en http://localhost:${PORT}`);
});
