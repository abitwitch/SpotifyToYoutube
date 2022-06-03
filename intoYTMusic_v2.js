
playlist=[["personal by stars","Test"],["intro by the xx","Test"],["my girl by the tempations","Test"]]
position=0

//Def sleep function
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Def is loaded function
async function waitForLoaded(ms) {
    while (!document.querySelector("body > ytmusic-app > yt-page-navigation-progress").hidden) {
        await sleep(100);
    }
    return;
}


async function addToPlaylist() {
  
    await waitForLoaded();
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
}


for (let i = 0; i < playlist.length; i++) {
    fullSongTitle=playlist[i][0];
    targetPlaylist=playlist[i][1];
    console.log("Adding: "+fullSongTitle);
    //Load song
    document.querySelector("#layout > ytmusic-nav-bar > div.center-content.style-scope.ytmusic-nav-bar > ytmusic-search-box > div > div.search-box.style-scope.ytmusic-search-box > input").value=fullSongTitle;
    var input = document.querySelector("#layout > ytmusic-nav-bar > div.center-content.style-scope.ytmusic-nav-bar > ytmusic-search-box");
    var ev = document.createEvent('Event');
    ev.initEvent('keypress');
    ev.which = ev.keyCode = 13;
    input.dispatchEvent(ev);
    
    //Add to playlist
    await addToPlaylist();
  
    console.log("Added:  "+fullSongTitle);

}



