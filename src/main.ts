const app = document.querySelector('#app') as HTMLDivElement;

const divTitre = document.createElement("div") as HTMLDivElement;
const h1Titre = document.createElement("h1") as HTMLHeadingElement;
h1Titre.setAttribute("id", "titreDePage");
h1Titre.classList.add("titreDePage");
h1Titre.innerHTML = "MarmiTop";


divTitre.appendChild(h1Titre);
app.appendChild(divTitre);

const divAjoutRecette = document.createElement("div") as HTMLDivElement;
divAjoutRecette.setAttribute("id", "divAjoutRecette");
divAjoutRecette.classList.add("divAjoutRecette");

const divPlaceholders = document.createElement("div") as HTMLDivElement;
divPlaceholders.setAttribute("id", "divPlaceholders");
divPlaceholders.classList.add("divPlaceholders");

const divBouttonAjouter = document.createElement("div") as HTMLDivElement;
divBouttonAjouter.classList.add("divBouttonAjouter");

const bouttonAjouter = document.createElement("button") as HTMLButtonElement;
bouttonAjouter.classList.add("boutton");
bouttonAjouter.innerHTML = "Ajouter";

divBouttonAjouter.appendChild(bouttonAjouter);

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

formData.forEach( (data) => {
    const box = document.createElement("div") as HTMLDivElement;
    box.classList.add("boxInputs");    

    const labelNom =  document.createElement("label") as HTMLLabelElement;
    labelNom.classList.add("labelNom");
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

interface IMyResult{
    id : number;
    nameRecette : string;
    lienImageRecette : string;
    dureeRecette : number;
    noteRecette : number
}


InitPage();

async function InitPage() {
    const res = await fetch("http://localhost:3030/recettes");
    const myResult  = await res.json();
   
    myResult.forEach((data: IMyResult) => {   
        ajouterRecette(data)
    })
}


bouttonAjouter.addEventListener("click", async () =>{
    const inputName = document.querySelector("#inputName") as HTMLInputElement;
    const lienImage = document.querySelector("#lienImage") as HTMLInputElement;
    const duree = document.querySelector("#duree") as HTMLInputElement;
    const note = document.querySelector("#note") as HTMLInputElement;
    
    await creatRowRecette(inputName.value, lienImage.value, parseInt(duree.value), parseInt(note.value));
    inputName.value = "";
    lienImage.value = "";
    duree.value = "" ;
    note.value = "";
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
         
        const messageJson  = await res.json()
        
        ajouterRecette(messageJson)
    }
    catch(e){
        console.log('err', e)
    }
}
async function deleteRowRecette(id:number) {
    const res = await fetch(`http://localhost:3030/recettes/`+id, {
            headers: new Headers({
              "Content-Type": "application/json",
            }),
            method: "DELETE",
            body: JSON.stringify({}),
          });
    const messageJson  = await res.json() ; 
    //console.log("messageJsonDelete",messageJson) ; 
}
async function updateRowRecette(id:number, nom:string, lienImage:string, duree:number, note:number) {
    const res = await fetch(`http://localhost:3030/recettes/`+id, {
            headers: new Headers({
              "Content-Type": "application/json",
            }),
            method: "PUT",
            body: JSON.stringify({
                name: nom,
                lienImage: lienImage,
                duree: duree,
                note:note
            }),
          });
    const messageJson  = await res.json() ; 
    console.log("messageJsonUpdate",messageJson) ; 
}
function ajouterRecette(messageJson: IMyResult){
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

    const divButtonsRecetteResult = document.createElement("div") as HTMLDivElement;
    divButtonsRecetteResult.classList.add("divButtonsRecetteResult");

    const buttonUpdateRecetteResult = document.createElement("button") as HTMLButtonElement;
    buttonUpdateRecetteResult.classList.add("boutton"); 
    buttonUpdateRecetteResult.innerText = "UpDate";

    const buttonDeleteRecetteResult = document.createElement("button") as HTMLButtonElement;
    buttonDeleteRecetteResult.classList.add("boutton"); 
    buttonDeleteRecetteResult.innerText = "Delete";

    divButtonsRecetteResult.appendChild(buttonUpdateRecetteResult);
    divButtonsRecetteResult.appendChild(buttonDeleteRecetteResult);
    boxData.appendChild(labelNonRecetteResult);
    boxData.appendChild(labelNoteRecetteResult);
    boxData.appendChild(labelDureeRecetteResult);
    myDivImage.appendChild(imageRecetteResult);
    myDivResult.appendChild(divButtonsRecetteResult);
    myDivResult.appendChild(boxData);
    myDivResult.appendChild(myDivImage);
    
    app.appendChild(myDivResult)

    buttonDeleteRecetteResult.addEventListener("click", async () =>{
        console.log("delete");
        await deleteRowRecette(messageJson.id);
        myDivResult.remove();      
    });

    buttonUpdateRecetteResult.addEventListener("click", async () =>{
        console.log("Update");
        await updateRowRecette(messageJson.id,messageJson.nameRecette,messageJson.lienImageRecette,messageJson.dureeRecette,messageJson.noteRecette);
             
    });
}