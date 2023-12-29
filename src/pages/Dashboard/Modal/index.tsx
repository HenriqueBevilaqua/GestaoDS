import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Modal, Switch } from '@mui/material';
import { Box } from "@mui/material";
import Titulo from "../../../components/Titulo";
import styled from "styled-components";
import CampoDigitacao from "../../../components/CampoDigitacao";
import Botao from "../../../components/Botao";
import Subtitulo from "../../../components/Subtitulo";
import IPaciente from "../../../types/IPaciente";
import usePost from "../../../usePost";
import autenticaStore from "../../../stores/autentica.store";

const BoxCustomizado = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  max-height: 90vh;
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

export default function ModalCadastro({ open, handleClose }: { open: boolean, handleClose: () => void }) {
    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [data_nascimento, setDataNascimento] = useState("");
    const [email, setEmail] = useState("");
    const [cidade, setCidade] = useState("");
    // const {cadastrarDados} = usePost();
    // const {usuario} = autenticaStore;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const pacientes = []
        const paciente: IPaciente = {
            nome: nome,
            cpf: cpf,
            data_nascimento: data_nascimento,
            email: email,
            cidade: cidade,
        }
        const request = indexedDB.open('clinica', 1);
 request.onupgradeneeded = function (event: any) {
  const db = event.target.result;
  // Create an object store
  const userObjectStore = db.createObjectStore("pacientes", {
    keyPath: "id",
    autoIncrement: true,
  });
  userObjectStore.createIndex("nome", "nome", { unique: false });
  userObjectStore.createIndex("cpf", "cpf", { unique: false });
  userObjectStore.createIndex("data_nascimento", "data_nascimento", { unique: false });
  userObjectStore.createIndex("email", "email", { unique: false });
  userObjectStore.createIndex("cidade", "cidade", { unique: false });
  const addUserData = (userData: any) => {
    request.onupgradeneeded = function (event: any) { 
        const db = event.target.result;
        const transaction = db.transaction("pacientes", "readwrite");
// Add data to the object store
const userObjectStore = transaction.objectStore("pacientes");
// Make a request to add userData
const request = userObjectStore.add(userData);
console.log(request)
}
}
addUserData(paciente)
  // Handle a success event
        }
    }

    const cadastrar = async (dados: IPaciente) => {

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
                    <Titulo>Cadastre o especialista inserindo os dados abaixo:</Titulo>
                    <form onSubmit={handleSubmit}>
                        <Container>
                            <CampoDigitacao tipo="text" label="Paciente:" valor={nome} placeholder="Digite" onChange={setNome} />
                            <CampoDigitacao tipo="email" label="Email" valor={email} placeholder="Digite" onChange={setEmail} />
                            <CampoDigitacao tipo="text" label="Nacionalidade" valor={nome} placeholder="Digite" onChange={setNome} />
                            <CampoDigitacao tipo="data_nascimento" label="Nascimento" valor={data_nascimento} placeholder="Digite" onChange={setDataNascimento} />
                            <CampoDigitacao tipo="cpf" label="CPF" valor={cpf} placeholder="Digite" onChange={setCPF} />
                            <CampoDigitacao tipo="text" label="RG" valor={nome} placeholder="Digite" onChange={setNome} />
                            <CampoDigitacao tipo="cidade" label="Gênero" valor={cidade} placeholder="Digite" onChange={setCidade} />
                            <CampoDigitacao tipo="cidade" label="Estado civil" valor={cidade} placeholder="Digite" onChange={setCidade} />
                            <CampoDigitacao tipo="cidade" label="Cidade" valor={cidade} placeholder="Digite" onChange={setCidade} />
                           
                            
                        </Container>
                        

                        <BotaoCustomizado>Próximo</BotaoCustomizado>
                    </form>
                </BoxCustomizado>
            </Modal >
        </>
    );
}
