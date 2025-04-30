const list = document.getElementById("experienceList");

let url = "http://127.0.0.1:3001/workexperience";

fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data.length === 0) {
            list.innerHTML = '<li> Inga erfarenheter finns att hämta! </li>'
            return;
        };
        data.forEach(exp => {
            const li = document.createElement('li');
            li.innerHTML = `
            <h2> ${exp.companyname} </h2>
            <h3> ${exp.jobtitle} </h3>
            <p> ${exp.location} </p>
            <p> ${exp.startdate} - ${exp.enddate} </p>
            <p> ${exp.description} </p>
            `
            list.appendChild(li)
        });
    });