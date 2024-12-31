const search = document.getElementById("search_input");
search.addEventListener("keyup", async function(event) {
    clearresults();
    if (event.key!="Enter" && search.value!=""){
        await fetch("/performsearch", {
            method: "POST", body: JSON.stringify ({
            search: search.value
            }),
            headers: {
                 "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(async function(response){
            if(!response.ok){ 
                throw new Error("invalid");
            };
            const entries = await response.json();
            displayresults(entries);
            return await response;
        })
    }
});

function clearresults(){
    const table = document.getElementById("Search_res");
    const totalRows = table.rows.length;
    for (let i=totalRows; i>0; i--) table.deleteRow(i-1);
    document.getElementById("Search_res").style.display = "none";
}


function displayresults(entries) {
    document.getElementById("Search_res").style.display = "block";
    for (let i=0; i<Math.min(entries.length, 12); i++){
        var videoId = entries[i][3];
        var youtubeUrl = "https://www.youtube.com/watch?v=" + videoId;
        var photoId = entries[i][4];
        var photoLink = "icons/" + photoId + ".jpg"
        const info = document.getElementById("Search_res").getElementsByTagName("tbody")[0];  
        const newRow = info.insertRow(); 
        console.log("YouTube URL:", youtubeUrl);

        const newCell = newRow.insertCell(0).innerHTML = '<a href="' + youtubeUrl + '"target="_blank">' + '<img src=\" ../' + photoLink+ '"class="center" alt="ALbum Logo"> </img>' + entries[i][0] + " \"" + entries[i][2] + "\" "+ entries[i][1] + " " + '</a';
        
    

    }
}

