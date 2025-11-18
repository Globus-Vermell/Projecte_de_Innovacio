import express from 'express';
import session from "express-session";
import publicacionesRouter from './routes/publications.js';
import arquitectosRouter from './routes/architects.js';
import reformasRouter from "./routes/reform.js";
import premiosRouter from "./routes/prizes.js";
import nomenclaturaRouter from "./routes/nomenclature.js";
import tipologiaRouter from "./routes/typology.js";
import proteccionRouter from "./routes/protection.js";
import construccionesRouter from "./routes/buildings.js";
import loginRouter from "./routes/login.js";
import FormularioEdificacionRouter from "./routes/buildingsForm.js";
import architectsFormRouter from "./routes/architectsForm.js";
import nomenclatureFormRouter from "./routes/nomenclatureForm.js";
import prizesFormRouter from "./routes/prizesForm.js";
import proteccionFormRouter from "./routes/protectionForm.js";
import reformasFormRouter from "./routes/reformForm.js";
import tipologiaFormRouter from "./routes/typologyForm.js";
import publicacionesFormRouter from "./routes/publicationsForm.js";
import architectsEditRouter from "./routes/architectsEdit.js";
import buildingsEditRouter from "./routes/buildingsEdit.js";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(session({
  secret: 'secretosecreto',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get("/home", (req, res) => {
  res.render("home", { user: req.session?.user });
});

app.use("/architects", arquitectosRouter);
app.use("/architects/form", architectsFormRouter);
app.use("/architects/edit", architectsEditRouter);
app.use("/buildings", construccionesRouter);
app.use("/buildings/form", FormularioEdificacionRouter);
app.use("/buildings/edit", buildingsEditRouter);
app.use("/", loginRouter);
app.use("/nomenclature", nomenclaturaRouter);
app.use("/nomenclature/form", nomenclatureFormRouter);
app.use("/prizes", premiosRouter);
app.use("/prizes/form", prizesFormRouter);
app.use("/protection", proteccionRouter);
app.use("/protection/form", proteccionFormRouter);
app.use('/publications', publicacionesRouter);
app.use("/publications/form", publicacionesFormRouter);
app.use("/reform", reformasRouter);
app.use("/reform/form", reformasFormRouter);
app.use("/typology", tipologiaRouter);
app.use("/typology/form", tipologiaFormRouter);


// Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});