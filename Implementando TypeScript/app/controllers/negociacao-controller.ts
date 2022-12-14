import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes;
  private negociacoesView = new NegociacoesView('#negociacoesView', true)
  private mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this.inputData = <HTMLInputElement>document.querySelector('#data');
    this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
    this.inputValor = document.querySelector('#valor') as HTMLInputElement;
    this.negociacoesView.update(this.negociacoes);
  }

  public adiciona(): void {
    const negociacao = Negociacao.criaDE(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
      );

    if(!this.ehdiaUtil(negociacao.data)){
      this.mensagemView.update('Não permitido! Apenas negociações em dias úteis!')
      return;
    }
    else{
      this.negociacoes.adiciona(negociacao);
      this.LimparFormulario();
      this.atualizaView();
    }
  }

  private ehdiaUtil(data: Date) : boolean {
    return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() <DiasDaSemana.SABADO;
  }

  private LimparFormulario(): void {
    this.inputData.value = '';
    this.inputQuantidade.value = '';
    this.inputValor.value = '';
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update('Negociação adicionada!')
  }
}