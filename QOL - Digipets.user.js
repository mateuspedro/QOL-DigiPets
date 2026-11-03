// ==UserScript==
// @name         QOL - Digipets
// @namespace    https://digipets.net/
// @version      1.3.5
// @description  Navegação QOL para DigiPets: bosses, Digitamas, loja, costumes, party e contadores.
// @author       Kizano
// @match        https://digipets.net/*
// @run-at       document-idle
// @require      https://unpkg.com/gm-storage@5.1.0/dist/umd/index.umd.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// @noframes
// @homepageURL  https://github.com/mateuspedro/QOL-DigiPets
// @supportURL   https://github.com/mateuspedro/QOL-DigiPets/issues
// @updateURL    https://raw.githubusercontent.com/mateuspedro/QOL-DigiPets/main/QOL%20-%20Digipets.user.js
// @downloadURL  https://raw.githubusercontent.com/mateuspedro/QOL-DigiPets/main/QOL%20-%20Digipets.user.js
// ==/UserScript==

(() => {
    "use strict";

    const HOST_ID = "qol-digipets-userscript";
    if (document.getElementById(HOST_ID)) return;

    const STORE_KEY = "qolDigipets.state.v1";
    const EPISODE_RANGES = [[1, 13], [26, 49], [70, 90], [94, 94], [100, 133], [138, 161]];
    const EPISODE_EXTRA = [53];
    const EPISODE_IDS = [...new Set([
        ...EPISODE_RANGES.flatMap(([from, to]) =>
            Array.from({ length: to - from + 1 }, (_, index) => from + index)),
        ...EPISODE_EXTRA
    ])].sort((a, b) => a - b);
    const BOSS_CATALOG = [
        ["13", "408", "60", "Pagumon", "Pagumon.gif"], ["19", "476", "60", "DemiMeramon", "DemiMeramon.gif"],
        ["24", "1030", "60", "Gazimon", "Gazimon.gif"], ["29", "1348", "60", "Kuwagamon", "Kuwagamon.gif"],
        ["34", "1372", "60", "Shellmon", "Shellmon.gif"], ["39", "1836", "60", "Seadramon", "Seadramon.gif"],
        ["44", "1421", "60", "Meramon", "Meramon.gif"], ["49", "2347", "60", "Andromon", "Andromon.gif"],
        ["54", "1976", "60", "KyodaiNumemon", "KyodaiNumemon2.gif"], ["59", "1836", "60", "Unimon", "Unimon.gif"],
        ["64", "1836", "60", "Centarumon", "Centarumon.gif"], ["69", "1836", "60", "Frigimon", "Frigimon.gif"],
        ["81", "1875", "60", "DarkTyrannomon", "DarkTyrannomon.gif"], ["86", "2382", "60", "SkullGreymon", "SkullGreymon2.gif"],
        ["89", "1842", "60", "Kokatorimon", "Kokatorimon.gif"], ["142", "2463", "60", "Piximon", "Piximon.gif"],
        ["92", "2720", "90", "Etemon", "Etemon.gif"], ["72", "1832", "90", "Devimon", "Devimon.gif"],
        ["95", "3854", "60", "Digitamamon", "Digitamamon.gif"], ["98", "3788", "60", "Vademon", "Vademon.gif"],
        ["101", "3786", "60", "ShogunGekomon", "ShogunGekomon.gif"], ["104", "3122", "60", "Tailmon", "Gatomon46202.gif"],
        ["107", "3088", "60", "Pumpkinmon", "Pumpkinmon.gif"], ["110", "4368", "90", "VenomMyotismon", "VenomMyotismon.gif"],
        ["113", "3854", "60", "Whamon (Ultimate)", "Whamon.gif"], ["116", "3788", "60", "MarineDevimon", "MarineDevimon.gif"],
        ["117", "4794", "90", "MetalSeadramon", "MetalSeadramon.gif"], ["120", "4551", "60", "Parasimon", "Parasimon.gif"],
        ["123", "4485", "60", "Rosemon", "Rosemon.gif"], ["124", "4729", "90", "Puppetmon", "Puppetmon.gif"],
        ["127", "4545", "60", "RustTyranomon", "RustTyranomon19480.gif"], ["130", "4485", "60", "MetalEtemon", "MetalEtemon.gif"],
        ["131", "4757", "90", "Machinedramon", "Machinedramon.gif"], ["134", "4486", "60", "Ghoulmon (Black)", "Ghoulmon (Black)9966.gif"],
        ["137", "4448", "60", "Callismon", "Callismon.gif"], ["138", "4727", "90", "Piedmon", "Piedmon.gif"],
        ["139", "5070", "180", "Apocalymon", "Apocalymon.gif"], ["240", "491", "60", "Gazimon", "Gazimon.gif"],
        ["243", "2514", "60", "RedVegiemon", "RedVegiemon.gif"], ["246", "2897", "60", "Andromon", "Andromon.gif"],
        ["249", "2299", "60", "DarkTyrannomon", "DarkTyrannomon.gif"], ["252", "3660", "60", "SkullGreymon", "SkullGreymon2.gif"],
        ["255", "3440", "60", "MetalGreymon (Virus)", "MetalGreymon (Virus).gif"], ["258", "3962", "60", "Dragomon", "Dragomon.gif"],
        ["261", "2914", "60", "ShogunGekomon", "ShogunGekomon.gif"], ["264", "2986", "60", "MegaSeadramon", "MegaSeadramon.gif"],
        ["267", "2357", "60", "Devimon", "Devimon.gif"], ["270", "2934", "60", "Piximon", "Piximon.gif"],
        ["274", "4475", "90", "Kimeramon", "Kimeramon2.gif"], ["273", "2274", "60", "Golemon", "Golemon.gif"],
        ["277", "3004", "60", "Okuwamon", "Okuwamon.gif"], ["283", "2933", "60", "MagnaAngemon", "MagnaAngemon.gif"],
        ["284", "5500", "90", "BlackWarGreymon", "BlackWarGreymon.gif"], ["287", "4120", "60", "MetalMamemon", "MetalMamemon.gif"],
        ["290", "4116", "60", "SkullMeramon", "SkullMeramon.gif"], ["293", "3205", "60", "SkullSatamon", "SkullSatamon.gif"],
        ["294", "6650", "90", "Daemon", "Daemon.gif"], ["295", "6623", "180", "MaloMyotismon", "MaloMyotismon.gif"],
        ["280", "3102", "60", "Arukenimon", "Arukenimon.gif"], ["308", "4054", "60", "Chamelemon", "Chamelemon21221.gif"],
        ["311", "2001", "60", "Ogremon", "Ogremon.gif"], ["314", "2709", "60", "Gorillamon", "Gorillamon.gif"],
        ["317", "2835", "60", "Devidramon", "Devidramon.gif"], ["320", "4643", "60", "ExTyrannomon", "ExTyrannomon.gif"],
        ["323", "4490", "60", "MarineDevimon", "MarineDevimon.gif"], ["324", "5292", "90", "Giromon", "Giromon.gif"],
        ["327", "9689", "60", "Mihiramon", "Mihiramon.gif"], ["330", "8949", "60", "Sandiramon", "Sandiramon.gif"],
        ["333", "9102", "60", "Sinduramon", "Sinduramon.gif"], ["336", "9179", "60", "Pajiramon", "Pajiramon.png"],
        ["339", "8909", "60", "Vajramon", "Vajramon.gif"], ["342", "11087", "60", "Indramon", "Indramon12401.gif"],
        ["345", "8994", "60", "Kumbhiramon", "Kumbhiramon.gif"], ["348", "11339", "60", "Vikaralamon", "Vikaralamon.gif"],
        ["351", "9812", "60", "Majiramon", "Majiramon.gif"], ["354", "10449", "60", "Antylamon (Virus)", "Antylamon (Virus).gif"],
        ["357", "11020", "60", "Caturamon", "Caturamon.gif"], ["360", "10136", "60", "Makuramon", "Makuramon7508.gif"],
        ["361", "8266", "90", "Beelzemon", "Beelzemon.gif"], ["362", "11826", "90", "Baihumon", "Baihumon.gif"],
        ["363", "9472", "90", "Ebonwumon", "Ebonwumon.gif"], ["364", "9320", "90", "Azulongmon", "Azulongmon.gif"],
        ["365", "9540", "90", "Zhuqiaomon", "Zhuqiaomon.gif"], ["366", "7104", "60", "D-Reaper ADR-01", "D-Reaper1.gif"],
        ["367", "3558", "60", "D-Reaper ADR-02", "D-Reaper2.gif"], ["368", "6232", "60", "D-Reaper ADR-03", "D-Reaper3.gif"],
        ["369", "3989", "60", "D-Reaper ADR-04", "D-Reaper ADR-04.gif"], ["370", "6020", "60", "D-Reaper ADR-05", "D-Reaper5.gif"],
        ["371", "8095", "60", "D-Reaper ADR-06", "D-Reaper ADR-06.gif"], ["372", "8235", "60", "D-Reaper ADR-07", "D-Reaper ADR-07.gif"],
        ["373", "6107", "60", "D-Reaper ADR-08", "D-Reaper ADR-08.gif"], ["374", "8196", "60", "D-Reaper ADR-09", "D-Reaper ADR-09.gif"],
        ["375", "12535", "180", "Mother D-Reaper", "Mother D-Reaper.gif"], ["399", "5158", "60", "Cerberumon", "Cerberumon.gif"],
        ["402", "2066", "60", "Raremon", "Raremon.gif"], ["404", "3543", "60", "Wizardmon", "Wizardmon44431.gif"],
        ["407", "4864", "60", "Woodmon", "Woodmon.gif"], ["409", "4996", "60", "Snimon", "Snimon.gif"],
        ["412", "5994", "90", "Grumblemon", "Grumblemon46280.gif"], ["415", "7663", "60", "WaruMonzaemon", "WaruMonzaemon.gif"],
        ["418", "8862", "60", "Gigasmon", "Gigasmon28385.gif"], ["421", "4645", "60", "BurningGreymon", "BurningGreymon.gif"],
        ["424", "8413", "60", "Mercurymon", "Mercurymon.gif"], ["426", "9558", "60", "Petaldramon", "Petaldramon42683.gif"],
        ["429", "9563", "60", "Calmaramon", "Calmaramon30747.gif"], ["432", "10658", "60", "Petaldramon", "Petaldramon42683.gif"],
        ["435", "9428", "60", "Calmaramon", "Calmaramon30747.gif"], ["438", "9648", "60", "Karatenmon", "Karatenmon.gif"],
        ["440", "9906", "60", "Petaldramon", "Petaldramon42683.gif"], ["442", "6971", "60", "Duskmon", "Duskmon.gif"],
        ["444", "9067", "60", "ShadowSeraphimon", "ShadowSeraphimon.gif"], ["447", "9523", "60", "Velgemon", "Velgemon57279.gif"],
        ["449", "11081", "60", "Cherubimon (Evil)", "Cherubimon (Evil).gif"], ["451", "12270", "90", "Cherubimon (Evil)", "Cherubimon (Evil).gif"],
        ["454", "13217", "60", "Dynasmon", "Dynasmon.gif"], ["457", "13176", "90", "Lucemon Shadowlord Mode", "Lucemon Shadowlord Mode.gif"],
        ["458", "15694", "180", "Lucemon Larva", "Lucemon Larva.gif"]
    ].map(([stage, bp, cooldown, name, image], index) => ({
        stage, bp, cooldown, name, imageUrl: `/recursos/img/digimons/${image}`, order: index + 1
    })).sort((left, right) => Number(left.stage) - Number(right.stage));
    const SYNC_BATCH_SIZE = 20;
    const SYNC_REQUEST_GAP = 1500;
    const FETCH_TIMEOUT = 10000;
    const SYNC_COOLDOWN_TTL = 6 * 60 * 60 * 1000;
    const STAGE_FRESH_MS = 6 * 60 * 60 * 1000;
    const DIGITAMA_SYNC_MAX_AGE = 2 * 60 * 1000;
    const BATTLE_RUSH_BUTTON_ID = "qol-rush-next-button";
    const STATE_DEFAULTS = {
        version: 1,
        countdownSkin: true,
        blockRepeatingPopups: false,
        favoriteStages: [],
        favoriteBosses: [],
        ignoredBosses: [],
        bossAlerts: [],
        favoriteFashions: [],
        launcherPosition: null,
        shopType: "1",
        shopFilter: "maiorpreco",
        shopPage: 1,
        stages: {},
        episodes: {}
    };

    const Store = typeof GMStore === "function"
        ? GMStore
        : (typeof GMStorage === "object" && typeof GMStorage.GMStore === "function"
            ? GMStorage.GMStore
            : null);
    let store = null;
    let state = { ...STATE_DEFAULTS };
    let view = "home";
    let modalView = "";
    let syncRunning = false;
    let syncStatus = "";
    let digitamaSyncRunning = false;
    let digitamaSyncStatus = "";
    let importRunning = false;
    let searchQuery = "";
    let featureSearch = "";
    let featureStatus = "";
    let featureBusy = false;
    let shopProducts = [];
    const SHOP_FILTER_LABELS = Object.freeze({
        maiorpreco: "Maior pre\u00e7o",
        menorpreco: "Menor pre\u00e7o",
        maisrecentes: "Mais recentes",
        maisantigos: "Mais antigos",
        produtoaz: "Produto A-Z",
        produtoza: "Produto Z-A"
    });
    let shopFilters = Object.entries(SHOP_FILTER_LABELS)
        .map(([value, label]) => ({ value, label }));
    let shopTotalPages = 1;
    let shopConfirmProduct = null;
    const shopVotesPending = new Set();
    let fashionOutfits = [];
    let fashionActiveRoleId = "";
    let fashionActiveSrc = "";
    let fashionActiveTitle = "";
    let partyData = [];
    let partySelectedTab = 1;
    let partySelection = null;
    let partySearch = "";
    let partySort = "power-desc";
    const alertNotified = new Set();
    let hookedJQuery = null;
    let originalJQueryAlert = null;
    let wrappedJQueryAlert = null;
    let popupInstallTimer = 0;
    let popupWatchdogTimer = 0;
    let popupFailureNoticeAt = 0;
    let saveTimer = 0;
    let toastTimer = 0;
    let lastSyncRequestAt = 0;
    let battleResultObserver = null;
    let battleResultCheckTimer = 0;

    function normalizeIds(values) {
        return Array.isArray(values)
            ? [...new Set(values.map(String).filter((value) => /^\d+$/.test(value)))]
            : [];
    }

    function normalizeStoredState(value) {
        if (!value || typeof value !== "object" || Array.isArray(value)) {
            return { ...STATE_DEFAULTS };
        }
        const stages = value.stages && typeof value.stages === "object" && !Array.isArray(value.stages)
            ? value.stages
            : {};
        const episodes = value.episodes && typeof value.episodes === "object" && !Array.isArray(value.episodes)
            ? value.episodes
            : {};
        return {
            ...STATE_DEFAULTS,
            countdownSkin: value.countdownSkin !== false,
            blockRepeatingPopups: Boolean(value.blockRepeatingPopups),
            favoriteStages: normalizeIds(value.favoriteStages),
            favoriteBosses: normalizeIds(value.favoriteBosses),
            ignoredBosses: normalizeIds(value.ignoredBosses),
            bossAlerts: normalizeIds(value.bossAlerts),
            favoriteFashions: normalizeIds(value.favoriteFashions),
            launcherPosition: value.launcherPosition
                && Number.isFinite(Number(value.launcherPosition.left))
                && Number.isFinite(Number(value.launcherPosition.top))
                ? { left: Number(value.launcherPosition.left), top: Number(value.launcherPosition.top) }
                : null,
            shopType: ["1", "2"].includes(String(value.shopType)) ? String(value.shopType) : "1",
            shopFilter: typeof value.shopFilter === "string" ? value.shopFilter : "maiorpreco",
            shopPage: Math.max(1, Number.parseInt(value.shopPage, 10) || 1),
            stages,
            episodes
        };
    }

    function loadState() {
        if (!store) {
            console.error("[QOL - Digipets] gm-storage não foi carregado; as preferências não podem ser persistidas.");
            return { ...STATE_DEFAULTS };
        }
        try {
            const saved = store.get(STORE_KEY);
            return saved === undefined ? { ...STATE_DEFAULTS } : normalizeStoredState(saved);
        } catch (error) {
            console.error("[QOL - Digipets] Não foi possível carregar os dados salvos.", error);
            return { ...STATE_DEFAULTS };
        }
    }

    function saveState() {
        if (!store) {
            showToast("Armazenamento do userscript indisponível; a altera\u00e7ão não foi salva.");
            return false;
        }
        try {
            store.set(STORE_KEY, state);
            const saved = store.get(STORE_KEY);
            if (!saved || JSON.stringify(saved) !== JSON.stringify(state)) {
                throw new Error("A confirma\u00e7ão da grava\u00e7ão não corresponde ao estado atual.");
            }
            return true;
        } catch (error) {
            console.error("[QOL - Digipets] Não foi possível confirmar a grava\u00e7ão.", error);
            showToast("Falha ao salvar. Verifique as permissões do userscript.");
            return false;
        }
    }

    function scheduleSave() {
        clearTimeout(saveTimer);
        saveTimer = window.setTimeout(saveState, 120);
    }

    const host = document.createElement("div");
    host.id = HOST_ID;
    document.documentElement.appendChild(host);
    const shadow = host.attachShadow({ mode: "open" });
    shadow.innerHTML = `
        <style>
            :host { all: initial; font-family: Arial,sans-serif; }
            * { box-sizing: border-box; }
            #launcher { position: fixed; right: 18px; bottom: 18px; z-index: 2147483000; padding: 11px 15px; border: 1px solid #ffe083; border-radius: 999px; background: linear-gradient(130deg,#241a52,#075f91 58%,#00a4a8); color: #fff; font: 700 13px Arial,sans-serif; cursor: grab; touch-action: none; user-select: none; box-shadow: 0 5px 22px #001a2d99,0 0 14px #22e8e088; }
            #panel { position: fixed; right: 18px; bottom: 74px; z-index: 2147483000; display: none; width: min(460px,calc(100vw - 24px)); height: min(620px,calc(100vh - 100px)); flex-direction: column; overflow: hidden; border: 1px solid #9be9f266; border-radius: 14px; background: #f5f8fc; color: #1d2c3c; font: 14px Arial,sans-serif; box-shadow: 0 14px 44px #06192b66; }
            #panel.open { display: flex; }
            .header { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 48px; padding: 8px 11px; background: linear-gradient(110deg,#25144c,#124d80 62%,#087e88); color: white; }
            .header strong { font-size: 14px; }
            .panel-footer { display: grid; flex: 0 0 auto; gap: 3px; padding: 9px 12px; border-top: 1px solid #47d9ec55; background: linear-gradient(110deg,#17152f,#102744 65%,#172541); color: #d9eaf7; text-align: center; }
            .panel-footer strong { color: #ffe083; font-size: 11px; }
            .panel-footer small { color: #a9c8d8; font: 10px/1.4 Arial,sans-serif; }
            .header button, button { border: 1px solid #47d9ec88; border-radius: 9px; padding: 8px 11px; background: linear-gradient(135deg,#147db0,#3158b4); color: white; font: 700 12px Arial,sans-serif; cursor: pointer; box-shadow: 0 3px 9px #020b1a66; transition: transform .14s ease,filter .14s ease,box-shadow .14s ease; }
            button:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.13); box-shadow: 0 5px 13px #020b1a88; }
            button.gray { border-color: #9c83ee66; background: linear-gradient(135deg,#554187,#384e92); }
            button.green { border-color: #ffe083; background: linear-gradient(135deg,#ffdf71,#ff9e43); color: #2b2045; }
            button.red { border-color: #ff91a3; background: linear-gradient(135deg,#fa5b78,#c93767); }
            button:disabled { opacity: .54; cursor: not-allowed; box-shadow: none; }
            button:focus-visible, input:focus-visible, select:focus-visible { outline: 2px solid #ffe083; outline-offset: 2px; }
            .content { min-height: 0; overflow: auto; padding: 14px; background: radial-gradient(ellipse at 85% 2%,#18365b44,transparent 45%); }
            .toolbar { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
            .toolbar strong { flex: 1; }
            .toolbar-actions { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 7px; }
            .intro { margin: 0 0 12px; color: #607487; font-size: 12px; line-height: 1.45; }
            .home-grid { display: grid; gap: 9px; }
            .home-link { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 13px; border: 1px solid #d5e0e8; border-left: 3px solid #25c8d7; border-radius: 11px; background: linear-gradient(110deg,#142c48,#182a43); color: #effaff; text-align: left; box-shadow: 0 5px 15px #030a1955; }
            .home-link span { display: grid; gap: 4px; }
            .home-link small { color: #6b7f90; font-weight: 400; }
            .config-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 0; border-bottom: 1px solid #dce5ec; }
            .config-copy { display: grid; gap: 4px; }
            .config-copy small { color: #667b8d; font-size: 11px; line-height: 1.4; }
            .switch { flex: 0 0 auto; min-width: 90px; }
            .status { margin: 10px 0; padding: 10px; border-radius: 8px; background: #e9f1f6; color: #3d566d; font-size: 11px; line-height: 1.5; }
            .status[aria-live] { min-height: 34px; }
            .search { width: 100%; margin-bottom: 10px; padding: 9px 10px; border: 1px solid #cbd9e3; border-radius: 8px; color: #20364a; font: 13px Arial,sans-serif; }
            .stage-list { display: grid; gap: 7px; }
            .stage-card { display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: center; gap: 8px; padding: 10px; border: 1px solid #dbe5ed; border-left: 3px solid #20d0db; border-radius: 10px; background: white; }
            .stage-name { display: grid; gap: 4px; min-width: 0; }
            .stage-name strong { overflow: hidden; color: #21384e; text-overflow: ellipsis; white-space: nowrap; }
            .stage-name small { color: #718394; font-size: 10px; }
            .stage-actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 6px; }
            .stage-time { min-width: 62px; color: #566d80; font: 700 11px Consolas,monospace; text-align: right; }
            .stage-time.skin { color: #f3c45d; text-shadow: 0 0 8px #f0ad3d77; }
            .stage-actions button { padding: 6px 8px; }
            .feature-list { display: grid; gap: 8px; }
            .feature-card { display: grid; grid-template-columns: 48px minmax(0,1fr); gap: 10px; align-items: center; padding: 11px; border: 1px solid #dbe5ed; border-top: 2px solid #25c8d7; border-radius: 11px; background: #fff; }
            .feature-card > img { width: 46px; height: 46px; object-fit: contain; }
            .feature-copy { display: grid; gap: 4px; min-width: 0; }
            .feature-copy strong { overflow: hidden; color: #21384e; text-overflow: ellipsis; white-space: nowrap; }
            .feature-copy small { color: #718394; font-size: 10px; }
            .feature-actions { display: flex; flex-wrap: wrap; grid-column: 1 / -1; gap: 6px; }
            .feature-actions button { padding: 6px 8px; }
            .feature-actions .favorite-action, .stage-actions .favorite-action, .fashion-card-actions .favorite-action { border-color: #718096; background: linear-gradient(135deg,#3b4758,#293449); color: #aeb9c7; }
            button.favorite-action[aria-pressed="true"] { border-color: #ffe083; background: linear-gradient(135deg,#604817,#47333d); color: #ffe083; }
            .favorite-star { color: #9aa7b5; font-size: 17px; line-height: 1; text-shadow: none; vertical-align: -1px; }
            button.favorite-action[aria-pressed="true"] .favorite-star { color: #ffd447; text-shadow: 0 0 8px #ffcf39aa; }
            .stage-map-button { border-color: #c28cff; background: linear-gradient(135deg,#6042a0,#3d4d96); }
            .sync-tools { display: flex; flex-wrap: wrap; gap: 8px; }
            .sync-upload-input { display: none; }
            .feature-tools { display: flex; gap: 7px; margin-bottom: 10px; }
            .feature-tools input, .feature-tools select { min-width: 0; flex: 1; padding: 9px; border: 1px solid #cbd9e3; border-radius: 8px; color: #20364a; font: 13px Arial,sans-serif; }
            .shop-product { display: grid; grid-template-columns: 52px minmax(0,1fr) auto; gap: 9px; align-items: center; padding: 9px; border: 1px solid #dbe5ed; border-radius: 9px; background: white; }
            .shop-product img { width: 48px; height: 48px; object-fit: contain; }
            .shop-product-copy { display: grid; gap: 4px; min-width: 0; }
            .shop-product-copy strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
            .party-tabs { display: flex; gap: 5px; margin-bottom: 10px; }
            .party-tabs button { flex: 1; padding: 7px 4px; }
            .party-modal-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
            .party-modal-tools .search, .party-modal-tools select { min-width: 180px; flex: 1; margin: 0; padding: 10px; border: 1px solid #3b5b75; border-radius: 7px; background: #0b1728; color: #eaf5ff; font: 13px Arial,sans-serif; }
            .party-summary { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 12px 0; padding: 16px; border: 1px solid #2d536d; border-radius: 10px; background: #12253a; }
            .inline-actions { display: flex; gap: 6px; align-items: center; }
            #panel { border-color: #47d9ec88; background: linear-gradient(145deg,#16132f,#102d4b 58%,#192541); color: #eaf5ff; }
            .content { color: #eaf5ff; }
            .intro { color: #a9c8d8; }
            .home-link { border-color: #375875; }
            .home-link:nth-child(2) { border-left-color: #ffbf4d; }
            .home-link:nth-child(3) { border-left-color: #eb79d2; }
            .home-link:nth-child(4) { border-left-color: #39d6bb; }
            .home-link:nth-child(5) { border-left-color: #ff7d69; }
            .home-link:nth-child(6) { border-left-color: #8f91ff; }
            .home-link:nth-child(7) { border-left-color: #ffe083; }
            .home-link:hover { border-color: #55e3f2; background: linear-gradient(110deg,#1d3e60,#202d51); }
            .home-link small { color: #9bbbd0; }
            .config-row { margin: 9px 0; padding: 13px; border: 1px solid #365874; border-left: 3px solid #ad79ef; border-radius: 10px; background: linear-gradient(115deg,#172b45,#182441); color: #effaff; }
            .config-copy strong { color: #effaff; }
            .config-copy small { color: #9bbbd0; }
            .status { border: 1px solid #3c617f; border-left: 3px solid #25c8d7; background: linear-gradient(110deg,#152b45,#1b2845); color: #c4d9ee; }
            .search, .feature-tools input, .feature-tools select { border-color: #3b5b75; background: #0b1728; color: #eaf5ff; }
            .stage-card, .feature-card, .shop-product { border-color: #355a77; background: linear-gradient(125deg,#142b45,#182540); color: #effaff; }
            .stage-card:nth-child(3n) { border-left-color: #f2b84b; }
            .stage-card:nth-child(3n + 1) { border-left-color: #32d1d2; }
            .stage-card:nth-child(3n + 2) { border-left-color: #bc79ec; }
            .stage-name strong, .feature-copy strong { color: #effaff; }
            .stage-name small, .feature-copy small { color: #9bbbd0; }
            .stage-time { color: #b9d8e8; }
            .feature-list { grid-template-columns: repeat(auto-fill,minmax(190px,1fr)); }
            .feature-card { min-height: 210px; grid-template-columns: 1fr; justify-items: center; align-content: start; text-align: center; }
            .feature-card > img { width: 82px; height: 82px; filter: drop-shadow(0 4px 10px #0006); }
            .feature-copy { justify-items: center; }
            .feature-copy strong { white-space: normal; }
            .feature-actions { justify-content: center; }
            #panel.expanded { width: min(1120px,calc(100vw - 32px)); height: min(850px,calc(100vh - 40px)); }
            #panel.expanded .content { padding: 18px; }
            #panel.expanded .feature-list { grid-template-columns: repeat(auto-fill,minmax(185px,1fr)); gap: 12px; }
            #feature-modal { position: fixed; inset: 0; z-index: 2147483250; display: none; align-items: center; justify-content: center; padding: 24px; background: #050c18cc; color: #eaf5ff; font: 14px Arial,sans-serif; }
            #feature-modal.open { display: flex; }
            .feature-window { position: relative; display: flex; flex-direction: column; width: min(1280px,96vw); height: min(900px,94vh); overflow: hidden; border: 1px solid #55dceb; border-radius: 16px; background: radial-gradient(ellipse at 90% 0%,#16395766,transparent 44%),linear-gradient(145deg,#15132f,#102744 58%,#18243f); color: #eaf5ff; font: 14px Arial,sans-serif; box-shadow: 0 22px 70px #000c,0 0 28px #00d5ff33; }
            .feature-modal-head { display: flex; flex: 0 0 auto; align-items: center; justify-content: space-between; gap: 12px; min-height: 62px; padding: 12px 18px; border-bottom: 1px solid #ffe08355; background: linear-gradient(110deg,#26164a,#15416a 65%,#0d6b77); }
            .feature-modal-head strong { color: #ffe083; font-size: 16px; }
            .feature-modal-body { min-height: 0; flex: 1; overflow: auto; padding: 16px; }
            .shop-tabs { display: flex; gap: 8px; padding: 12px 16px 0; }
            .shop-tabs button { border-color: #43718f; background: #1a3049; color: #b9d8e8; }
            .shop-tabs button.selected { border-color: #55e3f2; background: #087e91; color: white; }
            .shop-tools { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; padding: 12px 16px; }
            .shop-tools input, .shop-tools select { min-width: 150px; flex: 1; padding: 10px; border: 1px solid #3b5b75; border-radius: 7px; background: #0b1728; color: #eaf5ff; font: 13px Arial,sans-serif; }
            .shop-status { min-height: 25px; padding: 0 16px 8px; color: #9bbbd0; }
            .shop-grid { display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 12px; padding: 4px 16px 16px; }
            .shop-card { min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 11px; border: 1px solid #355a77; border-top: 2px solid #38d1d7; border-radius: 11px; background: linear-gradient(150deg,#172e49,#14213a); box-shadow: inset 0 0 18px #00bcd411,0 5px 14px #050d1e55; text-align: center; }
            .shop-card:nth-child(4n + 2) { border-top-color: #f7bd4c; }
            .shop-card:nth-child(4n + 3) { border-top-color: #dc79e3; }
            .shop-card:nth-child(4n + 4) { border-top-color: #f17e6e; }
            .shop-card > img { width: 100%; height: 112px; object-fit: contain; }
            .shop-card img.shop-tier { width: auto; height: 18px; max-width: 100%; }
            .shop-card .shop-name { min-height: 38px; display: flex; align-items: center; justify-content: center; color: #effaff; font-weight: 700; }
            .shop-card .shop-price { color: #71f0bd; font-weight: 700; }
            .shop-rank { display: flex; align-items: center; gap: 5px; color: #b9d8e8; font-size: 11px; }
            .shop-rank img { width: auto; height: 18px; object-fit: contain; }
            .shop-ratings { display: flex; justify-content: center; gap: 5px; flex-wrap: wrap; }
            .shop-pager { display: flex; justify-content: center; align-items: center; gap: 12px; padding: 12px; border-top: 1px solid #26c6da44; }
            .shop-confirm { position: absolute; inset: 0; z-index: 2; display: flex; align-items: center; justify-content: center; padding: 18px; background: #040b15cc; }
            .shop-confirm[hidden] { display: none; }
            .shop-confirm-card { width: min(390px,100%); padding: 20px; border: 1px solid #55e3f2; border-radius: 10px; background: #142941; box-shadow: 0 10px 40px #000b; }
            .shop-confirm-card h3 { margin: 0 0 12px; color: #77eaff; }
            .shop-confirm-card p { color: #d6e8f4; line-height: 1.5; }
            .shop-confirm-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 18px; }
            .fashion-preview { display: flex; align-items: center; gap: 16px; margin-bottom: 14px; padding: 14px; border-bottom: 1px solid #26c6da44; background: linear-gradient(110deg,#10243c,#15354e); }
            .fashion-preview img { width: 90px; height: 90px; object-fit: contain; image-rendering: pixelated; }
            .fashion-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(165px,1fr)); gap: 12px; }
            .fashion-card { position: relative; display: flex; min-width: 0; flex-direction: column; gap: 8px; padding: 10px; border: 1px solid #355a77; border-top: 2px solid #d779e6; border-radius: 11px; background: linear-gradient(150deg,#172e49,#14213a); color: #effaff; text-align: left; }
            .fashion-card:nth-child(3n + 2) { border-top-color: #32d1d2; }
            .fashion-card:nth-child(3n) { border-top-color: #ffbd4b; }
            .fashion-card.active { border-color: #71f0bd; border-top-color: #71f0bd; background: linear-gradient(145deg,#10352f,#172d47 72%); }
            .fashion-card-art { display: grid; place-items: center; height: 120px; overflow: hidden; border-radius: 8px; background: radial-gradient(ellipse at center,#28425a,#0c1929 76%); }
            .fashion-card-art img { max-width: 100%; max-height: 110px; object-fit: contain; image-rendering: pixelated; }
            .fashion-card-copy { display: grid; gap: 5px; }
            .fashion-card-copy strong { color: #effaff; font-size: 13px; overflow-wrap: anywhere; }
            .fashion-card-copy small { color: #b6cad8; line-height: 1.4; }
            .fashion-card-actions { display: flex; gap: 6px; margin-top: auto; }
            .fashion-card-actions .favorite-action { min-width: 40px; padding: 6px 9px; }
            .fashion-card-art img { max-width: 100%; max-height: 110px; object-fit: contain; image-rendering: pixelated; }
            .party-slots { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 12px; margin-top: 12px; }
            .party-slot-card { display: flex; min-width: 0; min-height: 240px; flex-direction: column; align-items: center; gap: 10px; padding: 14px 10px; border: 1px solid #355a77; border-top: 2px solid #27c9dc; border-radius: 12px; background: linear-gradient(150deg,#172e49,#101c32); text-align: center; box-shadow: 0 6px 18px #020a1c66; }
            .party-slot-card:nth-child(2) { border-top-color: #f5bd4b; }
            .party-slot-card:nth-child(3) { border-top-color: #ba7bea; }
            .party-slot-card.leader { border-color: #c99c42; box-shadow: inset 0 0 0 1px #c99c4233; }
            .party-slot-art { display: grid; place-items: center; width: 100%; height: 110px; border-radius: 9px; background: radial-gradient(ellipse at center,#28425a,#0c1929 76%); }
            .party-slot-art img { max-width: 100%; max-height: 104px; object-fit: contain; image-rendering: pixelated; }
            .party-slot-name { min-height: 36px; display: grid; align-content: center; color: #effaff; font-weight: 700; overflow-wrap: anywhere; }
            .party-slot-label { color: #9bbbd0; font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
            .party-slot-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-top: auto; }
            .party-option-list { display: grid; grid-template-columns: repeat(auto-fill,minmax(220px,1fr)); gap: 9px; max-height: 65vh; overflow: auto; padding: 2px; }
            .party-option { display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: center; gap: 6px 10px; min-height: 76px; padding: 11px 12px; border: 1px solid #355a77; border-left: 2px solid #27c9dc; border-radius: 10px; background: linear-gradient(145deg,#172e49,#14213a); color: #effaff; font: 14px Arial,sans-serif; text-align: left; }
            .party-option:hover:not(:disabled) { border-color: #55e3f2; background: #193751; }
            .party-option-name { min-width: 0; grid-column: 1 / -1; overflow: hidden; color: #effaff; font-size: 13px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; }
            .party-option-power { color: #ffd166; font-size: 16px; font-weight: 800; font-variant-numeric: tabular-nums; }
            .party-option-tier { justify-self: end; padding: 3px 8px; border: 1px solid currentColor; border-radius: 999px; font-size: 10px; font-weight: 800; letter-spacing: .06em; }
            .party-option-tier.tier-e { border-color: #8d969e; background: #555d65; color: #e3e7ea; }
            .party-option-tier.tier-d { border-color: #718da3; background: #30475a; color: #c3d6e5; }
            .party-option-tier.tier-c { border-color: #77828c; background: #343c45; color: #cbd2d8; }
            .party-option-tier.tier-b { border-color: #d97725; background: #653513; color: #ffad5c; }
            .party-option-tier.tier-a { border-color: #e2b63f; background: #5a4712; color: #ffe16b; }
            .party-option-tier.tier-s { border-color: #3999e6; background: #123d66; color: #78c5ff; }
            .party-option-tier.tier-ss { border-color: #e64e5f; background: #5f1c2b; color: #ff8b98; }
            .party-option-tier.tier-sss { border-color: #a76bea; background: #3e215f; color: #d2a4ff; }
            .party-option-tier.tier-unknown { border-color: #52687b; background: #23384d; color: #9bbbd0; }
            .party-window { width: min(1080px,96vw); }
            .party-modal-tools { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0; }
            .party-modal-tools input, .party-modal-tools select { min-width: 160px; flex: 1; padding: 10px; border: 1px solid #3b5b75; border-radius: 7px; background: #0b1728; color: #eaf5ff; }
            .party-tabs { display: flex; gap: 7px; }
            .party-tabs button { flex: 1; }
            .party-warning { margin: 10px 0; padding: 12px; border: 1px solid #e4a84e66; border-radius: 8px; background: #503b2155; color: #ffd477; }
            .modal-empty { grid-column: 1 / -1; padding: 36px 16px; border: 1px dashed #45647b; border-radius: 10px; color: #b2c9d7; text-align: center; }
            #toast { position: fixed; right: 18px; bottom: 72px; z-index: 2147483300; display: none; max-width: min(360px,calc(100vw - 36px)); padding: 11px 14px; border: 1px solid #37bfd0; border-radius: 10px; background: #132d45; color: white; font: 12px Arial,sans-serif; box-shadow: 0 8px 24px #00172966; }
            #toast.open { display: block; }
            @media (max-width: 900px) { .shop-grid { grid-template-columns: repeat(4,minmax(0,1fr)); } }
            @media (max-width: 760px) { .shop-grid { grid-template-columns: repeat(3,minmax(0,1fr)); } }
            @media (max-width: 600px) {
                #panel.expanded { width: calc(100vw - 16px); height: calc(100vh - 16px); }
                .stage-card { grid-template-columns: 1fr; }
                .stage-actions { justify-content: space-between; }
                #feature-modal { padding: 8px; }
                .feature-window { width: 100%; height: calc(100vh - 16px); border-radius: 12px; }
                .feature-modal-body { padding: 10px; }
                .feature-modal-head { padding: 10px 12px; }
                .shop-grid { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; padding: 4px 10px 10px; }
                .shop-card { padding: 8px; }
                .shop-card > img { height: 82px; }
                .fashion-grid { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; }
                .fashion-card-art { height: 88px; }
                .party-option-list { grid-template-columns: 1fr; }
                .party-slots { grid-template-columns: 1fr; }
                .party-slot-card { min-height: 0; display: grid; grid-template-columns: 70px minmax(0,1fr); justify-items: start; text-align: left; }
                .party-slot-art { grid-row: span 2; width: 64px; height: 64px; }
                .party-slot-art img { max-height: 60px; }
                .party-slot-actions { grid-column: 2; justify-content: start; }
            }
            @media (max-width: 360px) { .shop-grid, .fashion-grid { grid-template-columns: 1fr; } }
        </style>
        <button id="launcher" type="button" aria-expanded="false">✦ QOL - Digipets</button>
        <section id="panel" role="dialog" aria-label="QOL - Digipets">
            <header class="header"><strong>✦ QOL - Digipets</strong><button type="button" class="gray" data-action="close" aria-label="Fechar">×</button></header>
            <main class="content" id="content"></main>
            <footer class="panel-footer"><strong>Criado por Kizano</strong><small>Para mais dicas, contacte-me pelo jogo: Kizano (ID #4019)</small></footer>
        </section>
        <div id="feature-modal" role="dialog" aria-modal="true" aria-labelledby="feature-modal-title">
            <section class="feature-window">
                <header class="feature-modal-head"><strong id="feature-modal-title"></strong><button class="gray" type="button" data-action="modal-close">Fechar</button></header>
                <main class="feature-modal-body" id="feature-modal-content"></main>
            </section>
        </div>
        <input id="sync-file" class="sync-upload-input" type="file" accept=".json,application/json">
        <div id="toast" role="status" aria-live="polite"></div>
    `;

    const launcher = shadow.querySelector("#launcher");
    const panel = shadow.querySelector("#panel");
    const content = shadow.querySelector("#content");
    const featureModal = shadow.querySelector("#feature-modal");
    const modalContent = shadow.querySelector("#feature-modal-content");
    const modalTitle = shadow.querySelector("#feature-modal-title");
    const toast = shadow.querySelector("#toast");

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, (character) => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        })[character]);
    }

    function showToast(message) {
        toast.textContent = String(message);
        toast.classList.add("open");
        clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove("open"), 3500);
    }

    function formatRemaining(seconds) {
        if (!Number.isFinite(seconds) || seconds <= 0) return "Disponível";
        const total = Math.ceil(seconds);
        const hours = Math.floor(total / 3600);
        const minutes = Math.floor((total % 3600) / 60);
        const remainder = total % 60;
        return hours
            ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`
            : `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
    }

    function cooldownSeconds(text) {
        const value = String(text || "").replace(/\s+/g, " ").trim();
        const match = value.match(/\b(\d{1,2}):(\d{2})(?::(\d{2}))?\b/);
        if (!match) return null;
        return match[3] === undefined
            ? Number(match[1]) * 60 + Number(match[2])
            : Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
    }

    function isSafeSyncPage() {
        return !["/batalha", "/premio_online", "/icelabyrinths", "/gearsavannah"].includes(location.pathname);
    }

    function readEpisodePage(html, episode) {
        const parsed = new DOMParser().parseFromString(String(html || ""), "text/html");
        const scripts = Array.from(parsed.scripts, (script) => script.textContent || "").join("\n");
        const secondsByStage = new Map();
        for (const match of scripts.matchAll(/\btempo(\d+)\s*=\s*(\d+)\s*;/g)) {
            const stage = String(match[1]);
            secondsByStage.set(stage, Math.max(secondsByStage.get(stage) || 0, Number(match[2])));
        }
        const tabs = Array.from(parsed.querySelectorAll('div[id^="tabs-"]'))
            .filter((element) => /^tabs-\d+$/.test(element.id));
        const stages = [];
        for (let index = 0; index < tabs.length; index += 1) {
            const tab = tabs[index];
            const tabNumber = tab.id.slice("tabs-".length);
            const anchors = Array.from(tab.querySelectorAll("a[href]"));
            const startLink = anchors.find((anchor) => /\/batalha\?estagio=\d+/.test(anchor.getAttribute("href") || ""));
            const linkMatch = startLink?.getAttribute("href")?.match(/[?&]estagio=(\d+)/);
            const counter = Array.from(tab.querySelectorAll("[id^='contador']"))
                .find((element) => /^contador\d+$/.test(element.id));
            const counterMatch = counter?.id.match(/^contador(\d+)$/);
            const stage = linkMatch?.[1] || counterMatch?.[1] || "";
            if (!stage) continue;

            const slots = [];
            for (let slot = 1; slot <= 3; slot += 1) {
                const digimon = tab.querySelector(`#BatalhaDigimau${tabNumber}${slot}`);
                const title = digimon?.getAttribute("title") || "";
                const nameMatch = title.match(/^(.*?)\s*\(Level\s*(\d+)\)\s*$/i);
                if (!nameMatch) continue;
                const image = digimon.querySelector("img[src]")?.getAttribute("src") || "";
                let imageUrl = "";
                if (image) {
                    try {
                        const parsedUrl = new URL(image, location.origin);
                        if (parsedUrl.origin === location.origin) imageUrl = parsedUrl.href;
                    } catch (error) {
                        console.warn("[QOL - Digipets] Imagem de Digimon inválida no estágio.", error);
                    }
                }
                slots.push({ slot, name: nameMatch[1].trim(), level: Number(nameMatch[2]), imageUrl });
            }
            const principal = slots.find((item) => item.slot === 2 && slots.length >= 3)
                || [...slots].sort((left, right) => right.level - left.level || left.slot - right.slot)[0];
            const bpText = tab.querySelector(`#EstagioDigimonBPowerValor${tabNumber}`)?.textContent || "";
            const bp = Number(bpText.replace(/[^\d]/g, "")) || 0;
            const scriptSeconds = secondsByStage.get(stage) || 0;
            const scriptHasTime = secondsByStage.has(stage);
            const textSeconds = cooldownSeconds(counter?.textContent);
            const remainingSeconds = scriptHasTime ? scriptSeconds : textSeconds;
            const remainingKnown = scriptHasTime || textSeconds !== null;
            const bossMarker = Boolean(tab.querySelector(`#Boss${tabNumber}`));
            const isBoss = bossMarker || index === tabs.length - 1;
            const available = Boolean(startLink);
            const blocked = Boolean(counter) || scriptSeconds > 0;
            stages.push({
                stage,
                episode: Number(episode),
                name: principal?.name || `Estágio ${stage}`,
                imageUrl: principal?.imageUrl || "",
                level: principal?.level || 0,
                bp,
                isBoss,
                available,
                blocked,
                remainingKnown,
                remainingSeconds: available ? 0 : (remainingKnown ? remainingSeconds : null),
                expiresAt: available
                    ? 0
                    : (remainingKnown ? Date.now() + Math.max(0, remainingSeconds) * 1000 : 0),
                checkedAt: Date.now()
            });
        }
        return { episode: Number(episode), stages, checkedAt: Date.now() };
    }

    function applyEpisode(result) {
        if (!result || !Array.isArray(result.stages) || !result.stages.length) {
            throw new Error(`O episódio ${result?.episode || "?"} não retornou estágios reconhecíveis.`);
        }
        state.episodes[String(result.episode)] = {
            checkedAt: result.checkedAt,
            stages: result.stages.map((stage) => stage.stage)
        };
        for (const stage of result.stages) {
            state.stages[String(stage.stage)] = stage;
        }
        scheduleSave();
    }

    const DIGITAMA_STAGES = [
        { stage: "143", name: "Dorimon", bp: 175, imageUrl: "/recursos/img/digimons/Dorimon.gif" },
        { stage: "144", name: "Dorumon", bp: 468, imageUrl: "/recursos/img/digimons/Dorumon.gif" },
        { stage: "145", name: "Dorugamon", bp: 883, imageUrl: "/recursos/img/digimons/Dorugamon.gif" },
        { stage: "146", name: "DoruGreymon", bp: 1474, imageUrl: "/recursos/img/digimons/DoruGreymon.gif" },
        { stage: "381", name: "Dorugoramon", bp: 2184, imageUrl: "/recursos/img/digimons/Dorugoramon.gif" }
    ];

    function toggleSavedArray(key, value) {
        const supported = ["favoriteBosses", "ignoredBosses", "bossAlerts", "favoriteFashions"];
        if (!supported.includes(key) || !/^\d+$/.test(String(value))) return;
        const normalized = String(value);
        state[key] = state[key].includes(normalized)
            ? state[key].filter((entry) => entry !== normalized)
            : [...state[key], normalized];
        saveState();
        render();
    }

    function stageReadiness(stageId) {
        const record = state.stages[String(stageId)];
        if (!record) return { fresh: false, ready: false, remaining: null };
        const fresh = Date.now() - Number(record.checkedAt || 0) <= STAGE_FRESH_MS;
        const expiry = Number(record.expiresAt) || 0;
        const remaining = record.available ? 0 : (expiry ? Math.max(0, Math.ceil((expiry - Date.now()) / 1000)) : null);
        const ready = fresh && (Boolean(record.available) || (record.remainingKnown && remaining === 0));
        return { fresh, ready, remaining, record };
    }

    function bossRushOrderAfter(currentStage) {
        const ordered = [...BOSS_CATALOG].sort((left, right) => left.order - right.order);
        const currentIndex = ordered.findIndex((item) => item.stage === String(currentStage));
        if (currentIndex < 0) return ordered;
        return [...ordered.slice(currentIndex + 1), ...ordered.slice(0, currentIndex + 1)];
    }

    function getEpisodeForStage(stage) {
        const knownEpisode = Number(state.stages[String(stage)]?.episode);
        if (EPISODE_IDS.includes(knownEpisode)) return knownEpisode;
        const match = Object.entries(state.episodes)
            .find(([, entry]) => Array.isArray(entry?.stages) && entry.stages.map(String).includes(String(stage)));
        return match ? Number(match[0]) : 0;
    }

    function continueBossRush(currentStage = "") {
        const ordered = bossRushOrderAfter(String(currentStage || ""));
        const nextReady = ordered.find((item) =>
            !state.ignoredBosses.includes(item.stage) && stageReadiness(item.stage).ready);
        if (nextReady) {
            window.location.href = `/batalha?estagio=${encodeURIComponent(nextReady.stage)}#DP`;
            return;
        }
        const nextMapped = ordered.find((item) =>
            !state.ignoredBosses.includes(item.stage) && getEpisodeForStage(item.stage));
        const episode = nextMapped ? getEpisodeForStage(nextMapped.stage) : 0;
        if (episode) {
            showToast(`Ainda não há cooldown recente para liberar outro boss. Abrindo o mapa do episódio ${episode}.`);
            window.location.href = `/estagios?episodio=${encodeURIComponent(episode)}`;
            return;
        }
        showToast("Importe um sync ou atualize os mapas para consultar o próximo boss disponível.");
    }

    function isPageElementVisible(element) {
        if (!element) return false;
        const style = window.getComputedStyle(element);
        return style.display !== "none"
            && style.visibility !== "hidden"
            && element.getClientRects().length > 0;
    }

    function refreshBattleRushButton() {
        if (location.pathname !== "/batalha") return;
        const stage = new URLSearchParams(location.search).get("estagio") || "";
        const isBoss = BOSS_CATALOG.some((item) => item.stage === stage);
        const existing = document.getElementById(BATTLE_RUSH_BUTTON_ID);
        if (!isBoss) {
            existing?.remove();
            return;
        }
        if (isPageElementVisible(document.querySelector("#kf-goToNextBoss"))) {
            existing?.remove();
            return;
        }
        const repeatButton = document.querySelector("#RepetirEstagio");
        const resultVisible = isPageElementVisible(document.querySelector("#BatalhaResultado"))
            || (isPageElementVisible(repeatButton) && !repeatButton.disabled);
        if (!resultVisible || existing) return;
        const resultContainer = document.querySelector("#BatalhaEstagios")
            || document.querySelector("#BatalhaResultado")
            || repeatButton?.parentElement;
        if (!resultContainer) return;
        const button = document.createElement("button");
        button.id = BATTLE_RUSH_BUTTON_ID;
        button.type = "button";
        button.className = "btn btn-primary btn-flat";
        button.textContent = "⚔️ Continuar Rush Boss";
        Object.assign(button.style, {
            margin: "10px 0 10px 8px",
            padding: "11px 18px",
            border: "1px solid #ffe083",
            borderRadius: "10px",
            background: "linear-gradient(115deg,#ffdf71,#ff9947)",
            color: "#2b2045",
            font: "800 14px Arial,sans-serif",
            cursor: "pointer",
            boxShadow: "0 5px 16px #030a1c66,0 0 14px #ffbf4b44"
        });
        button.addEventListener("mouseenter", () => { button.style.filter = "brightness(1.08)"; });
        button.addEventListener("mouseleave", () => { button.style.filter = ""; });
        button.addEventListener("click", () => continueBossRush(stage));
        resultContainer.appendChild(button);
    }

    function installBattleResultObserver() {
        if (location.pathname !== "/batalha" || !document.body || battleResultObserver) return;
        refreshBattleRushButton();
        battleResultObserver = new MutationObserver(() => {
            if (battleResultCheckTimer) return;
            battleResultCheckTimer = window.setTimeout(() => {
                battleResultCheckTimer = 0;
                refreshBattleRushButton();
            }, 180);
        });
        battleResultObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["class", "style", "hidden", "disabled"]
        });
    }

    function checkBossAlerts() {
        const armed = new Set(state.bossAlerts);
        for (const stageId of [...alertNotified]) {
            if (!armed.has(stageId) || !stageReadiness(stageId).ready) alertNotified.delete(stageId);
        }
        for (const stageId of state.bossAlerts) {
            if (alertNotified.has(stageId) || !stageReadiness(stageId).ready) continue;
            alertNotified.add(stageId);
            const stage = state.stages[stageId];
            const message = `${stage?.name || "Boss"} (estágio ${stageId}) está disponível.`;
            showToast(message);
            if ("Notification" in window && window.Notification.permission === "granted") {
                try {
                    new window.Notification("DigiPets · Boss disponível", { body: message });
                } catch (error) {
                    console.warn("[QOL - Digipets] Não foi possível mostrar a notifica\u00e7ão do boss.", error);
                }
            }
        }
    }

    function renderBosses(isDigitama = false) {
        const items = isDigitama
            ? DIGITAMA_STAGES.map((entry) => ({
                ...entry,
                ...(state.stages[entry.stage] || {}),
                stage: entry.stage,
                name: state.stages[entry.stage]?.name || entry.name,
                imageUrl: entry.imageUrl,
                bp: entry.bp
            }))
            : BOSS_CATALOG.map((entry) => ({
                ...entry,
                ...(state.stages[entry.stage] || {}),
                stage: entry.stage,
                name: state.stages[entry.stage]?.name || entry.name,
                imageUrl: entry.imageUrl
            }));
        const query = featureSearch.trim().toLocaleLowerCase("pt-BR");
        const visible = items
            .filter((item) => {
                if (!isDigitama && !showIgnoredBosses && state.ignoredBosses.includes(String(item.stage))) return false;
                return !query || `${item.name || ""} ${item.stage} ${item.episode || ""}`
                    .toLocaleLowerCase("pt-BR").includes(query);
            })
            .sort((left, right) =>
                Number(state.favoriteBosses.includes(String(right.stage)))
                    - Number(state.favoriteBosses.includes(String(left.stage)))
                || Number(left.stage) - Number(right.stage));
        const cards = visible.map((item) => {
            const id = String(item.stage);
            const readiness = stageReadiness(id);
            const favorite = state.favoriteBosses.includes(id);
            const alert = state.bossAlerts.includes(id);
            const ignored = state.ignoredBosses.includes(id);
            const timer = !readiness.fresh
                ? "CD desatualizado"
                : readiness.remaining === null
                    ? "Cooldown desconhecido"
                : readiness.remaining > 0 ? formatRemaining(readiness.remaining) : "Disponível";
            const imageUrl = item.imageUrl
                ? (new URL(item.imageUrl, location.origin)).href
                : "";
            return `<article class="feature-card">
                ${imageUrl ? `<img src="${escapeHtml(imageUrl)}" alt="">` : '<span aria-hidden="true">🐉</span>'}
                <div class="feature-copy"><strong>${escapeHtml(item.name || `Estágio ${id}`)}</strong>
                    <small>Estágio ${escapeHtml(id)}${item.episode ? ` · Episódio ${escapeHtml(item.episode)}` : ""}${item.bp ? ` · BP ${escapeHtml(item.bp)}` : ""} · <span class="boss-cooldown" data-expiry="${Number(state.stages[id]?.expiresAt) || 0}" data-available="${Boolean(state.stages[id]?.available)}" data-unknown="${readiness.remaining === null}" data-stale="${!readiness.fresh}" data-stage="${escapeHtml(id)}">${escapeHtml(timer)}</span></small></div>
                <div class="feature-actions">
                    <button class="green" type="button" data-action="feature-start" data-stage="${escapeHtml(id)}" ${readiness.ready ? "" : "disabled"}>${readiness.ready ? "⚔️ Come\u00e7ar" : readiness.fresh && readiness.remaining > 0 ? "⏳ Em cooldown" : "Atualizar CD"}</button>
                    <button class="${alert ? "green" : "gray"}" type="button" data-action="toggle-boss-alert" data-stage="${escapeHtml(id)}" aria-pressed="${alert}">${alert ? "🔔 Alarme ativo" : "🔕 Alarme"}</button>
                    <button class="favorite-action" type="button" data-action="toggle-boss-favorite" data-stage="${escapeHtml(id)}" aria-pressed="${favorite}"><span class="favorite-star" aria-hidden="true">★</span> ${favorite ? "Favorito" : "Favoritar"}</button>
                    ${item.episode ? `<button class="stage-map-button" type="button" data-action="open-episode" data-episode="${escapeHtml(item.episode)}">🗺️ Mapa</button>` : ""}
                    ${!isDigitama ? `<button class="${ignored ? "red" : "gray"}" type="button" data-action="toggle-boss-ignore" data-stage="${escapeHtml(id)}">${ignored ? "Mostrar novamente" : "Ignorar"}</button>` : ""}
                </div>
            </article>`;
        }).join("");
        const header = isDigitama ? "Digitamas" : "Boss Rush";
        const syncNote = isDigitama
            ? "Ao abrir esta tela, o mapa de Digitamas (episódio 53) é consultado para atualizar os cooldowns."
            : `Catálogo completo de ${items.length} bosses. Importe um sync compartilhado ou atualize os cooldowns dos episódios.`;
        content.innerHTML = `
            <div class="toolbar"><button class="gray" data-action="home">← Início</button><strong>${header}</strong><div class="toolbar-actions">
                ${!isDigitama ? '<button class="green" data-action="next-boss">⚔️ Continuar Rush Boss</button><button class="gray" data-action="sync-stages" ' + (syncRunning ? "disabled" : "") + '>' + (syncRunning ? "Sync…" : "Sync mapas") + '</button>' : '<button class="green" data-action="refresh-digitamas" ' + (digitamaSyncRunning ? "disabled" : "") + '>' + (digitamaSyncRunning ? "Atualizando…" : "Atualizar CD") + '</button>'}
            </div></div>
            <p class="intro">${escapeHtml(syncNote)} Os alarmes são locais e verificam os cooldowns enquanto o DigiPets está aberto.</p>
            ${!isDigitama ? '<button class="gray" type="button" data-action="show-ignored">Exibir bosses ignorados</button>' : ""}
            <input class="search" id="feature-search" type="search" placeholder="Buscar por nome ou estágio" value="${escapeHtml(featureSearch)}">
            <div class="status" role="status">${escapeHtml(isDigitama ? (digitamaSyncStatus || featureStatus || "Consultando o mapa real para carregar cooldowns.") : (featureStatus || `${visible.length} de ${items.length} resultado(s). Cooldowns vêm dos mapas de episódio ou de um sync recente.`))}</div>
            <div class="feature-list">${cards || '<div class="status">Nenhum resultado disponível. Verifique a pesquisa ou sincronize estágios.</div>'}</div>
        `;
        const ignoredButton = content.querySelector('[data-action="show-ignored"]');
        if (ignoredButton) {
            ignoredButton.dataset.showIgnored = String(showIgnoredBosses);
            ignoredButton.textContent = showIgnoredBosses ? "Ocultar bosses ignorados" : "Exibir bosses ignorados";
        }
    }

    let showIgnoredBosses = false;

    function parseFashion(html) {
        const parsed = new DOMParser().parseFromString(String(html || ""), "text/html");
        const active = parsed.querySelector("#UsuarioFashion2");
        const outfits = Array.from(parsed.querySelectorAll('#FashionGuardaRoupa img[data-roleid]'))
            .map((image, order) => {
                const id = image.getAttribute("data-roleid") || "";
                if (!/^\d+$/.test(id)) return null;
                const rawTitle = image.getAttribute("title") || "";
                const separator = rawTitle.indexOf(":");
                const name = separator >= 0 ? rawTitle.slice(0, separator).trim() : rawTitle.trim();
                const description = separator >= 0 ? rawTitle.slice(separator + 1).trim() : "";
                let src = "";
                const rawSrc = image.getAttribute("src")?.trim() || "";
                if (rawSrc) {
                    try {
                        const url = new URL(rawSrc, location.origin);
                        if (url.origin === location.origin) src = url.href;
                    } catch (error) {
                        console.warn("[QOL - Digipets] URL de costume inválida.", error);
                    }
                }
                return { id, name: name || `Costume #${id}`, description, src, order };
            })
            .filter(Boolean);
        let activeSrc = "";
        try {
            const rawSrc = active?.getAttribute("src")?.trim() || "";
            if (rawSrc) {
                const url = new URL(rawSrc, location.origin);
                if (url.origin === location.origin) activeSrc = url.href;
            }
        } catch (error) {
            console.warn("[QOL - Digipets] URL do costume ativo inválida.", error);
        }
        const title = (active?.getAttribute("title") || "").split(":")[0].trim();
        const titleMatches = title ? outfits.filter((item) => item.name === title) : [];
        const sourceMatches = activeSrc ? outfits.filter((item) => item.src === activeSrc) : [];
        return {
            outfits,
            activeSrc,
            activeTitle: title,
            activeRoleId: titleMatches.length === 1
                ? titleMatches[0].id
                : sourceMatches.length === 1 ? sourceMatches[0].id : ""
        };
    }

    async function loadFashion() {
        featureBusy = true;
        featureStatus = "Carregando guarda-roupa...";
        render();
        try {
            const response = await fetch(`/ajax/dp-usuario-fashion-carregar.php?_=${Date.now()}`, {
                credentials: "same-origin",
                headers: { "X-Requested-With": "XMLHttpRequest" }
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const result = await response.json();
            if (typeof result.exibe !== "string" || !result.exibe.includes("FashionGuardaRoupa")) {
                throw new Error("O jogo não retornou a cole\u00e7ão de costumes.");
            }
            const parsed = parseFashion(result.exibe);
            fashionOutfits = parsed.outfits;
            fashionActiveSrc = parsed.activeSrc;
            fashionActiveTitle = parsed.activeTitle;
            fashionActiveRoleId = parsed.activeRoleId;
            featureStatus = `${fashionOutfits.length} costume(s) carregado(s).`;
        } catch (error) {
            console.error("[QOL - Digipets] Falha ao carregar costumes.", error);
            featureStatus = `Não foi possível carregar os costumes: ${error.message || "erro inesperado"}.`;
        } finally {
            featureBusy = false;
            render();
        }
    }

    async function applyFashion(id) {
        if (featureBusy || !/^\d+$/.test(String(id))) return;
        featureBusy = true;
        featureStatus = "Trocando costume...";
        render();
        try {
            const response = await fetch("/ajax/dp-usuario-fashion-alterar.php", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: new URLSearchParams({ id: String(id) })
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const result = await response.json();
            if (Number(result.status) !== 1) throw new Error(result.mensagem || "o jogo recusou a troca");
            const outfit = fashionOutfits.find((entry) => entry.id === String(id));
            fashionActiveRoleId = String(id);
            if (typeof result.novafashion === "string" && result.novafashion.trim()) {
                const url = new URL(result.novafashion, location.origin);
                if (url.origin === location.origin) fashionActiveSrc = url.href;
            }
            if (!fashionActiveSrc) fashionActiveSrc = outfit?.src || "";
            fashionActiveTitle = outfit?.name || "";
            featureStatus = `Costume alterado${outfit?.name ? `: ${outfit.name}` : ""}.`;
            showToast(featureStatus);
        } catch (error) {
            console.error("[QOL - Digipets] Falha ao trocar costume.", error);
            featureStatus = `Falha ao trocar costume: ${error.message || "erro inesperado"}.`;
        } finally {
            featureBusy = false;
            render();
        }
    }

    function renderFashion() {
        const query = featureSearch.trim().toLocaleLowerCase("pt-BR");
        const outfits = fashionOutfits
            .filter((item) => !query || `${item.name} ${item.description}`.toLocaleLowerCase("pt-BR").includes(query))
            .sort((left, right) =>
                Number(state.favoriteFashions.includes(right.id)) - Number(state.favoriteFashions.includes(left.id))
                || left.order - right.order);
        modalContent.innerHTML = `
            <div class="shop-tools">
                <input class="search" id="feature-search" type="search" placeholder="🔎 Buscar costume" value="${escapeHtml(featureSearch)}">
                <button class="gray" type="button" data-action="fashion-refresh" ${featureBusy ? "disabled" : ""}>↻ Atualizar</button>
            </div>
            <div class="shop-status" role="status">${escapeHtml(featureStatus || (fashionOutfits.length ? `${outfits.length} costume(s).` : "Carregue a cole\u00e7ão para come\u00e7ar."))}</div>
            ${fashionActiveSrc ? `<div class="fashion-preview"><img src="${escapeHtml(fashionActiveSrc)}" alt=""><div><small>EM USO</small><strong>${escapeHtml(fashionActiveTitle || "Costume ativo")}</strong></div></div>` : ""}
            <div class="fashion-grid">${outfits.map((item) => {
                const favorite = state.favoriteFashions.includes(item.id);
                const active = item.id === fashionActiveRoleId;
                return `<article class="fashion-card ${active ? "active" : ""}">
                    <div class="fashion-card-art">${item.src ? `<img src="${escapeHtml(item.src)}" alt="">` : '<span>👕</span>'}</div>
                    <div class="fashion-card-copy"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.description || "Sem descri\u00e7ão de bônus")} · ID ${escapeHtml(item.id)}</small></div>
                    <div class="fashion-card-actions">
                        <button class="favorite-action" data-action="toggle-fashion-favorite" data-id="${escapeHtml(item.id)}" aria-pressed="${favorite}" title="${favorite ? "Remover favorito" : "Favoritar"}"><span class="favorite-star" aria-hidden="true">★</span></button>
                        <button class="green" data-action="apply-fashion" data-id="${escapeHtml(item.id)}" ${featureBusy || active ? "disabled" : ""}>${active ? "Em uso" : "Usar"}</button>
                    </div>
                </article>`;
            }).join("") || '<div class="modal-empty">Nenhum costume corresponde à pesquisa.</div>'}</div>
        `;
    }

    async function loadParty() {
        featureBusy = true;
        featureStatus = "Carregando parties...";
        render();
        try {
            const response = await fetch("/usuario_party", { credentials: "same-origin", cache: "no-store" });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const parsed = new DOMParser().parseFromString(await response.text(), "text/html");
            if (Array.from({ length: 5 }, (_, index) => parsed.querySelector(`#tabs-${index + 1}`)).some((panel) => !panel)) {
                throw new Error("A página não retornou as cinco parties esperadas.");
            }
            partyData = Array.from({ length: 5 }, (_, index) => {
                const number = index + 1;
                const panel = parsed.querySelector(`#tabs-${number}`);
                if (!panel) return { number, locked: "Party não disponível.", slots: [] };
                const warning = panel.querySelector(".the-error-msg")?.textContent.trim() || "";
                const slots = Array.from({ length: 3 }, (_, slotIndex) => {
                    const slotNumber = slotIndex + 1;
                    const container = panel.querySelector(`#Digimon${number}${slotNumber}`);
                    if (!container) return null;
                    const image = Array.from(container.querySelectorAll('a[href*="do=trocar"] img[src]'))
                        .find((node) => (node.getAttribute("src") || "").includes("/digimons/"));
                    let src = "";
                    const rawSrc = image?.getAttribute("src")?.trim() || "";
                    if (rawSrc) {
                        try {
                            const url = new URL(rawSrc, location.origin);
                            if (url.origin === location.origin) src = url.href;
                        } catch (error) {
                            console.warn("[QOL - Digipets] Imagem de party inválida.", error);
                        }
                    }
                    const file = decodeURIComponent(src.split("/").pop() || "");
                    return {
                        number: slotNumber,
                        name: src ? file.replace(/\.[^.]+$/, "").replace(/\d+$/, "").replace(/[_-]+/g, " ") : "Espa\u00e7o vazio",
                        src,
                        removable: slotNumber > 1 && Boolean(container.querySelector('a[href*="act=remover"]'))
                    };
                }).filter(Boolean);
                const selected = Array.from(panel.querySelectorAll("button"))
                    .some((button) => button.textContent.trim().toLocaleLowerCase() === "selecionado");
                const selectable = Boolean(panel.querySelector('a[href*="act=selecionar"]'));
                return {
                    number,
                    letter: String.fromCharCode(64 + number),
                    warning,
                    selected,
                    selectable,
                    power: panel.querySelector(`[id="PartyBattlePower${number}"]`)?.textContent.trim() || "—",
                    slots
                };
            });
            featureStatus = "Parties atualizadas.";
        } catch (error) {
            console.error("[QOL - Digipets] Falha ao carregar parties.", error);
            featureStatus = `Não foi possível carregar parties: ${error.message || "erro inesperado"}.`;
            partyData = [];
        } finally {
            featureBusy = false;
            render();
        }
    }

    async function openPartySelection(party, slot) {
        partySelection = { party, slot, options: [] };
        partySearch = "";
        featureStatus = "Carregando Digimons disponíveis...";
        render();
        try {
            const params = new URLSearchParams({ do: "trocar", party: String(party), slot: String(slot) });
            const response = await fetch(`/usuario_party?${params}`, { credentials: "same-origin", cache: "no-store" });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const parsed = new DOMParser().parseFromString(await response.text(), "text/html");
            const select = parsed.querySelector('select[name="digimon"]');
            if (!select) throw new Error("O jogo não retornou as op\u00e7ões para esta posi\u00e7ão.");
            partySelection.options = Array.from(select.options)
                .filter((option) => /^\d+$/.test(option.value) && option.textContent.trim())
                .map((option) => {
                    const label = option.textContent.trim();
                    const metadata = `${label} ${option.getAttribute("title") || ""}`;
                    const powerMatch = metadata.match(/\b(?:B\.?P\.?|power|poder)\s*[:\-]?\s*([\d.,]+)/i)
                        || metadata.match(/([\d.,]+)\s*(?:B\.?P\.?|power|poder)\b/i);
                    const tierMatch = metadata.match(/\b(?:rank|tier|classe)\s*[:\-]?\s*(SSS|SS|S|A|B|C|D|E)\b/i)
                        || metadata.match(/\((SSS|SS|S|A|B|C|D|E)\)/i)
                        || metadata.match(/\b(SSS|SS|S|A|B|C|D|E)\s*$/i);
                    const tierValue = String(option.dataset.tier || option.dataset.rank || tierMatch?.[1] || "").toUpperCase();
                    const tier = /^(SSS|SS|S|A|B|C|D|E)$/.test(tierValue) ? tierValue : "";
                    const name = label
                        .replace(/\b(?:B\.?P\.?|power|poder)\s*[:\-]?\s*[\d.,]+/gi, "")
                        .replace(/[\d.,]+\s*(?:B\.?P\.?|power|poder)\b/gi, "")
                        .replace(/\b(?:rank|tier|classe)\s*[:\-]?\s*(?:SSS|SS|S|A|B|C|D|E)\b/gi, "")
                        .replace(/\((?:SSS|SS|S|A|B|C|D|E)\)/gi, "")
                        .replace(/\s+(?:SSS|SS|S|A|B|C|D|E)$/i, "")
                        .replace(/\s*[-|•]\s*/g, " ")
                        .replace(/\s+/g, " ")
                        .replace(/[\s(:,\-]+$/, "")
                        .trim();
                    const powerValue = String(option.dataset.bp || option.dataset.power || powerMatch?.[1] || "").match(/[\d.,]+/)?.[0] || "";
                    return {
                        id: option.value,
                        label,
                        name: name || label,
                        power: Number(powerValue.replace(/[.,]/g, "")) || 0,
                        tier
                    };
                });
            featureStatus = partySelection.options.length
                ? `${partySelection.options.length} Digimon(s) disponíveis.`
                : "Não há Digimons disponíveis para esta posi\u00e7ão.";
        } catch (error) {
            console.error("[QOL - Digipets] Falha ao carregar op\u00e7ões da party.", error);
            featureStatus = `Não foi possível carregar Digimons: ${error.message || "erro inesperado"}.`;
        }
        render();
    }

    async function changeParty(action, party, slot = 0, digimon = "") {
        if (featureBusy) return;
        featureBusy = true;
        featureStatus = "Salvando party...";
        render();
        try {
            const params = action === "select"
                ? new URLSearchParams({ act: "selecionar", party: String(party) })
                : new URLSearchParams({ do: "", party: String(party), slot: String(slot), act: action });
            const response = await fetch(`/usuario_party?${params}`, {
                method: action === "mudar" ? "POST" : "GET",
                credentials: "same-origin",
                cache: "no-store",
                headers: action === "mudar"
                    ? { Accept: "text/html", "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
                    : { Accept: "text/html" },
                ...(action === "mudar" ? { body: new URLSearchParams({ digimon }) } : {})
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            await response.text();
            partySelection = null;
            await loadParty();
            if (!partyData.length) return;
            featureStatus = action === "select"
                ? `Party ${String.fromCharCode(64 + party)} ativada.`
                : action === "remover" ? "Digimon removido da party." : "Party atualizada.";
            render();
            showToast(featureStatus);
        } catch (error) {
            console.error("[QOL - Digipets] Falha ao atualizar party.", error);
            featureStatus = `Não foi possível salvar: ${error.message || "erro inesperado"}.`;
            featureBusy = false;
            render();
        }
    }

    function renderParty() {
        const party = partyData.find((item) => item.number === partySelectedTab);
        if (partySelection) {
            const query = partySearch.trim().toLocaleLowerCase("pt-BR");
            const options = partySelection.options.filter((item) =>
                `${item.name} ${item.tier} ${item.power || ""}`.toLocaleLowerCase("pt-BR").includes(query));
            const tierOrder = { E: 0, D: 1, C: 2, B: 3, A: 4, S: 5, SS: 6, SSS: 7 };
            const compareTier = (left, right) => (tierOrder[left.tier] ?? -1) - (tierOrder[right.tier] ?? -1);
            const powerTieBreak = (left, right) => right.power - left.power || left.name.localeCompare(right.name, "pt-BR");
            const sorters = {
                "power-desc": (left, right) => Number(!left.power) - Number(!right.power) || powerTieBreak(left, right),
                "power-asc": (left, right) => Number(!left.power) - Number(!right.power) || (left.power - right.power) || left.name.localeCompare(right.name, "pt-BR"),
                "tier-desc": (left, right) => Number(!left.tier) - Number(!right.tier) || compareTier(right, left) || powerTieBreak(left, right),
                "tier-asc": (left, right) => Number(!left.tier) - Number(!right.tier) || compareTier(left, right) || powerTieBreak(left, right),
                "name-asc": (left, right) => left.name.localeCompare(right.name, "pt-BR")
            };
            options.sort(sorters[partySort] || sorters["power-desc"]);
            modalContent.innerHTML = `
                <div class="party-modal-tools">
                    <input class="search" id="feature-search" type="search" placeholder="Buscar por nome, tier ou BP" value="${escapeHtml(partySearch)}">
                    <select id="party-sort" aria-label="Ordenar Digimons">
                        <option value="power-desc" ${partySort === "power-desc" ? "selected" : ""}>Maior BP primeiro</option>
                        <option value="power-asc" ${partySort === "power-asc" ? "selected" : ""}>Menor BP primeiro</option>
                        <option value="tier-desc" ${partySort === "tier-desc" ? "selected" : ""}>Maior Rank primeiro</option>
                        <option value="tier-asc" ${partySort === "tier-asc" ? "selected" : ""}>Menor Rank primeiro</option>
                        <option value="name-asc" ${partySort === "name-asc" ? "selected" : ""}>Nome A–Z</option>
                    </select>
                    <button class="gray" type="button" data-action="party-back">← Party ${String.fromCharCode(64 + partySelection.party)}</button>
                </div>
                <div class="shop-status" role="status">${escapeHtml(featureStatus || `${options.length} Digimon(s) encontrados. Dados não fornecidos pelo jogo aparecem como “n/d”.`)}</div>
                <div class="party-option-list">${options.map((item) => `<button class="party-option" data-action="party-choose" data-digimon="${escapeHtml(item.id)}">
                    <span class="party-option-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span>
                    <span class="party-option-power">${item.power ? `${item.power.toLocaleString("pt-BR")} BP` : "BP n/d"}</span>
                    <span class="party-option-tier tier-${item.tier ? item.tier.toLowerCase() : "unknown"}">${escapeHtml(item.tier || "—")}</span>
                </button>`).join("") || '<div class="modal-empty">Nenhum Digimon encontrado.</div>'}</div>
            `;
            return;
        }
        const tabs = Array.from({ length: 5 }, (_, index) => {
            const number = index + 1;
            const current = partyData.find((item) => item.number === number);
            return `<button class="${number === partySelectedTab ? "green" : "gray"}" data-action="party-tab" data-party="${number}" ${current?.warning ? "title=\"Party bloqueada\"" : ""}>${String.fromCharCode(64 + number)}</button>`;
        }).join("");
        modalContent.innerHTML = `
            <div class="party-modal-tools">
                <span class="shop-status">${escapeHtml(featureStatus || "Selecione uma forma\u00e7ão para editar ou ativar.")}</span>
                <button class="gray" data-action="party-refresh" ${featureBusy ? "disabled" : ""}>↻ Atualizar</button>
            </div>
            <nav class="party-tabs" aria-label="Selecionar party">${tabs}</nav>
            ${party?.warning ? `<div class="party-warning">${escapeHtml(party.warning)}</div>` : ""}
            ${party && !party.warning ? `<section class="party-summary"><div><strong>Party ${party.letter}${party.selected ? " · atual" : ""}</strong><div><small>${escapeHtml(party.power)} BP</small></div></div>${party.selected ? '<button class="green" disabled>✓ Em uso</button>' : `<button class="green" data-action="party-select" data-party="${party.number}" ${featureBusy ? "disabled" : ""}>⚔️ Usar esta Party</button>`}</section>
                <div class="party-slots">${Array.from({ length: 3 }, (_, index) => {
                    const slot = party.slots.find((item) => item.number === index + 1) || {
                        number: index + 1, name: "Espa\u00e7o vazio", src: "", removable: false
                    };
                    return `<article class="party-slot-card ${slot.number === 1 ? "leader" : ""}">
                        <div class="party-slot-art">${slot.src ? `<img src="${escapeHtml(slot.src)}" alt="">` : "<span>＋</span>"}</div>
                        <span class="party-slot-label">${slot.number === 1 ? "Líder" : `Slot ${slot.number}`}</span>
                        <strong class="party-slot-name">${escapeHtml(slot.name)}</strong>
                        <div class="party-slot-actions">
                            <button class="gray" data-action="party-edit" data-party="${party.number}" data-slot="${slot.number}" ${featureBusy ? "disabled" : ""}>${slot.src ? "Trocar" : "Adicionar"}</button>
                            ${slot.removable && slot.src ? `<button class="red" data-action="party-remove" data-party="${party.number}" data-slot="${slot.number}" ${featureBusy ? "disabled" : ""}>Remover</button>` : ""}
                        </div>
                    </article>`;
                }).join("")}</div>` : ""}
            ${!partyData.length && !featureBusy ? `<div class="modal-empty">${escapeHtml(featureStatus || "Não foi possível carregar as parties.")}</div>` : ""}
        `;
    }

    function parseShopFilters(options) {
        const filters = [];
        for (const option of options) {
            const value = option.value.trim();
            if (!value || filters.some((filter) => filter.value === value)) continue;
            filters.push({
                value,
                label: SHOP_FILTER_LABELS[value] || option.textContent.trim() || value
            });
        }
        return filters;
    }

    function parseShopListing(html, type) {
        const parsed = new DOMParser().parseFromString(html, "text/html");
        const products = Array.from(parsed.querySelectorAll("table tbody tr")).map((row) => {
            const cells = row.querySelectorAll("td");
            if (cells.length < 3) return null;
            const inline = row.querySelector("button[onclick]")?.getAttribute("onclick") || "";
            const id = inline.match(/ConfirmaFuncao(\d+)\s*\(/)?.[1]
                || row.querySelector("[data-id]")?.getAttribute("data-id") || "";
            const name = cells[0].querySelector(".dropt small b, small b")?.textContent.trim() || "";
            if (!/^\d+$/.test(id) || !name) return null;
            const localSrc = (node) => {
                const rawSrc = node?.getAttribute("src")?.trim() || "";
                if (!rawSrc) return "";
                try {
                    const url = new URL(rawSrc, location.origin);
                    return url.origin === location.origin ? url.href : "";
                } catch (error) {
                    console.warn("[QOL - Digipets] URL de produto inválida.", error);
                    return "";
                }
            };
            const imageNode = cells[0].querySelector("img");
            const tierNode = type === "1" ? cells[0].querySelector('img[src*="icone_tier_"]') : null;
            const tierName = tierNode?.getAttribute("src")?.match(/icone_tier_([^./]+)\./i)?.[1]?.toUpperCase() || "";
            return {
                id,
                name,
                price: cells[1].querySelector(".text-success b")?.textContent.trim() || "—",
                image: localSrc(imageNode),
                tier: localSrc(tierNode),
                tierName,
                likes: cells[1].querySelector(`.likes-${id}`)?.textContent.trim() || "0",
                dislikes: cells[1].querySelector(`.dislikes-${id}`)?.textContent.trim() || "0"
            };
        }).filter(Boolean);
        const filters = parseShopFilters(parsed.querySelectorAll('select[name="filtro"] option'));
        let pages = state.shopPage;
        for (const link of parsed.querySelectorAll('a[href*="pagina="]')) {
            try {
                const url = new URL(link.getAttribute("href"), location.href);
                if (url.searchParams.get("tipo") === type && url.searchParams.get("filtro") === state.shopFilter) {
                    pages = Math.max(pages, Number(url.searchParams.get("pagina")) || pages);
                }
            } catch (error) {
                console.warn("[QOL - Digipets] Pagina\u00e7ão da loja inválida.", error);
            }
        }
        return { products, filters, pages };
    }

    async function loadShop() {
        featureBusy = true;
        featureStatus = "Carregando Black Trader...";
        render();
        try {
            const query = new URLSearchParams({
                tipo: state.shopType,
                filtro: state.shopFilter,
                pagina: String(state.shopPage)
            });
            const response = await fetch(`/shop_blacktrader?${query}`, {
                credentials: "same-origin",
                headers: { Accept: "text/html" }
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const listing = parseShopListing(await response.text(), state.shopType);
            shopProducts = listing.products;
            shopTotalPages = listing.pages;
            if (listing.filters.length) shopFilters = listing.filters;
            if (!shopFilters.some((item) => item.value === state.shopFilter)) {
                state.shopFilter = shopFilters[0]?.value || "maiorpreco";
                state.shopPage = 1;
                saveState();
                return await loadShop();
            }
            featureStatus = `${shopProducts.length} produto(s) nesta página.`;
        } catch (error) {
            console.error("[QOL - Digipets] Falha ao carregar a loja.", error);
            featureStatus = `Não foi possível carregar a loja: ${error.message || "erro inesperado"}.`;
            shopProducts = [];
        } finally {
            featureBusy = false;
            render();
        }
    }

    async function voteShop(productId, vote) {
        if (!/^\d+$/.test(String(productId)) || !["like", "dislike"].includes(vote) || shopVotesPending.has(productId)) return;
        shopVotesPending.add(productId);
        render();
        try {
            const response = await fetch(`/ajax/blacktrader/${vote}.php`, {
                method: "POST",
                credentials: "same-origin",
                headers: { "X-Requested-With": "XMLHttpRequest" },
                body: new URLSearchParams({ id: String(productId) })
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const result = await response.json();
            if (Number(result.status) !== 1 || !Number.isFinite(Number(result.votes))) {
                throw new Error(result.msg || "O jogo não confirmou o voto.");
            }
            const product = shopProducts.find((entry) => entry.id === String(productId));
            if (product) product[vote === "like" ? "likes" : "dislikes"] = String(result.votes);
            featureStatus = "Voto registrado.";
            showToast(featureStatus);
        } catch (error) {
            console.error("[QOL - Digipets] Falha ao avaliar produto.", error);
            featureStatus = `Não foi possível registrar o voto: ${error.message || "erro inesperado"}.`;
            showToast(featureStatus);
        } finally {
            shopVotesPending.delete(productId);
            render();
        }
    }

    function renderShop() {
        const query = featureSearch.trim().toLocaleLowerCase("pt-BR");
        const products = shopProducts.filter((item) => item.name.toLocaleLowerCase("pt-BR").includes(query));
        modalContent.innerHTML = `
            <nav class="shop-tabs" aria-label="Categoria da loja">
                <button type="button" class="${state.shopType === "1" ? "selected" : ""}" data-action="shop-tab" data-type="1">🐉 Digimons</button>
                <button type="button" class="${state.shopType === "2" ? "selected" : ""}" data-action="shop-tab" data-type="2">🧰 Itens</button>
            </nav>
            <div class="shop-tools">
                <input class="search" id="feature-search" type="search" placeholder="🔎 Pesquisar nesta página" value="${escapeHtml(featureSearch)}">
                <select id="shop-filter" aria-label="Ordenar produtos">${shopFilters.map((item) => `<option value="${escapeHtml(item.value)}" ${item.value === state.shopFilter ? "selected" : ""}>${escapeHtml(item.label)}</option>`).join("")}</select>
                <button class="gray" type="button" data-action="shop-refresh" ${featureBusy ? "disabled" : ""}>↻ Atualizar</button>
            </div>
            <div class="shop-status" role="status">${escapeHtml(featureStatus)}</div>
            <div class="shop-grid">${products.map((item) => `<article class="shop-card">
                ${item.image ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">` : '<div class="modal-empty">Imagem indisponível</div>'}
                <div class="shop-name">${escapeHtml(item.name)}</div>
                ${item.tier ? `<div class="shop-rank"><img src="${escapeHtml(item.tier)}" alt=""><span>${escapeHtml(item.tierName || "Rank")}</span></div>` : '<div class="shop-rank"> </div>'}
                <div class="shop-price">${escapeHtml(item.price)} bits</div>
                <div class="shop-ratings">
                    <button class="gray" type="button" data-action="shop-vote" data-vote="like" data-id="${escapeHtml(item.id)}" ${shopVotesPending.has(item.id) ? "disabled" : ""}>👍 ${escapeHtml(item.likes)}</button>
                    <button class="gray" type="button" data-action="shop-vote" data-vote="dislike" data-id="${escapeHtml(item.id)}" ${shopVotesPending.has(item.id) ? "disabled" : ""}>👎 ${escapeHtml(item.dislikes)}</button>
                </div>
                <button class="green" type="button" data-action="shop-buy" data-id="${escapeHtml(item.id)}" ${featureBusy ? "disabled" : ""}>Comprar</button>
            </article>`).join("") || `<div class="modal-empty">${featureBusy ? "Carregando produtos..." : "Nenhum produto encontrado nesta página."}</div>`}</div>
            <footer class="shop-pager"><button class="gray" type="button" data-action="shop-prev" ${state.shopPage <= 1 || featureBusy ? "disabled" : ""}>← Anterior</button><span>Página ${state.shopPage} de ${shopTotalPages}</span><button class="gray" type="button" data-action="shop-next" ${state.shopPage >= shopTotalPages || featureBusy ? "disabled" : ""}>Próxima →</button></footer>
            <div class="shop-confirm" ${shopConfirmProduct ? "" : "hidden"}>
                ${shopConfirmProduct ? `<div class="shop-confirm-card" role="alertdialog" aria-modal="true" aria-labelledby="shop-confirm-title">
                    <h3 id="shop-confirm-title">Confirmar compra</h3>
                    <p>Deseja comprar <strong>${escapeHtml(shopConfirmProduct.name)}</strong> por <strong>${escapeHtml(shopConfirmProduct.price)} bits</strong>?</p>
                    <div class="shop-confirm-actions"><button class="gray" type="button" data-action="shop-cancel">Cancelar</button><button class="green" type="button" data-action="shop-confirm">Confirmar compra</button></div>
                </div>` : ""}
            </div>
        `;
    }

    async function fetchEpisode(episode, signal) {
        const response = await fetch(`/estagios?episodio=${encodeURIComponent(episode)}`, {
            credentials: "same-origin",
            signal
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = readEpisodePage(await response.text(), episode);
        applyEpisode(result);
        return result;
    }

    function getCoverage() {
        return EPISODE_IDS.filter((episode) => state.episodes[String(episode)]).length;
    }

    function renderHome() {
        content.innerHTML = `
            <p class="intro">Qualidade de vida para o DigiPets: navega\u00e7ão de bosses e Digitamas, gestão de conta, loja e contadores.</p>
            <div class="home-grid">
                <button class="home-link" type="button" data-action="view-stages"><span><strong>🗺️ Mapas e estágios</strong><small>${Object.keys(state.stages).length} estágio(s) no mapa · ${getCoverage()}/${EPISODE_IDS.length} episódios conhecidos</small></span><b>›</b></button>
                <button class="home-link" type="button" data-action="view-bosses"><span><strong>⚔️ Boss Rush</strong><small>${BOSS_CATALOG.length} bosses no catálogo · alarmes, favoritos e ignorar</small></span><b>›</b></button>
                <button class="home-link" type="button" data-action="view-digitamas"><span><strong>🥚 Digitamas</strong><small>Consultar cooldowns e abrir estágios</small></span><b>›</b></button>
                <button class="home-link" type="button" data-action="view-shop"><span><strong>🛒 Loja Black Trader</strong><small>Pesquisar produtos e comprar com confirma\u00e7ão</small></span><b>›</b></button>
                <button class="home-link" type="button" data-action="view-fashion"><span><strong>👕 Trocar Costume</strong><small>Escolher roupa e guardar favoritos</small></span><b>›</b></button>
                <button class="home-link" type="button" data-action="view-party"><span><strong>👥 Editar Party</strong><small>Trocar membros, remover Digimons e ativar forma\u00e7ão</small></span><b>›</b></button>
                <button class="home-link" type="button" data-action="view-settings"><span><strong>⚙️ Configura\u00e7ões</strong><small>Skin do countdown, sincroniza\u00e7ão e popups</small></span><b>›</b></button>
            </div>
        `;
    }

    function updateCountdowns() {
        for (const element of content.querySelectorAll("[data-expiry]")) {
            const expiresAt = Number(element.dataset.expiry) || 0;
            const remaining = Math.ceil((expiresAt - Date.now()) / 1000);
            const unknown = element.dataset.unknown === "true";
            const stale = element.dataset.stale === "true";
            const available = !unknown && !stale && (element.dataset.available === "true" || remaining <= 0);
            element.textContent = stale ? "CD não atualizado" : unknown ? "CD n/d" : formatRemaining(remaining);
            const stageCard = element.closest(".stage-card");
            const featureCard = element.closest(".feature-card");
            const start = stageCard?.querySelector('[data-action="start-stage"]')
                || featureCard?.querySelector('[data-action="feature-start"]');
            if (start) {
                start.disabled = !available;
                start.textContent = available
                    ? (featureCard ? "⚔️ Come\u00e7ar" : "⚔️ Entrar")
                    : stale || unknown ? "CD n/d" : "⏳ Em cooldown";
            }
        }
    }

    function renderStages() {
        const query = searchQuery.trim().toLocaleLowerCase("pt-BR");
        const stages = Object.values(state.stages)
            .filter((stage) => stage && /^\d+$/.test(String(stage.stage)))
            .filter((stage) => !query || `${stage.name} ${stage.stage} ${stage.episode}`
                .toLocaleLowerCase("pt-BR").includes(query))
            .sort((left, right) =>
                Number(state.favoriteStages.includes(String(right.stage)))
                    - Number(state.favoriteStages.includes(String(left.stage)))
                || Number(right.isBoss) - Number(left.isBoss)
                || Number(left.stage) - Number(right.stage));
        content.innerHTML = `
            <div class="toolbar"><button class="gray" data-action="home">← Início</button><strong>Mapas e estágios</strong><div class="toolbar-actions">
                <button class="gray" data-action="import-sync">⬆ Importar sync</button>
                <button class="gray" data-action="export-sync" ${Object.keys(state.episodes).length ? "" : "disabled"}>⬇ Exportar</button>
                <button class="green" data-action="sync-stages" ${syncRunning ? "disabled" : ""}>${syncRunning ? "Sincronizando…" : "Atualizar mapas"}</button>
            </div></div>
            <p class="intro">O sync compartilhado preenche episódios e estágios; cooldowns só são aceitos se a captura tiver menos de 6 horas. Use <b>Mapa</b> para consultar o tempo atual no jogo.</p>
            <input class="search" id="stage-search" type="search" placeholder="Buscar por nome, estágio ou episódio" value="${escapeHtml(searchQuery)}">
            <div class="status" role="status">${escapeHtml(syncStatus || `${stages.length} estágio(s) · ${getCoverage()}/${EPISODE_IDS.length} episódios mapeados.`)}</div>
            <div class="stage-list">${stages.length ? stages.map((stage) => {
                const stageId = String(stage.stage);
                const expiry = Number(stage.expiresAt) || 0;
                const fresh = Date.now() - Number(stage.checkedAt || 0) <= STAGE_FRESH_MS;
                const unknown = !stage.available && !stage.remainingKnown;
                const available = fresh
                    && (Boolean(stage.available) || (stage.remainingKnown && (!expiry || expiry <= Date.now())));
                const favorite = state.favoriteStages.includes(stageId);
                return `<article class="stage-card">
                    <div class="stage-name"><strong>${escapeHtml(stage.name)}${stage.isBoss ? " · Boss" : ""}</strong><small>Estágio ${escapeHtml(stageId)} · Episódio ${escapeHtml(stage.episode || "?")}${stage.bp ? ` · BP ${escapeHtml(stage.bp)}` : ""}</small></div>
                    <div class="stage-actions">
                        <span class="stage-time ${state.countdownSkin ? "skin" : ""}" data-expiry="${expiry}" data-available="${Boolean(stage.available)}" data-unknown="${unknown}" data-stale="${!fresh}">${escapeHtml(!fresh ? "CD não atualizado" : unknown ? "CD n/d" : formatRemaining((expiry - Date.now()) / 1000))}</span>
                        <button class="favorite-action" type="button" data-action="favorite-stage" data-stage="${escapeHtml(stageId)}" aria-pressed="${favorite}" title="${favorite ? "Remover favorito" : "Favoritar"}"><span class="favorite-star" aria-hidden="true">★</span></button>
                        <button class="stage-map-button" type="button" data-action="open-episode" data-episode="${escapeHtml(stage.episode || "")}" ${stage.episode ? "" : "disabled"}>🗺️ Mapa</button>
                        <button class="green" type="button" data-action="start-stage" data-stage="${escapeHtml(stageId)}" ${available ? "" : "disabled"}>${available ? "⚔️ Entrar" : fresh && stage.remainingKnown ? "Em cooldown" : "CD n/d"}</button>
                    </div>
                </article>`;
            }).join("") : '<div class="status">Ainda não há mapas conhecidos. Importe um sync compartilhado ou atualize os episódios em Configura\u00e7ões.</div>'}</div>
        `;
    }

    function renderSettings() {
        const popupState = state.blockRepeatingPopups ? "Ativado" : "Desativado";
        content.innerHTML = `
            <div class="toolbar"><button class="gray" data-action="home">← Início</button><strong>Configura\u00e7ões</strong></div>
            <div class="config-row">
                <div class="config-copy"><strong>Skin do countdown</strong><small>Real\u00e7a os contadores com o tema digital do QOL.</small></div>
                <button class="switch ${state.countdownSkin ? "green" : "gray"}" type="button" role="switch" aria-checked="${state.countdownSkin}" data-action="toggle-countdown-skin">${state.countdownSkin ? "Ativada" : "Desativada"}</button>
            </div>
            <div class="config-row">
                <div class="config-copy"><strong>Bloquear popups repetitivos</strong><small>Oculta avisos repetidos de ovos chocados e experiência recebida.</small></div>
                <button class="switch ${state.blockRepeatingPopups ? "green" : "gray"}" type="button" role="switch" aria-checked="${state.blockRepeatingPopups}" data-action="toggle-popups">${popupState}</button>
            </div>
            <div class="config-row">
                <div class="config-copy"><strong>Sincronizar estágios</strong><small>Lê até ${SYNC_BATCH_SIZE} episódios por execu\u00e7ão, com intervalo entre pedidos. Execute novamente para continuar a cobertura de ${EPISODE_IDS.length} episódios.</small></div>
                <button class="green" type="button" data-action="sync-stages" ${syncRunning ? "disabled" : ""}>${syncRunning ? "Sincronizando…" : "Atualizar mapas"}</button>
            </div>
            <section class="config-row sync-config">
                <div class="config-copy"><strong>Compartilhar sync</strong><small>Importa o mapa de episódios/estágios do JSON de sync. Cooldowns antigos são ignorados; só timers capturados nas últimas 6 horas são usados.</small></div>
                <div class="sync-tools">
                    <button class="gray" type="button" data-action="import-sync" ${importRunning ? "disabled" : ""}>⬆ Importar sync</button>
                    <button class="gray" type="button" data-action="export-sync" ${Object.keys(state.episodes).length ? "" : "disabled"}>⬇ Exportar sync</button>
                </div>
            </section>
            <div class="status" role="status">${escapeHtml(syncStatus || `${getCoverage()}/${EPISODE_IDS.length} episódios mapeados · ${Object.keys(state.stages).length} estágio(s) conhecidos.`)}</div>
        `;
    }

    function render() {
        featureModal.classList.toggle("open", Boolean(modalView));
        if (modalView) {
            modalTitle.textContent = modalView === "shop"
                ? "🛒 Black Trader"
                : modalView === "fashion" ? "👕 Trocar Costume"
                    : partySelection ? `👥 Trocar Digimon · Party ${String.fromCharCode(64 + partySelection.party)}`
                        : "👥 Editor de Party";
            const wasExpanded = panel.classList.contains("expanded");
            panel.classList.remove("expanded");
            if (wasExpanded && panel.classList.contains("open")) requestAnimationFrame(positionPanelNearLauncher);
            if (modalView === "shop") renderShop();
            else if (modalView === "fashion") renderFashion();
            else if (modalView === "party") renderParty();
            return;
        }
        const expanded = ["bosses", "digitamas"].includes(view);
        const expandedChanged = panel.classList.contains("expanded") !== expanded;
        panel.classList.toggle("expanded", expanded);
        if (expandedChanged && panel.classList.contains("open")) requestAnimationFrame(positionPanelNearLauncher);
        if (view === "stages") renderStages();
        else if (view === "settings") renderSettings();
        else if (view === "bosses") renderBosses(false);
        else if (view === "digitamas") renderBosses(true);
        else renderHome();
    }

    function applyLauncherPosition() {
        const position = state.launcherPosition;
        if (!position) {
            launcher.style.left = "";
            launcher.style.top = "";
            launcher.style.right = "18px";
            launcher.style.bottom = "18px";
            return;
        }
        const maxLeft = Math.max(8, window.innerWidth - launcher.offsetWidth - 8);
        const maxTop = Math.max(8, window.innerHeight - launcher.offsetHeight - 8);
        const left = Math.min(maxLeft, Math.max(8, position.left));
        const top = Math.min(maxTop, Math.max(8, position.top));
        launcher.style.left = `${left}px`;
        launcher.style.top = `${top}px`;
        launcher.style.right = "auto";
        launcher.style.bottom = "auto";
    }

    function positionPanelNearLauncher() {
        if (!panel.classList.contains("open")) return;
        const launcherRect = launcher.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();
        const width = panelRect.width || Math.min(460, window.innerWidth - 24);
        const height = panelRect.height || Math.min(620, window.innerHeight - 24);
        const left = Math.min(window.innerWidth - width - 8, Math.max(8, launcherRect.right - width));
        let top = launcherRect.top - height - 10;
        if (top < 8) top = launcherRect.bottom + 10;
        top = Math.min(window.innerHeight - height - 8, Math.max(8, top));
        panel.style.left = `${left}px`;
        panel.style.top = `${top}px`;
        panel.style.right = "auto";
        panel.style.bottom = "auto";
    }

    function setPanelOpen(open) {
        panel.classList.toggle("open", open);
        launcher.setAttribute("aria-expanded", String(open));
        if (open) {
            render();
            requestAnimationFrame(positionPanelNearLauncher);
        }
    }

    function openFeatureModal(name) {
        view = "home";
        modalView = name;
        render();
        requestAnimationFrame(() => modalContent.querySelector("#feature-search")?.focus());
    }

    function waitForSyncGap() {
        const wait = Math.max(0, SYNC_REQUEST_GAP - (Date.now() - lastSyncRequestAt));
        return new Promise((resolve) => window.setTimeout(resolve, wait));
    }

    async function syncStages() {
        if (syncRunning) return;
        if (!isSafeSyncPage()) {
            showToast("A sincroniza\u00e7ão está disponível fora da batalha e das páginas de coleta.");
            return;
        }
        syncRunning = true;
        const oldestFirst = [...EPISODE_IDS].sort((left, right) =>
            Number(state.episodes[String(left)]?.checkedAt || 0)
            - Number(state.episodes[String(right)]?.checkedAt || 0));
        const batch = oldestFirst.slice(0, SYNC_BATCH_SIZE);
        let completed = 0;
        const failures = [];
        render();
        for (const episode of batch) {
            await waitForSyncGap();
            const controller = new AbortController();
            const timeout = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT);
            lastSyncRequestAt = Date.now();
            try {
                const result = await fetchEpisode(episode, controller.signal);
                completed += 1;
                syncStatus = `Sincronizando: ${completed}/${batch.length} desta rodada · episódio ${episode} · ${result.stages.length} estágio(s).`;
            } catch (error) {
                const message = error?.name === "AbortError" ? "tempo esgotado" : (error?.message || "falha");
                failures.push({ episode, message });
                console.error(`[QOL - Digipets] Falha ao sincronizar o episódio ${episode}.`, error);
                syncStatus = `Episódio ${episode}: ${message}. Continuando a rodada (${completed}/${batch.length}).`;
            } finally {
                clearTimeout(timeout);
            }
            if (panel.classList.contains("open")) render();
        }
        syncRunning = false;
        syncStatus = failures.length
            ? `Rodada concluída: ${completed}/${batch.length} episódios sincronizados; ${failures.length} falha(s). Repita para tentar novamente.`
            : `Rodada concluída: ${completed}/${batch.length} episódios sincronizados. Cobertura: ${getCoverage()}/${EPISODE_IDS.length}.`;
        saveState();
        if (panel.classList.contains("open")) render();
        showToast(syncStatus);
    }

    async function refreshDigitamaCooldowns(force = false) {
        if (digitamaSyncRunning) return;
        const lastCheckedAt = Number(state.episodes["53"]?.checkedAt) || 0;
        if (!force && lastCheckedAt && Date.now() - lastCheckedAt < DIGITAMA_SYNC_MAX_AGE) {
            digitamaSyncStatus = "Cooldowns do episódio 53 atualizados recentemente.";
            render();
            return;
        }
        if (syncRunning) {
            digitamaSyncStatus = "A sincroniza\u00e7ão geral já está consultando episódios; aguarde a rodada.";
            render();
            return;
        }
        if (!isSafeSyncPage()) {
            digitamaSyncStatus = "Abra a tela de Digitamas fora da batalha para consultar o cooldown atual.";
            render();
            return;
        }
        digitamaSyncRunning = true;
        digitamaSyncStatus = "Consultando o mapa real das Digitamas (episódio 53)…";
        render();
        await waitForSyncGap();
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT);
        lastSyncRequestAt = Date.now();
        try {
            const result = await fetchEpisode(53, controller.signal);
            saveState();
            digitamaSyncStatus = `Cooldowns atualizados pelo jogo · episódio 53 · ${result.stages.length} estágio(s).`;
        } catch (error) {
            const message = error?.name === "AbortError" ? "tempo esgotado" : (error?.message || "falha inesperada");
            console.error("[QOL - Digipets] Não foi possível atualizar o cooldown das Digitamas.", error);
            digitamaSyncStatus = `Falha ao consultar os cooldowns: ${message}.`;
        } finally {
            clearTimeout(timeout);
            digitamaSyncRunning = false;
            if (panel.classList.contains("open") && view === "digitamas") render();
        }
    }

    function normalizeSyncFile(raw) {
        if (!raw || typeof raw !== "object" || Array.isArray(raw) || Number(raw.version) !== 1) {
            throw new Error("Formato de sync incompatível; é necessário o JSON de sync versão 1.");
        }
        const rawEpisodes = raw.episodes && typeof raw.episodes === "object"
            ? raw.episodes
            : raw.schedule?.episodes;
        const rawStages = raw.stages && typeof raw.stages === "object"
            ? raw.stages
            : raw.schedule?.stages;
        if (!rawEpisodes || typeof rawEpisodes !== "object") {
            throw new Error("O arquivo não contém o mapa de episódios.");
        }

        const episodes = {};
        for (const [key, entry] of Object.entries(rawEpisodes)) {
            const episode = Number(key);
            if (!EPISODE_IDS.includes(episode) || !entry || typeof entry !== "object") continue;
            const stages = Array.isArray(entry.stages)
                ? [...new Set(entry.stages.map(String).filter((id) => /^\d+$/.test(id)))]
                : [];
            const bossStage = /^\d+$/.test(String(entry.bossStage || ""))
                ? String(entry.bossStage)
                : stages.at(-1) || "";
            if (stages.length) episodes[String(episode)] = { stages, bossStage };
        }

        const stageDetails = {};
        if (rawStages && typeof rawStages === "object") {
            for (const [key, entry] of Object.entries(rawStages)) {
                if (!/^\d+$/.test(key) || !entry || typeof entry !== "object") continue;
                const stage = String(key);
                const episode = Number(entry.episode) || Object.entries(episodes)
                    .find(([, info]) => info.stages.includes(stage))?.[0] || 0;
                stageDetails[stage] = {
                    stage,
                    name: typeof entry.name === "string" && entry.name.trim() ? entry.name.trim() : "",
                    level: Number.isFinite(Number(entry.level)) ? Number(entry.level) : 0,
                    bp: Number.isFinite(Number(entry.bp)) ? Number(entry.bp) : 0,
                    episode: EPISODE_IDS.includes(Number(episode)) ? Number(episode) : 0,
                    isBoss: Boolean(entry.isBoss)
                };
            }
        }
        if (!Object.keys(episodes).length && !Object.keys(stageDetails).length) {
            throw new Error("O arquivo não contém episódios ou estágios reconhecíveis.");
        }

        const generatedAt = Number(raw.generatedAt)
            || Date.parse(String(raw.generatedAt || ""))
            || 0;
        const capturedAt = Number(raw.capturedAt)
            || Date.parse(String(raw.capturedAt || ""))
            || generatedAt;
        const age = capturedAt ? Date.now() - capturedAt : Infinity;
        const cooldowns = [];
        if (capturedAt > 0 && age >= 0 && age <= SYNC_COOLDOWN_TTL) {
            const rawCooldowns = Array.isArray(raw.cooldowns)
                ? raw.cooldowns
                : Array.isArray(raw.schedule?.cooldowns) ? raw.schedule.cooldowns : [];
            for (const entry of rawCooldowns) {
                if (!/^\d+$/.test(String(entry?.stage || ""))) continue;
                const expiresAt = Number(entry.expiresAt);
                if (Number.isFinite(expiresAt) && expiresAt > Date.now()) {
                    cooldowns.push({ stage: String(entry.stage), expiresAt });
                }
            }
        }
        return { generatedAt, capturedAt, episodes, stageDetails, cooldowns };
    }

    function applyImportedSync(payload) {
        const now = Date.now();
        const importedCooldowns = new Map(payload.cooldowns.map((entry) => [entry.stage, entry.expiresAt]));
        const stageEpisodes = new Map();
        for (const [episode, info] of Object.entries(payload.episodes)) {
            for (const stage of info.stages) stageEpisodes.set(stage, Number(episode));
            const previous = state.episodes[episode];
            state.episodes[episode] = {
                checkedAt: Number(previous?.checkedAt) || 0,
                importedAt: payload.capturedAt,
                bossStage: info.bossStage || info.stages.at(-1) || "",
                stages: [...new Set([...(previous?.stages || []), ...info.stages].map(String))]
            };
        }

        const allStageIds = new Set([...stageEpisodes.keys(), ...Object.keys(payload.stageDetails)]);
        let acceptedCooldowns = 0;
        for (const stage of allStageIds) {
            const details = payload.stageDetails[stage] || {};
            const episode = Number(details.episode) || stageEpisodes.get(stage) || 0;
            const catalogEntry = BOSS_CATALOG.find((item) => item.stage === stage)
                || DIGITAMA_STAGES.find((item) => item.stage === stage);
            const previous = state.stages[stage] || {};
            const previousCheckedAt = Number(previous.checkedAt) || 0;
            const previousIsFresh = previousCheckedAt > 0 && now - previousCheckedAt <= STAGE_FRESH_MS;
            const importedExpiry = importedCooldowns.get(stage);
            const keepPreviousLive = previousIsFresh
                && (!payload.capturedAt || previousCheckedAt >= payload.capturedAt || importedExpiry === undefined);
            const hasImportedCooldown = importedExpiry !== undefined && !keepPreviousLive;
            if (hasImportedCooldown) acceptedCooldowns += 1;
            state.stages[stage] = {
                ...details,
                ...previous,
                stage,
                name: keepPreviousLive && previous.name
                    ? previous.name
                    : details.name || catalogEntry?.name || previous.name || `Estágio ${stage}`,
                imageUrl: keepPreviousLive && previous.imageUrl
                    ? previous.imageUrl
                    : catalogEntry?.imageUrl || previous.imageUrl || "",
                episode: Number(details.episode) || Number(previous.episode) || episode,
                bp: Number(details.bp) || Number(previous.bp) || Number(catalogEntry?.bp) || 0,
                level: Number(details.level) || Number(previous.level) || 0,
                isBoss: Boolean(details.isBoss || previous.isBoss || payload.episodes[String(episode)]?.bossStage === stage),
                available: keepPreviousLive ? Boolean(previous.available) : false,
                remainingKnown: keepPreviousLive ? Boolean(previous.remainingKnown) : hasImportedCooldown,
                remainingSeconds: keepPreviousLive
                    ? previous.remainingSeconds
                    : hasImportedCooldown ? Math.max(0, Math.ceil((importedExpiry - now) / 1000)) : null,
                expiresAt: keepPreviousLive
                    ? Number(previous.expiresAt) || 0
                    : hasImportedCooldown ? importedExpiry : 0,
                checkedAt: keepPreviousLive ? previousCheckedAt : hasImportedCooldown ? payload.capturedAt : 0
            };
        }
        return {
            episodeCount: Object.keys(payload.episodes).length,
            stageCount: allStageIds.size,
            cooldownCount: acceptedCooldowns
        };
    }

    async function importSyncFile(file) {
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) {
            showToast("O arquivo de sync excede o limite de 10 MB.");
            return;
        }
        importRunning = true;
        syncStatus = "Lendo arquivo de sync…";
        render();
        try {
            const payload = normalizeSyncFile(JSON.parse(await file.text()));
            const applied = applyImportedSync(payload);
            if (!saveState()) throw new Error("O estado importado não pôde ser salvo.");
            const staleNote = payload.capturedAt && Date.now() - payload.capturedAt > SYNC_COOLDOWN_TTL
                ? " Os cooldowns expirados do arquivo foram ignorados."
                : "";
            syncStatus = `Sync importado: ${applied.episodeCount} episódio(s), ${applied.stageCount} estágio(s), ${applied.cooldownCount} cooldown(s) recente(s).${staleNote}`;
            showToast(syncStatus);
        } catch (error) {
            console.error("[QOL - Digipets] Falha ao importar o sync.", error);
            syncStatus = `Não foi possível importar o sync: ${error.message || "arquivo inválido"}.`;
            showToast(syncStatus);
        } finally {
            importRunning = false;
            const input = shadow.querySelector("#sync-file");
            if (input) input.value = "";
            render();
        }
    }

    function exportSyncFile() {
        const episodes = {};
        for (const episode of EPISODE_IDS) {
            const record = state.episodes[String(episode)];
            if (!record || !Array.isArray(record.stages) || !record.stages.length) continue;
            const stages = [...new Set(record.stages.map(String).filter((stage) => /^\d+$/.test(stage)))];
            if (!stages.length) continue;
            episodes[String(episode)] = { bossStage: String(record.bossStage || stages.at(-1)), stages };
        }
        if (!Object.keys(episodes).length) {
            showToast("Ainda não há mapas para exportar. Importe um sync ou atualize alguns episódios.");
            return;
        }
        const stages = {};
        const cooldowns = [];
        const now = Date.now();
        for (const [id, record] of Object.entries(state.stages)) {
            if (!/^\d+$/.test(id) || !record) continue;
            const episode = Number(record.episode) || Object.entries(episodes)
                .find(([, info]) => info.stages.includes(id))?.[0] || 0;
            const catalogEntry = BOSS_CATALOG.find((item) => item.stage === id)
                || DIGITAMA_STAGES.find((item) => item.stage === id);
            const name = record.name || catalogEntry?.name || "";
            if (name && !/^Estágio\s+\d+$/i.test(name)) {
                stages[id] = {
                    name,
                    level: Number(record.level) || 0,
                    bp: Number(record.bp) || Number(catalogEntry?.bp) || 0,
                    episode: Number(episode) || 0,
                    isBoss: Boolean(record.isBoss || catalogEntry)
                };
            }
            const expiry = Number(record.expiresAt) || 0;
            const checkedAt = Number(record.checkedAt) || 0;
            if (record.remainingKnown && !record.available && expiry > now
                && checkedAt > 0 && now - checkedAt <= STAGE_FRESH_MS) {
                cooldowns.push({ stage: id, expiresAt: expiry });
            }
        }
        const payload = {
            version: 1,
            helper: "QOL - Digipets",
            generatedAt: now,
            coverage: {
                episodes: Object.keys(episodes).length,
                episodeTotal: EPISODE_IDS.length,
                bosses: Object.keys(stages).length,
                bossTotal: BOSS_CATALOG.length + DIGITAMA_STAGES.length,
                complete: Object.keys(episodes).length >= EPISODE_IDS.length
            },
            episodes,
            stages,
            cooldowns
        };
        try {
            const stamp = new Date(now).toISOString().slice(0, 19).replace(/[:T]/g, "-");
            const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = `digipets-helper-sync-${stamp}.json`;
            document.body.appendChild(anchor);
            try {
                anchor.click();
            } finally {
                anchor.remove();
            }
            window.setTimeout(() => URL.revokeObjectURL(url), 10000);
            showToast(`Sync exportado: ${Object.keys(episodes).length} episódio(s) e ${Object.keys(stages).length} estágio(s).`);
        } catch (error) {
            console.error("[QOL - Digipets] Falha ao exportar o sync.", error);
            showToast("Não foi possível gerar o arquivo de sync.");
        }
    }

    function isDigifarmNotificationAlert(options) {
        if (!options || typeof options !== "object") return false;
        const html = [options.title, options.content]
            .filter((value) => typeof value === "string")
            .join(" ");
        if (!/(?:href\s*=\s*["']\/usuario_digifarm|popup_digifarm\.jpg)/i.test(html)) return false;
        const text = new DOMParser().parseFromString(html, "text/html").body.textContent.toLocaleLowerCase();
        return (/\bdigitama\b/.test(text) && /\b(?:chocou|eclodiu|abriu)\b/.test(text))
            || /recebeu\s+exp\s+na\s+digifarm/.test(text);
    }

    function installPopupFilter() {
        if (!state.blockRepeatingPopups) return true;
        const jquery = window.jQuery;
        if (!jquery || typeof jquery.alert !== "function") return false;
        if (jquery === hookedJQuery && jquery.alert === wrappedJQueryAlert) return true;
        const original = jquery.alert;
        const wrapped = function (options, ...args) {
            const confirm = options?.buttons?.ok?.action;
            if (state.blockRepeatingPopups && isDigifarmNotificationAlert(options) && typeof confirm === "function") {
                try {
                    Reflect.apply(confirm, this, []);
                    return undefined;
                } catch (error) {
                    console.error("[QOL - Digipets] Não foi possível dispensar o aviso repetido.", error);
                }
            }
            return Reflect.apply(original, this, [options, ...args]);
        };
        try {
            jquery.alert = wrapped;
        } catch (error) {
            console.error("[QOL - Digipets] Não foi possível substituir jQuery.alert.", error);
            return false;
        }
        if (jquery.alert !== wrapped) return false;
        hookedJQuery = jquery;
        originalJQueryAlert = original;
        wrappedJQueryAlert = wrapped;
        return true;
    }

    function deactivatePopupFilter() {
        clearInterval(popupInstallTimer);
        clearInterval(popupWatchdogTimer);
        popupInstallTimer = 0;
        popupWatchdogTimer = 0;
        if (hookedJQuery?.alert === wrappedJQueryAlert) hookedJQuery.alert = originalJQueryAlert;
        hookedJQuery = null;
        originalJQueryAlert = null;
        wrappedJQueryAlert = null;
    }

    function activatePopupFilter() {
        if (installPopupFilter()) {
            if (!popupWatchdogTimer) {
                popupWatchdogTimer = window.setInterval(() => {
                    if (!state.blockRepeatingPopups) {
                        deactivatePopupFilter();
                        return;
                    }
                    installPopupFilter();
                }, 1500);
            }
            return;
        }
        if (popupInstallTimer) return;
        let attempts = 0;
        popupInstallTimer = window.setInterval(() => {
            attempts += 1;
            if (installPopupFilter()) {
                clearInterval(popupInstallTimer);
                popupInstallTimer = 0;
                activatePopupFilter();
            } else if (attempts >= 40) {
                clearInterval(popupInstallTimer);
                popupInstallTimer = 0;
                if (Date.now() - popupFailureNoticeAt > 5 * 60 * 1000) {
                    popupFailureNoticeAt = Date.now();
                    console.error("[QOL - Digipets] O bloqueio está ativado, mas jQuery.alert não ficou disponível.");
                    showToast("Não foi possível instalar o bloqueio de popups nesta página.");
                }
            }
        }, 500);
    }

    function toggleFavorite(stage) {
        const key = String(stage);
        state.favoriteStages = state.favoriteStages.includes(key)
            ? state.favoriteStages.filter((item) => item !== key)
            : [...state.favoriteStages, key];
        saveState();
        render();
    }

    let launcherDrag = null;
    let suppressLauncherClick = false;
    launcher.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        const rect = launcher.getBoundingClientRect();
        launcherDrag = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, left: rect.left, top: rect.top, moved: false };
        launcher.setPointerCapture(event.pointerId);
    });
    launcher.addEventListener("pointermove", (event) => {
        if (!launcherDrag || launcherDrag.pointerId !== event.pointerId) return;
        const dx = event.clientX - launcherDrag.startX;
        const dy = event.clientY - launcherDrag.startY;
        if (!launcherDrag.moved && Math.hypot(dx, dy) < 5) return;
        launcherDrag.moved = true;
        const left = Math.min(window.innerWidth - launcher.offsetWidth - 8, Math.max(8, launcherDrag.left + dx));
        const top = Math.min(window.innerHeight - launcher.offsetHeight - 8, Math.max(8, launcherDrag.top + dy));
        launcher.style.left = `${left}px`;
        launcher.style.top = `${top}px`;
        launcher.style.right = "auto";
        launcher.style.bottom = "auto";
        if (panel.classList.contains("open")) positionPanelNearLauncher();
    });
    launcher.addEventListener("pointerup", (event) => {
        if (!launcherDrag || launcherDrag.pointerId !== event.pointerId) return;
        if (launcherDrag.moved) {
            const rect = launcher.getBoundingClientRect();
            state.launcherPosition = { left: rect.left, top: rect.top };
            saveState();
            suppressLauncherClick = true;
            window.setTimeout(() => { suppressLauncherClick = false; }, 0);
        }
        launcherDrag = null;
    });
    launcher.addEventListener("pointercancel", () => { launcherDrag = null; });
    launcher.addEventListener("click", () => {
        if (suppressLauncherClick) return;
        setPanelOpen(!panel.classList.contains("open"));
    });
    window.addEventListener("resize", () => {
        applyLauncherPosition();
        positionPanelNearLauncher();
    });

    shadow.addEventListener("click", (event) => {
        const target = event.composedPath().find((node) =>
            node instanceof Element && node.matches("[data-action]"));
        if (!target) return;
        const { action } = target.dataset;
        if (action === "close") setPanelOpen(false);
        else if (action === "home") { modalView = ""; view = "home"; render(); }
        else if (action === "modal-close") { modalView = ""; render(); }
        else if (action === "view-stages") { view = "stages"; render(); }
        else if (action === "view-settings") { view = "settings"; render(); }
        else if (action === "view-bosses") { view = "bosses"; featureSearch = ""; featureStatus = ""; render(); }
        else if (action === "view-digitamas") {
            view = "digitamas";
            featureSearch = "";
            featureStatus = "";
            digitamaSyncStatus = "";
            render();
            void refreshDigitamaCooldowns();
        }
        else if (action === "refresh-digitamas") void refreshDigitamaCooldowns(true);
        else if (action === "import-sync") shadow.querySelector("#sync-file")?.click();
        else if (action === "export-sync") exportSyncFile();
        else if (action === "open-episode") {
            const episode = Number(target.dataset.episode);
            if (!EPISODE_IDS.includes(episode)) {
                showToast("Este estágio ainda não tem episódio mapeado. Importe um sync ou atualize os mapas.");
                return;
            }
            window.location.href = `/estagios?episodio=${encodeURIComponent(episode)}`;
        }
        else if (action === "view-fashion") { featureSearch = ""; featureStatus = ""; openFeatureModal("fashion"); void loadFashion(); }
        else if (action === "fashion-refresh") void loadFashion();
        else if (action === "toggle-fashion-favorite") toggleSavedArray("favoriteFashions", target.dataset.id);
        else if (action === "apply-fashion") void applyFashion(target.dataset.id);
        else if (action === "view-party") { partySelection = null; featureStatus = ""; openFeatureModal("party"); void loadParty(); }
        else if (action === "party-refresh") void loadParty();
        else if (action === "party-tab") { partySelectedTab = Number(target.dataset.party) || 1; partySelection = null; render(); }
        else if (action === "party-edit") void openPartySelection(Number(target.dataset.party), Number(target.dataset.slot));
        else if (action === "party-back") { partySelection = null; featureStatus = ""; render(); }
        else if (action === "party-choose" && partySelection) void changeParty("mudar", partySelection.party, partySelection.slot, target.dataset.digimon);
        else if (action === "party-select") void changeParty("select", Number(target.dataset.party));
        else if (action === "party-remove") void changeParty("remover", Number(target.dataset.party), Number(target.dataset.slot));
        else if (action === "view-shop") { featureSearch = ""; featureStatus = ""; shopProducts = []; shopConfirmProduct = null; openFeatureModal("shop"); void loadShop(); }
        else if (action === "shop-tab") {
            if (["1", "2"].includes(target.dataset.type) && state.shopType !== target.dataset.type) {
                state.shopType = target.dataset.type;
                state.shopPage = 1;
                shopProducts = [];
                shopConfirmProduct = null;
                saveState();
                void loadShop();
            }
        }
        else if (action === "shop-refresh") void loadShop();
        else if (action === "shop-prev" || action === "shop-next") {
            state.shopPage = Math.max(1, Math.min(shopTotalPages, state.shopPage + (action === "shop-next" ? 1 : -1)));
            shopConfirmProduct = null;
            saveState();
            void loadShop();
        } else if (action === "shop-buy") {
            shopConfirmProduct = shopProducts.find((item) => item.id === target.dataset.id) || null;
            if (shopConfirmProduct) render();
        } else if (action === "shop-cancel") { shopConfirmProduct = null; render(); }
        else if (action === "shop-confirm" && shopConfirmProduct) {
            const params = new URLSearchParams({
                act: "comprar",
                id: shopConfirmProduct.id,
                tipo: state.shopType,
                filtro: state.shopFilter,
                pagina: String(state.shopPage)
            });
            window.location.href = `/shop_blacktrader?${params}`;
        } else if (action === "shop-vote") void voteShop(target.dataset.id, target.dataset.vote);
        else if (action === "toggle-boss-favorite") toggleSavedArray("favoriteBosses", target.dataset.stage);
        else if (action === "toggle-boss-ignore") toggleSavedArray("ignoredBosses", target.dataset.stage);
        else if (action === "toggle-boss-alert") toggleSavedArray("bossAlerts", target.dataset.stage);
        else if (action === "show-ignored") { showIgnoredBosses = !showIgnoredBosses; render(); }
        else if (action === "next-boss") {
            continueBossRush("");
        }
        else if (action === "feature-start") {
            const id = String(target.dataset.stage || "");
            if (!/^\d+$/.test(id) || !stageReadiness(id).ready) {
                showToast("Sincronize este estágio e confirme que ele está disponível.");
                return;
            }
            window.location.href = `/batalha?estagio=${encodeURIComponent(id)}#DP`;
        }
        else if (action === "sync-stages") void syncStages();
        else if (action === "toggle-countdown-skin") {
            state.countdownSkin = !state.countdownSkin;
            const saved = saveState();
            render();
            if (saved) {
                showToast(`Skin do countdown ${state.countdownSkin ? "ativada" : "desativada"}.`);
            } else {
                showToast("A skin mudou nesta sessão, mas a preferência não pôde ser salva.");
            }
        } else if (action === "toggle-popups") {
            state.blockRepeatingPopups = !state.blockRepeatingPopups;
            const saved = saveState();
            if (state.blockRepeatingPopups) activatePopupFilter();
            else deactivatePopupFilter();
            render();
            showToast(`Bloqueio de popups ${state.blockRepeatingPopups ? "ativado" : "desativado"}.`
                + (saved ? "" : " A preferência não foi salva."));
        } else if (action === "favorite-stage") {
            toggleFavorite(target.dataset.stage);
        } else if (action === "start-stage") {
            const stage = String(target.dataset.stage || "");
            const record = state.stages[stage];
            const fresh = record && Date.now() - Number(record.checkedAt || 0) <= STAGE_FRESH_MS;
            const canEnter = fresh
                && (record.available || (record.remainingKnown && Number(record.expiresAt) <= Date.now()));
            if (!/^\d+$/.test(stage) || !canEnter) {
                showToast(fresh ? "Este estágio ainda não está liberado." : "Sincronize este estágio antes de abri-lo.");
                return;
            }
            window.location.href = `/batalha?estagio=${encodeURIComponent(stage)}#DP`;
        }
    });

    shadow.addEventListener("input", (event) => {
        if (event.target.id === "feature-search") {
            const input = event.target;
            const position = input.selectionStart;
            if (modalView === "party" && partySelection) partySearch = input.value;
            else featureSearch = input.value;
            render();
            const refreshed = shadow.querySelector("#feature-search");
            refreshed?.focus();
            if (refreshed && position !== null) refreshed.setSelectionRange(position, position);
            return;
        }
        if (event.target.id !== "stage-search") return;
        const position = event.target.selectionStart;
        searchQuery = event.target.value;
        renderStages();
        const search = shadow.querySelector("#stage-search");
        search.focus();
        search.setSelectionRange(position, position);
    });

    shadow.addEventListener("change", (event) => {
        if (event.target.id === "shop-filter") {
            state.shopFilter = event.target.value || "maiorpreco";
            state.shopPage = 1;
            shopConfirmProduct = null;
            saveState();
            void loadShop();
        } else if (event.target.id === "party-sort") {
            partySort = event.target.value;
            render();
        } else if (event.target.id === "sync-file") {
            void importSyncFile(event.target.files?.[0]);
        }
    });
    shadow.addEventListener("click", (event) => {
        if (event.target === featureModal) {
            modalView = "";
            render();
        }
    });
    shadow.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modalView) {
            modalView = "";
            render();
        }
    });

    if (Store) {
        try {
            store = new Store({ strict: false });
        } catch (error) {
            console.error("[QOL - Digipets] Não foi possível inicializar o armazenamento.", error);
        }
    } else {
        console.error("[QOL - Digipets] gm-storage não foi carregado; confirme a instala\u00e7ão do userscript.");
    }
    state = loadState();
    applyLauncherPosition();

    const currentEpisode = location.pathname === "/estagios"
        ? Number(new URLSearchParams(location.search).get("episodio"))
        : 0;
    if (currentEpisode && EPISODE_IDS.includes(currentEpisode)) {
        try {
            const result = readEpisodePage(document.documentElement.outerHTML, currentEpisode);
            if (result.stages.length) {
                applyEpisode(result);
                console.info(`[QOL - Digipets] Episódio ${currentEpisode} sincronizado a partir da página atual.`);
            }
        } catch (error) {
            console.error("[QOL - Digipets] Não foi possível ler o episódio aberto.", error);
        }
    }
    if (state.blockRepeatingPopups) activatePopupFilter();
    installBattleResultObserver();
    window.setInterval(updateCountdowns, 1000);
    window.setInterval(checkBossAlerts, 15000);
})();
