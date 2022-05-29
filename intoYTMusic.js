
playlist=[["personal by stars","Test"],["intro by the xx","Test"],["my girl by the tempations","Test"]]
position=0

//Def sleep function
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var win = window.open("https://music.youtube.com","_blank");
win.addEventListener('load', async function () {
        
    console.log("loaded");

    await sleep(200);

    //Click on menu for First Result
    firstResultButton=win.document.querySelector("#contents > ytmusic-responsive-list-item-renderer > ytmusic-menu-renderer > tp-yt-paper-icon-button")
    firstResultButton.click()

    await sleep(200);

    //Find and click "Add to playlist" button
    songMenu=win.document.querySelector("#items").childNodes
    for (let i = 0; i < songMenu.length; i++) {
      try{
        menuItem=songMenu[i].querySelector("a").innerText;
        if (menuItem=="Add to playlist") {
          songMenu[i].querySelector("a").click()
        }
      } catch {}
    }

    await sleep(200);

    //Find and click target playlist
    playlists=win.document.querySelector("#playlists").childNodes;
    for (let i = 0; i < playlists.length; i++) {
      playlistName=playlists[i].querySelector("#title").innerText;
      if (playlistName==targetPlaylist) {
        playlists[i].querySelector("button").click()
      }
    }

    //add next song:
    position+=1;
    if (position < playlist.length){
        addToPlaylist(position)
    } else {
        console.log("Completed adding playlist");
    }
},false)



//Def add to playlist function
async function addToPlaylist() {
    fullSongTitle=playlist[position][0];
    targetPlaylist=playlist[position][1];
    console.log(fullSongTitle);
    //Load URL
    //window.location.href = 'https://music.youtube.com/search?q='+encodeURIComponent(fullSongTitle);
    win.open('https://music.youtube.com/search?q='+encodeURIComponent(fullSongTitle),"_self");

}


addToPlaylist();

