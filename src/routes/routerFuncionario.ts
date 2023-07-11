import { Router } from "express";
import {
  inserir,
  listar,
  atualizar,
  deletar,
  atualizarLinkPerfil,
  inserirVarios,
  deletarVarios,
  desligarOuLigarFuncionario,
  listarDesligados,
  listarLigados,
} from "../controller/funcionario";

export const routerFuncionario = Router();

routerFuncionario.get("/funcionario/desligados", listarDesligados);
routerFuncionario.get("/funcionario/ligados", listarLigados);

routerFuncionario.get("/funcionario", listar);
routerFuncionario.post("/funcionario", inserir);
routerFuncionario.post("/funcionario/criarVarios", inserirVarios);
routerFuncionario.put("/funcionario/linkPerfil", atualizarLinkPerfil);
routerFuncionario.put("/funcionario", atualizar);
routerFuncionario.put(
  "/funcionario/desligarOuLigar/:id",
  desligarOuLigarFuncionario
);
routerFuncionario.delete("/funcionario/:id", deletar);
routerFuncionario.delete("/funcionario/deletarVarios", deletarVarios);
