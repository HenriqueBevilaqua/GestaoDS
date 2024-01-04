import React, { useEffect, useRef, useState } from "react";
import Botao from "../../components/Botao";
import Container from "../../components/Container";
import Titulo from "../../components/Titulo";
import ModalCadastro from "./Modal";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator, PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Slider } from "primereact/slider";
import { ProgressBar } from "primereact/progressbar";
import gdsLogo from "./gdsLogo.png";
import styled from "styled-components";
import getPacientesData from "../../services/pacienteService";
import IPaciente from "../../types/IPaciente";

let pacientesData: IPaciente[]
pacientesData = getPacientesData()
export default function Dashboard() {


 
 const openRequest = indexedDB.open("clinica", 1);
 //Cria banco de dados
 openRequest.onupgradeneeded = function (event: any) {
  const db = event.target.result;
  const userObjectStore = db.createObjectStore("pacientes", {
    keyPath: "id",
    autoIncrement: true,
  });
  userObjectStore.createIndex("nome", "nome", { unique: false });
  userObjectStore.createIndex("cpf", "cpf", { unique: false });
  userObjectStore.createIndex("data_nascimento", "data_nascimento", { unique: false });
  userObjectStore.createIndex("email", "email", { unique: false });
  userObjectStore.createIndex("cidade", "cidade", { unique: false });
}
//Visualiza todos os dados


    
  const Imagem = styled.img`
  widht:  230px;
  height: 184.17px;
  top: -12px;
  left: 730px;
  display: flex;
  justify-content: center
`;

    const [pacientes, setPacientes] = useState(pacientesData);
    const [filters, setFilters] = useState({} as any);
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedPacientes, setSelectedPacientes] = useState();

useEffect(() => {
  const openRequest = indexedDB.open("clinica", 1);
  const retorno: any = [];
  openRequest.onsuccess = async function (event: any) {
    const db = event.target.result;
    const transaction = db.transaction("pacientes", "readonly");
    const userObjectStore = transaction.objectStore("pacientes");
    const request = userObjectStore.getAll();

    request.onsuccess = await function (event: any) {
      setPacientes(request.result)
    };
  }
 
  console.log(pacientesData)

  setLoading(false);
  initFilters();
}, []);

const getPacientes = (data: any) => {
    
    return data;
};
const initFilters = () => {
  setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
      status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS }
  });
  setGlobalFilterValue('');
};

const onGlobalFilterChange = (e: any) => {
  const value = e.target.value;
  let _filters = { ...filters };

  _filters['global'].value = value;

  setFilters(_filters);
  setGlobalFilterValue(value);
};

const renderHeader = () => {
  return (
      <div style={{display: 'flex', alignItems: 'center', gap: '16px'}} className="flex justify-content-between">
          <Titulo>Listagem de pacientes</Titulo>
          <span style = {{ marginLeft: 'auto'}}className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Pesquisar" />
          </span>
          <Botao onClick={() => handleOpen()}>+ Adicionar paciente</Botao>
      </div>
  );
};

  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const header = renderHeader();

  const dateFilterTemplate = (options: any) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
};

    const opcoes = (data: any) => {
      
      return (
        <React.Fragment>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editarPaciente(data)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmarExclusao(data)} />
        </React.Fragment>
    );
    }

    const editarPaciente = (data: any) => {
      return <ModalCadastro open={open} handleClose={handleClose} data = {data}/>
    }
    const confirmarExclusao = (data: any) => {
      return data
    }

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Imagem src={gdsLogo} alt="Logo da gds" />
      </div>
      
      <ModalCadastro open={open} handleClose={handleClose} data = {null}/>
      <DataTable value={pacientes} paginator showGridlines rows={10} loading={loading} dataKey="id" selection={selectedPacientes} onSelectionChange={(e: any) => setSelectedPacientes(e.value)}
              filters={filters} globalFilterFields={['nome', 'cpf', 'data_nascimento', 'email', 'cidade', 'acoes']} header={header}
              emptyMessage="No customers found.">
          <Column field="nome" header="Nome" sortable filterPlaceholder="Procurar por nome" style={{ minWidth: '12rem', color: '#136CDC' }} />
          <Column field="cpf" header="CPF" sortable filterPlaceholder="Procurar por cpf" style={{ minWidth: '12rem', color: '#474747' }} />
          <Column field="data_nascimento" header="Data de Nascimento" sortable filterPlaceholder="Procurar por data de nascimento" style={{ minWidth: '12rem', color: '#474747' }} filterElement={dateFilterTemplate} />
          <Column field="email" header="E-mail" sortable filterPlaceholder="Procurar por e-mail" style={{ minWidth: '12rem', color: '#474747' }} />
          <Column field="cidade" header="Cidade" sortable filterPlaceholder="Procurar por cidade" style={{ minWidth: '12rem', color: '#474747' }} />
          <Column field="acoes" header="Ações" body={opcoes} style={{ minWidth: '12rem', color: '#474747' }} exportable={false} /> 
      </DataTable>
      
    </Container>
  )
}