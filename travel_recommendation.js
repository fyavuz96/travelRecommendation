
const apiUrl = "travel_recommendation_api.json";

function searchCondition()
{
 
   

    searchScreen.style.display="flex";
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {        
        const searchScreen=document.getElementById("searchScreen");
        const input = document.getElementById("search").value;
       
        const results1 = searchCitiesByDescription(input, data);
        const results2 = searchTemplesByDescription(input, data);
        const results3 = searchBeachesByDescription(input, data);
        
        if (results1.length !==0||results2.length !==0||results3.length!==0 ) {
            searchScreen.innerHTML = `
                   
                    <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 20px;">
                        ${results1.map(city => `
                            <div style="border: 1px solid #2980b9; border-radius: 8px; padding: 10px; width: 200px; background-color: #ecf0f1;">
                                <h3 style="color: #2980b9; margin: 0;">${city.name}</h3>
                                <p style="margin: 5px 0;">${city.description}</p>
                                ${city.imageUrl ? `<img src="${city.imageUrl}" alt="${city.imageUrl}" style="width: 100%; border-radius: 8px; margin-top: 10px;">` : ''}
                            </div>
                        `).join('')}
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 20px;">
                        ${results2.map(temple => `
                            <div style="border: 1px solid #27ae60; border-radius: 8px; padding: 10px; width: 200px; background-color: #ecf0f1;">
                                <h3 style="color: #27ae60; margin: 0;">${temple.name}</h3>
                                <p style="margin: 5px 0;">${temple.description}</p>
                                ${temple.imageUrl ? `<img src="${temple.imageUrl}" alt="${temple.imageUrl}" style="width: 100%; border-radius: 8px; margin-top: 10px;">` : ''}
                            </div>
                        `).join('')}
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 20px;">
                        ${results3.map(beach => `
                            <div style="border: 1px solid #e74c3c; border-radius: 8px; padding: 10px; width: 200px; background-color: #ecf0f1;">
                                <h3 style="color: #e74c3c; margin: 0;">${beach.name}</h3>
                                <p style="margin: 5px 0;">${beach.description}</p>
                                ${beach.imageUrl ? `<img src="${beach.imageUrl}" alt="${beach.imageUrl}" style="width: 100%; border-radius: 8px; margin-top: 10px;">` : ''}
                            </div>
                        `).join('')}
                    </div>
                `;
     
        }

        else
        {
            
            searchScreen.innerHTML = `
                            <div style="text-align: center; margin-top: 20px; color: #ffffff; 
                                align-items: center; justify-content: center; padding:35px;
                            ">
                                <h2>Arama bulunamadı</h2>
                                <p>Lütfen farklı bir arama terimi deneyin.</p>
                            </div>
                        `;
        }
         
           
   
        
        
        function searchTemplesByDescription(term, data) {
            const searchTerm = term.toLowerCase();
          
            const matchedCities2 = data.temples.filter(temple =>
                
                temple.description &&
                temple.description.toLowerCase().includes(searchTerm)||
                temple.name&&temple.name.toLowerCase().includes(searchTerm)
                
              );
           
          
            return matchedCities2;
          }

          function searchBeachesByDescription(term, data) {
            const searchTerm = term.toLowerCase();
          
            const matchedCities3 = data.beaches.filter(beach =>
                
                beach.description &&
                beach.description.toLowerCase().includes(searchTerm)||
                beach.name&&
                beach.name.toLowerCase().includes(searchTerm)
                
              );
           
          
            return matchedCities3;
          }

          function searchCitiesByDescription(term, data) {
            const searchTerm = term.toLowerCase();
          
            const matchedCities = data.countries.flatMap(country =>
              country.cities.filter(city =>
                city.description &&
                city.description.toLowerCase().includes(searchTerm)||
                city.name&&
                city.name.toLowerCase().includes(searchTerm)
              )
            );       
          
            return matchedCities;
          }

        
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });

}

function Clear()
{
    const searchScreen=document.getElementById("searchScreen");
       
    searchScreen.style.display="none";
   
}

document.getElementById("searchBtn").addEventListener("click",searchCondition);
document.getElementById("Clear").addEventListener("click",Clear)