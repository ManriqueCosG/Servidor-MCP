# Servidor MCP - Proyecto de ejemplo

Este proyecto es un servidor HTTP que permite invocar **herramientas (tools)** a través de endpoints REST y también responder a **preguntas en lenguaje natural**. Está pensado como un proyecto base para un **servidor MCP** (Model Context Protocol).

---

## Estructura del proyecto

```
Servidor-mcp/
│
├─ index.js                 # Servidor principal
├─ test_client.js           # Cliente de prueba para /invoke/:tool
├─ preguntas_client.js      # Cliente interactivo para /preguntar (opcional)
├─ package.json
└─ tools/
    ├─ saludar.js           # Tool: saluda a un nombre
    ├─ contar_palabras.js   # Tool: cuenta palabras en un texto
    └─ clima.js             # Tool: devuelve clima de una ciudad
```

---

## Requisitos

* Node.js v18 o superior
* npm
* Windows, Linux o macOS

---

## Instalación

1. Clona o descarga el proyecto.
2. Abre la terminal en la carpeta del proyecto.
3. Instala las dependencias:

```bash
npm install express body-parser node-fetch
```

4. Asegúrate de que tu `package.json` tenga:

```json
{
  "type": "module"
}
```

Esto permite usar **import/export** de ES6.

---

## Ejecutar el servidor

```bash
node index.js
```

Salida esperada:

```
Servidor MCP HTTP corriendo en http://localhost:4000
```

---



## Endpoints del servidor

### 1. Invocar herramienta directamente

**POST** `/invoke/:tool`

* URL: `http://localhost:4000/invoke/saludar`
* Body (JSON):

```json
{
  "nombre": "Manri"
}
```

---

### 2. Preguntar en lenguaje natural

**POST** `/preguntar`

* URL: `http://localhost:4000/preguntar`
* Body (JSON):

```json
{
  "pregunta": "Qué clima hace hoy en Madrid?"
}
```

* El servidor detecta palabras clave y llama a la herramienta correspondiente (`clima`, `saludar`, `contar_palabras`).

---

## Cliente de prueba (Node.js)

### `test_client.js`

Prueba las herramientas directamente usando `/invoke/:tool`.

### `preguntas_client.js` (opcional)

Permite enviar preguntas en lenguaje natural al endpoint `/preguntar`.

```js
await preguntar("Qué clima hace hoy en Madrid?");
await preguntar("Hola Manri");
await preguntar("Cuántas palabras tiene este texto de ejemplo");
```

---

## Notas importantes

* En **Postman**, asegúrate de:

  * Método **POST**
  * URL correcta: `http://localhost:4000/preguntar`
  * Body → **raw → JSON**

* En Windows PowerShell, si quieres probar rápido:

```powershell
Invoke-RestMethod -Uri "http://localhost:4000/preguntar" -Method POST -Body '{"pregunta":"Qué clima hace hoy en Madrid?"}' -ContentType "application/json"
```

* No uses saltos de línea o espacios al final de la URL (`%0A` causará errores).
