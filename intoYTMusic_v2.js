
playlist=[["Everybody Wants To Rule The World by Tears For Fears","DandD"],["Everybody Wants to Rule the World by Twinkle Twinkle Little Rock Star","DandD"],["Crystal Mountain by Nitelight","DandD"]]

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

    //Click on menu for First Song Result
    
    firstResultButton=null;
    
    elems=document.querySelector("#search-page > ytmusic-tabbed-search-results-renderer > div.content.style-scope.ytmusic-tabbed-search-results-renderer > ytmusic-section-list-renderer > div:nth-child(2)").children;
    for (let i = 0; i < elems.length; i++) {
        if(elems[i].querySelector("h2") && elems[i].querySelector("h2").innerText=="Songs"){
            firstResultButton=elems[i].querySelector("#contents ytmusic-responsive-list-item-renderer > ytmusic-menu-renderer > tp-yt-paper-icon-button");
        }
    }
    
    firstResultButton.click();

    await sleep(400);

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

    await sleep(400);

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



