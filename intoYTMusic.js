song="personal by stars"
targetPlaylist="Test"


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


firstResultButton=document.querySelector("#contents > ytmusic-responsive-list-item-renderer > ytmusic-menu-renderer > tp-yt-paper-icon-button")
firstResultButton.click()

await sleep(200);

songMenu=document.querySelector("#items").childNodes
for (let i = 0; i < songMenu.length; i++) {
  try{
    menuItem=songMenu[i].querySelector("a").innerText;
    if (menuItem=="Add to playlist") {
      songMenu[i].querySelector("a").click()
    }
  } catch {}
}

await sleep(200);

playlists=document.querySelector("#playlists").childNodes;

for (let i = 0; i < playlists.length; i++) {
  playlistName=playlists[i].querySelector("#title").innerText;
  if (playlistName==targetPlaylist) {
    playlists[i].querySelector("button").click()
  }
}
