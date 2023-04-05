import { Router } from "express";
import { inserir, listar, atualizar, deletar, login } from "../controller/user";

export const routerUser = Router();

routerUser.get("/usuario", listar)
routerUser.post("/usuario", inserir)
routerUser.post("/login", login)
routerUser.put("/usuario", atualizar)
routerUser.delete("/usuario", deletar)

