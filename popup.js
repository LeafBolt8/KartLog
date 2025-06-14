(()=>{document.getElementById("kills"),document.getElementById("deaths"),document.getElementById("matches"),document.getElementById("matches-list");const e=document.getElementById("statsBtn"),t=document.getElementById("hudBtn"),a=document.getElementById("statsSection"),s=document.getElementById("hudSection");a.classList.add("active"),e.addEventListener("click",(()=>{e.classList.add("selected"),t.classList.remove("selected"),a.style.display="block",s.style.display="none"})),t.addEventListener("click",(()=>{t.classList.add("selected"),e.classList.remove("selected"),a.style.display="none",s.style.display="block"})),document.getElementById("playerCardBtn").addEventListener("click",(()=>{chrome.tabs.create({url:"player-card.html"})})),document.getElementById("statsNumbersBtn").addEventListener("click",(()=>{chrome.tabs.create({url:"stats-numbers.html"})})),document.getElementById("logoImage").addEventListener("click",(()=>{chrome.tabs.create({url:"about.html"})}));const n=document.getElementById("toggleDeathsHud"),o=document.getElementById("toggleKillStreakHud"),l=document.getElementById("toggleKdrHud"),c=document.getElementById("toggleMatchCodeHud");function i(e){return e?new Date(e).toLocaleString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit",year:"2-digit",month:"2-digit",day:"2-digit"}):"-"}function r(e,t){return 0===t?e>0?e.toFixed(2):"0.00":(e/t).toFixed(2)}function d(e){const t=Math.floor(e/1e3),a=Math.floor(t/3600),s=Math.floor(t%3600/60),n=t%60;return a>0?`${a}h ${s}m ${n}s`:s>0?`${s}m ${n}s`:`${n}s`}document.getElementById("resetHudPositions").addEventListener("click",(()=>{chrome.storage.local.remove(["hudPosition","killStreakHudPosition","kdrHudPosition","matchCodeHudPosition"],(()=>{chrome.tabs.query({active:!0,currentWindow:!0},(e=>{chrome.tabs.sendMessage(e[0].id,{action:"resetHudPositions"})}))}))})),document.getElementById("resetHudCustomization").addEventListener("click",(()=>{
    const defaultSettings = {
        fontSize: 24,
        fontColor: "#ffffff",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    };
    
    // Reset settings for each HUD type
    const hudTypes = ["deaths", "killstreak", "kdr", "matchcode"];
    const settingsToReset = {};
    
    hudTypes.forEach(type => {
        settingsToReset[`${type}HudSettings`] = defaultSettings;
    });
    
    chrome.storage.local.set(settingsToReset, () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]) {
                hudTypes.forEach(type => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: `update-${type}-hud-style`,
                        settings: defaultSettings
                    });
                });
            }
        });
    });
})),chrome.storage.local.get(["deathsHudEnabled","killStreakHudEnabled","kdrHudEnabled","matchCodeHudEnabled"],(e=>{n.checked=!1!==e.deathsHudEnabled,o.checked=!1!==e.killStreakHudEnabled,l.checked=!1!==e.kdrHudEnabled,c.checked=!1!==e.matchCodeHudEnabled})),n.addEventListener("change",(()=>{chrome.storage.local.set({deathsHudEnabled:n.checked}),chrome.tabs.query({active:!0,currentWindow:!0},(e=>{e[0]&&chrome.tabs.sendMessage(e[0].id,{type:"toggle-deaths-hud",enabled:n.checked}).catch((()=>{console.log("[SKMT] Popup: Message port closed, ignoring error")}))}))})),o.addEventListener("change",(()=>{chrome.storage.local.set({killStreakHudEnabled:o.checked}),chrome.tabs.query({active:!0,currentWindow:!0},(e=>{e[0]&&chrome.tabs.sendMessage(e[0].id,{type:"toggle-killstreak-hud",enabled:o.checked}).catch((()=>{console.log("[SKMT] Popup: Message port closed, ignoring error")}))}))})),l.addEventListener("change",(()=>{chrome.storage.local.set({kdrHudEnabled:l.checked}),chrome.tabs.query({active:!0,currentWindow:!0},(e=>{e[0]&&chrome.tabs.sendMessage(e[0].id,{type:"toggle-kdr-hud",enabled:l.checked}).catch((()=>{console.log("[SKMT] Popup: Message port closed, ignoring error")}))}))})),c.addEventListener("change",(()=>{chrome.storage.local.set({matchCodeHudEnabled:c.checked}),chrome.tabs.query({active:!0,currentWindow:!0},(e=>{e[0]&&chrome.tabs.sendMessage(e[0].id,{type:"toggle-matchcode-hud",enabled:c.checked}).catch((()=>{console.log("[SKMT] Popup: Message port closed, ignoring error")}))}))})),chrome.storage.local.get(["deathsHudEnabled","killStreakHudEnabled","kdrHudEnabled","matchCodeHudEnabled"],(e=>{n.checked=!1!==e.deathsHudEnabled,o.checked=!1!==e.killStreakHudEnabled,l.checked=!1!==e.kdrHudEnabled,c.checked=!1!==e.matchCodeHudEnabled,chrome.tabs.query({active:!0,currentWindow:!0},(e=>{if(e[0]){const t=t=>{chrome.tabs.sendMessage(e[0].id,t).catch((()=>{console.log("[SKMT] Popup: Message port closed, ignoring error")}))};t({type:"toggle-deaths-hud",enabled:n.checked}),t({type:"toggle-killstreak-hud",enabled:o.checked}),t({type:"toggle-kdr-hud",enabled:l.checked}),t({type:"toggle-matchcode-hud",enabled:c.checked})}}))}));let m="Default",h="normal",u="all",g={primaryStats:!1,secondaryStats:!1,averageStats:!1,streaks:!1,quickKills:!1};const p=document.getElementById("modeGraphicsBtn");function y(e,t,a){const s=a||h;return"all"===s?null:`${e}_${t}_${s}`}function S(){document.getElementById("normalModeBtn").classList.toggle("selected","normal"===h),document.getElementById("specialModeBtn").classList.toggle("selected","special"===h),document.getElementById("customModeBtn").classList.toggle("selected","custom"===h),document.getElementById("allStatsBtn").classList.toggle("selected","all"===h),document.getElementById("primaryStatsHeader").textContent="all"===h?"All Modes Primary Stats":"Primary Stats",document.getElementById("secondaryStatsHeader").textContent="all"===h?"All Modes Secondary Stats":"Secondary Stats",function(){let e="",t="";switch(h){case"normal":e="3 Minute Mode Graphics",t="3min-mode.html";break;case"special":e="Special Mode Graphics",t="special-mode.html";break;case"custom":e="Custom Match Graphics",t="custom-mode.html";break;case"all":e="All Stats Graphics",t="visualizers.html";break;default:e="Graphics",t=""}p.textContent=e,p.dataset.targetUrl=t}()}function k(){chrome.storage.local.get(["currentSkid"],(e=>{m=e.currentSkid||"Default",document.getElementById("skidValue").textContent=m;const t=["currentSkid"],a=["normal","special","custom"];t.push(`favoriteMatches_${m}`),"all"===h?a.forEach((e=>{t.push(y("matchHistory",m,e)),t.push(y("gamesJoined",m,e)),t.push(y("gamesStarted",m,e)),t.push(y("gamesQuit",m,e)),t.push(y("matchesCompleted",m,e))})):(t.push(y("matchHistory",m,h)),t.push(y("gamesJoined",m,h)),t.push(y("gamesStarted",m,h)),t.push(y("gamesQuit",m,h)),t.push(y("matchesCompleted",m,h))),console.log("[SKMT][LOAD] Loading stats for SKID:",m,"Mode:",h,"Keys:",t),chrome.storage.local.get(t,(e=>{console.log("[SKMT][LOAD] Data returned from chrome.storage.local:",e),$=e[`favoriteMatches_${m}`]||{},console.log("[SKMT][POPUP] Loaded favorite matches:",$),("all"===h?a:[h]).forEach((t=>{const a=y("matchHistory",m,t);e[a]&&e[a].forEach((e=>{e.favorite=!0===$[e.matchStartTime]}))})),document.querySelector(".match-history").style.display="block",function(e,t){let a=[],s=new Map;"all"===t?["normal","special","custom"].forEach((t=>{const n=e[y("matchHistory",m,t)]||[];a=a.concat(n),n.forEach((e=>{if(e.map){const t=s.get(e.map)||0;s.set(e.map,t+1)}}))})):(a=e[y("matchHistory",m,t)]||[],a.forEach((e=>{if(e.map){const t=s.get(e.map)||0;s.set(e.map,t+1)}})));const n=document.getElementById("mapFilter"),o=n.value||"all";n.innerHTML='<option value="all">All Maps</option>',Array.from(s.entries()).sort(((e,t)=>t[1]-e[1])).forEach((([e,t])=>{const a=document.createElement("option");a.value=e,a.textContent=e,n.appendChild(a)})),[...n.options].some((e=>e.value===o))?(n.value=o,u=o):(n.value="all",u="all");const l="all"===u?a:a.filter((e=>e.map===u));let c=0,h=0,g=0;l.forEach((e=>{c+=e.kills||0,h+=e.deaths||0,g+=e.duration||(e.matchEndTime&&e.matchStartTime?e.matchEndTime-e.matchStartTime:0)}));let p=0;"all"===t?["normal","special","custom"].forEach((t=>{p+=e[y("gamesQuit",m,t)]||0})):p=e[y("gamesQuit",m,t)]||0,console.log("[SKMT][DISPLAY] Current gamesQuit value:",p,"Mode:",t),document.getElementById("gamesQuit").textContent=p;const S=document.getElementById("mapsList");S.innerHTML="";const E=Array.from(s.entries()).sort(((e,t)=>t[1]-e[1]));if(E.forEach((([e,t])=>{const a=document.createElement("div");a.className="stat-card",a.innerHTML=`\n            <span class="stat-label">${e}</span>\n            <span class="stat-value">${t}</span>\n        `,S.appendChild(a)})),0===E.length){const e=document.createElement("div");e.className="no-maps",e.textContent="No maps played yet in this mode",S.appendChild(e)}let f=0,v=0,M=0,T=0,b=0,B=0,I=0,x=0,w=0,P=0,L=0,K=0,H=0,D=0,U=0,A=0,q=0,F=0,O=0,z=0,R=0,_=0;l.forEach((e=>{e.kills>T&&(T=e.kills),e.deaths>b&&(b=e.deaths);const t=e.deaths>0?e.kills/e.deaths:e.kills;t>I&&(I=t);const a=e.duration||(e.matchEndTime&&e.matchStartTime?e.matchEndTime-e.matchStartTime:0);if(a>x&&(x=a),e.killTimestamps&&e.killTimestamps.length>0){let t=0,a=0;const s=[];e.killTimestamps&&e.killTimestamps.forEach((e=>s.push({type:"kill",time:e}))),e.deathTimestamps&&e.deathTimestamps.forEach((e=>s.push({type:"death",time:e}))),s.sort(((e,t)=>e.time-t.time)),s.forEach((e=>{"death"===e.type?(t>a&&(a=t),t=0):"kill"===e.type&&(t++,t>a&&(a=t))})),a>B&&(B=a)}let s=0,n=null,o=0,l={};const c=[];e.killTimestamps&&e.killTimestamps.forEach((e=>c.push({type:"kill",time:e}))),e.deathTimestamps&&e.deathTimestamps.forEach((e=>c.push({type:"death",time:e}))),c.sort(((e,t)=>e.time-t.time)),c.forEach((e=>{"death"===e.type?(s=0,l={},o=0,n=null):"kill"===e.type&&(s++,s>=3&&!l[3]&&(w++,l[3]=!0),s>=5&&!l[5]&&(P++,l[5]=!0),s>=7&&!l[7]&&(L++,l[7]=!0),s>=10&&!l[10]&&(K++,l[10]=!0),s>=15&&!l[15]&&(H++,l[15]=!0),s>=20&&!l[20]&&(D++,l[20]=!0),s>=25&&!l[25]&&(U++,l[25]=!0),s>=30&&!l[30]&&(A++,l[30]=!0),null===n?(o=1,n=e.time):(e.time-n<=4e3?(o++,2===o&&q++,3===o&&F++,4===o&&O++,5===o&&z++,6===o&&R++,7===o&&_++):o=1,n=e.time))})),e.joined&&f++,e.started&&v++,e.quit&&p++,e.quit||M++})),document.getElementById("highestKillsRecord").textContent=T,document.getElementById("highestDeathsRecord").textContent=b,document.getElementById("highestKillStreakRecord").textContent=B,document.getElementById("highestKDRRecord").textContent=I.toFixed(2),document.getElementById("longestTimePlayedRecord").textContent=d(x),document.getElementById("smashStreak").textContent=w,document.getElementById("smashtacularStreak").textContent=P,document.getElementById("smashosaurusStreak").textContent=L,document.getElementById("smashlvaniaStreak").textContent=K,document.getElementById("monsterSmashStreak").textContent=H,document.getElementById("potatoStreak").textContent=D,document.getElementById("smashSmashStreak").textContent=U,document.getElementById("potoatachioStreak").textContent=A,document.getElementById("doubleSmash").textContent=q,document.getElementById("multiSmash").textContent=F,document.getElementById("multiMegaSmash").textContent=O,document.getElementById("multiMegaUltraSmash").textContent=z,document.getElementById("gooseySmash").textContent=R,document.getElementById("crazyMultiMegaUltraSmash").textContent=_,document.getElementById("streaksHeader").textContent="all"===t?"All Modes Streaks (Without Dying)":"Streaks (Without Dying)",document.getElementById("quickKillsHeader").textContent="all"===t?"All Modes Streaks (Quick Kills)":"Streaks (Quick Kills)";const Q=(M||0)+(p||0);document.getElementById("killsLabel").textContent="all"===t?"Total Kills":"Kills",document.getElementById("deathsLabel").textContent="all"===t?"Total Deaths":"Deaths",document.getElementById("kdrLabel").textContent="all"===t?"Overall KDR":"KDR",document.getElementById("matchesCompletedLabel").textContent="all"===t?"Total Matches Completed":"Matches Completed",document.getElementById("totalTimeSpentLabel").textContent="all"===t?"Total Time Played":"Time Played",document.getElementById("gamesJoinedLabel").textContent="all"===t?"Total Matches Joined":"Matches Joined",document.getElementById("totalMatchesLabel").textContent="Total Matches (Completed + Quit)",console.log("[SKMT][POPUP][DISPLAY] Updating gamesQuit display. Value:",p,"Element:",document.getElementById("gamesQuit")),document.getElementById("kills").textContent=c,document.getElementById("deaths").textContent=h,document.getElementById("kdr").textContent=r(c,h),document.getElementById("totalTimeSpent").textContent=d(g),document.getElementById("gamesJoined").textContent=f,document.getElementById("gamesStarted").textContent=v,document.getElementById("gamesQuit").textContent=p,document.getElementById("matchesCompleted").textContent=M,document.getElementById("totalMatches").textContent=Q;const N=Q>0?(M||0)/Q*100:0,j=Q>0?(p||0)/Q*100:0;document.getElementById("matchesCompletedRate").textContent=`${N.toFixed(2)}%`,document.getElementById("matchesQuitRate").textContent=`${j.toFixed(2)}%`;const J=l.filter((e=>!e.quit)).length,W=J>0?c/J:0,G=J>0?h/J:0,V=J>0?g/J:0;document.getElementById("avgKills").textContent=W.toFixed(2),document.getElementById("avgDeaths").textContent=G.toFixed(2),document.getElementById("avgTimeSpent").textContent=d(V),document.getElementById("averageStatsHeader").textContent="all"===t?"All Modes Average Stats":"Average Stats",document.getElementById("matches-list").innerHTML="";let Y=[];if("all"===t){const t=[];["normal","special","custom"].forEach((a=>{(e[y("matchHistory",m,a)]||[]).forEach((e=>{t.push({...e,mode:a})}))})),Y=t}else Y=a.slice().reverse();const X=document.getElementById("matchSortSelect")?document.getElementById("matchSortSelect").value:"recent";"recent"===X?Y.sort(((e,t)=>(t.matchStartTime||0)-(e.matchStartTime||0))):"oldest"===X?Y.sort(((e,t)=>(e.matchStartTime||0)-(t.matchStartTime||0))):"kills"===X?Y.sort(((e,t)=>(t.kills||0)-(e.kills||0))):"favorites"===X&&(Y=Y.filter((e=>$[e.matchStartTime])),Y.sort(((e,t)=>(t.matchStartTime||0)-(e.matchStartTime||0)))),function(e){const t=document.getElementById("matches-list");t.innerHTML="",e.forEach(((a,s)=>{const n=document.createElement("div");n.className="match-card";const o=document.createElement("div");o.className="match-card-content";const l=document.createElement("div");if(l.className="match-meta",l.textContent=`#${e.length-s} | ${i(a.matchStartTime)} - ${i(a.matchEndTime)}`,o.appendChild(l),a.map){const e=document.createElement("div");e.className="match-map",e.textContent=a.map,o.appendChild(e)}const c=document.createElement("div");c.className="match-stats",c.innerHTML="",c.innerHTML+=`<span>Kills:</span><b>${a.kills}</b>`,c.innerHTML+=`<span>Deaths:</span><b>${a.deaths}</b>`,c.innerHTML+=`<span>KDR:</span><b>${r(a.kills,a.deaths)}</b>`;const d=a.duration||(a.matchEndTime&&a.matchStartTime?a.matchEndTime-a.matchStartTime:0),h=Math.floor(d/36e5),u=Math.floor(d%36e5/6e4),g=Math.floor(d%6e4/1e3);let p;p=h>0?`${h}h ${u}m ${g}s`:`${u}m ${g}s`,c.innerHTML+=`<span>Duration:</span><b>${p}</b>`,o.appendChild(c);const y=document.createElement("div");y.className="match-flags";let S=[];a.joined&&S.push("Joined"),a.started&&S.push("Started"),a.quit?S.push("Quit"):S.push("Completed"),a.isSpecialMode&&S.push("Special Mode"),a.isCustomMode&&S.push("Custom Match"),a.mode&&S.push(`${a.mode.charAt(0).toUpperCase()+a.mode.slice(1)} Mode`),S.length>0&&(y.textContent=S.join(" | ")),o.appendChild(y);const E=document.createElement("button");E.className="star-btn",E.title="Favorite this match",E.innerHTML='<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="10,2 12.59,7.36 18.51,8.09 14,12.26 15.18,18.09 10,15.27 4.82,18.09 6,12.26 1.49,8.09 7.41,7.36" stroke="#FFD700" stroke-width="1.5" fill="'+(a.favorite?"#FFD700":"white")+'"/></svg>',E.style.background="none",E.style.border="none",E.style.cursor="pointer",E.style.marginRight="4px",E.onclick=async()=>{a.favorite=!a.favorite,E.querySelector("polygon").setAttribute("fill",a.favorite?"#FFD700":"white"),a.favorite?$[a.matchStartTime]=!0:delete $[a.matchStartTime],await async function(){const e=`favoriteMatches_${m||"Default"}`;await new Promise((t=>chrome.storage.local.set({[e]:$},t))),console.log("[SKMT][POPUP] Saved favorite matches to storage.",$)}(),"favorites"===(document.getElementById("matchSortSelect")?document.getElementById("matchSortSelect").value:"recent")&&k()};const f=document.createElement("button");f.className="share-btn",f.title="Share match link",f.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" stroke="#4a90e2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',f.style.background="none",f.style.border="none",f.style.cursor="pointer",f.style.marginRight="4px",f.onclick=()=>{const e=`match-history.html?match=${a.matchStartTime}&showCopyModal=true`;chrome.tabs.create({url:e})};const v=document.createElement("button");v.className="info-btn",v.title="View match information",v.innerHTML='<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" stroke="#3498db" stroke-width="2" fill="white"/><rect x="9" y="8" width="2" height="6" rx="1" fill="#3498db"/><rect x="9" y="5" width="2" height="2" rx="1" fill="#3498db"/></svg>',v.onclick=()=>C(a),n.appendChild(o),n.appendChild(E),n.appendChild(f),n.appendChild(v),t.appendChild(n)}))}(Y)}(e,h)}))}))}document.addEventListener("DOMContentLoaded",(()=>{
    // Check if it's first time opening the extension
    chrome.storage.local.get(['hasSeenWelcome', 'currentSkid'], function(result) {
        if (!result.hasSeenWelcome) {
            // Show welcome screen
            document.getElementById('welcomeScreen').style.display = 'flex';
            
            // Update SKID value if available
            if (result.currentSkid && result.currentSkid !== 'Default') {
                document.getElementById('welcomeSkidValue').textContent = result.currentSkid;
            }
            
            // Set up welcome screen button listeners
            document.getElementById('importStatsWelcomeBtn').addEventListener('click', function() {
                document.getElementById('importStatsInput').click();
            });
            
            document.getElementById('noStatsBtn').addEventListener('click', function() {
                document.getElementById('welcomeScreen').style.display = 'none';
                chrome.storage.local.set({ hasSeenWelcome: true });
            });
        }
    });

    // Set initial display state of reset button
    document.getElementById("resetStatsBtn").style.display = "none";
    
    const e=document.getElementById("skidValue"),
    t=document.getElementById("toggleSkidBtn"),
    a=document.getElementById("copySkidBtn");
    chrome.storage.local.get(["skidBlurred"],(a=>{if(a.skidBlurred){e.classList.add("skid-blurred");const a=t.querySelector("i");a.classList.remove("fa-eye"),a.classList.add("fa-eye-slash")}})),
    t.addEventListener("click",(()=>{e.classList.toggle("skid-blurred");const a=t.querySelector("i");e.classList.contains("skid-blurred")?(a.classList.remove("fa-eye"),a.classList.add("fa-eye-slash"),chrome.storage.local.set({skidBlurred:!0})):(a.classList.remove("fa-eye-slash"),a.classList.add("fa-eye"),chrome.storage.local.set({skidBlurred:!1}))})),
    a.addEventListener("click",(()=>{const t=e.textContent;t&&"-"!==t&&navigator.clipboard.writeText(t).then((()=>{const e=a.getAttribute("title");a.setAttribute("title","Copied!");const t=a.querySelector("i");t.classList.remove("fa-copy"),t.classList.add("fa-check"),setTimeout((()=>{a.setAttribute("title",e),t.classList.remove("fa-check"),t.classList.add("fa-copy")}),2e3)}))})),
    document.getElementById("normalModeBtn").addEventListener("click",(()=>{h="normal",S(),k(),document.getElementById("resetStatsBtn").style.display = "none", chrome.storage.local.set({currentMode: h})})),
    document.getElementById("specialModeBtn").addEventListener("click",(()=>{h="special",S(),k(),document.getElementById("resetStatsBtn").style.display = "none", chrome.storage.local.set({currentMode: h})})),
    document.getElementById("customModeBtn").addEventListener("click",(()=>{h="custom",S(),k(),document.getElementById("resetStatsBtn").style.display = "none", chrome.storage.local.set({currentMode: h})})),
    document.getElementById("allStatsBtn").addEventListener("click",(()=>{h="all",S(),k(),document.getElementById("resetStatsBtn").style.display = "block", chrome.storage.local.set({currentMode: h})})),
    p&&p.addEventListener("click",(()=>{const e=p.dataset.targetUrl;e&&chrome.tabs.create({url:e})})),
    document.querySelectorAll(".stats-details").forEach((e=>{e.addEventListener("toggle",(()=>{document.querySelectorAll(".stats-details").forEach((e=>{const t=e.querySelector(".stats-section-label").id;g[t]=e.hasAttribute("open")})),chrome.storage.local.set({openSections:g})}))})),
    document.getElementById("exportStatsBtn").addEventListener("click",I),
    document.getElementById("importStatsBtn").addEventListener("click",(()=>{document.getElementById("importStatsInput").click()})),
    document.getElementById("importStatsInput").addEventListener("change",(e=>{e.target.files.length>0&&(async function(e){try{const t=new FileReader;t.onload=async function(e){try{const t=(new TextDecoder).decode(e.target.result),a=await async function(e){try{await B();const t=e.match(/^SKMT_ENCRYPTED_v(\d+\.\d+)_(.+)$/);if(!t)throw new Error("Invalid encrypted data format");if(t[1]!==T)throw new Error("Incompatible encryption version");const a=t[2],s=new Uint8Array(atob(a).split("").map((e=>e.charCodeAt(0)))),n=s.slice(0,12),o=s.slice(12),l=await crypto.subtle.decrypt({name:"AES-GCM",iv:n},b,o),c=new TextDecoder;return JSON.parse(c.decode(l))}catch(e){throw console.error("Decryption error:",e),new Error("Failed to decrypt data")}}(t);if(a.skid!==m)throw new Error("Stats file SKID does not match current SKID");const s=31536e6;if(Date.now()-a.timestamp>s)throw new Error("Stats file is too old");if(!confirm("Are you sure you want to import these stats? This will overwrite your current stats."))return;if(await new Promise((e=>{chrome.storage.local.set(a.data,e)})),a.data.uiState){const e=a.data.uiState;e.currentMode&&(h=e.currentMode,document.querySelectorAll(".mode-btn").forEach((e=>{e.classList.toggle("active",e.dataset.mode===h)}))),e.openSections&&await new Promise((t=>{chrome.storage.local.set({openSections:e.openSections},t)}))}k(),alert("Stats imported successfully!"),document.getElementById('welcomeScreen').style.display = 'none',chrome.storage.local.set({ hasSeenWelcome: true })}catch(e){console.error("Error processing imported stats:",e),alert(e.message||"Failed to import stats. The file may be corrupted or invalid.")}},t.onerror=function(){alert("Error reading file. Please try again.")},t.readAsArrayBuffer(e)}catch(e){console.error("Error importing stats:",e),alert("Failed to import stats. Please try again.")}}(e.target.files[0]),e.target.value="")})),
    document.getElementById("visualizeStatsBtn").addEventListener("click",(()=>{chrome.tabs.create({url:"visualizers.html"})})),
    document.getElementById("faqBtn").addEventListener("click",(()=>{chrome.tabs.create({url:"faq.html"})})),
    document.getElementById("resetStatsBtn").addEventListener("click",(function(){
        if(!m) return;
        const e=[],t="all"===h?["normal","special","custom"]:[h];
        if(confirm(`Are you sure you want to reset all stats and match history for ${"all"===h?"all modes":"this mode"} and SKID?`)){
            t.forEach((t=>{
                e.push(y("matchHistory",m,t)),
                e.push(y("gamesJoined",m,t)),
                e.push(y("gamesStarted",m,t)),
                e.push(y("gamesQuit",m,t)),
                e.push(y("matchesCompleted",m,t))
            }));
            const a={};
            e.forEach((e=>a[e]=e.includes("matchHistory")?[]:0)),
            chrome.storage.local.set(a,(()=>{
                console.log("[SKMT][RESET] Stats reset for",t,"mode(s)."),
                k()
            }))
        }
    })),
    S(),
    k(),
    // Load saved UI state
    chrome.storage.local.get(["openSections", "currentMode", "currentSection"], (e => {
        // Restore open/closed sections
        if (e.openSections) {
            g = e.openSections;
            Object.entries(g).forEach((([e,t]) => {
                const a = document.querySelector(`.stats-details:has(#${e})`);
                a && (t ? a.setAttribute("open","") : a.removeAttribute("open"))
            }));
        }
        
        // Restore mode
        if (e.currentMode) {
            h = e.currentMode;
            S();
        }
        
        // Restore main section (Stats/HUD)
        if (e.currentSection) {
            const statsSection = document.getElementById("statsSection");
            const hudSection = document.getElementById("hudSection");
            const statsBtn = document.getElementById("statsBtn");
            const hudBtn = document.getElementById("hudBtn");
            
            if (e.currentSection === "hud") {
                statsSection.style.display = "none";
                hudSection.style.display = "block";
                statsBtn.classList.remove("selected");
                hudBtn.classList.add("selected");
            } else {
                statsSection.style.display = "block";
                hudSection.style.display = "none";
                statsBtn.classList.add("selected");
                hudBtn.classList.remove("selected");
            }
        }
    }));
    
    // Add click handlers for main section buttons
    document.getElementById("statsBtn").addEventListener("click", () => {
        const statsSection = document.getElementById("statsSection");
        const hudSection = document.getElementById("hudSection");
        const statsBtn = document.getElementById("statsBtn");
        const hudBtn = document.getElementById("hudBtn");
        
        statsSection.style.display = "block";
        hudSection.style.display = "none";
        statsBtn.classList.add("selected");
        hudBtn.classList.remove("selected");
        
        chrome.storage.local.set({currentSection: "stats"});
    });
    
    document.getElementById("hudBtn").addEventListener("click", () => {
        const statsSection = document.getElementById("statsSection");
        const hudSection = document.getElementById("hudSection");
        const statsBtn = document.getElementById("statsBtn");
        const hudBtn = document.getElementById("hudBtn");
        
        statsSection.style.display = "none";
        hudSection.style.display = "block";
        statsBtn.classList.remove("selected");
        hudBtn.classList.add("selected");
        
        chrome.storage.local.set({currentSection: "hud"});
    });
    
    const s=document.getElementById("moreDetailsBtn");
    s&&s.addEventListener("click",(()=>{chrome.tabs.create({url:"match-history.html"})})),
    chrome.storage.local.get(["pendingMatches"],(e=>{const t=e.pendingMatches||[];t.length>0&&(console.log(`[SKMT] Processing ${t.length} pending matches`),t.forEach((e=>{chrome.runtime.sendMessage({type:"matchComplete",data:e}).catch((()=>{console.log("[SKMT] Popup: Failed to process pending match")}))})),chrome.storage.local.set({pendingMatches:[]}))}))})),
    chrome.storage.onChanged.addListener(((e,t)=>{"local"===t&&(e[`favoriteMatches_${m||"Default"}`]?(console.log("[SKMT][POPUP] Favorite matches changed in storage, reloading stats."),k()):m&&Object.keys(e).some((e=>e.includes(`_${m}_`)))&&k())}));
    const E=1e3;
    async function f(e,t){return new Promise((a=>{chrome.storage.local.get([y("matchHistory",m,e)],(s=>{const n=s[y("matchHistory",m,e)]||[],o=n[n.length-1],l=o&&o.matchEndTime===t.matchEndTime&&o.kills===t.kills&&o.deaths===t.deaths;a(l)}))}))}
    async function v(){console.log("[SKMT][POPUP] Forcing stats refresh"),await k()}
    async function M(e,t=0){return new Promise(((a,s)=>{const n=setTimeout((()=>{t<3?(console.log(`[SKMT][POPUP] Message port timeout, retrying (${t+1}/3)...`),setTimeout((()=>{M(e,t+1).then(a).catch(s)}),1e3)):s(new Error("Message port timeout after all retries"))}),5e3);
    chrome.runtime.sendMessage(e,(o=>{clearTimeout(n),chrome.runtime.lastError?(console.error("[SKMT][POPUP] Message port error:",chrome.runtime.lastError),t<3?(console.log(`[SKMT][POPUP] Retrying message (${t+1}/3)...`),setTimeout((()=>{M(e,t+1).then(a).catch(s)}),1e3)):s(chrome.runtime.lastError)):a(o)}))}))}
    chrome.runtime.onMessage.addListener((function(e,t,a){if("SKMT_SKID_UPDATED"===e.type)return k(),a({success:!0}),!0;
    if("SKMT_MATCH_COMPLETE"===e.type){console.log("[SKMT][POPUP] Received MATCH_COMPLETE message:",e.data);
    const t=e.data,a=t.isSpecialMode?"special":t.isCustomMode?"custom":"normal",s=m||"Default",n=y("gamesQuit",s,a);
    if(t.quit){const e=t.matchEndTime-t.matchStartTime;if(e>=1e4){let e=0;const s=async()=>{try{let o=(await new Promise((e=>{chrome.storage.local.get([n],e)})))[n]||0;o++;const l={};l[n]=o,await new Promise((e=>{chrome.storage.local.set(l,e)}));const c=await f(a,t);if(!c&&e<3)return e++,console.log(`[SKMT][POPUP] Retry ${e} for quit stats update`),void setTimeout(s,E);c?k():(console.log("[SKMT][POPUP] Stats update verification failed, forcing refresh"),await v());try{await M({success:!0})}catch(e){console.error("[SKMT][POPUP] Error sending response:",e)}}catch(t){if(console.error("[SKMT][POPUP] Error updating quit stats:",t),e<3)e++,setTimeout(s,E);else{await v();try{await M({success:!1,error:t.message})}catch(e){console.error("[SKMT][POPUP] Error sending error response:",e)}}}};s()}else{console.log("[SKMT][POPUP] Not incrementing gamesQuit - time spent less than 10 seconds:",e),k();try{M({success:!0})}catch(e){console.error("[SKMT][POPUP] Error sending response:",e)}}}else{let e=0;const n=async()=>{try{const o=y("matchHistory",s,a),l=y("gamesJoined",s,a),c=y("gamesStarted",s,a),i=y("matchesCompleted",s,a),r=await new Promise((e=>{chrome.storage.local.get([o,l,c,i],e)}));let d=r[o]||[];d.push(t);let m=r[l]||0,h=r[c]||0,u=r[i]||0;t.joined&&m++,t.started&&h++,u++;const g={[o]:d,[l]:m,[c]:h,[i]:u};await new Promise((e=>{chrome.storage.local.set(g,e)}));const p=await f(a,t);if(!p&&e<3)return e++,console.log(`[SKMT][POPUP] Retry ${e} for match stats update`),void setTimeout(n,E);p?k():(console.log("[SKMT][POPUP] Stats update verification failed, forcing refresh"),await v());try{await M({success:!0})}catch(e){console.error("[SKMT][POPUP] Error sending response:",e)}}catch(t){if(console.error("[SKMT][POPUP] Error updating match stats:",t),e<3)e++,setTimeout(n,E);else{await v();try{await M({success:!1,error:t.message})}catch(e){console.error("[SKMT][POPUP] Error sending error response:",e)}}}};n()}return!0}
    if("SKMT_DEATHS_UPDATE"===e.type){document.getElementById("deaths").textContent=e.deaths;const t=parseInt(document.getElementById("kills").textContent)||0;return document.getElementById("kdr").textContent=r(t,e.deaths),a({success:!0}),!0}
    return"SKMT_KILLSTREAK_UPDATE"===e.type?(document.getElementById("killStreak").textContent=e.killStreak,a({success:!0}),!0):void 0}));
    const T="1.4";
    let b=null;
    async function B(){return b||(b=await async function(){const e=(new TextEncoder).encode("SKMT_SECURE_SALT_v1.4"),t=await crypto.subtle.digest("SHA-256",e);return await crypto.subtle.importKey("raw",t,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}()),b}
    async function I(){try{const e=["normal","special","custom"],t=["currentSkid"];e.forEach((e=>{t.push(y("matchHistory",m,e)),t.push(y("gamesJoined",m,e)),t.push(y("gamesStarted",m,e)),t.push(y("gamesQuit",m,e)),t.push(y("matchesCompleted",m,e))}));
    const a=await new Promise((e=>{chrome.storage.local.get(t,e)})),
    s=await new Promise((e=>{chrome.storage.local.get(["openSections"],e)})),
    n={};
    e.forEach((e=>{const t=a[y("matchHistory",m,e)]||[];let s=0,o=0,l=0,c=0,i=0,r=0,d=0,h=0,u=0,g=0,p=0,S=0,k=0,E=0,f=0,v=0,M=0,T=0;t.forEach((e=>{e.kills>=3&&s++,e.kills>=5&&o++,e.kills>=7&&l++,e.kills>=10&&c++,e.kills>=15&&i++,e.kills>=20&&r++,e.kills>=25&&d++,e.kills>=30&&h++,e.kills>f&&(f=e.kills),e.deaths>v&&(v=e.deaths);const t=e.deaths>0?e.kills/e.deaths:e.kills;if(t>T&&(T=t),e.killTimestamps&&e.killTimestamps.length>0){let t=0,a=0;const s=[];e.killTimestamps&&e.killTimestamps.forEach((e=>s.push({type:"kill",time:e}))),e.deathTimestamps&&e.deathTimestamps.forEach((e=>s.push({type:"death",time:e}))),s.sort(((e,t)=>e.time-t.time)),s.forEach((e=>{"death"===e.type?(t>a&&(a=t),t=0):"kill"===e.type&&(t++,t>a&&(a=t))})),a>M&&(M=a)}if(e.killTimestamps&&e.killTimestamps.length>0){let t=0,a=e.killTimestamps[0];for(let s=1;s<e.killTimestamps.length;s++){const n=e.killTimestamps[s];n-a<=4e3?(t++,2===t&&u++,3===t&&g++,4===t&&p++,5===t&&S++,6===t&&k++,7===t&&E++):t=1,a=n}}})),n[e]={smashStreak:s,smashtacularStreak:o,smashosaurusStreak:l,smashlvaniaStreak:c,monsterSmashStreak:i,potatoStreak:r,smashSmashStreak:d,potoatachioStreak:h,doubleSmash:u,multiSmash:g,multiMegaSmash:p,multiMegaUltraSmash:S,gooseySmash:k,crazyMultiMegaUltraSmash:E,highestKillsRecord:f,highestDeathsRecord:v,highestKillStreakRecord:M,highestKDRRecord:T}})),a.stats=n,a.uiState={currentMode:h,openSections:s.openSections||{},skid:m};const o={version:T,timestamp:Date.now(),skid:m,data:a},l=await async function(e){try{await B();const t=crypto.getRandomValues(new Uint8Array(12)),a=(new TextEncoder).encode(JSON.stringify(e)),s=await crypto.subtle.encrypt({name:"AES-GCM",iv:t},b,a),n=new Uint8Array(t.length+s.byteLength);n.set(t),n.set(new Uint8Array(s),t.length);const o=btoa(String.fromCharCode.apply(null,n));return`SKMT_ENCRYPTED_v${T}_${o}`}catch(e){throw console.error("Encryption error:",e),new Error("Failed to encrypt data")}}(o),c=new Blob([l],{type:"application/octet-stream"}),i=URL.createObjectURL(c),r=document.createElement("a");r.href=i,r.download=`smash_karts_stats_${m}_${(new Date).toISOString().split("T")[0]}.skmt`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)}catch(e){console.error("Error exporting stats:",e),alert("Failed to export stats. Please try again.")}}
    function C(e){const t=document.getElementById("matchInfoModal"),a=document.getElementById("match-info-modal-body");let s=[];e.joined&&s.push("Joined"),e.started&&s.push("Started"),e.quit?s.push("Quit"):s.push("Completed"),e.isSpecialMode&&s.push("Special Mode"),e.isCustomMode&&s.push("Custom Match"),e.mode&&s.push(`${e.mode.charAt(0).toUpperCase()+e.mode.slice(1)} Mode`);const n=e.duration||(e.matchEndTime&&e.matchStartTime?e.matchEndTime-e.matchStartTime:0);let o=0,l={smashStreak:0,smashtacularStreak:0,smashosaurusStreak:0,smashlvaniaStreak:0,monsterSmashStreak:0,potatoStreak:0,smashSmashStreak:0,potoatachioStreak:0},c={doubleSmash:0,multiSmash:0,multiMegaSmash:0,multiMegaUltraSmash:0,gooseySmash:0,crazyMultiMegaUltraSmash:0};if(e.killTimestamps&&e.killTimestamps.length>0){let t=0,a=0,s=0,n=null,c={};const i=[];e.killTimestamps&&e.killTimestamps.forEach((e=>i.push({type:"kill",time:e}))),e.deathTimestamps&&e.deathTimestamps.forEach((e=>i.push({type:"death",time:e}))),i.sort(((e,t)=>e.time-t.time)),i.forEach((e=>{"death"===e.type?(t>a&&(a=t),t=0,c={},s=0,n=null):"kill"===e.type&&(t++,t>a&&(a=t),t>=3&&!c[3]&&(l.smashStreak++,c[3]=!0),t>=5&&!c[5]&&(l.smashtacularStreak++,c[5]=!0),t>=7&&!c[7]&&(l.smashosaurusStreak++,c[7]=!0),t>=10&&!c[10]&&(l.smashlvaniaStreak++,c[10]=!0),t>=15&&!c[15]&&(l.monsterSmashStreak++,c[15]=!0),t>=20&&!c[20]&&(l.potatoStreak++,c[20]=!0),t>=25&&!c[25]&&(l.smashSmashStreak++,c[25]=!0),t>=30&&!c[30]&&(l.potoatachioStreak++,c[30]=!0),null===n?(s=1,n=e.time):(e.time-n<=4e3?(s++,2===s&&doubleSmash++,3===s&&multiSmash++,4===s&&multiMegaSmash++,5===s&&multiMegaUltraSmash++,6===s&&gooseySmash++,7===s&&crazyMultiMegaUltraSmash++):s=1,n=e.time))})),o=a}let m=[];Array.isArray(e.players)&&(m=[...new Set(e.players)]),a.innerHTML=`\n        <div class="match-info-title">Match Information</div>\n        ${e.map?`<div class="match-info-section"><span class="match-info-label">Map:</span><span class="match-info-value">${e.map}</span></div>`:""}\n        <div class="match-info-section"><span class="match-info-label">Start:</span><span class="match-info-value">${i(e.matchStartTime)}</span></div>\n        <div class="match-info-section"><span class="match-info-label">End:</span><span class="match-info-value">${i(e.matchEndTime)}</span></div>\n        <div class="match-info-section"><span class="match-info-label">Kills:</span><span class="match-info-value">${e.kills}</span></div>\n        <div class="match-info-section"><span class="match-info-label">Deaths:</span><span class="match-info-value">${e.deaths}</span></div>\n        <div class="match-info-section"><span class="match-info-label">KDR:</span><span class="match-info-value">${r(e.kills,e.deaths)}</span></div>\n        <div class="match-info-section"><span class="match-info-label">Duration:</span><span class="match-info-value">${d(n)}</span></div>\n        <div class="match-info-section"><span class="match-info-label">Highest Kill Streak:</span><span class="match-info-value">${o}</span></div>\n        \n        ${Object.values(l).some((e=>e>0))?`\n        <div class="match-info-section">\n            <span class="match-info-label" style="display:block;margin-bottom:6px;">Streaks (Without Dying):</span>\n            <ul style="margin:0 0 0 12px;padding:0;list-style:disc;">\n                ${l.smashStreak>0?`<li style='font-size:16px;'>Smash Streak (3): ${l.smashStreak}</li>`:""}\n                ${l.smashtacularStreak>0?`<li style='font-size:16px;'>Smashtacular Streak (5): ${l.smashtacularStreak}</li>`:""}\n                ${l.smashosaurusStreak>0?`<li style='font-size:16px;'>Smashosaurus Streak (7): ${l.smashosaurusStreak}</li>`:""}\n                ${l.smashlvaniaStreak>0?`<li style='font-size:16px;'>Smashlvania Streak (10): ${l.smashlvaniaStreak}</li>`:""}\n                ${l.monsterSmashStreak>0?`<li style='font-size:16px;'>Monster Smash Streak (15): ${l.monsterSmashStreak}</li>`:""}\n                ${l.potatoStreak>0?`<li style='font-size:16px;'>Potato Streak (20): ${l.potatoStreak}</li>`:""}\n                ${l.smashSmashStreak>0?`<li style='font-size:16px;'>Smash Smash Streak (25): ${l.smashSmashStreak}</li>`:""}\n                ${l.potoatachioStreak>0?`<li style='font-size:16px;'>Potoatachio Streak (30): ${l.potoatachioStreak}</li>`:""}\n            </ul>\n        </div>\n        `:""}\n\n        ${Object.values(c).some((e=>e>0))?`\n        <div class="match-info-section">\n            <span class="match-info-label" style="display:block;margin-bottom:6px;">Streaks (Quick Kills):</span>\n            <ul style="margin:0 0 0 12px;padding:0;list-style:disc;">\n                ${c.doubleSmash>0?`<li style='font-size:16px;'>Double Smash (2): ${c.doubleSmash}</li>`:""}\n                ${c.multiSmash>0?`<li style='font-size:16px;'>Multi Smash (3): ${c.multiSmash}</li>`:""}\n                ${c.multiMegaSmash>0?`<li style='font-size:16px;'>Multi Mega Smash (4): ${c.multiMegaSmash}</li>`:""}\n                ${c.multiMegaUltraSmash>0?`<li style='font-size:16px;'>Multi Mega Ultra Smash (5): ${c.multiMegaUltraSmash}</li>`:""}\n                ${c.gooseySmash>0?`<li style='font-size:16px;'>Goosey Smash (6): ${c.gooseySmash}</li>`:""}\n                ${c.crazyMultiMegaUltraSmash>0?`<li style='font-size:16px;'>Crazy Multi Mega Ultra Smash (7): ${c.crazyMultiMegaUltraSmash}</li>`:""}\n            </ul>\n        </div>\n        `:""}\n\n        <div class="match-info-section">\n            <span class="match-info-label" style="display:block;margin-bottom:6px;">Detected Players In Room:</span>\n            <ul style="margin:0 0 0 12px;padding:0;list-style:disc;">\n                ${m.length>0?m.map((e=>`<li style='font-size:16px;'>${e}</li>`)).join(""):'<li style="color:#aaa;font-size:16px;">Currently unable to fetch player names, awaiting for devs patch to hopefully restore this feature</li>'}
            </ul>\n        </div>\n        <div class="match-info-indicators">${s.join(" | ")}</div>\n    `,t.style.display="flex"}
    document.getElementById("closeMatchInfoModal")&&(document.getElementById("closeMatchInfoModal").onclick=function(){document.getElementById("matchInfoModal").style.display="none"}),
    document.getElementById("matchInfoModal")&&(document.getElementById("matchInfoModal").onclick=function(e){e.target===this&&(this.style.display="none")});
    let x=null;
    function w(){const e=document.getElementById("hudSettingsModal"),t=document.getElementById("hudSettingsTitle");let a="";switch(x){case"deaths":a="Deaths";break;case"killstreak":a="Kill Streak";break;case"kdr":a="KDR";break;case"matchcode":a="Custom Match Code"}t.textContent=`${a} HUD Settings`;const s=`${x}HudSettings`;chrome.storage.local.get([s],(e=>{const t=e[s]||{fontSize:32,fontColor:"#ffffff",fontFamily:"Arial, sans-serif",backgroundColor:"rgba(0, 0, 0, 0.5)"};document.getElementById("hudFontSize").value=t.fontSize,document.getElementById("fontSizeValue").textContent=`${t.fontSize}px`,document.getElementById("hudFontColor").value=t.fontColor,document.getElementById("hudFontFamily").value=t.fontFamily,document.getElementById("hudBackgroundColor").value=t.backgroundColor?function(e){const t=e.substring(e.indexOf("(")+1,e.indexOf(")")).split(",");return`#${((1<<24)+(parseInt(t[0].trim())<<16)+(parseInt(t[1].trim())<<8)+parseInt(t[2].trim())).toString(16).slice(1).toUpperCase()}`}(t.backgroundColor):"#000000"})),e.style.display="flex"}
    function P(){const e={fontSize:document.getElementById("hudFontSize").value,fontColor:document.getElementById("hudFontColor").value,fontFamily:document.getElementById("hudFontFamily").value,backgroundColor:L(document.getElementById("hudBackgroundColor").value,.5)},t=`${x}HudSettings`;chrome.storage.local.set({[t]:e}),chrome.tabs.query({active:!0,currentWindow:!0},(t=>{let a;switch(x){case"deaths":a="update-deaths-hud-style";break;case"killstreak":a="update-killstreak-hud-style";break;case"kdr":a="update-kdr-hud-style";break;case"matchcode":a="update-matchcode-hud-style"}chrome.tabs.sendMessage(t[0].id,{type:a,settings:e})}))}
    function L(e,t){const a=parseInt(e.slice(1),16);return`rgba(${a>>16&255}, ${a>>8&255}, ${255&a}, ${t})`}
    document.getElementById("deathsHudSettings").addEventListener("click",(()=>{x="deaths",w()})),
    document.getElementById("killStreakHudSettings").addEventListener("click",(()=>{x="killstreak",w()})),
    document.getElementById("kdrHudSettings").addEventListener("click",(()=>{x="kdr",w()})),
    document.getElementById("matchCodeHudSettings").addEventListener("click",(()=>{x="matchcode",w()})),
    document.getElementById("closeHudSettingsModal").addEventListener("click",(()=>{document.getElementById("hudSettingsModal").style.display="none"})),
    document.getElementById("hudSettingsModal").addEventListener("click",(e=>{e.target===document.getElementById("hudSettingsModal")&&(document.getElementById("hudSettingsModal").style.display="none")})),
    document.getElementById("hudFontSize").addEventListener("input",(e=>{const t=e.target.value;document.getElementById("fontSizeValue").textContent=`${t}px`,P()})),
    document.getElementById("hudFontColor").addEventListener("change",P),
    document.getElementById("hudFontFamily").addEventListener("change",P),
    document.getElementById("hudBackgroundColor").addEventListener("input",P);
    let $={};
    document.getElementById("matchSortSelect")&&document.getElementById("matchSortSelect").addEventListener("change",(function(e){k()}))})();

async function shortenUrl(longUrl) {
    try {
        const response = await fetch('https://tinyurl.com/api-create.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `url=${encodeURIComponent(longUrl)}`
        });
        
        if (!response.ok) {
            throw new Error('Failed to shorten URL');
        }
        
        return await response.text();
    } catch (error) {
        console.error('Error shortening URL:', error);
        return longUrl; // Return original URL if shortening fails
    }
}