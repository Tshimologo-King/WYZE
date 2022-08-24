fetch("http:localhost:3306/careers")
  .then((res) => res.json())
  .then((data) => {
    careers = data;
    console.log(data);
    displayCareers(data);
  });

function displayCareers(careers) {
  //create a variable that will get the id in html
  careers.innerHTML = "";

  //LOOP THROUGH THE CAREERS TO GET VALUES
  careers.forEach((career) => {
    careers.innerHTML += `<div>
                <p>PUSHIN P</p>
                <h1>${career.idCareers}</h1>
                <h2>${career.careerTitle}</h2>
                <h3>${career.careerIndustry}</h3>
                <h4>${career.careerDescription}</h4>
                <h5>${career.careerURLImage}</h5>
                <h6>${career.institutuions}</h6>
                <h6>${career.careerDayInLife}</h6>
            </div>`;
  });
}
displayCareers(careers);
