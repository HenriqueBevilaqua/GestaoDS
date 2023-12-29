import React, { useEffect, useState } from "react";
import Avaliacao from "../../components/Avaliacao";
import Botao from "../../components/Botao";
import Cabecalho from "../../components/Cabecalho";
import Container from "../../components/Container";
import Grafico from "../../components/Grafico";
import Rodape from "../../components/Rodape";
import Subtitulo from "../../components/Subtitulo";
import Tabela from "../../components/Tabela";
import Titulo from "../../components/Titulo";
import useDadosConsulta from "../../useDadosConsulta";
import useDadosProfissional from "../../useDadosProfissional";
import ModalCadastro from "./Modal";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Slider } from "primereact/slider";
import { ProgressBar } from "primereact/progressbar";
import gdsLogo from "./gdsLogo.png";
import styled from "styled-components";

export default function Dashboard() {
 let pacientes: any = []
 pacientes = sessionStorage.getItem('pacientes')
 
  // const pacientes = [{
  //       id: 1000,
  //       nome: 'James Butt',
  //       cpf: '7777777777',
  //       data_nascimento: '2015-09-13',
  //       email: 'unqualified',
  //       cidade: 'Santa Maria',
  //   }]
  //   pacientes.forEach(paciente => {
  //     localStorage.setItem('pacientes', JSON.stringify(paciente))
  //   })
    
  const Imagem = styled.img`
  widht:  230px;
  height: 184.17px;
  top: -12px;
  left: 730px;
  display: flex;
  justify-content: center
`;

    const [customers, setCustomers] = useState();
    const [filters, setFilters] = useState({} as any);
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const [representatives] = useState([
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'XuXue Feng', image: 'xuxuefeng.png' }
  ]);

  const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);

  const getSeverity = (status: any) => {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warning';

        case 'renewal':
            return null;
    }
};

useEffect(() => {
  setCustomers(getCustomers(pacientes) as any);
  setLoading(false);
  initFilters();
}, []);

const getCustomers = (data: any) => {
    return pacientes;
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
      <div className="flex justify-content-between">
          {/* <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} /> */}
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
          <Titulo>Listagem de pacientes</Titulo>
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Pesquisar" />
          </span>
          <Botao onClick={() => handleOpen()}>+ Adicionar paciente</Botao>
      </div>
  );
};

const clearFilter = () => {
  initFilters();
};

  const [open, setOpen] = useState(false);


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

const activityFilterTemplate = (options: any) => {
  return (
      <React.Fragment>
          <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3"></Slider>
          <div className="flex align-items-center justify-content-between px-2">
              <span>{options.value ? options.value[0] : 0}</span>
              <span>{options.value ? options.value[1] : 100}</span>
          </div>
      </React.Fragment>
  );
};

const activityBodyTemplate = (rowData: any) => {
  return <ProgressBar value={rowData.activity} showValue={false} style={{ height: '6px' }}></ProgressBar>;
};

  return (
    <Container>
      <Imagem src={gdsLogo} alt="Logo da gds" />
      
      <ModalCadastro open={open} handleClose={handleClose} />
      {/* <Titulo imagem="consulta">Consultas do Dia</Titulo> */}
      <DataTable value={pacientes} paginator showGridlines rows={10} loading={loading} dataKey="id" 
              filters={filters} globalFilterFields={['nome', 'cpf', 'data_nascimento', 'email', 'cidade']} header={header}
              emptyMessage="No customers found.">
          <Column field="nome" header="Nome" filter filterPlaceholder="Procurar por nome" style={{ minWidth: '12rem', color: '#136CDC' }} />
          <Column field="cpf" header="CPF" filter filterPlaceholder="Procurar por cpf" style={{ minWidth: '12rem', color: '#474747' }} />
          <Column field="data_nascimento" header="Data de Nascimento" filter filterPlaceholder="Procurar por data de nascimento" style={{ minWidth: '12rem', color: '#474747' }} filterElement={dateFilterTemplate} />
          <Column field="email" header="E-mail" filter filterPlaceholder="Procurar por e-mail" style={{ minWidth: '12rem', color: '#474747' }} />
          <Column field="cidade" header="Cidade" filter filterPlaceholder="Procurar por cidade" style={{ minWidth: '12rem', color: '#474747' }} />
      </DataTable>
      {/* <Titulo imagem="grafico">Consultas mensais por especialista</Titulo>
      <Subtitulo>Dezembro/22</Subtitulo>
      
      <Titulo imagem="avaliacao">Avaliações de especialistas</Titulo> */}
      
    </Container>
  )
}