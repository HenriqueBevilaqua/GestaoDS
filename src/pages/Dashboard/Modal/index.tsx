import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Grid, Modal, Switch } from '@mui/material';
import { Box } from "@mui/material";
import styled from "styled-components";
import CampoDigitacao from "../../../components/CampoDigitacao";
import Botao from "../../../components/Botao";
import IPaciente from "../../../types/IPaciente";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { TabPanel, TabView } from "primereact/tabview";

const BoxCustomizado = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  height: 90vh;
  overflow-y: auto;
  background-color: var(--branco);
  border: none;
  border-radius: 10px;
  padding: 1em 5em;
`;

const Container = styled.div`
text-align: left;
`

const ContainerSwitch = styled.div`
text-align: center;
`

const TextoSwitch = styled.p`
color: var(--cinza);
`

const BotaoCustomizado = styled(Botao)`
    width: 50%;
    display: block;
    margin: 0 auto;
`

const ContainerEndereco = styled.div`
display: grid;
grid-template-columns: 2fr 1fr;
grid-gap: 0 1em;
`

export default function ModalCadastro({ open, handleClose, data}: { open: boolean, handleClose: () => void, data: any}) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [nacionalidade, setNacionalidade] = useState("");
    const [cpf, setCPF] = useState("");
    const [data_nascimento, setDataNascimento] = useState("");
    const [cidade, setCidade] = useState("");
    const [genero, setGenero] = useState("");
    const [estado_civil, setEstadoCivil] = useState("");
    const [rg, setRG] = useState("");
    const [observacoes_adicionais, setObservacoesAdicionais] = useState("");
    const [uf, setUF] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [complemento, setComplemento] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cep, setCep] = useState("");


    //Adiciona dados
    const navigate = useNavigate();
    const addUserData = () => {
        const openRequest = indexedDB.open("clinica", 1);
        openRequest.onsuccess = function (event: any) {
            const db = event.target.result;
            const transaction = db.transaction("pacientes", "readwrite");
            const pacienteObjectStore = transaction.objectStore("pacientes");
            const paciente: IPaciente = {
                nome: nome,
                nacionalidade: nacionalidade,
                cpf: cpf,
                data_nascimento: data_nascimento,
                email: email,
                cidade: cidade,
                rg: rg,
                genero: genero,
                estado_civil: estado_civil,
                observacoes_adicionais: observacoes_adicionais,
            }
            const request = pacienteObjectStore.add(paciente);
        }
    };

    const buscaCep = () => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(
        resposta => resposta.json()
    ).then(dados => console.log(dados)).catch((erro => erro))
    }

    return (
        <>



            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >



                <BoxCustomizado>
                    <TabView>
                        <TabPanel header="Informações básicas">
                            <form onSubmit={addUserData}>
                                <Grid container spacing={1}>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="text" label="Paciente:" valor={nome} placeholder="Digite" onChange={setNome} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="email" label="Email" valor={email} placeholder="Digite" onChange={setEmail} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="text" label="Nacionalidade" valor={nacionalidade} placeholder="Digite" onChange={setNacionalidade} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="text" label="Nascimento" valor={data_nascimento} placeholder="Digite" onChange={setDataNascimento} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="text" label="CPF" valor={cpf} placeholder="Digite" onChange={setCPF} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="text" label="RG" valor={rg} placeholder="Digite" onChange={setRG} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="text" label="Gênero" valor={genero} placeholder="Digite" onChange={setGenero} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="text" label="Estado civil" valor={estado_civil} placeholder="Digite" onChange={setEstadoCivil} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="text" label="Observações adicionais" valor={observacoes_adicionais} placeholder="Digite" onChange={setObservacoesAdicionais} />
                                    </Grid>
                                </Grid>

                                <BotaoCustomizado>Próximo</BotaoCustomizado>
                            </form>
                        </TabPanel>
                        <TabPanel header="Contato">
                        <form onSubmit={addUserData}>
                                <Grid container spacing={1}>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="text" label="CEP:" valor={cep} placeholder="Digite" onChange={setCep} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="text" label="Cidade" valor={email} placeholder="Digite" onChange={setCidade} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="text" label="UF" valor={uf} placeholder="Digite" onChange={setUF} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="text" label="Endereço" valor={endereco} placeholder="Digite" onChange={setEndereco} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="number" label="Número" valor={numero} placeholder="Digite" onChange={setNumero} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="text" label="Bairro" valor={nome} placeholder="Digite" onChange={setBairro} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CampoDigitacao tipo="text" label="Complemento" valor={cidade} placeholder="Digite" onChange={setComplemento} />
                                    </Grid>
                                </Grid>

                                <BotaoCustomizado>Salvar</BotaoCustomizado>
                            </form>
                        </TabPanel>
                    </TabView>

                </BoxCustomizado>
            </Modal >
        </>
    );
}
