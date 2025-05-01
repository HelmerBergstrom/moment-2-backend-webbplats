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
            <button class="delete-btn" data-id="${exp.id}"> RADERA ERFARENHET </button>
            ` // Data-id = erfarenhetsID:t som radera-knappen skapas vid.

            list.appendChild(article)


            // RADERA-FUNKTION

            // Radera-knapp för varje article-element.
            const deleteBtn = article.querySelector(".delete-btn");

            // Händelselyssnare som lyssnar på klick.
            deleteBtn.addEventListener("click", async () => {
                // Bekräftelse på om användaren verkligen vill radera erfarenheten.
                const confirmDelete = confirm("Är du säker på att du vill radera denna erfarenhet?");
                // Om användaren inte bekräftar, avslutas funktionen.
                if (!confirmDelete) return;

                // Hämtar id:t för erfarenheten som har klickats på.
                const id = deleteBtn.getAttribute("data-id");

                try {
                    // Hämtar URL:en med id:t. Metod DELETE för att ta bort erfarenhet.
                    const response = await fetch(`http://127.0.0.1:3001/workexperience/${id}`, {
                        method: "DELETE" 
                    });

                    const result = await response.json();

                    // article-elementet tas bort och meddelande skrivs ut som bekräftelse. Om response inte är ok skickas felmeddelande ut.
                    if (response.ok) {
                        article.remove();
                        alert(result.message);
                    } else {
                        alert(result.message);
                    }
                } catch (error) {
                    alert("Fel vid borttagning av erfarenhet!");
                }
            });
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
            window.location.href = "index.html";
        } else {
            confirmMessage.textContent = result.message; // Skriver ut felmeddelande.
        }
        } catch(error) {
            confirmMessage.textContent = "Fel vid anslutning till server!";
    }
})};