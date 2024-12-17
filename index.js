// ==UserScript==
// @name           TY palavrão não
// @namespace      http://tampermonkey.net/
// @version        1.9
// @description    TY palavrão não
// @author         Arnaldo Batista
// @match          https://www.youtube.com/*
// @run-at         document-idle
// @grant          none
// ==/UserScript==

(function () {
    'use strict';

    const padraoProibidoNasLegendas = /\[\s*__\s*\]/i;
    const tempoDeSilencioEmMilissegundos = 500;
    const tempoDeEsperaParaVoltarVerificar = 0;
    let estadoEmSilencio = false;
    let bloqueioDeAnalise = false;

    function obterBotaoMute() {
        return document.querySelector('button.ytp-mute-button');
    }

    function mutarSom() {
        const botaoMute = obterBotaoMute();
        if (botaoMute && !estadoEmSilencio) {
            botaoMute.click();
            estadoEmSilencio = true;
            console.log("Som mutado.");
        }
    }

    function restaurarSom() {
        const botaoMute = obterBotaoMute();
        if (botaoMute && estadoEmSilencio) {
            botaoMute.click();
            estadoEmSilencio = false;
            console.log("Som restaurado.");
        }
    }

    function processarTextoDaLegenda(textoDaLegenda) {
        if (estadoEmSilencio || bloqueioDeAnalise) {
            return;
        }

        if (padraoProibidoNasLegendas.test(textoDaLegenda)) {
            mutarSom();
            bloqueioDeAnalise = true;

            setTimeout(() => {
                restaurarSom();
                setTimeout(() => {
                    bloqueioDeAnalise = false;
                }, tempoDeEsperaParaVoltarVerificar);
            }, tempoDeSilencioEmMilissegundos);
        }
    }

    function iniciarObservadorDeLegendas() {
        const alvoDeObservacao = document.body;
        if (!alvoDeObservacao) {
            return;
        }

        const opcoesDeObservacao = {
            childList: true,
            subtree: true,
            characterData: true
        };

        const observador = new MutationObserver((mutacoes) => {
            mutacoes.forEach((mutacao) => {
                if (bloqueioDeAnalise) {
                    return;
                }

                if (mutacao.addedNodes && mutacao.addedNodes.length > 0) {
                    const ultimoNoAdicionado = mutacao.addedNodes[mutacao.addedNodes.length - 1];

                    if (ultimoNoAdicionado.nodeType === Node.TEXT_NODE) {
                        const texto = ultimoNoAdicionado.textContent.trim();
                        if (texto.length > 0) {
                            processarTextoDaLegenda(texto);
                        }
                    } else if (ultimoNoAdicionado.nodeType === Node.ELEMENT_NODE) {
                        const texto = ultimoNoAdicionado.textContent ? ultimoNoAdicionado.textContent.trim() : "";
                        if (texto.length > 0) {
                            const palavras = texto.split(/\s+/);
                            const ultimaPalavra = palavras[palavras.length - 1];
                            processarTextoDaLegenda(ultimaPalavra);
                        }
                    }
                }
            });
        });

        observador.observe(alvoDeObservacao, opcoesDeObservacao);
    }

    iniciarObservadorDeLegendas();
})();
