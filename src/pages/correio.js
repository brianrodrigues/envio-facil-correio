import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router";
import style from "../styles/correio.module.css";
import InputField from "../components/InputField";
import Button from "../components/ButtonSolid";
import LoadSave from "../components/loadSave";
import logo from "../assets/envio-facil-correio.png";
import iconArrow from "../assets/arrow.png";
import mask from "../scripts/mask";
import math from "../scripts/calculations";
import { Context } from "../router/Auth";

import "../global.css";

const Correio = ({ history }) => {
  const {
    setCheckDados,
    setProviderRemetente,
    setProviderDestinatario,
    setProviderProdutos,
    setSumTotal,
  } = useContext(Context);

  const [produtos, setProdutos] = useState([]);
  const [remetente, setRemetente] = useState(
    localStorage.getItem("remetente") === null
      ? {}
      : JSON.parse(localStorage.getItem("remetente"))
  );
  const [save, setSave] = useState(false);
  const [destinatario, setDestinatario] = useState({});
  const [status, setStatus] = useState("Produtos");

  const setProduct = (event) => {
    event.preventDefault();
    const { nome, quantidade, money } = event.target.elements;

    const total = math.multiplyCurrency(money.value, quantidade.value);

    if (nome.value && quantidade.value && money.value) {
      if (produtos.length <= 14) {
        setProdutos((array) => [
          ...array,
          {
            item: produtos.length + 1,
            nome: nome.value,
            quantidade: quantidade.value,
            valor: money.value,
            valorTotal: total,
          },
        ]);

        setSumTotal((array) => [...array, total]);
      } else {
        alert("Maximo 15 produtos");
      }
    } else {
      alert("Preencha todos os campos!");
    }
    setTimeout(() => {
      nome.value = "";
      quantidade.value = "";
      money.value = "";
    }, 500);
  };
  const deletarProduto = (id) => {
    var newList = [];
    produtos.forEach((produto) => {
      if (produto.item !== id) {
        newList.push({
          item: newList.length + 1,
          nome: produto.nome,
          quantidade: produto.quantidade,
          valor: produto.valor,
        });
      }
    });
    setProdutos(newList);
  };
  const setSender = async (event) => {
    event.preventDefault();

    const {
      logo,
      checkbox,
      nome,
      cpfcnpj,
      logradouro,
      numero,
      cep,
      cidade,
      estado,
      bairro,
    } = event.target.elements;

    setRemetente({
      Nome: nome.value,
      CpfCnpj: cpfcnpj.value,
      Logradouro: logradouro.value,
      Numero: numero.value,
      Cep: cep.value,
      Cidade: cidade.value,
      Estado: estado.value,
      Logo: logo.value,
      Bairro: bairro.value,
    });

    if (checkbox.checked) {
      handleSaveDelete("save");
    }
  };
  const setRecipient = (event) => {
    event.preventDefault();

    const { bairro, nome, cpfcnpj, logradouro, numero, cep, cidade, estado } =
      event.target.elements;

    setDestinatario({
      Nome: nome.value,
      CpfCnpj: cpfcnpj.value,
      Logradouro: logradouro.value,
      Numero: numero.value,
      Cep: cep.value,
      Cidade: cidade.value,
      Estado: estado.value,
      Bairro: bairro.value,
    });
  };
  const next = (event) => {
    event.preventDefault();

    if (status === "Produtos") {
      setStatus("Remetente");
    } else if (status === "Remetente") {
      handleSaveDelete("save");
      setStatus("Destinatário");
    } else if (status === "Destinatário") {
      setStatus("GEROU O PDF");
    }
  };
  const back = (event) => {
    event.preventDefault();
    if (status === "Remetente") {
      setStatus("Produtos");
    } else if (status === "Destinatário") {
      setStatus("Remetente");
    }
  };
  const print = () => {
    setProviderRemetente(remetente);
    setProviderDestinatario(destinatario);
    setProviderProdutos(produtos);
    setCheckDados(true);
    setTimeout(() => {
      history.push("/imprimir-declaracao");
    }, 500);
  };

  const handleSaveDelete = (event) => {
    if (event === "save") {
      var dados = JSON.stringify(remetente);
      localStorage.setItem("remetente", dados);
      console.log(JSON.parse(localStorage.getItem("remetente")));
    }
  };

  

  return (
    <div className={style.background}>
      <div className={style.header}>
        <img src={logo} height={60} alt="Logo Envio Facil"></img>
        <h1>{status}</h1>
      </div>
      {status === "Produtos" ? (
        <div className={style.container}>
          <div className={style.form}>
            <form onSubmit={setProduct}>
              <InputField
                label="Nome do produto"
                name="nome"
                type="text"
                placeholder="ex: macbook pro 2021"
                style={{
                  width: "auto",
                }}
              ></InputField>
              <InputField
                label="Quantidade"
                keyUp={mask.Number}
                name="quantidade"
                type="text"
                placeholder="ex: 2"
                style={{
                  width: "auto",
                }}
              ></InputField>
              <InputField
                label="Valor unitário"
                keyUp={mask.Currency}
                name="money"
                type="text"
                placeholder="ex: 450,57"
                style={{
                  width: "auto",
                }}
              ></InputField>
              <div className={style.button}>
                <Button
                  style={{
                    width: "35%",
                    margin: "15px",
                    background:
                      "linear-gradient(329.54deg, #ff9900 0%, #e1f80d 100%)",
                  }}
                  hasIcon={false}
                  title="Adicionar"
                  type="submit"
                ></Button>
                {produtos.length > 0 ? (
                  <Button
                    style={{
                      "font-size": "16px",
                      color: "#fff",
                      width: "35%",
                      margin: "5px",
                      background:
                        "linear-gradient(329.54deg, #006eff 0%, #0027a7 100%)",
                    }}
                    hasIcon={false}
                    title="PRÓXIMO"
                    click={next}
                    type="button"
                  ></Button>
                ) : null}
              </div>
            </form>
          </div>
          <div className={style.view}>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Conteúdo</th>
                  <th>Qtd</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr
                    onClick={() => {
                      deletarProduto(produto.item);
                    }}
                  >
                    <td>{produto.item}</td>
                    <td>{produto.nome}</td>
                    <td>{produto.quantidade}</td>
                    <td>R$ {produto.valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
      {status === "Remetente" ? (
        <div className={style.container}>
          <div className={style.form}>
            <form onSubmit={setSender}>
              <div className={style.grid}>
                <InputField
                  required={true}
                  label="Nome"
                  name="nome"
                  type="text"
                  placeholder="ex: João da Silva"
                  styleContainer={{ width: "100%", "margin-right": "5px" }}
                ></InputField>
                <InputField
                  required={true}
                  keyUp={mask.CpfCnpj}
                  label="CPF/CNPJ"
                  name="cpfcnpj"
                  type="text"
                  placeholder="ex: 000.000.000-00"
                  styleContainer={{ width: "100%", "margin-left": "5px" }}
                ></InputField>
              </div>
              <div className={style.grid}>
                <InputField
                  required={true}
                  label="Endereço (logradouro):"
                  name="logradouro"
                  type="text"
                  placeholder="ex: Rua Guilherme Filipini"
                  styleContainer={{ width: "100%", "margin-right": "5px" }}
                ></InputField>
                <InputField
                  required={true}
                  label="Número:"
                  name="numero"
                  type="text"
                  placeholder="ex: 381"
                  styleContainer={{ width: "50%", "margin-left": "5px" }}
                ></InputField>
              </div>
              <div className={style.grid}>
                <InputField
                  required={true}
                  label="Bairro:"
                  name="bairro"
                  type="text"
                  placeholder="ex: Jardim Andrade"
                  styleContainer={{ width: "100%", "margin-right": "5px" }}
                ></InputField>
                <InputField
                  required={true}
                  keyUp={mask.Cep}
                  label="CEP"
                  name="cep"
                  type="text"
                  placeholder="ex: 13920-000"
                  styleContainer={{ width: "100%", "margin-left": "5px" }}
                ></InputField>
              </div>
              <div className={style.grid}>
                <InputField
                  required={true}
                  label="Cidade"
                  name="cidade"
                  type="text"
                  placeholder="ex: Pedreira"
                  styleContainer={{ width: "100%", "margin-right": "5px" }}
                ></InputField>
                <InputField
                  required={true}
                  keyUp={mask.Estado}
                  label="Estado (Sigla)"
                  name="estado"
                  type="text"
                  placeholder="ex: SP"
                  styleContainer={{ width: "50%", "margin-left": "5px" }}
                ></InputField>
              </div>
              <InputField
                required={false}
                label="link da sua Logo (Opcional)"
                name="logo"
                type="text"
                placeholder="ex: https://seusite.com.br/logo.png"
              ></InputField>
              <div className={style.containerCheckbox}>
                <input type="checkbox" name="checkbox"></input>
                <h4>Lembre-me</h4>
              </div>
              <div className={style.button}>
                <Button
                  style={{
                    width: "15%",
                    margin: "15px",
                    "background-color": "transparent",
                    transform: "rotateY(180deg)",
                  }}
                  hasIcon={true}
                  icon={iconArrow}
                  type="button"
                  click={back}
                ></Button>
                <Button
                  style={{
                    "font-size": "16px",
                    width: "36%",
                    margin: "5px",
                    background:
                      "linear-gradient(329.54deg, #ff9900 0%, #e1f80d 100%)",
                  }}
                  hasIcon={false}
                  title="Salvar Dados"
                  type="submit"
                ></Button>
                {remetente.Nome !== undefined ? (
                  <Button
                    style={{
                      "font-size": "16px",
                      color: "#fff",
                      width: "25%",
                      margin: "5px",
                      background:
                        "linear-gradient(329.54deg, #006eff 0%, #0027a7 100%)",
                    }}
                    hasIcon={false}
                    title="PRÓXIMO"
                    click={next}
                    type="button"
                  ></Button>
                ) : null}
                {save ? <LoadSave></LoadSave> : null}
              </div>
            </form>
          </div>
          <div className={style.viewSender}>
            <div className={style.containerBox}>
              <div className={style.box}>Nome: {remetente.Nome}</div>
              <div className={style.box}>CPF/CNPJ: {remetente.CpfCnpj}</div>
            </div>
            <div className={style.containerBox}>
              <div className={style.box}>Endereço: {remetente.Logradouro}</div>
              <div className={style.box} style={{ width: "35%" }}>
                N°: {remetente.Numero}
              </div>
            </div>
            <div className={style.containerBox}>
              <div className={style.box}>Bairro: {remetente.Bairro}</div>
              <div className={style.box} style={{ width: "35%" }}>
                Cep: {remetente.Cep}
              </div>
            </div>
            <div className={style.containerBox}>
              <div className={style.box}>Cidade: {remetente.Cidade}</div>
              <div className={style.box}>Estado: {remetente.Estado}</div>
            </div>
          </div>
        </div>
      ) : null}
      {status === "Destinatário" ? (
        <div className={style.container}>
          <div className={style.form}>
            <form onSubmit={setRecipient}>
              <div className={style.grid}>
                <InputField
                  required={true}
                  label="Nome"
                  name="nome"
                  type="text"
                  placeholder="ex: João da Silva"
                  styleContainer={{ width: "100%", "margin-right": "5px" }}
                ></InputField>
                <InputField
                  required={true}
                  keyUp={mask.CpfCnpj}
                  label="CPF/CNPJ"
                  name="cpfcnpj"
                  type="text"
                  placeholder="ex: 000.000.000-00"
                  styleContainer={{ width: "100%", "margin-left": "5px" }}
                ></InputField>
              </div>
              <div className={style.grid}>
                <InputField
                  required={true}
                  label="Endereço (logradouro):"
                  name="logradouro"
                  type="text"
                  placeholder="ex: Rua Guilherme Filipini"
                  styleContainer={{ width: "100%", "margin-right": "5px" }}
                ></InputField>
                <InputField
                  required={true}
                  label="Número:"
                  name="numero"
                  type="text"
                  placeholder="ex: 381"
                  styleContainer={{ width: "50%", "margin-left": "5px" }}
                ></InputField>
              </div>
              <div className={style.grid}>
                <InputField
                  required={true}
                  label="Bairro:"
                  name="bairro"
                  type="text"
                  placeholder="ex: Jardim Andrade"
                  styleContainer={{ width: "100%", "margin-right": "5px" }}
                ></InputField>
                <InputField
                  required={true}
                  keyUp={mask.Cep}
                  label="CEP"
                  name="cep"
                  type="text"
                  placeholder="ex: 13920-000"
                  styleContainer={{ width: "100%", "margin-left": "5px" }}
                ></InputField>
              </div>
              <div className={style.grid}>
                <InputField
                  required={true}
                  label="Cidade"
                  name="cidade"
                  type="text"
                  placeholder="ex: Pedreira"
                  styleContainer={{ width: "100%", "margin-right": "5px" }}
                ></InputField>
                <InputField
                  required={true}
                  keyUp={mask.Estado}
                  label="Estado (Sigla)"
                  name="estado"
                  type="text"
                  placeholder="ex: SP"
                  styleContainer={{ width: "50%", "margin-left": "5px" }}
                ></InputField>
              </div>

              <div className={style.button}>
                <Button
                  style={{
                    width: "15%",
                    margin: "15px",
                    "background-color": "transparent",
                    transform: "rotateY(180deg)",
                  }}
                  hasIcon={true}
                  icon={iconArrow}
                  type="button"
                  click={back}
                ></Button>
                <Button
                  style={{
                    "font-size": "16px",
                    width: "40%",
                    margin: "5px",
                    background:
                      "linear-gradient(329.54deg, #ff9900 0%, #e1f80d 100%)",
                  }}
                  hasIcon={false}
                  title="Salvar Dados"
                  type="submit"
                ></Button>
                {destinatario.Nome !== undefined ? (
                  <Button
                    style={{
                      "font-size": "16px",
                      color: "#fff",
                      width: "25%",
                      margin: "5px",
                      background:
                        "linear-gradient(329.54deg, #006eff 0%, #0027a7 100%)",
                    }}
                    hasIcon={false}
                    title="IMPRIMIR"
                    click={print}
                    type="button"
                  ></Button>
                ) : null}
              </div>
            </form>
          </div>
          <div className={style.viewSender}>
            <div className={style.containerBox}>
              <div className={style.box}>Nome: {destinatario.Nome}</div>
              <div className={style.box}>CPF/CNPJ: {destinatario.CpfCnpj}</div>
            </div>
            <div className={style.containerBox}>
              <div className={style.box}>
                Endereço: {destinatario.Logradouro}
              </div>
              <div className={style.box} style={{ width: "35%" }}>
                N°: {destinatario.Numero}
              </div>
            </div>
            <div className={style.containerBox}>
              <div className={style.box}>Bairro: {destinatario.Bairro}</div>
              <div className={style.box} style={{ width: "35%" }}>
                Cep: {destinatario.Cep}
              </div>
            </div>
            <div className={style.containerBox}>
              <div className={style.box}>Cidade: {destinatario.Cidade}</div>
              <div className={style.box}>Estado: {destinatario.Estado}</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(Correio);
