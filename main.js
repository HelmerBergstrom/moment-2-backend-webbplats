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

