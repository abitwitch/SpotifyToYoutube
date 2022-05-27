playlist=[["personal by stars","Test"],["intro by the xx","Test"],["my girl by the tempations","Test"]]

//Def sleep function
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Def add to playlist function
function addToPlaylist(fullSongTitle, targetPlaylist) {
    //Load URL
    window.location.href = 'https://music.youtube.com/search?q='+encodeURIComponent(fullSongTitle);
    
    window.addEventListener('load', function () {

        await sleep(200);

        //Click on menu for First Result
        firstResultButton=document.querySelector("#contents > ytmusic-responsive-list-item-renderer > ytmusic-menu-renderer > tp-yt-paper-icon-button")
        firstResultButton.click()

        await sleep(200);

        //Find and click "Add to playlist" button
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

        //Find and click target playlist
        playlists=document.querySelector("#playlists").childNodes;
        for (let i = 0; i < playlists.length; i++) {
          playlistName=playlists[i].querySelector("#title").innerText;
          if (playlistName==targetPlaylist) {
            playlists[i].querySelector("button").click()
          }
        }
        
    })

}


for (let i = 0; i < playlist.length; i++) {
    console.log(playlist[i]);
    addToPlaylist(playlist[i][0],playlist[i][1]);
}


