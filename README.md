# Servidor MCP

Servidor MCP que combina herramientas locales (tools) y un modelo de lenguaje Ollama llama3 para responder preguntas en lenguaje natural.  
Permite que los usuarios hagan preguntas libres y el servidor decide si usar un tool específico o enviar la consulta al modelo de lenguaje.

---

## Funcionalidades

- Tools integrados:
  - `saludar` → saluda a la persona indicada.
  - `contar_palabras` → cuenta palabras de un texto.
  - `clima` → devuelve el clima de una ciudad.
- Preguntas en lenguaje natural:
  - El servidor decide si usar un tool o pasar la pregunta a Ollama.
- Cada respuesta incluye un campo `source` indicando su origen (`tool:clima`, `tool:saludar`, `tool:contar_palabras` o `ollama`).
- Cliente interactivo en consola para preguntar en tiempo real.

---

## Estructura del proyecto

Servidor-MCP/
│
├─ index.js # Servidor principal
├─ preguntas_client.js # Cliente interactivo
├─ tools/
│ ├─ saludar.js # Tool para saludar
│ ├─ contar_palabras.js # Tool para contar palabras
│ └─ clima.js # Tool para consultar clima
├─ package.json # Dependencias
└─ README.md

yaml
Copiar código

---

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/Servidor-MCP.git
cd Servidor-MCP
Instalar dependencias:

bash
Copiar código
npm install
Instalar Ollama y descargar el modelo llama3:

bash
Copiar código
ollama run llama3
Uso
Levantar el servidor MCP:

bash
Copiar código
node index.js
El servidor escucha en: http://localhost:4000

Abrir el cliente interactivo:

bash
Copiar código
node preguntas_client.js
Escribir preguntas de ejemplo:

less
Copiar código
Qué clima hace hoy en Madrid?
Respuesta [tool:clima]: El clima en Madrid es 25°C y soleado

Hola Manri
Respuesta [tool:saludar]: Hola, Manri

Cuántas palabras tiene este texto
Respuesta [tool:contar_palabras]: 6 palabras

Explícame qué es Node.js
Respuesta [ollama]: Node.js es un entorno de ejecución de JavaScript...
Funcionamiento interno
El servidor recibe la pregunta vía POST /preguntar.

Analiza la pregunta:

Si coincide con un tool, ejecuta el tool.

Si no, envía la pregunta a Ollama llama3.

Devuelve un JSON con:

json
Copiar código
{
  "output": "Respuesta generada",
  "source": "tool:clima" // o tool:saludar, tool:contar_palabras, ollama
}
Mejoras futuras
Añadir más tools personalizadas.

Guardar historial de preguntas y respuestas en la sesión.

Crear interfaz web para interacción más visual.

Añadir soporte para múltiples usuarios simultáneos.

Referencias
Ollama

Node.js

Express.js

node-fetch
