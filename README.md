# 🎮 QOL - Digipets

Uma interface complementar para o [DigiPets](https://digipets.net/), desenvolvida para tornar a navegação e o gerenciamento das atividades do jogo mais práticos e intuitivos.

O **QOL - Digipets** reúne ferramentas, atalhos, listas pesquisáveis e janelas modais em uma interface única, facilitando o acesso a diferentes funcionalidades do jogo sem precisar navegar constantemente entre suas telas.

O projeto conta com recursos de gerenciamento de mapas e estágios, Boss Rush, Digitamas, envio à DigiFarm, Market Tracker (MT), Black Trader, troca de costumes e edição de Party, além de diversas opções de personalização.

> **Versão atual:** 1.3.18
> **Novidades:** Market Tracker (MT) com indicador de alertas e botão **Abrir na loja**, envio de Digitamas à DigiFarm, mapa de estágios já integrado (sem importar JSON), Boss Rush que confirma os cooldowns no jogo antes de abrir o próximo boss e aviso de nova versão dentro do painel.
> **Userscript:** [QOL - Digipets.user.js](./QOL%20-%20Digipets.user.js)

---

## 📑 Índice

- [Dúvidas e sugestões](#-dúvidas-e-sugestões)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
  - [Windows / Desktop](#-instalação-no-desktop)
  - [iOS / iPhone](#-instalação-no-ios)
  - [Android](#-instalação-no-android)
- [Primeiros passos](#️-primeiros-passos)
- [Atualizações](#-atualizações)
- [Funcionalidades](#-funcionalidades)
- [Mapas e estágios](#️-mapas-e-estágios)
- [Boss Rush](#️-boss-rush)
- [Digitamas](#-digitamas)
- [Enviar à DigiFarm](#-enviar-à-digifarm)
- [MT · Market Tracker](#-mt--market-tracker)
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
  - **Android:** Mozilla e Tampermonkey
- Acesso à internet para consultar o jogo e verificar se existe uma nova versão do script.

> Não é necessário importar nenhum arquivo: o mapeamento de episódios e estágios já vem integrado ao userscript.

---

## 🚀 Instalação

### 💻 Instalação no Desktop

1. Instale a extensão [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=pt-PT) no navegador.
2. Acesse o arquivo [QOL - Digipets.user.js](./QOL%20-%20Digipets.user.js) neste repositório.
3. Clique no botão **Raw**, localizado no GitHub.
4. O Tampermonkey deverá abrir automaticamente a página de instalação do userscript.
5. Clique em **Instalar** e aguarde a confirmação.
6. No tampermonkey, clique com o botão direito do mouse e vá até gerenciar extensão e ative a opção: **Permitir scripts de usuario e permitir URLS de arquivos.** 
7. Acesse ou atualize o [DigiPets](https://digipets.net/) e entre na sua conta.

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

### 📱 Instalação no Android

Para utilizar o QOL no Android, é necessário instalar o aplicativo do navegador [Mozila](https://www.firefox.com/pt-BR/download/android/) e o [Tampermonkey](https://addons.mozilla.org/pt-PT/firefox/addon/tampermonkey/)

1. **Configure o diretório:**

   Abra o Mozila e vá até a extensão do Tampermonkey. depois vá até o menu "Utilitários".

   Aqui escolha a configuração que achar melhor.

   Opção 1- Importar do URL:
   Cole esse url: https://raw.githubusercontent.com/mateuspedro/QOL-DigiPets/main/QOL%20-%20Digipets.user.js

   Opção 2- Arquivo ou Importar o arquivo:
   Faça o download do arquivo [QOL - Digipets.user.js](./QOL%20-%20Digipets.user.js) e o importe.
   
2. **Acesse o jogo:**

   Abra ou atualize o [DigiPets](https://digipets.net/) pelo Mozila e aproveite as funcionalidades do QOL!
   
---

## ▶️ Primeiros passos

Depois de instalar, entre no DigiPets e toque no botão flutuante **QOL - Digipets**. Todas as funcionalidades já funcionam sem nenhuma importação.

- **Episódios e estágios:** vêm integrados ao userscript (catálogo de bosses, Digitamas, nomes, BP e episódio de cada estágio).
- **Cooldowns:** são temporários e consultados diretamente no jogo. Dados com mais de 6 horas são tratados como desatualizados e não são usados para liberar um estágio.
- **Digitamas:** ao abrir essa tela, o QOL consulta diretamente o episódio 53 para atualizar os tempos.
- **Atualizar mapas:** em **Configurações** (ou na tela de Mapas e estágios), consulta os episódios no jogo em rodadas, respeitando intervalos entre as solicitações. Se ainda restarem episódios pendentes, execute novamente.
- **Sync opcional:** é possível importar/exportar um arquivo JSON (versão 1) para compartilhar dados. Não é obrigatório, e arquivos XML não são suportados.

## 🔔 Atualizações

O QOL consulta periodicamente (no máximo a cada 6 horas) a versão publicada no GitHub. Quando existe uma versão mais nova, aparece no cabeçalho do painel o aviso **Nova versão X.Y.Z** com a marca **NOVA**; tocar nele abre o repositório. Depois de baixar o novo arquivo, atualize a página do DigiPets.

---

## ✨ Funcionalidades

### 🗺️ Mapas e estágios

Centraliza a consulta e o gerenciamento dos estágios conhecidos do jogo.

- Lista os estágios disponíveis com pesquisa por nome, número ou episódio.
- Apresenta informações como episódio, BP, cooldown e disponibilidade.
- Permite favoritar estágios para facilitar o acesso.
- Utiliza estrelas para identificar favoritos: amarela para favoritados e cinza para os demais.
- Permite abrir diretamente o mapa correspondente no DigiPets.
- Oferece acesso à entrada do estágio quando ele está disponível.
- Cooldowns antigos (mais de 6 horas) aparecem como desatualizados até serem consultados novamente.
- Atualiza os dados dos episódios diretamente no jogo, respeitando intervalos entre as solicitações.
- Importação e exportação de sync JSON continuam disponíveis em **Configurações**, de forma opcional.

### ⚔️ Boss Rush

Ferramentas para consultar e organizar os bosses do jogo, de estágio em estágio.

- Apresenta o catálogo de bosses com estágio, BP e cooldown.
- Permite pesquisar e favoritar bosses, e ignorar bosses específicos.
- Permite configurar alarmes locais, que verificam os cooldowns enquanto o DigiPets está aberto.
- **Continuar Rush Boss:** antes de abrir um estágio, o QOL consulta o jogo para confirmar quais bosses estão fora de cooldown, pula os que estão em espera e abre o próximo disponível a partir do estágio atual. Ele não abre um estágio com base em dados antigos; se não puder confirmar a disponibilidade, avisa e pede para tentar novamente. Se nenhum estiver disponível, informa o boss com o menor tempo restante.
- O botão também é injetado na tela de resultado de batalhas de boss (em celulares, fixo na tela).
- As Digitamas não fazem parte do Boss Rush; têm tela própria.

### 🥚 Digitamas

Facilita o acompanhamento dos estágios relacionados às Digitamas.

- Lista os estágios das Digitamas, cada um com seu cooldown.
- Consulta automaticamente o episódio 53 no jogo ao abrir a tela e permite **Atualizar CD** manualmente.
- Exibe o tempo restante de cada estágio e a disponibilidade.
- Permite abrir o mapa correspondente e entrar no estágio quando disponível.

### 🏡 Enviar à DigiFarm

Envia Digitamas do inventário para a incubadora sem sair da página em que você está.

- Obtém em segundo plano o identificador da conta necessário ao jogo; o ID não é exibido no painel.
- Lista somente incubadoras vazias e desbloqueadas.
- Carrega os Digitamas disponíveis para a incubadora selecionada, com **Atualizar incubadoras** e **Atualizar ovos**.
- Exibe os ovos disponíveis abaixo do formulário; tocar em um deles também o seleciona no campo.
- Após o envio confirmado pelo jogo, atualiza incubadoras e ovos. Usa a sessão ativa do DigiPets.

### 📈 MT · Market Tracker

Alertas para quando a Black Trader anunciar um Digimon ou item que você procura.

- Duas abas: **Digimons** e **Itens**, com quantos alertas quiser em cada uma.
- Cada alerta tem nome (busca parcial, sem diferenciar maiúsculas e acentos) e valor pretendido em bits; deixar o valor vazio aceita qualquer preço. O anúncio precisa ter preço igual ou menor.
- Na aba Digimons também há o **tier** (E, D, C, B, A, S, SS, SSS) e a opção **Considerar tiers maiores**.
- Quando há correspondência, o botão **MT** do menu inicial mostra um indicador com a quantidade. O indicador é restaurado ao voltar ao menu e reflete as correspondências atuais.
- A lista de anúncios correspondentes traz nome, preço e o botão **Abrir na loja**, que abre a Black Trader na categoria, página e ordenação corretas e já pesquisa pelo nome completo do anúncio (por exemplo, “Ryudamon Shard (B) (x20)”).
- A varredura percorre as páginas da loja e se repete a cada 5 minutos enquanto o script está aberto, sendo adiada durante batalhas e outras consultas; **Verificar loja** força uma consulta.

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
- **Atualizar mapas e Sync opcional:** consulta os episódios no jogo e permite importar/exportar um JSON de sincronização.
- **Botão flutuante reposicionável:** permite arrastar o botão QOL para qualquer posição desejada na tela.
- **Posição persistente:** a posição do botão é salva e ajustada automaticamente conforme o tamanho da janela.
- **Preferências salvas:** favoritos, configurações e dados do painel são armazenados localmente.
- **Interface adaptável:** janelas modais amplas, listas pesquisáveis, indicadores de carregamento e layout responsivo para diferentes tamanhos de tela.

---

## 🔒 Armazenamento e privacidade

O QOL utiliza o armazenamento disponibilizado pelo gerenciador de userscripts para manter as preferências e os dados necessários ao funcionamento da interface.

**Armazenamento local:**

- Utiliza as permissões `GM_getValue` e `GM_setValue`; se não estiverem disponíveis ou falharem, usa o `localStorage` do navegador como alternativa.
- Armazena favoritos, alertas do MT, configurações e informações do painel no perfil do navegador.
- Os dados armazenados não são enviados pelo QOL para um servidor próprio.
- As preferências ficam associadas ao gerenciador de userscripts e ao perfil do navegador utilizado. Em navegação privada (por exemplo, no Safari do iOS) a gravação pode falhar.

**Comunicação externa:**

- O QOL utiliza a sessão ativa do DigiPets para consultar informações e executar ações no jogo.
- Para avisar sobre novas versões, consulta o arquivo publicado em `raw.githubusercontent.com` (no máximo a cada 6 horas). Nenhum dado pessoal é enviado.
- O script não carrega bibliotecas externas.

---

## 🛠️ Solução de problemas

| Problema | Possível solução |
|---|---|
| O botão QOL não aparece | Verifique se o Tampermonkey/Userscripts está habilitado e se o userscript está ativo. Atualize a página do DigiPets. |
| Não aparecem todos os episódios ou estágios | Abra **Configurações → Atualizar mapas** e repita até completar as rodadas pendentes. O mapeamento básico já vem no script; não é preciso importar JSON. |
| O cooldown aparece como desatualizado ou desconhecido | Use **Atualizar mapas** (ou **Atualizar CD** nas Digitamas). Cooldowns com mais de 6 horas não são usados para liberar um estágio. |
| O Continuar Rush Boss não abriu um estágio | O QOL só abre um boss depois de confirmar no jogo que ele está disponível. Se a consulta falhar ou todos estiverem em cooldown, aparece uma mensagem; toque novamente após alguns instantes. |
| O botão de continuar não aparece após derrotar um boss | Atualize a página da batalha e confirme que o estágio é um boss do catálogo (Digitamas não têm o botão). |
| Aparece o aviso “Nova versão” | Baixe novamente o arquivo do userscript (ou use a atualização do gerenciador) e recarregue o DigiPets. |
| As preferências não ficam salvas | Verifique se o gerenciador possui as permissões `GM_getValue`/`GM_setValue` e se o navegador não está em modo privado. |
| O script não funciona após uma atualização do jogo | Algumas funcionalidades dependem da estrutura das páginas e das respostas atuais do DigiPets. Alterações no site podem afetar temporariamente esses recursos. |
| A importação do arquivo apresenta erro | A importação é opcional. Se quiser usá-la, confirme que o arquivo é um JSON de sincronização na versão 1; arquivos XML não são compatíveis. |

Se o problema persistir, entre em contato pelo jogo: **Kizano (#4019)**.

---

## 📌 Observações

- O QOL é um projeto independente e complementar ao DigiPets.
- As funcionalidades dependem das informações e dos recursos disponibilizados pelo próprio jogo.
- Algumas informações podem ficar desatualizadas até que uma nova consulta seja feita no jogo.
- O projeto não substitui as mecânicas originais do jogo.
- O funcionamento pode ser afetado por futuras atualizações do DigiPets ou do gerenciador de userscripts.

---

**Desenvolvido por Kizano** ❤️
