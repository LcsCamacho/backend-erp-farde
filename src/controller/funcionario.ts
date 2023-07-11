import { Request, Response } from "express";
import { prisma } from "../services/connect";
import nodemailer from "nodemailer";
import { google } from "googleapis";

interface EnviarEmailFn {
  email: string;
  text: string;
}
//id oAuth2 = 762945846622-75dghpkqivb83dp4bhlugsc11fvoghu4.apps.googleusercontent.com
//chave = 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
//refresh token = 1//04O2t0kYgHbBtCgYIARAAGAQSNwF-L9IrE0lSPy8pikmEOJavnX3-n6m71RfLe1AbkmSyLf-TR8Bry6XuN4kVXFK4GPGlZJF1wl8

const enviarEmail = async ({ email, text }: EnviarEmailFn) => {
  try {
    const clientId =
      "762945846622-75dghpkqivb83dp4bhlugsc11fvoghu4.apps.googleusercontent.com";
    const secret = "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";
    const token =
      "1//04O2t0kYgHbBtCgYIARAAGAQSNwF-L9IrE0lSPy8pikmEOJavnX3-n6m71RfLe1AbkmSyLf-TR8Bry6XuN4kVXFK4GPGlZJF1wl8";
    const redirectUrl = "https://developers.google.com/oauthplayground";

    const oAuth2Client = new google.auth.OAuth2(clientId, secret, redirectUrl);

    oAuth2Client.setCredentials({ refresh_token: token });

    const accessToken = oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      logger: true,
      debug: true,
      auth: {
        type: "OAuth2",
        user: "lucas.camachofilho@gmail.com",
        clientId: clientId,
        clientSecret: secret,
        refreshToken: token,
        accessToken,
      },
    });
    transporter.sendMail(
      {
        from: "lucas.camachofilho@gmail.com",
        to: "lucaspaiva@paivatechinfo.com",
        subject: "Alteração de status ERP-FARDE",
        text: text,
      },
      (err, info) => {
        if (err) console.log(err);
        else console.log(info);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const listarDesligados = async (req: Request, res: Response) => {
  try {
    const funcionarios = await prisma.funcionario.findMany({
      where: {
        ativo: false,
      },
    });
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

export const listarLigados = async (req: Request, res: Response) => {
  try {
    const funcionarios = await prisma.funcionario.findMany({
      where: {
        ativo: true,
      },
    });
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

export const desligarOuLigarFuncionario = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const funcionarioExistente = await prisma.funcionario.findUnique({
      where: {
        id: Number(id),
      },
    });

    const funcionario = await prisma.funcionario.update({
      where: {
        id: Number(id),
      },
      data: {
        ativo: funcionarioExistente?.ativo ? false : true,
      },
    });
    if (funcionario) {
      const emailData = {
        email: "Lucaspaiva@paivatechinfo.com",
        text: `Olá Lucas Paiva! Sobre o funcionário ${
          funcionarioExistente?.nome
        } do sistema ERP-FARDE,
          seu status foi alterado para ${
            funcionarioExistente?.ativo ? "desligado" : "ligado"
          }.`,
      };
      await enviarEmail(emailData);
      res.json(funcionario).status(200).end();
    }
  } catch (error) {
    console.log(error);
    res
      .json({
        error: "Erro ao desligar funcionario",
        log: JSON.stringify(error),
        erro: true,
      })
      .status(500)
      .end();
  }
};

export const listar = async (req: Request, res: Response) => {
  try {
    const funcionarios = await prisma.funcionario.findMany({});
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
    const funcionarios = await prisma.funcionario.deleteMany();
    res.status(200).json({
      message: "Funcionários deletados com sucesso",
      erro: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erro ao deletar funcionários",
      log: JSON.stringify(error),
      erro: true,
    });
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
