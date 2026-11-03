# QOL - Digipets

Uma interface complementar para facilitar a navegação e o gerenciamento de algumas funções do [DigiPets](https://digipets.net/), com atalhos, listas pesquisáveis e janelas modais.

> **Versão:** 1.3.3  
> **Userscript:** [QOL - Digipets.user.js](./QOL%20-%20Digipets.user.js)

## Dúvidas/Sugestões
Me chame no jogo: Kizano (ID #4019)

## Requisitos

- Uma conta no DigiPets e uma sessão iniciada em `https://digipets.net/`.
- O **Tampermonkey** instalado e habilitado no navegador. Ele carrega e executa o userscript nas páginas do DigiPets. Gerenciadores compatíveis com as APIs GM também podem funcionar.
- Acesso à internet para carregar a biblioteca de armazenamento declarada pelo userscript.
- Um arquivo de sync de mapas em formato **JSON** para importar os dados compartilhados de episódios e estágios.

## Instalação

1. Instale o Tampermonkey pela loja de extensões do seu navegador. https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=pt-PT
2. Abra o arquivo [QOL - Digipets.user.js](./QOL%20-%20Digipets.user.js) no GitHub e use o botão **Raw**. Com o Tampermonkey instalado, o navegador deverá oferecer a instalação do userscript.
3. Confirme a instalação no Tampermonkey.
4. Acesse ou atualize [digipets.net](https://digipets.net/) e entre na sua conta.
5. O botão flutuante **QOL - Digipets** aparecerá na página. Clique nele para abrir o menu.

O userscript solicita as permissões GM de armazenamento necessárias para salvar as preferências. Ele também carrega `gm-storage` 5.1.0 pelo `@require` do Tampermonkey.

## Primeira configuração: importar os mapas

Para preencher a lista compartilhada de mapas e estágios:

1. Baixe o arquivo de sync JSON disponível neste repositório: [digipets-helper-sync-2026-10-26-11-14-38.json](./digipets-helper-sync-2026-10-26-11-14-38.json).
2. No painel do QOL, abra **Mapas e estágios**.
3. Clique em **Importar sync** e escolha o arquivo `.json` que baixou.
4. Confira a mensagem de confirmação da importação.
5. Use **Atualizar mapas** para consultar os dados atuais do jogo. A sincronização é feita em rodadas; se ainda houver episódios pendentes, execute-a novamente.

O arquivo de sync fornece o mapeamento compartilhado de episódios e estágios. Cooldowns são informações temporárias: o QOL só aproveita os cooldowns de um arquivo capturado há menos de 6 horas. Caso contrário, eles são ignorados e devem ser atualizados pelo jogo. A tela **Digitamas** também consulta os dados atuais do episódio 53 ao ser aberta.

> **Formato do arquivo:** o importador desta versão aceita JSON de sync versão 1 (`.json`), como o arquivo acima. Ele não lê arquivos `.xml`.

## Funcionalidades

### 🗺️ Mapas e estágios

- Lista os estágios conhecidos, com busca por nome, número do estágio ou episódio.
- Exibe informações disponíveis, como episódio, BP, cooldown e disponibilidade.
- Permite favoritar estágios; a estrela amarela indica um favorito e a cinza, um estágio não favoritado.
- Abre o mapa correspondente no DigiPets e oferece a entrada no estágio quando ele está disponível.
- Importa e exporta arquivos de sync JSON para compartilhar o mapeamento.
- Atualiza os episódios consultando o jogo, com intervalos entre as solicitações.

### ⚔️ Boss Rush

- Apresenta o catálogo de bosses e seus dados disponíveis, incluindo estágio e cooldown.
- Permite pesquisar, favoritar, ignorar bosses e configurar alertas.
- Oferece o botão **Continuar Rush Boss** no menu e nos resultados de batalhas de boss, quando aplicável.
- A disponibilidade e os cooldowns exibidos dependem dos dados sincronizados com o jogo.

### 🥚 Digitamas

- Mostra os estágios relacionados às Digitamas e seus cooldowns conhecidos.
- Consulta o episódio 53 no jogo ao abrir a tela, para atualizar os tempos atuais.
- Permite abrir o mapa de um estágio e entrar quando estiver disponível.

### 🛒 Loja Black Trader

- Abre em uma janela modal ampla com abas para **Digimons** e **Itens**.
- Permite pesquisar produtos, aplicar filtros de ordenação e navegar pelas páginas.
- Exibe imagens, preços e avaliações disponíveis; na aba de Digimons, também mostra o rank quando fornecido pelo jogo.
- Oferece avaliações positivas ou negativas e pede confirmação antes de encaminhar uma compra ao jogo.
- Organiza os produtos em até cinco colunas em telas largas, adaptando-se a telas menores.

### 👕 Troca de costumes

- Abre o guarda-roupa em uma janela modal com busca e prévia do costume em uso.
- Permite aplicar um costume e marcar favoritos.
- Coloca os favoritos no início da lista e usa estrelas para diferenciá-los.

### 👥 Editor de Party

- Abre em uma janela modal e mostra as formações disponíveis e seus três espaços de Digimon.
- Permite trocar membros, remover membros que possam ser removidos pelo jogo e selecionar a formação ativa.
- Na seleção, permite pesquisar e ordenar Digimons por BP ou tier quando essas informações são fornecidas pelo jogo.
- Destaca o BP e diferencia visualmente os tiers reconhecidos.

### ⚙️ Configurações e interface

- **Skin do countdown:** altera a aparência dos contadores; não altera nem calcula os cooldowns do jogo.
- **Bloquear popups repetitivos:** opção para ocultar avisos repetidos específicos de Digitamas chocados e experiência recebida.
- **Botão flutuante reposicionável:** arraste o botão QOL para o local desejado. A posição é salva e ajustada à janela.
- **Preferências salvas:** favoritos, opções e dados do painel ficam no armazenamento do userscript no navegador.
- A interface usa modais amplos, pesquisa, estados de carregamento e layout adaptável.

## Armazenamento e privacidade

As preferências são armazenadas localmente pelo gerenciador de userscripts usando `gm-storage` 5.1.0 e as permissões `GM_getValue` e `GM_setValue`. Elas ficam associadas ao perfil do navegador e do gerenciador; não são sincronizadas pelo QOL para um servidor.

Para carregar informações e executar ações, o QOL utiliza sua sessão ativa no DigiPets. A biblioteca de armazenamento é carregada de `unpkg.com`, conforme o `@require` indicado no cabeçalho do userscript.

## Solução de problemas

- **O botão QOL não aparece:** confirme que o Tampermonkey está habilitado, que o userscript está ativo e que a página aberta é `https://digipets.net/`. Atualize a página depois de instalar.
- **Não há estágios ou episódios suficientes:** importe o JSON de sync e use **Atualizar mapas**. Repita a atualização para completar novas rodadas.
- **O cooldown aparece como desconhecido ou desatualizado:** sincronize os mapas novamente. Cooldowns antigos do arquivo compartilhado são descartados.
- **As preferências não ficam salvas:** confira se o userscript está autorizado a usar as permissões GM e se `gm-storage` carregou corretamente.
- **O jogo mudou a interface:** algumas telas dependem das páginas e respostas atuais do DigiPets; uma alteração no site pode afetar temporariamente a função correspondente.
