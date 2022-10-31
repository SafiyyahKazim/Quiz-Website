function getCheckboxValue() {

    //list of languages 
    var languages = [
        {
            "Language" : "Java",
            "Count" : 0,
        },

        {
            "Language" : "CSharp",
            "Count" : 0,
        },

        {
            "Language" : "Python",
            "Count" : 0,
        },

        {
            "Language" : "JavaScript",
            "Count" : 0,
        },

        {
            "Language" : "SQL",
            "Count" : 0,
        },

        {
            "Language" : "Go",
            "Count" : 0,
        },

        {
            "Language" : "R",
            "Count" : 0,
        },

        {
            "Language" : "C/C++",
            "Count" : 0,
        }
    ]

    //checks the topic the user choose and count the languages that are related to each topic
    var checkboxes = document.getElementsByTagName("input");
    for(var i = 0; i < checkboxes.length; i++) {
        for(var j = 0; j < languages.length; j++) {
            if(checkboxes[i].id.split(',').includes(languages[j].Language) && checkboxes[i].checked === true) {
                languages[j].Count++;
            }
        }
    }

    //find the highest language related to the users choice
    const count = languages.map(object => {
        return object.Count
    });
    const max = Math.max(...count);

    
    console.log(max);
    console.log(languages);
    

    //get result 
    const result = [];
    
    for(var i = 0; i < languages.length; i++) {
        if(languages[i].Count == max) {
            result.push(languages[i].Language)
        }
    }
    /*
    console.log("Results length: " + result.length);
    */

    return document.getElementById("result").innerHTML = result;
  }