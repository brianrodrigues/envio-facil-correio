import React, { useState, useContext } from "react";
import { withRouter } from "react-router";
import style from "../styles/correioImprimir.module.css";
import Button from "../components/ButtonSolid";
import TextField from "../components/TextField";
import LogoCorreio from "../assets/correios.png";
import iconPrint from "../assets/printing.png";
import math from "../scripts/calculations";
import { Context } from "../router/Auth";

import "../global.css";

const CorreioImprimir = () => {
  const { remetente, destinatario, produtos, sumTotal } = useContext(Context);

  const [docPrint, setDocPrint] = useState("");
  const [hideTopBar, setHideTopBar] = useState(false);

  const mes = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const data = new Date();

  const print = (event) => {
    setDocPrint(event);
    setHideTopBar(true);
    setTimeout(() => {
      window.print();
    }, 500);
    setTimeout(() => {
      setDocPrint("");
      setHideTopBar(false);
    }, 1000);
  };

  return (
    <div className={style.container}>
      {hideTopBar === false ? (
        <div className={style.topBar}>
          <div className={style.containerTopBar}>
            <Button
              style={{
                "font-size": "16px",
                width: "60%",
                "max-width": "300px",
                margin: "5px",
                background:
                  "linear-gradient(329.54deg, #ff9900 0%, #e1f80d 100%)",
              }}
              hasIcon={true}
              icon={iconPrint}
              title="Declaração"
              type="button"
              click={() => print("declaracao")}
            ></Button>
            <Button
              style={{
                "font-size": "16px",
                width: "60%",
                "max-width": "300px",
                margin: "5px",
                background:
                  "linear-gradient(329.54deg, #ff9900 0%, #e1f80d 100%)",
              }}
              hasIcon={true}
              icon={iconPrint}
              title="Etiqueta"
              type="button"
              click={() => print("etiqueta")}
            ></Button>
          </div>
        </div>
      ) : null}
      {docPrint === "declaracao" || docPrint === "" ? (
        <div className={style.declaracao}>
          <div className={style.headerDeclaracao}>
            <img
              height={50}
              src={remetente.Logo ? remetente.Logo : LogoCorreio}
            ></img>
            <h2>Declaração de Conteúdo</h2>
          </div>
          <div className={style.containerDadosPessoais}>
            <div className={style.dadosRemetente}>
              <h4>Remetente:</h4>
              <TextField
                styleContainer={{ "border-top": "1px solid #101010" }}
                title="Nome"
                value={remetente.Nome}
              />
              <TextField title="CPF/CNPJ" value={remetente.CpfCnpj} />
              <TextField
                title="Endereço"
                value={
                  remetente.Logradouro +
                  ", " +
                  remetente.Numero +
                  ", " +
                  remetente.Bairro
                }
              />
              <div style={{ display: "flex" }}>
                <TextField
                  title="Cidade/UF"
                  value={remetente.Cidade + "/" + remetente.Estado}
                />
                <TextField
                  styleContainer={{ width: "40%" }}
                  title="CEP"
                  value={remetente.Cep}
                />
              </div>
            </div>
            <div className={style.dadosDestinatario}>
              <h4>Destinatário:</h4>
              <TextField
                styleContainer={{ "border-top": "1px solid #101010" }}
                title="Nome"
                value={destinatario.Nome}
              />
              <TextField title="CPF/CNPJ" value={destinatario.CpfCnpj} />
              <TextField
                title="Endereço"
                value={
                  destinatario.Logradouro +
                  ", " +
                  destinatario.Numero +
                  ", " +
                  remetente.Bairro
                }
              />
              <div style={{ display: "flex" }}>
                <TextField
                  title="Cidade/UF"
                  value={destinatario.Cidade + "/" + destinatario.Estado}
                />
                <TextField
                  styleContainer={{ width: "40%" }}
                  title="CEP"
                  value={destinatario.Cep}
                />
              </div>
            </div>
          </div>
          <div className={style.containerProduct}>
            <div
              style={{
                width: "100%",
                "background-color": "rgb(197,197,197)",
                color: "#101010",
              }}
            >
              Identificação dos Bens
            </div>
            <table>
              <thead>
                <tr>
                  <th>Qtd</th>
                  <th>Discriminação do Conteúdo</th>
                  <th>Valor unitario</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr>
                    <td>{produto.quantidade}</td>
                    <td>{produto.nome}</td>
                    <td>{"R$ " + produto.valor}</td>
                    <td>{"R$ " + produto.valorTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              style={{
                "font-weight": "bolder",
                width: "100%",
                color: "#101010",
                "font-size": "1rem",
                "text-align": "end",
                "padding-right": "10px",
              }}
            >
              Valor Total: R$ {math.somaArray(sumTotal)}
            </div>
          </div>
          <div className={style.containerDeclaracao}>
            <div
              style={{
                width: "100%",
                "background-color": "rgb(197,197,197)",
                color: "#101010",
              }}
            >
              Declaração
            </div>
            <p>
              Declaro ainda que não estou postando conteúdo inflamável,
              explosivo, causador de combustão espontânea, tóxico, corrosivo,
              gás ou qualquer outro conteúdo que constitua perigo, conforme o
              art. 13 da Lei Postal nº 6.538/78. Declaro que não me enquadro no
              conceito de contribuinte previsto no art. 4º da Lei Complementar
              nº 87/1996, uma vez que não realizo, com habitualidade ou em
              volume que caracterize intuito comercial, operações de circulação
              de mercadoria, ainda que se iniciem no exterior, ou estou
              dispensado da emissão da nota fiscal por força da legislação
              tributária vigente, responsabilizando-me, nos termos da lei e a
              quem de direito, por informações inverídicas.
            </p>
            <div
              style={{ display: "flex", width: "100%", "margin-top": "30px" }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  color: "#101010",
                  "font-size": "0.9rem",
                }}
              >
                <span
                  style={{
                    "border-bottom": "1px solid #101010",
                    padding: "0px 10px",
                  }}
                >
                  {remetente.Cidade}
                </span>
                <div>,</div>
                <span
                  style={{
                    "border-bottom": "1px solid #101010",
                    padding: "0px 10px",
                  }}
                >
                  {data.getDate()}
                </span>
                <div>de</div>
                <span
                  style={{
                    "border-bottom": "1px solid #101010",
                    padding: "0px 10px",
                  }}
                >
                  {mes[data.getMonth()]}
                </span>
                <div>de</div>
                <span
                  style={{
                    "border-bottom": "1px solid #101010",
                    padding: "0px 10px",
                  }}
                >
                  {data.getFullYear()}
                </span>
              </div>
              <div
                style={{
                  width: "50%",
                  "border-bottom": "1px solid #101010",
                  position: "relative",
                }}
              >
                <p
                  style={{
                    position: "absolute",
                    bottom: "-25px",
                    width: "100%",
                    "text-aling": "center",
                  }}
                >
                  Assinatura do Declarante/Remetente
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              "margin-top": "40px",
              "font-size": "0.75rem",
              color: "#101010",
            }}
          >
            <p>
              Atenção: O declarante/remetente é responsável exclusivamente pelas
              informações declaradas.
            </p>
            <p>
              Observações: Constitui crime contra a ordem tributária suprimir ou
              reduzir tributo, ou contribuição social e qualquer acessório (Lei
              8.137/90 Art. 1o, V)
            </p>
          </div>
        </div>
      ) : null}
      {docPrint === "etiqueta" || docPrint === "" ? (
        <div className={style.etiqueta}>
          <div className={style.headerEtiqueta} style={{border:"1px solid #101010"}}>
            <img
              height={50}
              src={remetente.Logo ? remetente.Logo : LogoCorreio}
            ></img>
            <div className={style.dadosRemetente} style={{padding:"5px"}}>
              <TextField
                styleContainer={{ border: "none" }}
                title="Remetente"
                value={remetente.Nome}
              />
              <TextField
                styleContainer={{ border: "none" }}
                title="CPF/CNPJ"
                value={remetente.CpfCnpj}
              />
              <TextField
                styleContainer={{ border: "none" }}
                title="Endereço"
                value={remetente.Logradouro + ", " + remetente.Numero}
              />
              <div style={{ display: "flex" }}>
                <TextField
                  styleContainer={{ border: "none" }}
                  title="Cidade/UF"
                  value={remetente.Cidade + " / " + remetente.Estado}
                />
                <TextField
                  styleContainer={{ width: "45%",border: "none" }}
                  title="CEP"
                  value={remetente.Cep}
                />
              </div>
            </div>
            
          </div>
          <div className={style.containerDadosPessoais}>
            
            <div
              className={style.dadosDestinatario}
              style={{ "margin-top": "5px" }}
            >
              <h4>Destinatário:</h4>
              <TextField
                styleContainer={{ "border-top": "1px solid #101010" }}
                title="Nome"
                value={destinatario.Nome}
              />
              <TextField title="CPF/CNPJ" value={destinatario.CpfCnpj} />
              <TextField
                title="Endereço"
                value={destinatario.Logradouro + ", " + destinatario.Numero+", "+destinatario.Bairro}
              />
              <div style={{ display: "flex" }}>
                <TextField
                  title="Cidade/UF"
                  value={destinatario.Cidade + " / " + destinatario.Estado}
                />
                <TextField
                  styleContainer={{ width: "40%" }}
                  title="CEP"
                  value={destinatario.Cep}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(CorreioImprimir);
