const app = document.querySelector('#app') as HTMLDivElement;

const divTitre = document.createElement("div") as HTMLDivElement;
const h1Titre = document.createElement("h1") as HTMLHeadingElement;
h1Titre.setAttribute("id", "titreDePage");
h1Titre.classList.add("titreDePage");
h1Titre.innerHTML = "MarmiTop";
h1Titre.style.textAlign = "center";
h1Titre.style.fontSize = "5em";

divTitre.appendChild(h1Titre);
app.appendChild(divTitre);

const divAjoutRecette = document.createElement("div") as HTMLDivElement;
divAjoutRecette.setAttribute("id", "divAjoutRecette");
divAjoutRecette.classList.add("divAjoutRecette");

const divPlaceholders = document.createElement("div") as HTMLDivElement;
divPlaceholders.setAttribute("id", "divPlaceholders");
divPlaceholders.classList.add("divPlaceholders");
divPlaceholders.style.display = "flex";
divPlaceholders.style.flexDirection = "row";
divPlaceholders.style.justifyContent = "space-evenly"
divPlaceholders.style.flexWrap = "wrap";
divPlaceholders.style.margin = "25px";


const divBouttonAjouter = document.createElement("div") as HTMLDivElement;
divBouttonAjouter.style.display = "flex";
divBouttonAjouter.style.justifyContent = "center";
divBouttonAjouter.style.alignItems = "center";
divBouttonAjouter.style.margin = "10px";


const bouttonAjouter = document.createElement("button") as HTMLButtonElement;
bouttonAjouter.innerHTML = "Ajouter";

divBouttonAjouter.appendChild(bouttonAjouter);

divAjoutRecette.style.border ="1px";
divAjoutRecette.style.borderStyle="solid";
divAjoutRecette.style.borderColor="black";

const divMesRecette = document.createElement("div") as HTMLDivElement;
const h2MesRecettes = document.createElement("h2") as HTMLHeadingElement;
h2MesRecettes.innerHTML = "Mes recettes";
h2MesRecettes.style.textAlign = "left";



divAjoutRecette.appendChild(divPlaceholders);
divAjoutRecette.appendChild(divBouttonAjouter);
app.appendChild(divAjoutRecette);
app.appendChild(h2MesRecettes);



interface IFormData {
    label: string;
    placeholder: string;
    id: string;
}



const formData : IFormData[] = [
    {
        label: "Nom",
        placeholder: "tapez le nom de la recette",
        id: "inputName"
    },
    {
        label: "Lien Image",
        placeholder: "tapez le lien de l'image",
        id :"lienImage"
    }
    ,
    {
        label: "Durée",
        placeholder: "tapez la durée",
        id :"duree"
    }
    ,
    {
        label: "Note",
        placeholder: "tapez la note",
        id :"note"
    }
]



InitPage();

async function InitPage() {
    const res = await fetch("http://localhost:3030/recettes");
    const myResult  = await res.json();
   
    myResult.forEach((data) => {
        const myDivResult = document.createElement("div") as HTMLDivElement; 
        myDivResult.classList.add("myDivResult");
        
        const myDivImage = document.createElement("div") as HTMLDivElement;
        myDivImage.classList.add("myDivImage");
        
        const boxData = document.createElement("div") as HTMLDivElement; 
        boxData.classList.add("divBoxData"); 
       
        const labelNonRecetteResult =  document.createElement("label") as HTMLLabelElement;
        labelNonRecetteResult.classList.add("labelNonRecetteResult");
        labelNonRecetteResult.innerHTML = data.nameRecette;       

        const labelNoteRecetteResult =  document.createElement("label") as HTMLLabelElement;
        labelNoteRecetteResult.innerHTML = "Note : " + data.noteRecette;

        const labelDureeRecetteResult =  document.createElement("label") as HTMLLabelElement;
        labelDureeRecetteResult.innerHTML = "Durée : " + data.dureeRecette + "  minutes"; 

        const imageRecetteResult = document.createElement("img") as HTMLImageElement;
        imageRecetteResult.classList.add("imageRecetteResult");
        imageRecetteResult.src = data.lienImageRecette;       
        
        myDivImage.appendChild(imageRecetteResult);
        boxData.appendChild(labelNonRecetteResult);
        boxData.appendChild(labelNoteRecetteResult);
        boxData.appendChild(labelDureeRecetteResult);        
        myDivResult.appendChild(boxData);
        myDivResult.appendChild(myDivImage);
        app.appendChild(myDivResult);
    })
}

bouttonAjouter.addEventListener("click", async () =>{
    const inputName = document.querySelector("#inputName") as HTMLInputElement;
    const lienImage = document.querySelector("#lienImage") as HTMLInputElement;
    const duree = document.querySelector("#duree") as HTMLInputElement;
    const note = document.querySelector("#note") as HTMLInputElement;
    
    await creatRowRecette(inputName.value, lienImage.value, parseInt(duree.value), parseInt(note.value));
    
});

async function creatRowRecette(nom:string, lienImage:string, duree:number, note:number) {
    try {
        const res = await fetch(`http://localhost:3030/recettes`, {
            headers: new Headers({
              "Content-Type": "application/json",
            }),
            method: "POST",
            body: JSON.stringify({
              name: nom,
              lienImage: lienImage,
              duree: duree,
              note:note
            }),
          })
          console.log("res", res)
        const messageJson  = await res.json()
        console.log("messageJson",messageJson)
        
        
        const myDivResult = document.createElement("div") as HTMLDivElement; 
        myDivResult.classList.add("myDivResult");

        const myDivImage = document.createElement("div") as HTMLDivElement;
        myDivImage.classList.add("myDivImage");
        
        const boxData = document.createElement("div") as HTMLDivElement; 
        boxData.classList.add("divBoxData"); 
        
        const labelNonRecetteResult =  document.createElement("label") as HTMLLabelElement;
        labelNonRecetteResult.classList.add("labelNonRecetteResult");
        labelNonRecetteResult.innerHTML = messageJson.nameRecette;

        const labelNoteRecetteResult =  document.createElement("label") as HTMLLabelElement;
        labelNoteRecetteResult.innerHTML = "Note : " + messageJson.noteRecette;

        const labelDureeRecetteResult =  document.createElement("label") as HTMLLabelElement;
        labelDureeRecetteResult.innerHTML = "Durée : " + messageJson.dureeRecette + "  minutes";  
        
        const imageRecetteResult = document.createElement("img") as HTMLImageElement;
        imageRecetteResult.classList.add("imageRecetteResult");
        imageRecetteResult.src = messageJson.lienImageRecette;
        
        boxData.appendChild(labelNonRecetteResult);
        boxData.appendChild(labelNoteRecetteResult);
        boxData.appendChild(labelDureeRecetteResult);
        myDivImage.appendChild(imageRecetteResult);
        myDivResult.appendChild(boxData);
        myDivResult.appendChild(myDivImage);
        app.appendChild(myDivResult)
    }
    catch(e){
        console.log('err', e)
    }
}

formData.forEach( (data) => {
    const box = document.createElement("div") as HTMLDivElement;
    box.classList.add("boxInputs");    

    const labelNom =  document.createElement("label") as HTMLLabelElement;
    labelNom.innerHTML = data.label;
    labelNom.style.margin = "10px";

    const input =  document.createElement("input") as HTMLInputElement;
    input.classList.add("textInput");
    input.setAttribute("id", data.id);
    input.setAttribute("type", "text");
    input.placeholder = data.placeholder     

    box.appendChild(labelNom)
    box.appendChild(input)
    divPlaceholders.appendChild(box)
})