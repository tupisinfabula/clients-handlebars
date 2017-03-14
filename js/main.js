var btn = document.getElementById('btn-client');

btn.addEventListener('click', function(){
  btn.className +='hide';
  var request = new XMLHttpRequest('');
  request.open('GET','https://tupisinfabula.github.io/json/clients.json');
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      console.log(data);
      addtoHTML(data);
    } else {
      console.log("Connected to the server with a problem");
    } 
  };

  request.send();

  // helper to calculate how many years each of them are clients
  Handlebars.registerHelper("calculateYears", function(clientFideltyFrom) {
    var year = new Date().getFullYear() - clientFideltyFrom;
    if (year < 1) {
      return "Less than one";
    } else {
      return year;
    }
  });

  function addtoHTML(clientsData) {
    var rawTemplate = document.getElementById('clientsTemplate').innerHTML;
    var compileTemplate = Handlebars.compile(rawTemplate);
    var generateHTML = compileTemplate(clientsData);
    
    var clientsContainer = document.getElementById('clients-container');
    clientsContainer.innerHTML = generateHTML;
  }
})

