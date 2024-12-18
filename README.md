# TY Palavrão Não

**Versão**: 1.9

**Autor**: Arnaldo Batista

## Descrição
NoProfanity é um script desenvolvido para o Tampermonkey que bloqueia automaticamente palavrões em vídeos do YouTube. Ele utiliza as legendas do vídeo para identificar linguagem inapropriada e, ao detectar palavrões, silencia o áudio temporariamente. Por enquanto, é necessário que as legendas estejam habilitadas para que o script funcione corretamente.

## Funcionalidades
- Detecção de palavrões nas legendas do YouTube.
- Silenciamento automático do áudio ao identificar linguagem inapropriada.
- Restauração do áudio após o período de silenciamento.

## Requisitos
- Extensão [Tampermonkey](https://www.tampermonkey.net/) instalada no navegador.
- Legendas ativadas nos vídeos do YouTube.

## Como Usar
1. Instale a extensão Tampermonkey no seu navegador.
2. Adicione o script ao Tampermonkey:
   - Copie o código fornecido no index.js.
   - No Tampermonkey, clique em "Add a new script".
   - Substitua o conteúdo padrão pelo código copiado.
   - Salve o script.
3. Ative o script no Tampermonkey.
4. Acesse qualquer vídeo no YouTube e habilite as legendas.
5. O script entrará em ação automaticamente, bloqueando palavrões conforme detectado nas legendas.

## Configurações
Você pode ajustar os seguintes parâmetros no script para personalizar o comportamento:
- **`tempoDeSilencioEmMilissegundos`**: Define o tempo que o áudio ficará silenciado (padrão: 500ms).
- **`tempoDeEsperaParaVoltarVerificar`**: Tempo de espera antes de retomar a verificação (padrão: 0ms).

## Como Funciona
O script monitora as legendas do vídeo em tempo real utilizando a API de mutações do DOM. Quando detecta um palavrão, ele silencia o áudio por um período configurado. Após o período de silenciamento, o áudio é restaurado automaticamente.

## Observações
- O script depende inteiramente das legendas para funcionar. Caso as legendas estejam desativadas ou incompletas, ele não conseguirá detectar palavrões.
- O padrão de palavrões utilizado atualmente é **`\[\s*__\s*\]`**. Você pode alterá-lo no script para incluir outras formas de detecção.

## Licença
Este projeto está licenciado sob os termos da [MIT License](https://opensource.org/licenses/MIT).

---

Para sugestões, relatórios de bugs ou melhorias, entre em contato com o autor.

