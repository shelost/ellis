var Airtable = require('airtable');

var base = new Airtable({apiKey: 'keyyvLfhkvUVJ0cIX'}).base('app6y27Paqp7IMxyF');

var Results = []

function fetchProblems(n){

    res = []

    base('problems').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: n,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
           // console.log('Retrieved', record.get('id'), record.get('example-1'));

            let obj = {
                id: record.get('id'),
                name: record.get('name'),
                examples:
                [
                    {
                        input: record.get('example-1')[0].url,
                        output: record.get('example-1')[1].url
                    },
                    {
                        input: record.get('example-2')[0].url,
                        output: record.get('example-2')[1].url
                    },
                    {
                        input: record.get('example-3')[0].url,
                        output: record.get('example-3')[1].url
                    }
                ],
                props:
                {
                    num_lines: record.get('nume-lines'),
                    num_colors: record.get('nume-colors'),
                    difficulty: record.get('difficulty'),
                }
            }

            res.push(obj)
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });

    setTimeout(() => {

        for (let i=0; i<res.length; i++){

            let elem = res[i]

            Results.push(JSON.stringify(elem) + '!')
        }

        localStorage.setItem("Results", Results)

    }, 500);

    //return array
}