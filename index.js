import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch"; // para llamar a Ollama
import { saludar } from "./tools/saludar.js";
import { contar_palabras } from "./tools/contar_palabras.js";
import { clima } from "./tools/clima.js";

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

const tools = { saludar, contar_palabras, clima };

// Endpoint de preguntas en lenguaje natural
app.post("/preguntar", async (req, res) => {
  const { pregunta } = req.body;
  let respuesta;
  let source = "ollama"; // por defecto

  try {
    if (/clima/i.test(pregunta)) {
      const ciudadMatch = pregunta.match(/en ([\wáéíóúÁÉÍÓÚ]+)/i);
      const ciudad = ciudadMatch ? ciudadMatch[1] : "Madrid";
      respuesta = await clima({ ciudad });
      source = "tool:clima";

    } else if (/hola|saludar/i.test(pregunta)) {
      const nombreMatch = pregunta.match(/hola (\w+)/i);
      const nombre = nombreMatch ? nombreMatch[1] : "amigo";
      respuesta = saludar({ nombre });
      source = "tool:saludar";

    } else if (/palabras/i.test(pregunta)) {
      respuesta = contar_palabras({ texto: pregunta });
      source = "tool:contar_palabras";

    } else {
      const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3",
          prompt: pregunta,
          stream: false  
        })
      });
      
      const data = await ollamaResponse.json();
      respuesta = data.response; // ahora vendrá todo en un solo string
      
      source = "ollama";
    }

    res.json({ output: respuesta, source });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor MCP corriendo en http://localhost:${PORT}`);
});
