import express from "express";

const app = express();
let frase = "Frase inicial";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/frase", (req, res) => {
  res.send({
    frase,
  });
});

app.get("/api/palabras/:pos", (req, res) => {
  const position = Number(req.params.pos);

  const palabra = frase.split(" ")[position - 1];

  res.send({
    buscada: palabra,
  });
});

app.post("/api/palabras", (req, res) => {
  const nuevaPalabra = req.body.palabra;

  if (!nuevaPalabra) {
    res.status(400).send({ error: "Palabra inválida" });
  }

  frase = frase ? `${frase} ${nuevaPalabra}` : nuevaPalabra;

  res.status(201).send({
    agregada: nuevaPalabra,
    pos: frase.split(" ").length,
  });
});

app.put("/api/palabras/:pos", (req, res) => {
  const position = Number(req.params.pos);
  const nuevaPalabra = req.body.palabra;
  let anterior;

  frase = frase
    .split(" ")
    .map((p, idx) => {
      if (idx + 1 === position) {
        anterior = p;
        return nuevaPalabra;
      }

      return p;
    })
    .join(" ");

  res.send({
    actualizada: nuevaPalabra,
    anterior,
  });
});

app.delete("/api/palabras/:pos", (req, res) => {
  const position = Number(req.params.pos);

  frase = frase
    .split(" ")
    .filter((_, idx) => {
      return idx + 1 !== position;
    })
    .join(" ");

  res.status(200).send();
});

app.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080");
});