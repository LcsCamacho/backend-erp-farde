import { Request, Response } from "express";
import { prisma } from "../services/connect";

export const listar = async (req: Request, res: Response) => {
  const funcionarios = await prisma.funcionario.findMany();
  res.json(funcionarios).status(200).end();
};

export const inserir = async (req: Request, res: Response) => {
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
  res.json(funcionario).status(200).end();
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
    res.json(error).status(500).end();
  }
};
export const deletarVarios = async (req: Request, res: Response) => {
  const funcionario = await prisma.funcionario.deleteMany();
  res.json(funcionario).status(200).end();
};

export const atualizar = async (req: Request, res: Response) => {
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
  res.json(funcionario).status(200).end();
};

export const atualizarLinkPerfil = async (req: Request, res: Response) => {
  const { id, linkPerfil } = req.body;
  const funcionario = await prisma.funcionario.update({
    where: {
      id: Number(id),
    },
    data: {
      linkPerfil,
    },
  });
  res.json(funcionario).status(201).end();
};

export const deletar = async (req: Request, res: Response) => {
  const { id } = req.params;
  const funcionario = await prisma.funcionario.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(funcionario).status(200).end();
};
