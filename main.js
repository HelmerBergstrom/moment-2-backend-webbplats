const list = document.getElementById("experienceList");

if(list) {
    let url = "http://127.0.0.1:3001/workexperience";
fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data.length === 0) {
            list.innerHTML = '<li> Inga erfarenheter finns att hämta! </li>'
            return;
        };
        data.forEach(exp => {
            const article = document.createElement('article');
            const startdate = exp.startdate.slice(0, 10);
            const enddate = exp.enddate.slice(0, 10);

            article.innerHTML = `
            <h2> ${exp.companyname} </h2>
            <h3> ${exp.jobtitle} </h3>
            <p> <strong> Plats: </strong> ${exp.location} </p>
            <p> <strong> Tid: </strong> ${startdate} - ${enddate} </strong></p>
            <p><strong> Arbetsbeskrivning: </strong> ${exp.description} </p>
            `
            list.appendChild(article)
        });
    });
};
const form = document.getElementById("experienceForm");
const confirmMessage = document.getElementById("confirmMessage");

// If-sats som körs om form:en finns på sidan.
if(form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Förhindrar att sidan uppdateras.
    
        // Ny erfarenhetsobjekt. Kör trim för att ta bort onödiga mellandlsag.
    const newExperience = {
        companyname: form.companyname.value.trim(),
        jobtitle: form.jobtitle.value.trim(),
        location: form.location.value.trim(),
        startdate: form.startdate.value,
        enddate: form.enddate.value,
        description: form.description.value.trim()
    };
    
    // Hämtar API och använder POST för att skicka datan. Gör om till JSON-sträng.
    try {
        const response = await fetch("http://127.0.0.1:3001/workexperience", {
            method: "POST",
            headers: {
                "Content-type": "application/json" 
            },
            body: JSON.stringify(newExperience)
        });

        const result = await response.json();
        if(response.ok) {
            confirmMessage.textContent = result.message; // Skriver ut bekräftelse.
        } else {
            confirmMessage.textContent = result.message; // Skriver ut felmeddelande.
        }
        } catch(error) {
            confirmMessage.textContent = "Fel vid anslutning till server!";
    }
})};