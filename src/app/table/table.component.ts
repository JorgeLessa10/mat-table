import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface TeamData {
  id: string;
  description: string;
}

/**
 * Populando a tabela com os cluber encontrados no link: https://pt.wikipedia.org/wiki/Lista_dos_60_clubes_de_futebol_mais_antigos_do_Brasil
 */
const DESCRIPTIONS: string[] = [
  'America Football Club', 'América Futebol Clube', 'Associação Atlética Francana', 
  'Associação Atlética Internacional', 'Associação Atlética Internacional', 
  'Associação Atlética Ponte Preta', 'Bangu Atlético Clube', 'Barra Mansa Futebol Clube', 
  'Botafogo de Futebol e Regatas', 'Campos Atlético Associação', 'Centro Limoeirense de Futebol', 
  'Centro Sportivo Alagoano', 'Clube Atlético Mineiro', 'Clube Atlético Pirassununguense', 
  'Clube de Regatas Brasil', 'Clube de Regatas do Flamengo', 'Clube do Remo', 'Clube Esportivo Lajeadense', 
  'Clube Esportivo Rio Branco', 'Clube Náutico Capibaribe', 'Comercial Futebol Clube', 
  'Coritiba Foot Ball Club', 'Esporte Clube Cruzeiro', 'Esporte Clube Juventude', 'Esporte Clube Noroeste', 
  'Esporte Clube Novo Hamburgo', 'Esporte Clube Pelotas', 'Esporte Clube São Bento', 
  'Esporte Clube São José', 'Esporte Clube Vitória', 'Esporte Clube Ypiranga', 
  'Fluminense Football Club', 'Futebol Clube Santa Cruz', 'Goytacaz Futebol Clube', 'Grêmio Esportivo Brasil', 
  'Grêmio Foot-Ball Porto Alegrense', 'Guarani Futebol Clube', 'Guarany Futebol Clube', 'Nacional Futebol Clube', 
  'Operário Ferroviário Esporte Clube', 'Parnahyba Sport Club', 'Paulista Futebol Clube', 
  'Resende Futebol Clube', 'Rio Branco Atlético Clube', 'Rio Branco Esporte Clube', 
  'Rio Claro Futebol Clube', 'Riograndense Futebol Clube', 'Santos Futebol Clube', 
  'São Cristóvão de Futebol e Regatas', 'Sport Club Corinthians Paulista', 'Sport Club do Recife', 
  'Sport Club Internacional', 'Sport Club Penedense', 'Sport Club Rio Grande', 'Sport Club São Paulo', 
  'Tupi Football Club', 'Tupynambás Futebol Clube', 'União Futebol Clube', 
  'Villa Nova Atlético Clube', 'Vitória Futebol Clube'
];

 @Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'description'];
  dataSource: MatTableDataSource<TeamData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    const teams = Array.from({length: 100}, (_, k) => createNewTeam(k + 1));

    this.dataSource = new MatTableDataSource(teams);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function createNewTeam(id: number): TeamData {
  const description = DESCRIPTIONS[Math.round(Math.random() * (DESCRIPTIONS.length - 1))];

  return {
    id: id.toString(),
    description: description,
  };
}
  