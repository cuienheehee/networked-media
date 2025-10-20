window.onload = () => {
    // console.log("working!")
    let posts = document.getElementsByClassName("post")
    let lengthFilterNames = document.getElementsByName('sockLengthFilter')
    let paletteFilterNames = document.getElementsByName('sockPaletteFilter')
    let statusFilterNames = document.getElementsByName('statusFilter')

    //in the event of change, filter by class name

    addEventListener("change", (event) => { 

        for(i = 0; i < posts.length; i++){

            let hidden = false;

            for(j=0; j < lengthFilterNames.length; j++){
                
                //if a filter name is checked and the post doesn't have a class that matches that name, it is hidden.
                if (lengthFilterNames [j].checked && !posts [i].classList.contains(lengthFilterNames [j].value)){
                    posts [i].style.display = "none"
                    hidden = true;
                }

            }

            for(j=0; j < paletteFilterNames.length; j++){
                
                if (paletteFilterNames [j].checked && !posts [i].classList.contains(paletteFilterNames [j].value)){
                    posts [i].style.display = "none"
                    hidden = true;
                }

            }

            for(j=0; j < statusFilterNames.length; j++){
                
                if (statusFilterNames [j].checked && !posts [i].classList.contains(statusFilterNames [j].value)){
                    posts [i].style.display = "none"
                    hidden = true;
                }

            }

            if (hidden == false){
                posts [i].style.display = "inline-block"
            }
        }
    })

    addEventListener("reset", (event) => {
        // console.log("reset is pressed")

        // when the reset button is pressed, show all posts.
        // this is a change that was made after seeing testers interact with the website.
        for(i = 0; i < posts.length; i++){
            posts [i].style.display = "inline-block"
        }

    })

}