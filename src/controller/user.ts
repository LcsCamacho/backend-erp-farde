import { Request, Response } from "express";
import { prisma } from "../services/connect";

export const login = (req: Request, res: Response) => {
    const { cpf, password } = req.body;
    
    prisma.user.findUnique({
        where: {
            cpf
        }
    })
    .then(user => {
        if (user && user.password === password) {
            res.status(200).send({
                message: 'Usuário logado com sucesso!'
            }).end()
        } else {
            res.status(401).send({
                message: 'Usuário ou senha inválidos!'
            }).end()
        }
    })
}

export const inserir = (req: Request, res: Response) => {
    const { cpf, password } = req.body;
    
    prisma.user.create({
        data: {
            cpf,
            password
        }
    })
    .then(() => {
        res.status(201).send({
            message: 'Usuário cadastrado com sucesso!'
        }).end()
    })
    .catch(() => {
        res.status(500).send({
            message: 'Erro ao cadastrar usuário!'
        }).end()
    })
}

export const listar = (req: Request, res: Response) => {
    prisma.user.findMany()
    .then(users => {
        res.status(200).send(users).end()
    })
    .catch(() => {
        res.status(500).send({
            message: 'Erro ao listar usuários!'
        }).end()
    })
}

export const deletar = (req: Request, res: Response) => {
    
    const { cpf } = req.body;
    
    prisma.user.delete({
        where: {
            cpf
        }
    })
    .then(() => {
        res.status(200).send({
            message: 'Usuário deletado com sucesso!'
        }).end()
    })
    .catch(() => {
        res.status(500).send({
            message: 'Erro ao deletar usuário!'
        }).end()
    })
}

export const atualizar = (req: Request, res: Response) => {
    const { cpf, password } = req.body;
    
    prisma.user.update({
        where: {
            cpf
        },
        data: {
            password
        }
    })
    .then(() => {
        res.status(200).send({
            message: 'Usuário atualizado com sucesso!'
        }).end()
    })
    .catch(() => {
        res.status(500).send({
            message: 'Erro ao atualizar usuário!'
        }).end()
    })
}