import { Router } from "express";
import {
  inserir,
  listar,
  atualizar,
  deletar,
  atualizarLinkPerfil,
  inserirVarios,
  deletarVarios,
} from "../controller/funcionario";

export const routerFuncionario = Router();

routerFuncionario.get("/funcionario", listar);
routerFuncionario.post("/funcionario", inserir);
routerFuncionario.post("/funcionario/criarVarios", inserirVarios);
routerFuncionario.put("/funcionario/linkPerfil", atualizarLinkPerfil);
routerFuncionario.put("/funcionario", atualizar);
routerFuncionario.delete("/funcionario/:id", deletar);
routerFuncionario.delete("/funcionario/deletarVarios", deletarVarios);
