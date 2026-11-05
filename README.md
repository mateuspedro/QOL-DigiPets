# 🎮 QOL - Digipets

Uma interface complementar para o [DigiPets](https://digipets.net/), desenvolvida para tornar a navegação e o gerenciamento das atividades do jogo mais práticos e intuitivos.

O **QOL - Digipets** reúne ferramentas, atalhos, listas pesquisáveis e janelas modais em uma interface única, facilitando o acesso a diferentes funcionalidades do jogo sem precisar navegar constantemente entre suas telas.

O projeto conta com recursos de gerenciamento de mapas e estágios, Boss Rush, Digitamas, Black Trader, troca de costumes e edição de Party, além de diversas opções de personalização.

> **Versão atual:** 1.3.3  
> **Userscript:** [QOL - Digipets.user.js](./QOL%20-%20Digipets.user.js)

---

## 📑 Índice

- [Dúvidas e sugestões](#-dúvidas-e-sugestões)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
  - [Windows / Desktop](#-instalação-no-desktop)
  - [iOS / iPhone](#-instalação-no-ios)
- [Configuração inicial](#-configuração-inicial)
- [Funcionalidades](#-funcionalidades)
  - [Mapas e estágios](#-mapas-e-estágios)
  - [Boss Rush](#-boss-rush)
  - [Digitamas](#-digitamas)
  - [Black Trader](#-loja-black-trader)
  - [Troca de costumes](#-troca-de-costumes)
  - [Editor de Party](#-editor-de-party)
  - [Configurações e interface](#️-configurações-e-interface)
- [Armazenamento e privacidade](#-armazenamento-e-privacidade)
- [Solução de problemas](#-solução-de-problemas)

---

## 💬 Dúvidas e sugestões

Encontrou algum problema, tem alguma sugestão ou gostaria de propor uma melhoria?

Entre em contato diretamente pelo jogo:

- **Jogador:** Kizano
- **ID:** #4019

Sugestões e relatos de problemas são sempre bem-vindos!

---

## 📋 Requisitos

Antes de instalar, certifique-se de que possui:

- Uma conta no [DigiPets](https://digipets.net/) e uma sessão ativa no jogo.
- Um gerenciador de userscripts instalado e habilitado no navegador.
  - **Desktop:** Tampermonkey (recomendado).
  - **iOS:** Userscripts para Safari.
- Acesso à internet para carregar a biblioteca de armazenamento utilizada pelo script.
- Arquivo de sincronização de mapas no formato **JSON**, necessário para importar os dados compartilhados de episódios e estágios.

---

## 🚀 Instalação

### 💻 Instalação no Desktop

1. Instale a extensão [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=pt-PT) no navegador.
2. Acesse o arquivo [QOL - Digipets.user.js](./QOL%20-%20Digipets.user.js) neste repositório.
3. Clique no botão **Raw**, localizado no GitHub.
4. O Tampermonkey deverá abrir automaticamente a página de instalação do userscript.
5. Clique em **Instalar** e aguarde a confirmação.
6. Acesse ou atualize o [DigiPets](https://digipets.net/) e entre na sua conta.

Após a instalação, o botão flutuante **QOL - Digipets** estará disponível na página. Clique nele para abrir o painel e acessar as funcionalidades.

### 📱 Instalação no iOS

Para utilizar o QOL no iPhone, é necessário instalar o aplicativo Userscripts e habilitar sua extensão no Safari.

1. **Instale o aplicativo Userscripts:**

   [Download na App Store](https://apps.apple.com/us/app/userscripts/id1463298887)

2. **Baixe o userscript:**

   Faça o download do arquivo [QOL - Digipets.user.js](./QOL%20-%20Digipets.user.js).

3. **Configure o diretório:**

   Abra o aplicativo Userscripts e selecione a opção para alterar o diretório de armazenamento dos scripts. Escolha a pasta onde o arquivo foi baixado.

4. **Habilite a extensão no Safari:**

   No iPhone, acesse:

   `Ajustes → Apps → Safari → Extensões → Userscripts  → Permitir`
   `No fim tem permissões  → outros sites  →  Permitir`
    
   Ative a extensão e conceda as permissões necessárias.

5. **Acesse o jogo:**

   Abra ou atualize o [DigiPets](https://digipets.net/) pelo Safari e aproveite as funcionalidades do QOL!

---

## ⚙️ Configuração inicial

### 🗺️ Importação dos mapas e estágios

Para utilizar corretamente a listagem compartilhada de mapas, episódios e estágios, é necessário realizar uma importação inicial do arquivo de sincronização.

1. Baixe o arquivo JSON disponível neste repositório:

   [📥 digipets-helper-sync-2026-10-26-11-14-38.json](./digipets-helper-sync-2026-10-26-11-14-38.json)

2. Abra o painel **QOL - Digipets**.
3. Acesse a seção **Mapas e estágios**.
4. Clique em **Importar sync** e selecione o arquivo JSON baixado.
5. Aguarde a mensagem de confirmação da importação.
6. Clique em **Atualizar mapas** para consultar os dados atuais do jogo.

**Importante:** A atualização dos mapas é realizada em rodadas, respeitando intervalos entre as solicitações. Caso ainda existam episódios pendentes, execute a atualização novamente até completar a sincronização.

#### Sobre os dados de sincronização

O arquivo JSON fornece o mapeamento compartilhado de episódios e estágios. Entretanto, algumas informações são temporárias e precisam ser atualizadas diretamente no jogo.

- **Episódios e estágios:** obtidos a partir do mapeamento compartilhado.
- **Cooldowns:** aproveitados do arquivo somente quando a captura possui menos de 6 horas. Dados mais antigos são descartados.
- **Digitamas:** ao abrir essa tela, o QOL consulta diretamente o episódio 53 para atualizar os tempos disponíveis.

> **Formato compatível:** esta versão aceita arquivos de sincronização JSON na versão 1 (`.json`). Arquivos XML não são suportados pelo importador.

---

## ✨ Funcionalidades

### 🗺️ Mapas e estágios

Centraliza a consulta e o gerenciamento dos estágios conhecidos do jogo.

- Lista os estágios disponíveis com pesquisa por nome, número ou episódio.
- Apresenta informações como episódio, BP, cooldown e disponibilidade, conforme os dados conhecidos.
- Permite favoritar estágios para facilitar o acesso.
- Utiliza estrelas para identificar favoritos: amarela para favoritados e cinza para os demais.
- Permite abrir diretamente o mapa correspondente no DigiPets.
- Oferece acesso à entrada do estágio quando ele está disponível.
- Permite importar e exportar arquivos de sincronização JSON.
- Atualiza os dados dos episódios diretamente no jogo, respeitando intervalos entre as solicitações.

### ⚔️ Boss Rush

Ferramentas para consultar e organizar os bosses disponíveis no jogo.

- Apresenta o catálogo de bosses e suas informações conhecidas.
- Exibe dados como estágio correspondente e cooldown.
- Permite pesquisar e favoritar bosses.
- Oferece a opção de ignorar bosses específicos.
- Permite configurar alertas.
- Disponibiliza o botão **Continuar Rush Boss** no menu e nos resultados de batalhas de boss, quando aplicável.

A disponibilidade e os cooldowns apresentados dependem dos dados sincronizados com o jogo.

### 🥚 Digitamas

Facilita o acompanhamento dos estágios relacionados às Digitamas.

- Lista os estágios conhecidos relacionados às Digitamas.
- Exibe os cooldowns disponíveis.
- Consulta automaticamente o episódio 53 diretamente no jogo ao abrir a tela.
- Atualiza os tempos com base nas informações obtidas.
- Permite abrir o mapa correspondente a cada estágio.
- Oferece acesso à entrada do estágio quando disponível.

### 🛒 Loja Black Trader

Uma interface alternativa para navegar pela loja Black Trader, com ferramentas de pesquisa e organização.

- Abre a loja em uma janela modal ampla.
- Organiza os produtos em duas abas: **Digimons** e **Itens**.
- Permite pesquisar produtos pelo nome.
- Disponibiliza filtros de ordenação e navegação por páginas.
- Exibe imagens, preços e avaliações disponíveis.
- Na aba de Digimons, também apresenta o rank quando essa informação é fornecida pelo jogo.
- Permite registrar avaliações positivas e negativas.
- Solicita confirmação antes de encaminhar uma compra ao jogo.
- Organiza os produtos em até cinco colunas em telas maiores, adaptando automaticamente o layout para telas menores.

### 👕 Troca de costumes

Facilita a visualização e a seleção de costumes disponíveis.

- Abre o guarda-roupa em uma janela modal.
- Permite pesquisar costumes pelo nome.
- Apresenta uma prévia do costume atualmente em uso.
- Permite aplicar costumes diretamente pela interface.
- Possibilita marcar costumes como favoritos.
- Organiza os favoritos no início da listagem.
- Utiliza estrelas para diferenciar os costumes favoritados.

### 👥 Editor de Party

Uma interface para visualizar e gerenciar as formações de Digimons.

- Apresenta as formações disponíveis e seus respectivos três espaços.
- Permite trocar os membros de cada formação.
- Possibilita remover membros quando permitido pelo jogo.
- Permite selecionar a formação ativa.
- Oferece pesquisa de Digimons durante a seleção.
- Disponibiliza ordenação por BP ou tier, quando essas informações estão disponíveis.
- Destaca visualmente o BP e os tiers reconhecidos para facilitar a comparação.

### ⚙️ Configurações e interface

Além das funcionalidades principais, o QOL oferece opções para personalizar a experiência de utilização.

- **Skin do countdown:** permite alterar a aparência dos contadores, sem modificar ou calcular os cooldowns reais do jogo.
- **Bloquear popups repetitivos:** permite ocultar avisos específicos relacionados a Digitamas chocados e experiência recebida.
- **Botão flutuante reposicionável:** permite arrastar o botão QOL para qualquer posição desejada na tela.
- **Posição persistente:** a posição do botão é salva e ajustada automaticamente conforme o tamanho da janela.
- **Preferências salvas:** favoritos, configurações e dados do painel são armazenados localmente.
- **Interface adaptável:** janelas modais amplas, listas pesquisáveis, indicadores de carregamento e layout responsivo para diferentes tamanhos de tela.

---

## 🔒 Armazenamento e privacidade

O QOL utiliza o armazenamento disponibilizado pelo gerenciador de userscripts para manter as preferências e os dados necessários ao funcionamento da interface.

**Armazenamento local:**

- Utiliza a biblioteca `gm-storage` na versão `5.1.0`.
- Utiliza as permissões `GM_getValue` e `GM_setValue`.
- Armazena favoritos, configurações e informações do painel no perfil do navegador.
- Os dados armazenados não são enviados pelo QOL para um servidor próprio.
- As preferências ficam associadas ao gerenciador de userscripts e ao perfil do navegador utilizado.

**Comunicação externa:**

- O QOL utiliza a sessão ativa do DigiPets para consultar informações e executar ações no jogo.
- A biblioteca `gm-storage` é carregada através do `unpkg.com`, conforme declarado no `@require` do userscript.

---

## 🛠️ Solução de problemas

| Problema | Possível solução |
|---|---|
| O botão QOL não aparece | Verifique se o Tampermonkey/Userscripts está habilitado e se o userscript está ativo. Atualize a página do DigiPets. |
| Não aparecem todos os episódios ou estágios | Importe o arquivo JSON de sincronização e utilize **Atualizar mapas**. Repita o processo para completar as rodadas pendentes. |
| O cooldown aparece como desconhecido | Execute novamente a sincronização dos mapas. Cooldowns com mais de 6 horas no arquivo compartilhado são descartados. |
| As preferências não ficam salvas | Verifique se o gerenciador possui as permissões GM necessárias e se a biblioteca `gm-storage` foi carregada corretamente. |
| O script não funciona após uma atualização do jogo | Algumas funcionalidades dependem da estrutura das páginas e das respostas atuais do DigiPets. Alterações no site podem afetar temporariamente esses recursos. |
| A importação do arquivo apresenta erro | Confirme se está utilizando um arquivo JSON de sincronização na versão 1. Arquivos XML não são compatíveis. |

Se o problema persistir, entre em contato pelo jogo: **Kizano (#4019)**.

---

## 📌 Observações

- O QOL é um projeto independente e complementar ao DigiPets.
- As funcionalidades dependem das informações e dos recursos disponibilizados pelo próprio jogo.
- Algumas informações podem ficar desatualizadas até que uma nova sincronização seja realizada.
- O projeto não substitui as mecânicas originais do jogo.
- O funcionamento pode ser afetado por futuras atualizações do DigiPets ou do gerenciador de userscripts.

---

**Desenvolvido por Kizano** ❤️
