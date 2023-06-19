import { Request, Response } from "express";
import { prisma } from "../services/connect";

export const listar = async (req: Request, res: Response) => {
  try {
    const funcionarios = await prisma.funcionario.findMany();
    if (funcionarios) res.json(funcionarios).status(200).end();
    else throw new Error("Erro ao listar funcionarios");
  } catch (error) {
    console.log(error);
    res
      .json({
        error: "Erro ao listar funcionarios",
        log: JSON.stringify(error),
        erro: true,
      })
      .status(500)
      .end();
  }
};

export const inserir = async (req: Request, res: Response) => {
  try {
    const { nome, sac, cidade, pdv, processoConcluido, linkPerfil } = req.body;
    const funcionario = await prisma.funcionario.create({
      data: {
        nome,
        sac,
        cidade,
        pdv,
        processoConcluido,
        linkPerfil,
      },
    });
    if (funcionario) res.json(funcionario).status(201).end();
    else throw new Error("Erro ao inserir funcionario");
  } catch (error) {}
};
export const inserirVarios = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const funcionario = await prisma.funcionario.createMany({
      data: req.body,
    });
    if (funcionario) res.json(funcionario).status(200).end();
    else throw new Error("Erro ao inserir funcionarios");
  } catch (error) {
    console.log(error);
    res
      .json({
        error: "Erro ao inserir funcionarios",
        log: JSON.stringify(error),
        erro: true,
      })
      .status(500)
      .end();
  }
};
export const deletarVarios = async (req: Request, res: Response) => {
  try {
    const funcionario = await prisma.funcionario.deleteMany();
    res
      .json({
        message: "Funcionarios deletados com sucesso",
        erro: false,
      })
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
    res
      .json({
        error: "Erro ao deletar funcionarios",
        log: JSON.stringify(error),
        erro: true,
      })
      .status(500)
      .end();
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const { id, nome, sac, cidade, pdv, processoConcluido, linkPerfil } =
      req.body;
    const funcionario = await prisma.funcionario.update({
      where: {
        id: Number(id),
      },
      data: {
        nome,
        sac,
        cidade,
        pdv,
        processoConcluido,
        linkPerfil,
      },
    });
    if (funcionario) res.json(funcionario).status(201).end();
    else throw new Error("Erro ao atualizar funcionario");
  } catch (error) {
    console.log(error);
    res
      .json({
        error: "Erro ao atualizar funcionario",
        log: JSON.stringify(error),
        erro: true,
      })
      .status(500)
      .end();
  }
};

export const atualizarLinkPerfil = async (req: Request, res: Response) => {
  try {
    const { id, linkPerfil } = req.body;
    const funcionario = await prisma.funcionario.update({
      where: {
        id: Number(id),
      },
      data: {
        linkPerfil,
      },
    });
    if (funcionario) res.json(funcionario).status(201).end();
    else throw new Error("Erro ao atualizar link do perfil");
  } catch (error) {
    console.log(error);
    res
      .json({
        error: "Erro ao atualizar link do perfil",
        log: JSON.stringify(error),
        erro: true,
      })
      .status(500)
      .end();
  }
};

export const deletar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const funcionario = await prisma.funcionario.delete({
      where: {
        id: Number(id),
      },
    });
    if (funcionario) res.json(funcionario).status(200).end();
    else throw new Error("Erro ao deletar funcionario");
  } catch (error) {
    console.log(error);
    res
      .json({
        error: "Erro ao deletar funcionario",
        log: JSON.stringify(error),
        erro: true,
      })
      .status(500)
      .end();
  }
};
