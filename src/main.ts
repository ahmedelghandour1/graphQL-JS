const continentsSelect = document.querySelector('#continent-select');


function fetchQuery(query, variables?: any) {
    return fetch('https://countries.trevorblades.com/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query,
            variables
        })
    }).then((response: Response) => {
        return response.json();
    })
}

continentsSelect.addEventListener('change', (e: Event) => {
    const selectContinent = (<HTMLSelectElement>e.target).value;
    console.log(selectContinent);
    
    fetchQuery(`
        query getCountries($code: ID!) {
            continent(code: $code) {
                countries {
                    name
                }
            }
        }
    `, {code: selectContinent}).then((data) => {
        const options = data.data.continent.countries.map(el => {
            return `<option value="${el.name}">${el.name}</option>`
        }).join('');
        continentsSelect.innerHTML += options;
    })
})



fetchQuery(`
    query {
        continents {
            name
            code
        }
    }
`).then((data) => {
    const options = data.data.continents.map(el => {
        return `<option value="${el.code}">${el.name}</option>`
    }).join('');
    continentsSelect.innerHTML += options;
});

