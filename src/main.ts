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
    const res = await fetch("http://localhost:3030/findAll");
    const messages  = await res.text();
    const myResult = JSON.parse(messages);

    myResult.forEach((data) => {
        const myDivResult = document.createElement("div") as HTMLDivElement; 
        myDivResult.classList.add("boxResultRecette");
        myDivResult.style.display = "flex";
        myDivResult.style.flexDirection = "row";
        myDivResult.style.border ="1px";
        myDivResult.style.borderStyle="solid";
        myDivResult.style.borderColor="black";
        myDivResult.style.marginBottom = "10px";

        
        const myDivImage = document.createElement("div") as HTMLDivElement;
        myDivImage.style.width = "50%";
        myDivImage.style.margin = "10px";

        const boxData = document.createElement("div") as HTMLDivElement; 
        boxData.classList.add("divBoxData");
        boxData.style.display = "flex";
        boxData.style.flexDirection = "column";
        boxData.style.width = "50%";
        boxData.style.margin = "10px";
        boxData.style.textAlign = "left";

        // boxData.style.border ="1px";
        // boxData.style.borderStyle="solid";
        // boxData.style.borderColor="red";
        

        const labelNonRecetteResult =  document.createElement("label") as HTMLLabelElement;
        labelNonRecetteResult.innerHTML = data.nameRecette;
        labelNonRecetteResult.style.fontWeight = "bold";
        labelNonRecetteResult.style.fontSize = "60px";
        labelNonRecetteResult.style.marginBottom = "20px";

        const labelNoteRecetteResult =  document.createElement("label") as HTMLLabelElement;
        labelNoteRecetteResult.innerHTML = "Note : " + data.noteRecette;

        const labelDureeRecetteResult =  document.createElement("label") as HTMLLabelElement;
        labelDureeRecetteResult.innerHTML = "Durée : " + data.dureeRecette + "  minutes"; 

        const imageRecetteResult = document.createElement("img") as HTMLImageElement;
        imageRecetteResult.src = data.lienImageRecette;
        imageRecetteResult.style.width = "150px";
        imageRecetteResult.style.height = "150px";
        
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
    
    await creatRowRecette(inputName.value, lienImage.value, duree.value, note.value);
    InitPage();
});

async function creatRowRecette(nom:string, lienImage:string, duree:string, note:string) {
    try {
        const res = await fetch(`http://localhost:3030/add/${nom}/${lienImage.replaceAll("/", `%2F`)}/${duree}/${note}`)
        const messages  = await res.text()
        //console.log(JSON.parse(messages)) 
        let messageJson = JSON.parse(messages); 
        
        // const box = document.createElement("div") as HTMLDivElement; 
        // box.classList.add("boxResultRecette");
        // box.style.display = "flex";
        // box.style.flexDirection = "column";
        // box.style.border ="1px";
        // box.style.borderStyle="solid";
        // box.style.borderColor="black";



        // const labelNonRecetteResult =  document.createElement("label") as HTMLLabelElement;
        // labelNonRecetteResult.innerHTML = messageJson.nameRecette;

        // const labelNoteRecetteResult =  document.createElement("label") as HTMLLabelElement;
        // labelNoteRecetteResult.innerHTML = messageJson.noteRecette;

        // const labelDureeRecetteResult =  document.createElement("label") as HTMLLabelElement;
        // labelDureeRecetteResult.innerHTML = messageJson.dureeRecette;  
        
        // const imageRecetteResult = document.createElement("img") as HTMLImageElement;
        // imageRecetteResult.src = messageJson.lienImageRecette;
        // imageRecetteResult.style.width = "150px";
        // imageRecetteResult.style.height = "150px";


        // box.appendChild(labelNonRecetteResult);
        // box.appendChild(labelNoteRecetteResult);
        // box.appendChild(labelDureeRecetteResult);
        // box.appendChild(imageRecetteResult);
        // app.appendChild(box)
    }
    catch(e){
        console.log('err', e)
    }
}

formData.forEach( (data, i) => {
    const box = document.createElement("div") as HTMLDivElement;
    box.classList.add("boxInput");
    box.style.display = "flex";
    box.style.flexDirection = "column";
    box.style.justifyContent = "space-evenly";
    box.style.width = "45%";

    const labelNom =  document.createElement("label") as HTMLLabelElement;
    labelNom.innerHTML = data.label;
    labelNom.style.margin = "10px";

    const input =  document.createElement("input") as HTMLInputElement;
    input.setAttribute("id", data.id);
    input.setAttribute("type", "text");
    input.placeholder = data.placeholder
    input.style.marginBottom = "10px";
    input.style.marginTop = "10px";
    

    box.appendChild(labelNom)
    box.appendChild(input)

    divPlaceholders.appendChild(box)
})