import { Router } from "express";
import { inserir, listar, atualizar, deletar, atualizarLinkPerfil } from "../controller/funcionario";

export const routerFuncionario = Router();

routerFuncionario.get("/funcionario", listar)
routerFuncionario.post("/funcionario", inserir)
routerFuncionario.put("/funcionario/linkPerfil", atualizarLinkPerfil)
routerFuncionario.put("/funcionario", atualizar)
routerFuncionario.delete("/funcionario/:id", deletar)

