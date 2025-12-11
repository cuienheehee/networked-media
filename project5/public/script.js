window.onload = () => {
    // console.log("loaded!")

    //setting up question selection////////////////////////////////////////////////////
    const radioList = document.getElementsByClassName("radiobutt")
    //setting up question selection////////////////////////////////////////////////////

    // getting a list of the questions in the post so that we can change their display type
    let questions = document.getElementsByClassName("question")

    let submitbtn = document.getElementById("form-submit")

    
   
    addEventListener("change", (event) => {
        // for (i = 0; i < questions.length; i++){
        // }
        if (radioList [0].checked){
            questions [1].style.display = "block"
        }

        for(i = 1; i < questions.length-1; i++){
            
            let j = i * 2
            let k = j - 1
            
            if (radioList [j].checked || radioList [k].checked){
                questions [i + 1].style.display = "block"
            }
        }

        if (radioList [23].checked || radioList [24].checked){
            submitbtn.style.display = "block"
        }
    })

    submitbtn.onclick=()=>{
        maintenance = 500
        for(i = 0; i < radioList.length; i++){

        }
    }

}