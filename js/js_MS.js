window.onload = function () {
    setIndividualInfo();
    closeFilters();
    showProgram();
    $('#searchResults').hide();
    $('#nothingFoundDisplay').hide();

    $("#rateComment").keypress(function () {
        $("#buttonComment").addClass("blue");
    });
    $("#URL").keypress(function () {
        $("#buttonURL").addClass("blue");
    });

    loadRatingValues(); //calculates rating-values for each Lehrveranstaltung so results can be sorted accordingly

};



/*---------------------------------------------------------------Start of new search fuction-----------------------------------------------------------------------------------*/


var resultsNewSearch = [];

function newSearchFunction() {

    //--------------------------------------------1. Filter all Objects from Lehrveranstaltungen------------------------------------------------------------------------------------------//

    multipleFilters();


    //--------------------------------------------2. Check the filtered Lectures for their match with search-bar input-------------------------------------------------------------------//


    if ($('#userInput').val().length != 0) {

        $('#nothingFoundDisplay').hide();
        $('#searchResults').hide();
        $('#LVList').empty();
        resultsNewSearch = [];


        // Declare variables
        var input, filter, ul, li, a, i;
        input = document.getElementById('userInput');
        filter = input.value.toUpperCase();
        ul = document.getElementById("LVList");
        li = ul.getElementsByTagName('li');




        for (i = 0; i < FinallyFilteredArray.length; i++) { //Abgleich Search Bar Input mit Titeln der LVs, bei treffer wird LV in Array resultsNewSearch gepushed
            if (FinallyFilteredArray[i].name.toUpperCase().indexOf(filter) > -1) {
                resultsNewSearch.push(FinallyFilteredArray[i]);

            }
        }

        if (resultsNewSearch.length != 0) { // Ausgabe der Suchergebnisse
            $('#searchResults').show();

            // This part enables the side panel with the sorting criteria to be opened by swiping 
            if (resultsNewSearch.length >= 2) {

                $('#rightPanel,#OverallPanel,#LCPanel,#AVGPanel,#FacultyPanel,#ProgramPanel').hide();
                $('#sortingPanel').show();
            }



        } else {
            $('#nothingFoundDisplay').show(); //Meldung, falls keine Suchergebnisse
        }


        //-------------------------------------------3. Sort the results according to current sorting Criterium and show them on display---------------------------------------------------//


        sort();


        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



    } else {

        $('#nothingFoundDisplay').hide(); // has to be hided in case the search before did not find any results!
        resultsNewSearch = [];
        for (i = 0; i < FinallyFilteredArray.length; i++) {
            resultsNewSearch.push(FinallyFilteredArray[i]);
        }

        writeIntoLvList();
        $('#searchResults').show();

        if (resultsNewSearch.length == 0) {
            $('#nothingFoundDisplay').show();
            $('#searchResults').hide();
        }
        sort();
    }
}



function clearSearchField() {
    $('#userInput').val("");
}





/*---------------------------------------------------------------End of new search function-----------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//                                                                          OBJECTS

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/




function setIndividualInfo() {
    $('#userNameProfile').html(user.name); //sets label of bottom tabbar profile-icon to user' s name according to his profile
    $('#MyProgramTab').html(user.studiengang); //sets MyProgram-tabbar-text to user' s program of stud according to his profile
}



var user = {
    name: "MARCUS",
    semester: "WS 16/17",
    studiengang: "HFE",
    credit: 9,
    upvoted: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    rated: []
}



/*LV-Objects*/


var Lehrveranstaltungen = [{
        name: "C# Advanced",
        overall: 4.8,
        average: 2,
        lecturerperformance: 3,
        effort: 2.7,
        testdifficulty: 2.2,
        addvalue: 3.4,
        type: "seminar",
        faculty: "Informatics", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: false,
        num: 0,
        programs: ["Informatics", "Mathematics", "Mechanical Engineering"],
        rating: [{
            upvotes: 3,
            name: "Clarissa",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "I totally loved it!",
            overall: 3,
            lecturer: 4,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.5,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 3,
            name: "Peter",
            semester: "WS 16/17",
            studiengang: "HFE",
            comment: "Cool programming stuff",
            overall: 1,
            lecturer: 5,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.0,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Markus",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "Worst of all we had to do coding. I really hate coding. Felt like a nerd...",
            overall: 3,
            lecturer: 4,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.0,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    },
    {
        name: "CAD Praktikum",
        overall: 2.2,
        average: 2,
        lecturerperformance: 4.7,
        effort: 4.0,
        testdifficulty: 1.2,
        addvalue: 1.8,
        type: "seminar", //added as a filter-option
        faculty: "Mechanical Engineering", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: true,
        num: 1,
        programs: ["Ergonomie HFE", "HFE"],
        rating: [{
            upvotes: 3,
            name: "Laura",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "I did not get the spirit.",
            overall: 5,
            lecturer: 2,
            effort: 3,
            difficulty: 4,
            addValue: 5,
            averageGrade: 2.7,
            noAverage: false,
            url: "",
            earnedPoints: 4

        }, {
            upvotes: 23,
            name: "Yvonne",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "I developed the best saw that has ever been driven by a sterling motor!!!",
            overall: 5,
            lecturer: 5,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: true,
            url: "",
            earnedPoints: 4
        }]
    }, {
        name: "Digitale Industrie",
        overall: 4.8,
        average: 2,
        lecturerperformance: 3,
        effort: 2.7,
        testdifficulty: 2.2,
        addvalue: 3.4,
        type: "seminar",
        faculty: "Informatics", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: false,
        num: 2,
        programs: ["Informatics", "Mathematics", "Mechanical Engineering"],
        rating: [{
            upvotes: 3,
            name: "Clarissa",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "I totally loved it!",
            overall: 5,
            lecturer: 4,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.5,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 3,
            name: "Peter",
            semester: "WS 16/17",
            studiengang: "HFE",
            comment: "Cool programming stuff",
            overall: 5,
            lecturer: 5,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.0,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Markus",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "Definitely would recommend it!",
            overall: 3,
            lecturer: 4,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.0,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    }, {
        name: "Digitale Menschmodellierung",
        overall: 3.0,
        average: 2.2,
        lecturerperformance: 1.2,
        effort: 2.0,
        testdifficulty: 2.2,
        addvalue: 1.0,
        type: "seminar",
        faculty: "Mechanical Engineering", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: false,
        num: 3,
        programs: ["Ergonomie HFE", "HFE"],
        rating: [{
            upvotes: 3,
            name: "Rebecca",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "All in all, i liked this lecture. The lecturer is very good, but demands i high level of concentration. The exam, however, is very difficult. Prepare yourselves well!!",
            overall: 1,
            lecturer: 5,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.0,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Julia",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "I liked the lecture. Lecturer seems to be a smart guy though.",
            overall: 1,
            lecturer: 4,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: true,
            url: "",
            earnedPoints: 4
        }]
    }, {
        name: "Ergonomisches Praktikum",
        overall: 1.2,
        average: 2.2,
        lecturerperformance: 2.2,
        effort: 2.0,
        testdifficulty: 2.2,
        addvalue: 1.0,
        type: "seminar",
        faculty: "Mechanical Engineering", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: false,
        num: 4,
        programs: ["Ergonomie HFE", "HFE"],
        rating: [{
            upvotes: 3,
            name: "Sabrina",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "The exam  is very difficult. Prepare yourselves well!!",
            overall: 3,
            lecturer: 4,
            effort: 2,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Markus",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "Very good. Interesting but quite hard.",
            overall: 5,
            lecturer: 1,
            effort: 2,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    }, {
        name: "Fabrikplanung",
        overall: 3.0,
        average: 2.2,
        lecturerperformance: 2.2,
        effort: 2.0,
        testdifficulty: 2.2,
        addvalue: 1.0,
        type: "seminar",
        faculty: "Mechanical Engineering", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: false,
        num: 5,
        programs: ["Ergonomie HFE", "Mathematics", "HFE"],
        rating: [{
            upvotes: 3,
            name: "Steffen",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "All in all, i liked this lecture. The lecturer is very good, but demands i high level of concentration. The exam, however, is very difficult. Prepare yourselves well!!",
            overall: 1,
            lecturer: 1,
            effort: 5,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Dwayne",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "Very good. Interesting and not too hard.",
            overall: 1,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    },
    {
        name: "Fundamentals of Algorithms",
        overall: 1.0,
        average: 3.5,
        lecturerperformance: 3.9,
        effort: 2.0,
        testdifficulty: 1.1,
        addvalue: 1.5,
        type: "lecture",
        faculty: "Informatics", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: false,
        num: 6,
        programs: ["Informatics", "Mathematics", "HFE"],
        rating: [{
            upvotes: 3,
            name: "Alfred",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "All in all I hated the lecture very much.",
            overall: 1,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Jean",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "I love that guy. Great algorithms, great exam.",
            overall: 5,
            lecturer: 5,
            effort: 3,
            difficulty: 3,
            addValue: 2,
            averageGrade: 2.7,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    },
    {
        name: "Höhere Mathematik 1",
        overall: 3.3,
        average: 2,
        lecturerperformance: 3.7,
        effort: 2.9,
        testdifficulty: 2.9,
        addvalue: 3.5,
        type: "lecture",
        faculty: "Mathematics", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: false,
        num: 7,
        programs: ["Informatics", "Mathematics", "HFE"],
        rating: [{
            upvotes: 3,
            name: "Dean",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "Even for TUM-BWL students a difficult lecture.",
            overall: 2,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Marco",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "Almost scared me to death.",
            overall: 4,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    }, {
        name: "Höhere Mathematik 2",
        overall: 1.5,
        average: 3.3,
        lecturerperformance: 3.5,
        effort: 2.0,
        testdifficulty: 1.5,
        addvalue: 2.5,
        type: "lecture",
        faculty: "Mathematics", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: true,
        num: 8,
        programs: ["Informatics", "Mathematics", "HFE"],
        rating: [{
            upvotes: 3,
            name: "Justus",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "Whats worse than Höhere Mathematik 1? Yeah right!.",
            overall: 1,
            lecturer: 3,
            effort: 1,
            difficulty: 1,
            addValue: 4,
            averageGrade: 3.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Markus",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "Good lecturer, boring content though",
            overall: 2,
            lecturer: 4,
            effort: 3,
            difficulty: 3,
            addValue: 1,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    },
    {
        name: "Interaction Prototyping",
        overall: 3.4,
        average: 1.3,
        lecturerperformance: 3,
        effort: 3.8,
        testdifficulty: 2.2,
        addvalue: 3.0,
        type: "seminar",
        faculty: "Mechanical Engineering", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Conti, Prasch, Yang",
        ects: 3,
        tumonline: "some URL",
        starred: false,
        num: 9,
        programs: ["Ergonomie HFE", "Informatics", "HFE"],
        rating: [{
            upvotes: 3,
            name: "Donald",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "Would definitely recommend the course! You learn a lot about the user-centered design and present your own app at the end of the project. Absolutely fantastic! Made programming great again!",
            overall: 5,
            lecturer: 4,
            effort: 3,
            difficulty: 3,
            addValue: 5,
            averageGrade: 1.1,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Mike",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "Yeha, I have learned to create my own web-application!",
            overall: 4,
            lecturer: 4,
            effort: 3,
            difficulty: 2,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    }, {
        name: "Mathematik für Ingenieure",
        overall: 3.2,
        average: 3.5,
        lecturerperformance: 3,
        effort: 3.0,
        testdifficulty: 2.2,
        addvalue: 4.0,
        type: "lecture",
        faculty: "Mechanical Engineering", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: false,
        num: 10,
        programs: ["HFE"],
        rating: [{
            upvotes: 3,
            name: "Justus",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "I can recommend the lecture.",
            overall: 4,
            lecturer: 4,
            effort: 3,
            difficulty: 3,
            addValue: 3,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Markus",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "All in all, i liked this lecture. The lecturer is very good, but demands i high level of concentration. The exam, however, is very difficult. Prepare yourselves well!!",
            overall: 5,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    }, {
        name: "Motivational User-Interfaces",
        overall: 2.0,
        average: 2.2,
        lecturerperformance: 2.2,
        effort: 2.0,
        testdifficulty: 2.2,
        addvalue: 1.0,
        type: "seminar",
        faculty: "Mechanical Engineering", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 5,
        tumonline: "some URL",
        starred: false,
        num: 11,
        programs: ["Ergonomie HFE", "Informatics", "HFE"],
        rating: [{
            upvotes: 3,
            name: "Peter",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "All in all, i liked this lecture. The lecturer is very good, but demands i high level of concentration. The exam, however, is very difficult. Prepare yourselves well!!",
            overall: 4,
            lecturer: 1,
            effort: 3,
            difficulty: 2,
            addValue: 3,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "John",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "Very good. Interesting and not too hard.",
            overall: 4,
            lecturer: 3,
            effort: 3,
            difficulty: 5,
            addValue: 5,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    }, {
        name: "Numerik",
        overall: 3.0,
        average: 2.2,
        lecturerperformance: 2.2,
        effort: 2.0,
        testdifficulty: 2.2,
        addvalue: 1.0,
        type: "seminar",
        faculty: "Mathematics", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: false,
        num: 12,
        programs: ["Informatics", "Mathematics"],
        rating: [{
            upvotes: 3,
            name: "Justus",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "All in all, i liked this lecture. The lecturer is very good, but demands i high level of concentration. The exam, however, is very difficult. Prepare yourselves well!!",
            overall: 1,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Markus",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "Very good. Interesting and not too hard.",
            overall: 4,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    }, {
        name: "Produktergonomie",
        overall: 3.0,
        average: 2.2,
        lecturerperformance: 2.2,
        effort: 2.0,
        testdifficulty: 2.2,
        addvalue: 1.0,
        type: "seminar",
        faculty: "Mechanical Engineering", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: false,
        num: 13,
        programs: ["Ergonomie HFE", "HFE"],
        rating: [{
            upvotes: 3,
            name: "Justus",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "All in all, i liked this lecture. The lecturer is very good, but demands i high level of concentration. The exam, however, is very difficult. Prepare yourselves well!!",
            overall: 5,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Markus",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "Very good. Interesting and not too hard.",
            overall: 3,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    },
    {
        name: "RAMSIS Praktikum",
        overall: 3.0,
        average: 2.2,
        lecturerperformance: 2.2,
        effort: 2.0,
        testdifficulty: 2.2,
        addvalue: 1.0,
        type: "seminar",
        faculty: "Mechanical Engineering", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: false,
        num: 14,
        programs: ["Ergonomie HFE", "HFE"],
        rating: [{
            upvotes: 3,
            name: "Justus",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "All in all, i liked this lecture. The lecturer is very good, but demands i high level of concentration. The exam, however, is very difficult. Prepare yourselves well!!",
            overall: 3,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Markus",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "Very good. Interesting and not too hard.",
            overall: 5,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    }, {
        name: "Software Ergonomie",
        overall: 3.0,
        average: 2.2,
        lecturerperformance: 2.2,
        effort: 2.0,
        testdifficulty: 2.2,
        addvalue: 1.0,
        type: "seminar",
        faculty: "Mechanical Engineering", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: false,
        num: 15,
        programs: ["Ergonomie HFE", "Informatics", "HFE"],
        rating: [{
            upvotes: 3,
            name: "Justus",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "All in all, i liked this lecture. The lecturer is very good, but demands i high level of concentration. The exam, however, is very difficult. Prepare yourselves well!!",
            overall: 1,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 1.0,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Markus",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "Very good. Interesting and not too hard.",
            overall: 1,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 1.0,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    }, {
        name: "Stochastik I",
        overall: 3.0,
        average: 2.2,
        lecturerperformance: 2.2,
        effort: 2.0,
        testdifficulty: 2.2,
        addvalue: 1.0,
        type: "seminar",
        faculty: "Mathematics", //added as a filter-option
        time: "Mondays, 12:15-13:45", //Steffen added weekday!
        location: "MW0350",
        lecturer: "Dr. Eberhard",
        ects: 3,
        tumonline: "some URL",
        starred: false,
        num: 16,
        programs: ["Informatics", "Mathematics", "HFE"],
        rating: [{
            upvotes: 3,
            name: "Justus",
            semester: "WS 16/17",
            studiengang: "TUM-BWL",
            comment: "All in all, i liked this lecture. The lecturer is very good, but demands i high level of concentration. The exam, however, is very difficult. Prepare yourselves well!!",
            overall: 4,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }, {
            upvotes: 23,
            name: "Markus",
            semester: "SS 17",
            studiengang: "HFE",
            comment: "Very good. Interesting and not too hard.",
            overall: 5,
            lecturer: 1,
            effort: 3,
            difficulty: 1,
            addValue: 2,
            averageGrade: 2.3,
            noAverage: false,
            url: "",
            earnedPoints: 4
        }]
    }
];





// Program List

var HfELehrveranstaltungen = [Lehrveranstaltungen[1], Lehrveranstaltungen[3], Lehrveranstaltungen[4], Lehrveranstaltungen[5], Lehrveranstaltungen[9], Lehrveranstaltungen[11], Lehrveranstaltungen[13], Lehrveranstaltungen[14], Lehrveranstaltungen[15]]; //LVs from array 'Lehrveranstaltungen' for PROGRAM-LV-List


//writes HFE-Lectures into respective Tab
function showProgram() {

    $('#HfEList').empty();

    for (i = 0; i < HfELehrveranstaltungen.length; i++) {
        if (HfELehrveranstaltungen[i].starred) {


            if (HfELehrveranstaltungen[i].overall <= 1.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-180"></i></span> <div class="item-title" onclick= "openDetailscreen(' + HfELehrveranstaltungen[i].num + ')">' + HfELehrveranstaltungen[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + HfELehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#HfEList');
            }
            if (HfELehrveranstaltungen[i].overall > 1.5 && HfELehrveranstaltungen[i].overall <= 2.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-225"></i></span> <div class="item-title" onclick= "openDetailscreen(' + HfELehrveranstaltungen[i].num + ')">' + HfELehrveranstaltungen[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + HfELehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#HfEList');
            }
            if (HfELehrveranstaltungen[i].overall > 2.5 && HfELehrveranstaltungen[i].overall <= 3.5) {

                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-270"></i></span> <div class="item-title" onclick= "openDetailscreen(' + HfELehrveranstaltungen[i].num + ')">' + HfELehrveranstaltungen[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + HfELehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#HfEList');
            }
            if (HfELehrveranstaltungen[i].overall > 3.5 && HfELehrveranstaltungen[i].overall <= 4.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-315"></i></span><div class="item-title" onclick= "openDetailscreen(' + HfELehrveranstaltungen[i].num + ')">' + HfELehrveranstaltungen[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + HfELehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#HfEList');
            }
            if (HfELehrveranstaltungen[i].overall > 4.5) {

                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-0"></i></span><div class="item-title" onclick= "openDetailscreen(' + HfELehrveranstaltungen[i].num + ')">' + HfELehrveranstaltungen[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + HfELehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#HfEList');
            }

        } else {



            if (HfELehrveranstaltungen[i].overall <= 1.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-180"></i></span><div class="item-title" onclick= "openDetailscreen(' + HfELehrveranstaltungen[i].num + ')">' + HfELehrveranstaltungen[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + HfELehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#HfEList');
            }
            if (HfELehrveranstaltungen[i].overall > 1.5 && HfELehrveranstaltungen[i].overall <= 2.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-225"></i></span><div class="item-title" onclick= "openDetailscreen(' + HfELehrveranstaltungen[i].num + ')">' + HfELehrveranstaltungen[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + HfELehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#HfEList');
            }
            if (HfELehrveranstaltungen[i].overall > 2.5 && HfELehrveranstaltungen[i].overall <= 3.5) {

                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-270"></i></span><div class="item-title" onclick= "openDetailscreen(' + HfELehrveranstaltungen[i].num + ')">' + HfELehrveranstaltungen[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + HfELehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#HfEList');
            }
            if (HfELehrveranstaltungen[i].overall > 3.5 && HfELehrveranstaltungen[i].overall <= 4.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-315"></i></span><div class="item-title" onclick= "openDetailscreen(' + HfELehrveranstaltungen[i].num + ')">' + HfELehrveranstaltungen[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + HfELehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#HfEList');
            }
            if (HfELehrveranstaltungen[i].overall > 4.5) {

                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-0"></i></span><div class="item-title" onclick= "openDetailscreen(' + HfELehrveranstaltungen[i].num + ')">' + HfELehrveranstaltungen[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + HfELehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#HfEList');
            }

        }
    }
}


// Faculty List for Faculty TAB


var selectedFaculty = "NA_Faculty";


// gets user input on chosen faculty
function getChosenFaculty() {

    var FacultySelectBox = document.getElementById("FacultySelectBox");
    selectedFaculty = FacultySelectBox.options[FacultySelectBox.selectedIndex].value;
}



function hideFacultylist() {
    $('#facultyResults').hide();
}


//writes lectures of chosen faculty into #facultyList. CAVEAT: Since there is only a limited number of objects in the Array 'Lehrveranstaltungen', only lectures for the faculties HFE, Informatics and Mathematics are displayed!

function writeIntoFacultyList() {


    $('#facultyList').empty();
    $('#facultyResults').show();

    if (selectedFaculty == "NA_Faculty") {
        $('#facultyResults').hide();
    }

    for (i = 0; i < Lehrveranstaltungen.length; i++) {
        if (Lehrveranstaltungen[i].faculty == selectedFaculty) {
            if (Lehrveranstaltungen[i].starred) {

                if (Lehrveranstaltungen[i].overall <= 1.5) {
                    $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-180"></i></span> <div class="item-title" onclick= "openDetailscreen(' + Lehrveranstaltungen[i].num + ')">' + Lehrveranstaltungen[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + Lehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#facultyList');
                }
                if (Lehrveranstaltungen[i].overall > 1.5 && Lehrveranstaltungen[i].overall <= 2.5) {
                    $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-225"></i></span> <div class="item-title" onclick= "openDetailscreen(' + Lehrveranstaltungen[i].num + ')">' + Lehrveranstaltungen[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + Lehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#facultyList');
                }
                if (Lehrveranstaltungen[i].overall > 2.5 && Lehrveranstaltungen[i].overall <= 3.5) {

                    $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-270"></i></span> <div class="item-title" onclick= "openDetailscreen(' + Lehrveranstaltungen[i].num + ')">' + Lehrveranstaltungen[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + Lehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#facultyList');
                }
                if (Lehrveranstaltungen[i].overall > 3.5 && Lehrveranstaltungen[i].overall <= 4.5) {
                    $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-315"></i></span><div class="item-title" onclick= "openDetailscreen(' + Lehrveranstaltungen[i].num + ')">' + Lehrveranstaltungen[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + Lehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#facultyList');
                }
                if (Lehrveranstaltungen[i].overall > 4.5) {

                    $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-0"></i></span><div class="item-title" onclick= "openDetailscreen(' + Lehrveranstaltungen[i].num + ')">' + Lehrveranstaltungen[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + Lehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#facultyList');
                }

            } else {



                if (Lehrveranstaltungen[i].overall <= 1.5) {
                    $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-180"></i></span><div class="item-title" onclick= "openDetailscreen(' + Lehrveranstaltungen[i].num + ')">' + Lehrveranstaltungen[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + Lehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#facultyList');
                }
                if (Lehrveranstaltungen[i].overall > 1.5 && Lehrveranstaltungen[i].overall <= 2.5) {
                    $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-225"></i></span><div class="item-title" onclick= "openDetailscreen(' + Lehrveranstaltungen[i].num + ')">' + Lehrveranstaltungen[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + Lehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#facultyList');
                }
                if (Lehrveranstaltungen[i].overall > 2.5 && Lehrveranstaltungen[i].overall <= 3.5) {

                    $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-270"></i></span><div class="item-title" onclick= "openDetailscreen(' + Lehrveranstaltungen[i].num + ')">' + Lehrveranstaltungen[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + Lehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#facultyList');
                }
                if (Lehrveranstaltungen[i].overall > 3.5 && Lehrveranstaltungen[i].overall <= 4.5) {
                    $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-315"></i></span><div class="item-title" onclick= "openDetailscreen(' + Lehrveranstaltungen[i].num + ')">' + Lehrveranstaltungen[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + Lehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#facultyList');
                }
                if (Lehrveranstaltungen[i].overall > 4.5) {

                    $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-0"></i></span><div class="item-title" onclick= "openDetailscreen(' + Lehrveranstaltungen[i].num + ')">' + Lehrveranstaltungen[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + Lehrveranstaltungen[i].num + ');"></i></div>').addClass('item-content').appendTo('#facultyList');
                }
            }

        }
    }
}


/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//                                                                          FAVORITES

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/





//author: Moritz
//Global Array for Favorite-Algorithm
var StarredFilteredList = [];
var originalNumber = [];

function listFavorites() {

    StarredFilteredList = [];
    $('#FavList').empty();


    for (var i = 0; i < Lehrveranstaltungen.length; i++) {
        if (Lehrveranstaltungen[i].starred) {

            StarredFilteredList.push(Lehrveranstaltungen[i]);
        }

    }
    if (StarredFilteredList.length == 0) {
        $('<li>').html('<div class="item-inner">You have no lectures marked as favorites yet. <br> Try clicking! <span><i class="fa fa-star-o right" onclick="newSearchFunction(); openSearchScreen();"></i></span></div>').addClass('item-content').appendTo('#FavList');

        $('#OverallFAVS').hide();

    } else {
        $('#OverallFAVS').show();

        for (i = 0; i < StarredFilteredList.length; i++) {



            if (StarredFilteredList[i].overall <= 1.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-180"></i></span> <div class="item-title" onclick= "openDetailscreen(' + StarredFilteredList[i].num + ')">' + StarredFilteredList[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + StarredFilteredList[i].num + ');"></i></div>').addClass('item-content').appendTo('#FavList');
            } else if (StarredFilteredList[i].overall > 1.5 && StarredFilteredList[i].overall <= 2.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-225"></i></span> <div class="item-title" onclick= "openDetailscreen(' + StarredFilteredList[i].num + ')">' + StarredFilteredList[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + StarredFilteredList[i].num + ');"></i></div>').addClass('item-content').appendTo('#FavList');
            } else if (StarredFilteredList[i].overall > 2.5 && StarredFilteredList[i].overall <= 3.5) {

                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-270"></i></span> <div class="item-title" onclick= "openDetailscreen(' + StarredFilteredList[i].num + ')">' + StarredFilteredList[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + StarredFilteredList[i].num + ');"></i></div>').addClass('item-content').appendTo('#FavList');
            } else if (StarredFilteredList[i].overall > 3.5 && StarredFilteredList[i].overall <= 4.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-315"></i></span><div class="item-title" onclick= "openDetailscreen(' + StarredFilteredList[i].num + ')">' + StarredFilteredList[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + StarredFilteredList[i].num + ');"></i></div>').addClass('item-content').appendTo('#FavList');
            } else if (StarredFilteredList[i].overall > 4.5) {

                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-0"></i></span><div class="item-title" onclick= "openDetailscreen(' + StarredFilteredList[i].num + ')">' + StarredFilteredList[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + StarredFilteredList[i].num + ');"></i></div>').addClass('item-content').appendTo('#FavList');
            }

        }
    }
}



//author: Moritz
function star(i) {

    Lehrveranstaltungen[i].starred = !(Lehrveranstaltungen[i].starred);
    multipleFilters();

    writeIntoFacultyList();
    showProgram();

    sort();
    listFavorites();
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//                                                                          FILTERING

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// Show and hide filter options on search-screen

var StatusFilterDisplay = 0;

function showHideFilters() {
    if (StatusFilterDisplay == 0) {
        $('#filters').show();
        $('#ApplyFiltersButton').show();
        $('#LVBlock').hide();
        $('#newSearchButton').hide();
        $('#nothingFoundDisplay').hide();
        StatusFilterDisplay = 1;
    } else {
        if (StatusFilterDisplay == 1) {
            closeFilters();
            StatusFilterDisplay = 0;
        }
    }

}

function closeFilters() {
    $('#filters').hide();
    $('#ApplyFiltersButton').hide();
    $('#LVBlock').show();
    StatusFilterDisplay = 0;
    $('#newSearchButton').show();

    //Hide and show checkIcon when filters are active
    if (number1 > 0 || number2 < 9 || number3 > 0 || selectedFaculty4Filter != "noFilter" || selectedProgram != "noProgram") {

        $('#checkIcon').show();

    } else {
        $('#checkIcon').hide();
    }
}





//Global Arrays for Multiple-Filter-Algorithm (order of arrays represents order in which lectures are filtered)


var LPfilteredList = [];
var AveragefilteredList = [];
var OverallfilteredList = [];
var FacultyfilteredList = [];
var ProgramfilteredList = [];


var FinallyFilteredArray = []; // = Array with final list of lectures to be displayed!



//Filters for single criteria


var filtersactive = 0; // gives number of currently activated filters


/*-----------------------------------------------------------------------Filter by lecturerPerformance------------------------------------------------------------------*/

var number1 = 0; // represents user' s choice 

function filteredByLP() {
    LPfilteredList = [];


    for (var i = 0; i < Lehrveranstaltungen.length; i++) {
        if (Lehrveranstaltungen[i].lecturerperformance >= number1) {
            LPfilteredList.push(Lehrveranstaltungen[i]);
        }
    }
}


/*Get filter value selected by user for LECTURER*/

function setNumber1(n) {
    number1 = n;

    if (n == 4.5) {
        $('#LP15').show();
        $('#LP25,#LP35,#LP45,#LP5,#LP_NA').hide();
        $('#LPTitle').html('<span class="mindSymbol">&ge; 4.5</span><i class="fa fa-circle rotate-0"></i>')
        $('#checkIcon').show();
    }
    if (n == 3.5) {
        $('#LP25').show();
        $('#LP15,#LP35,#LP45,#LP5,#LP_NA').hide();
        $('#LPTitle').html('<span class="mindSymbol">&ge; 3.5</span><i class="fa fa-circle rotate-315"></i>')
        $('#checkIcon').show();
    }
    if (n == 2.5) {
        $('#LP35').show();
        $('#LP25,#LP15,#LP45,#LP5,#LP_NA').hide();
        $('#LPTitle').html('<span class="mindSymbol">&ge; 2.5</span><i class="fa fa-circle rotate-270"></i>')
        $('#checkIcon').show();
    }
    if (n == 1.5) {
        $('#LP45').show();
        $('#LP25,#LP35,#LP15,#LP5,#LP_NA').hide();
        $('#LPTitle').html('<span class="mindSymbol">&ge; 1.5</span><i class="fa fa-circle rotate-225"></i>')
        $('#checkIcon').show();
    }
    /*if (n == 1.5) {
        $('#LP5').show();
        $('#LP25,#LP35,#LP45,#LP15,#LP_NA').hide();
        $('#LPTitle').html('<span class="mindSymbol">&ge; 1.5</span><i class="f7-icons rotate-180 resultingFilterArrow">arrow_up</i>')
        $('#checkIcon').show();
    }*/
    if (n == 0) {
        $('#LP_NA').show();
        $('#LP5,#LP25,#LP35,#LP45,#LP15').hide();
        $('#LPTitle').html('<i class="NA_FilterDefault">N/A</i>');
        if (number2 == 9 && number3 == 0 && selectedFaculty4Filter == "noFilter" && selectedProgram == "noProgram") {
            $('#checkIcon').hide();
        }
    }
}

/*Get filter value selected by user for lecturer performance*/

function giveValue() {

    var LPfilter = 0;

    $('#mySelect_LP').on('change', function () {

        number1 = parseInt($(this).val());

    });

}


/*-----------------------------------------------------------------Filter by average-----------------------------------------------------------------------------*/

var number2 = 9; // represents user' s choice 

function setNumber2(n) {
    number2 = n;

    if (n == 1.5) {
        $('#AV15').show();
        $('#AV20,#AV25,#AV30,#AV35,#AV_NA').hide();
        $('#averageTitle').html('<span class="maxSymbol">&le; 1.5</span>')
        $('#checkIcon').show();
    }
    if (n == 2) {
        $('#AV20').show();
        $('#AV15,#AV25,#AV30,#AV35,#AV_NA').hide();
        $('#averageTitle').html('<span class="maxSymbol">&le; 2.0</span>')
        $('#checkIcon').show();
    }
    if (n == 2.5) {
        $('#AV25').show();
        $('#AV15,#AV20,#AV30,#AV35,#AV_NA').hide();
        $('#averageTitle').html('<span class="maxSymbol">&le; 2.5</span>')
        $('#checkIcon').show();
    }
    if (n == 3) {
        $('#AV30').show();
        $('#AV20,#AV25,#AV15,#AV35,#AV_NA').hide();
        $('#averageTitle').html('<span class="maxSymbol">&le; 3.0</span>')
        $('#checkIcon').show();
    }
    if (n == 3.5) {
        $('#AV35').show();
        $('#AV20,#AV25,#AV15,#AV30,#AV_NA').hide();
        $('#averageTitle').html('<span class="maxSymbol">&le; 3.5</span>')
        $('#checkIcon').show();
    }
    if (n == 9) {
        $('#AV_NA').show();
        $('#AV15,#AV20,#AV25,#AV30,#AV35').hide();
        $('#averageTitle').html('<i class="NA_FilterDefault">N/A</i>');
        if (number1 == 0 && number3 == 0 && selectedFaculty4Filter == "noFilter" && selectedProgram == "noProgram") {
            $('#checkIcon').hide();
        }
    }
}


function filteredByAverage() {

    AveragefilteredList = [];



    for (var i = 0; i < LPfilteredList.length; i++) {
        if (LPfilteredList[i].average <= number2) {
            AveragefilteredList.push(LPfilteredList[i]);

        }
    }
}


/*Get filter value selected by user for last year' s TEST AVERGAE*/


function giveValue2() {

    $('#mySelect_Average').on('change', function () {
        number2 = parseInt($(this).val());



    });

}



/*-------------------------------------------------------------------------Filter by Overall Rating----------------------------------------------------------*/

var number3 = 0; // represents user' s choice 

function setNumber3(n) {

    number3 = n;

    if (n == 4.5) {
        $('#Overall15').show();
        $('#Overall25,#Overall35,#Overall45,#Overall5,#overall_NA').hide();
        $('#overallTitle').html('<span class="mindSymbol">&ge; 4.5</span><i class="fa fa-circle rotate-0"></i>')
        $('#checkIcon').show();
    }
    if (n == 3.5) {
        $('#Overall25').show();
        $('#Overall15,#Overall35,#Overall45,#Overall5,#overall_NA').hide();
        $('#overallTitle').html('<span class="mindSymbol">&ge; 3.5</span><i class="fa fa-circle rotate-315"></i>')
        $('#checkIcon').show();
    }
    if (n == 2.5) {
        $('#Overall35').show();
        $('#Overall25,#Overall15,#Overall45,#Overall5,#overall_NA').hide();
        $('#overallTitle').html('<span class="mindSymbol">&ge; 2.5</span><i class="fa fa-circle rotate-270"></i>')
        $('#checkIcon').show();
    }
    if (n == 1.5) {
        $('#Overall45').show();
        $('#Overall25,#Overall35,#Overall15,#Overall5,#overall_NA').hide();
        $('#overallTitle').html('<span class="mindSymbol">&ge; 1.5</span><i class="fa fa-circle rotate-225"></i>')
        $('#checkIcon').show();
    }
    /*if (n == 1.5) {
        $('#Overall5').show();
        $('#Overall25,#Overall35,#Overall45,#Overall15,#overall_NA').hide();
        $('#overallTitle').html('<span class="mindSymbol">&ge; 1.5</span><i class="f7-icons rotate-180 resultingFilterArrow">arrow_up</i>')
        $('#checkIcon').show();
    }*/
    if (n == 0) {
        $('#overall_NA').show();
        $('#Overall5,#Overall25,#Overall35,#Overall45,#Overall15').hide();
        $('#overallTitle').html('<i class="NA_FilterDefault">N/A</i>');
        if (number1 == 0 && number2 == 9 && selectedFaculty4Filter == "noFilter" && selectedProgram == "noProgram") {
            $('#checkIcon').hide();
        }
    }
}


function filteredByOverall() {

    OverallfilteredList = [];


    for (var i = 0; i < AveragefilteredList.length; i++) {
        if (AveragefilteredList[i].overall >= number3) {
            OverallfilteredList.push(AveragefilteredList[i]);

        }
    }
}


/*Get filter value selected by user for Overall Rating*/

function giveValue3() { // http://stackoverflow.com/questions/5749597/jquery-select-option-click-handler



    $('#mySelect_Overall').on('change', function () {
        number3 = parseInt($(this).val());

    });

}


/*---------------------------------------------------------------Filter by Faculty---------------------------------------------------------------------------------------------------------*/

var selectedFaculty4Filter = "noFilter"; //represents user' s choice


// gets user input on chosen faculty
function getChosenFaculty4Filter(faculty) {


    switch (faculty) {

    case 2:
        selectedFaculty4Filter = "Informatics";
        $('#FacTitle').html('Informatics');
        $('#checkIcon,#InfoTitle').show();
        $('#ARTitle,#MathTitle,#MECHETitle,#NA_FAC').hide();
        break;
    case 3:
        selectedFaculty4Filter = "Mathematics";
        $('#FacTitle').html('Mathematics');
        $('#checkIcon,#MathTitle').show();
        $('#ARTitle,#InfoTitle,#MECHETitle,#NA_FAC').hide();
        break;
    case 4:
        selectedFaculty4Filter = "HFE";
        $('#FacTitle').html('Mech. Engineering');
        $('#checkIcon,#MECHETitle').show();
        $('#ARTitle,#MathTitle,#InfoTitle,#NA_FAC').hide();
        break;
    case 5:
        selectedFaculty4Filter = "noFilter";
        $('#FacTitle').html('N/A');
        $('#NA_FAC').show();
        $('#ARTitle,#MathTitle,#MECHETitle,#InfoTitle').hide();
        if (number1 == 0 && number2 == 9 && number3 == 0 && selectedProgram == "noProgram") {
            $('#checkIcon').hide();
        }
        break;
    }


}



function filteredByFaculty() {

    FacultyfilteredList = [];

    if (selectedFaculty4Filter == "noFilter") {

        for (var i = 0; i < OverallfilteredList.length; i++) {
            FacultyfilteredList.push(OverallfilteredList[i]);
        }

    } else {
        for (var i = 0; i < OverallfilteredList.length; i++) {

            if (OverallfilteredList[i].faculty == selectedFaculty4Filter) {
                FacultyfilteredList.push(OverallfilteredList[i]);

            }
        }
    }

}

/*--------------------------------------------------------------------------------Filter by Program----------------------------------------------------------------------------------------*/

var selectedProgram = "noProgram";

function getProgram(program) {

    switch (program) {
    case 1:
        selectedProgram = "Ergonomie HFE";
        $('#ProgTitle').html('Ergonomie HFE');
        $('#checkIcon,#HFETitle').show();
        $('#MECHEPTitle,#MathPTitle,#INFOTitle,#P_NA').hide();
        break;
    case 2:
        selectedProgram = "Informatics";
        $('#ProgTitle').html('Informatics');
        $('#checkIcon,#INFOTitle').show();
        $('#MECHEPTitle,#MathPTitle,#P_NA,#HFETitle').hide();
        break;
    case 3:
        selectedProgram = "Mathematics";
        $('#ProgTitle').html('Mathematics');
        $('#checkIcon,#MathPTitle').show();
        $('#MECHEPTitle,#P_NA,#INFOTitle,#HFETitle').hide();
        break;
    case 4:
        selectedProgram = "HFE";
        $('#ProgTitle').html('Mech. Engineering');
        $('#checkIcon,#MECHEPTitle').show();
        $('#P_NA,#MathPTitle,#INFOTitle,#HFETitle').hide();
        break;
    case 5:
        selectedProgram = "noProgram";
        $('#ProgTitle').html('N/A');
        $('#checkIcon,#P_NA').show();
        $('#MECHEPTitle,#MathPTitle,#INFOTitle,#HFETitle').hide();
        if (number1 == 0 && number2 == 9 && number3 == 0 && selectedFaculty4Filter == "noFilter") {
            $('#checkIcon').hide();
        }
        break;
    }
}


function filteredByProgram() {

    ProgramfilteredList = [];

    if (selectedProgram == "noProgram") {

        for (var i = 0; i < FacultyfilteredList.length; i++) {
            ProgramfilteredList.push(FacultyfilteredList[i]);
        }

    } else {
        for (var i = 0; i < FacultyfilteredList.length; i++) {

            for (var j = 0; j < FacultyfilteredList[i].programs.length; j++)

                if (FacultyfilteredList[i].programs[j] == selectedProgram) {
                ProgramfilteredList.push(FacultyfilteredList[i]);

            }
        }
    }

}


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


//Multiple Filter Function (Calls all single Filters in a row. Each single filter places filtered lectures in a new array, which will be scanned in next filter step)

function multipleFilters() {

    FinallyFilteredArray = [];

    $('#LVList').empty();

    // Call single filters in a row

    filteredByLP();
    filteredByAverage();
    filteredByOverall();
    filteredByFaculty();
    filteredByProgram();

    writeIntoFinallyFilteredArray(); //writes filtered LVs into one final array which is displayed!

}


//writes filtered LVs into one final array which is displayed!
function writeIntoFinallyFilteredArray() {
    for (i = 0; i < ProgramfilteredList.length; i++) {
        FinallyFilteredArray[i] = ProgramfilteredList[i];
    }
}



function deleteFilters() {
    $('#checkIcon').hide();
    setNumber1(0);
    setNumber2(9);
    setNumber3(0);
    getChosenFaculty4Filter(5);
    getProgram(5);

}

function showPanel(panel) {

    var mySwipablePanel = new Framework7({
        swipePanelOnlyClose: 'true'
    });

    switch (panel) {
    case 1:
        $('#sortingPanel').show();
        $('#OverallPanel,#AVGPanel,#LCPanel,#FacultyPanel,#ProgramPanel').hide();
        break;
    case 2:
        $('#OverallPanel').show();
        $('#ProgramPanel,#AVGPanel,#LCPanel,#sortingPanel,#FacultyPanel').hide();
        break;
    case 3:
        $('#LCPanel').show();
        $('#OverallPanel,#AVGPanel,#ProgramPanel,#sortingPanel,#FacultyPanel').hide();
        break;
    case 4:
        $('#AVGPanel').show();
        $('#OverallPanel,#ProgramPanel,#LCPanel,#sortingPanel,#FacultyPanel').hide();
        break;
    case 5:
        $('#FacultyPanel').show();
        $('#OverallPanel,#AVGPanel,#LCPanel,#sortingPanel,#ProgramPanel').hide();
        break;
    case 6:
        $('#ProgramPanel').show();
        $('#OverallPanel,#AVGPanel,#LCPanel,#sortingPanel,#FacultyPanel').hide();
        break;

    }
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//                                                                          SORTING

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/



//Global variable that stores info on how courses are currently filtered. Info required to maintain sorting after cancelling one or multiple filter criteria
// = 1 if sorted by name
// = 2 if sorted by LP
// = 3 if sorted by average
// = 4 if sorted by overall

var currentSortingCriterium = 1;

function sort() {

    //when Apply-Filters-Button is clicked, switch-Case decides - based upon value of var chooseSortedArray - according to which criterium entries were sorted before.
    // if filters were changed, the switch-case makes sure that the sorting remains

    switch (currentSortingCriterium) {
    case 1:
        sortByName();
        break;
    case 2:
        sortByLP();
        break;
    case 3:
        sortByAverage();
        break;
    case 4:
        sortByOverall();
        break;
    case 5:
        sortByValueAttend();
        break;
    }
}


// sort by overall

function sortByOverall() {

    resultsNewSearch.sort(function (a, b) { //CAVEAT!! the .sort() function has a bug in Chrome but works perfectly well in Safari!
        if (a.overall < b.overall) {
            return 1;
        }
        if (a.overall > b.overall) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    writeIntoLvList();



    $('.sortingIcon').html('Overall <i class="fa fa-sort color-blue" aria-hidden="true"></i>');

    currentSortingCriterium = 4;


}



// sort by Lecturer 

function sortByLP() {

    resultsNewSearch.sort(function (a, b) { //CAVEAT!! the .sort() function has a bug in Chrome but works perfectly well in Safari!
        if (a.lecturerperformance < b.lecturerperformance) {
            return 1;
        }
        if (a.lecturerperformance > b.lecturerperformance) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    writeIntoLvList();



    $('.sortingIcon').html('Lecturer <i class="fa fa-sort color-blue" aria-hidden="true"></i>');

    currentSortingCriterium = 2;
}


// sort by Value of Attendance 

function sortByValueAttend() {

    resultsNewSearch.sort(function (a, b) { //CAVEAT!! the .sort() function has a bug in Chrome but works perfectly well in Safari!
        if (a.addvalue < b.addvalue) {
            return 1;
        }
        if (a.addvalue > b.addvalue) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    writeIntoLvList();

    $('.sortingIcon').html('Value of Attendance <i class="fa fa-sort color-blue" aria-hidden="true"></i>');

    currentSortingCriterium = 5;
}



// sort by average

function sortByAverage() {

    resultsNewSearch.sort(function (a, b) { //CAVEAT!! the .sort() function has a bug in Chrome but works perfectly well in Safari!
        if (a.average > b.average) {
            return 1;
        }
        if (a.average < b.average) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    writeIntoLvList();



    $('.sortingIcon').html('Exam Average <i class="fa fa-sort color-blue" aria-hidden="true"></i>');

    currentSortingCriterium = 3;


}


// sort by name

function sortByName() {

    resultsNewSearch.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });

    writeIntoLvList();


    $('.sortingIcon').html('Alphabetically <i class="fa fa-sort color-blue" aria-hidden="true"></i>');

    currentSortingCriterium = 1;
}



//write into #LVList

function writeIntoLvList() {
    $('#LVList').empty();

    for (i = 0; i < resultsNewSearch.length; i++) {
        if (resultsNewSearch[i].starred) {

            if (resultsNewSearch[i].overall <= 1.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-180"></i></span> <div class="item-title" onclick= "openDetailscreen(' + resultsNewSearch[i].num + ')">' + resultsNewSearch[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + resultsNewSearch[i].num + ');"></i></div>').addClass('item-content').appendTo('#LVList');
            }
            if (resultsNewSearch[i].overall > 1.5 && resultsNewSearch[i].overall <= 2.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-225"></i></span> <div class="item-title" onclick= "openDetailscreen(' + resultsNewSearch[i].num + ')">' + resultsNewSearch[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + resultsNewSearch[i].num + ');"></i></div>').addClass('item-content').appendTo('#LVList');
            }
            if (resultsNewSearch[i].overall > 2.5 && resultsNewSearch[i].overall <= 3.5) {

                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-270"></i></span> <div class="item-title" onclick= "openDetailscreen(' + resultsNewSearch[i].num + ')">' + resultsNewSearch[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + resultsNewSearch[i].num + ');"></i></div>').addClass('item-content').appendTo('#LVList');
            }
            if (resultsNewSearch[i].overall > 3.5 && resultsNewSearch[i].overall <= 4.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-315"></i></span><div class="item-title" onclick= "openDetailscreen(' + resultsNewSearch[i].num + ')">' + resultsNewSearch[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + resultsNewSearch[i].num + ');"></i></div>').addClass('item-content').appendTo('#LVList');
            }
            if (resultsNewSearch[i].overall > 4.5) {

                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-0"></i></span><div class="item-title" onclick= "openDetailscreen(' + resultsNewSearch[i].num + ')">' + resultsNewSearch[i].name + '</div><i class="fa fa-star right starred"  onclick="star(' + resultsNewSearch[i].num + ');"></i></div>').addClass('item-content').appendTo('#LVList');
            }

        } else {



            if (resultsNewSearch[i].overall <= 1.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-180"></i></span><div class="item-title" onclick= "openDetailscreen(' + resultsNewSearch[i].num + ')">' + resultsNewSearch[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + resultsNewSearch[i].num + ');"></i></div>').addClass('item-content').appendTo('#LVList');
            }
            if (resultsNewSearch[i].overall > 1.5 && resultsNewSearch[i].overall <= 2.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-225"></i></span><div class="item-title" onclick= "openDetailscreen(' + resultsNewSearch[i].num + ')">' + resultsNewSearch[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + resultsNewSearch[i].num + ');"></i></div>').addClass('item-content').appendTo('#LVList');
            }
            if (resultsNewSearch[i].overall > 2.5 && resultsNewSearch[i].overall <= 3.5) {

                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-270"></i></span><div class="item-title" onclick= "openDetailscreen(' + resultsNewSearch[i].num + ')">' + resultsNewSearch[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + resultsNewSearch[i].num + ');"></i></div>').addClass('item-content').appendTo('#LVList');
            }
            if (resultsNewSearch[i].overall > 3.5 && resultsNewSearch[i].overall <= 4.5) {
                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-315"></i></span><div class="item-title" onclick= "openDetailscreen(' + resultsNewSearch[i].num + ')">' + resultsNewSearch[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + resultsNewSearch[i].num + ');"></i></div>').addClass('item-content').appendTo('#LVList');
            }
            if (resultsNewSearch[i].overall > 4.5) {

                $('<li>').html('<div class="item-inner"><span class="arrow leftArrow"><i class="fa fa-circle rotate-0"></i></span><div class="item-title" onclick= "openDetailscreen(' + resultsNewSearch[i].num + ')">' + resultsNewSearch[i].name + '</div><i class="fa fa-star-o right"  onclick="star(' + resultsNewSearch[i].num + ');"></i></div>').addClass('item-content').appendTo('#LVList');
            }
        }
    }
}

/*--------------------------------------------------------------------------------------------------------------------------------------------*/

//                                                          DETAILSCREEN / COMMENTSCREEN

/*--------------------------------------------------------------------------------------------------------------------------------------------*/


//open Detailscreen function for a certain lecture

//author: Moritz

// in activeLV we store the lecture number in the Lehrveranstaltungen array of the LV of which we are currently viewing the Detailscreen.
//needed to to tell the writeComment function where to store the comment and the back-chevron to know where to go back to.
var activeLV = 0;

function openDetailscreen(i) {

    activeLV = i;
    //function switchtoDetailscreen() takes over the show and hide part of switching the screen

    switchtoDetailscreen();



    //deletes old comments that are left over from other LVs
    $('#commentContainer').empty();

    //writes LV-title in App-Bar
    $('#TitleText').html(Lehrveranstaltungen[i].name);

    //writes general information of the lecture into the html
    $('#overallRating').html(Lehrveranstaltungen[i].overall.toPrecision(2));
    $('#lecturerPerformance').html(Lehrveranstaltungen[i].lecturerperformance.toPrecision(2));
    $('#demandedEffort').html(Lehrveranstaltungen[i].effort.toPrecision(2));
    $('#examDifficulty').html(Lehrveranstaltungen[i].testdifficulty.toPrecision(2));
    $('#lastExamAverage').html(Lehrveranstaltungen[i].average.toPrecision(2));
    $('#lectureTime').html(Lehrveranstaltungen[i].time);
    $('#lectureLocation').html(Lehrveranstaltungen[i].location);
    $('#lectureLecturer').html(Lehrveranstaltungen[i].lecturer);
    $('#lectureEcts').html(Lehrveranstaltungen[i].ects);
    $('#lectureUrl').html(Lehrveranstaltungen[i].tumonline);
    $('#additionalValueOfAttendance').html(Lehrveranstaltungen[i].addvalue.toPrecision(2));

    if (Lehrveranstaltungen[i].overall <= 1.5) {
        $("#DetailOverall").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-180");
    }
    if (Lehrveranstaltungen[i].overall > 1.5 && Lehrveranstaltungen[i].overall <= 2.5) {
        $("#DetailOverall").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-225");
    }
    if (Lehrveranstaltungen[i].overall > 2.5 && Lehrveranstaltungen[i].overall <= 3.5) {
        $("#DetailOverall").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-270");
    }
    if (Lehrveranstaltungen[i].overall > 3.5 && Lehrveranstaltungen[i].overall <= 4.5) {
        $("#DetailOverall").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-315");
    }
    if (Lehrveranstaltungen[i].overall > 4.5) {
        $("#DetailOverall").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-0");
    }

    if (Lehrveranstaltungen[i].lecturerperformance <= 1.5) {
        $("#DetailLecturer").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-180");
    }
    if (Lehrveranstaltungen[i].lecturerperformance > 1.5 && Lehrveranstaltungen[i].lecturerperformance <= 2.5) {
        $("#DetailLecturer").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-225");
    }
    if (Lehrveranstaltungen[i].lecturerperformance > 2.5 && Lehrveranstaltungen[i].lecturerperformance <= 3.5) {
        $("#DetailLecturer").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-270");
    }
    if (Lehrveranstaltungen[i].lecturerperformance > 3.5 && Lehrveranstaltungen[i].lecturerperformance <= 4.5) {
        $("#DetailLecturer").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-315");
    }
    if (Lehrveranstaltungen[i].lecturerperformance > 4.5) {
        $("#DetailLecturer").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-0");
    }

    if (Lehrveranstaltungen[i].effort <= 1.5) {
        $("#DetailEffort").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-180");
    }
    if (Lehrveranstaltungen[i].effort > 1.5 && Lehrveranstaltungen[i].effort <= 2.5) {
        $("#DetailEffort").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-225");
    }
    if (Lehrveranstaltungen[i].effort > 2.5 && Lehrveranstaltungen[i].effort <= 3.5) {
        $("#DetailEffort").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-270");
    }
    if (Lehrveranstaltungen[i].effort > 3.5 && Lehrveranstaltungen[i].effort <= 4.5) {
        $("#DetailEffort").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-315");
    }
    if (Lehrveranstaltungen[i].effort > 4.5) {
        $("#DetailEffort").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-0");
    }

    if (Lehrveranstaltungen[i].testdifficulty > 4.5) {
        $("#DetailDifficulty").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-0");
    }
    if (Lehrveranstaltungen[i].testdifficulty > 3.5 && Lehrveranstaltungen[i].testdifficulty <= 4.5) {
        $("#DetailDifficulty").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-315");
    }
    if (Lehrveranstaltungen[i].testdifficulty > 2.5 && Lehrveranstaltungen[i].testdifficulty <= 3.5) {
        $("#DetailDifficulty").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-270");
    }
    if (Lehrveranstaltungen[i].testdifficulty > 1.5 && Lehrveranstaltungen[i].testdifficulty <= 2.5) {
        $("#DetailDifficulty").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-225");
    }
    if (Lehrveranstaltungen[i].testdifficulty <= 1.5) {
        $("#DetailDifficulty").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-180");
    }

    if (Lehrveranstaltungen[i].average <= 1.5) {
        $("#DetailExamAverage").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-180");
    }
    if (Lehrveranstaltungen[i].average > 1.5 && Lehrveranstaltungen[i].average <= 2) {
        $("#DetailExamAverage").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-225");
    }
    if (Lehrveranstaltungen[i].average > 2 && Lehrveranstaltungen[i].average <= 3) {
        $("#DetailExamAverage").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-270");
    }
    if (Lehrveranstaltungen[i].average > 3 && Lehrveranstaltungen[i].average <= 4) {
        $("#DetailExamAverage").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-315");
    }
    if (Lehrveranstaltungen[i].average > 4) {
        $("#DetailExamAverage").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-0");
    }
    if (Lehrveranstaltungen[i].addvalue <= 1.5) {
        $("#DetailAdditionalValue").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-180");
    }
    if (Lehrveranstaltungen[i].addvalue > 1.5 && Lehrveranstaltungen[i].addvalue <= 2.5) {
        $("#DetailAdditionalValue").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-225");
    }
    if (Lehrveranstaltungen[i].addvalue > 2.5 && Lehrveranstaltungen[i].addvalue <= 3.5) {
        $("#DetailAdditionalValue").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-270");
    }
    if (Lehrveranstaltungen[i].addvalue > 3.5 && Lehrveranstaltungen[i].addvalue <= 4.5) {
        $("#DetailAdditionalValue").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-315");
    }
    if (Lehrveranstaltungen[i].addvalue > 4.5) {
        $("#DetailAdditionalValue").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("rotate-0");
    }






    //writes comments from the rating objects inside the Lehrveranstaltungen-object in a div and appends them to the comment Container

    //for every existing comment/rating in a LV; writes newest comment on top


    for (f = Lehrveranstaltungen[i].rating.length - 1; f > -1; f--) {
        if (Lehrveranstaltungen[i].rating[f].comment != '') {

            $('<div>').html('<div class="row no-gutter"><div class="col-10">' + Lehrveranstaltungen[i].rating[f].upvotes + '</div><div class="col-10" onclick="upvote(' + f + ')"><i class="fa fa-chevron-up shadowed" aria-hidden="true"></i></div><div class="col-20">' + Lehrveranstaltungen[i].rating[f].name + '</div><div class="col-25">' + Lehrveranstaltungen[i].rating[f].semester + '</div><div class="col-35">' + Lehrveranstaltungen[i].rating[f].studiengang + '</div></div>').addClass('content-block metaInformation').appendTo('#commentContainer');

            $('<div>').html('<div class="content-block-inner open-popup"><a class="item-content item-link open-popup" style="padding-left: 0px;" onclick= "CommentDetails(' + f + ')"> <div>' + Lehrveranstaltungen[i].rating[f].comment + '</div></a></div>').addClass('content-block inset').css('margin', '1px 0px 20px 0px').appendTo('#commentContainer');
        } else continue;

    }
}



function CommentDetails(f) {

    $('#commentDetailContainer').empty();

    $('#CommentDetailTitle').html(Lehrveranstaltungen[activeLV].rating[f].name);
    $('#CommentDetailStudy').html(Lehrveranstaltungen[activeLV].rating[f].studiengang);
    $('#CommentDetailSemester').html(Lehrveranstaltungen[activeLV].rating[f].semester);


    if (Lehrveranstaltungen[activeLV].rating[f].overall != 9) {
        $('#CoverallRatingVal').html(Lehrveranstaltungen[activeLV].rating[f].overall);
    } else {
        $('#CoverallRatingVal').html("");
    }
    if (Lehrveranstaltungen[activeLV].rating[f].lecturer != 9) {
        $('#ClecturerPerformanceVal').html(Lehrveranstaltungen[activeLV].rating[f].lecturer);
    } else {
        $('#ClecturerPerformanceVal').html("");
    }
    if (Lehrveranstaltungen[activeLV].rating[f].addValue != 9) {
        $('#CadditionalValueOfAttendanceVal').html(Lehrveranstaltungen[activeLV].rating[f].addValue);
    } else {
        $('#CadditionalValueOfAttendanceVal').html("");
    }
    if (Lehrveranstaltungen[activeLV].rating[f].effort != 9) {
        $('#CdemandedEffortVal').html(Lehrveranstaltungen[activeLV].rating[f].effort);
    } else {
        $('#CdemandedEffortVal').html("");
    }
    if (Lehrveranstaltungen[activeLV].rating[f].difficulty != 9) {
        $('#CexamEasynessVal').html(Lehrveranstaltungen[activeLV].rating[f].difficulty);
    } else {
        $('#CexamEasynessVal').html("");
    }








    if (Lehrveranstaltungen[activeLV].rating[f].difficulty === 1) {
        $('#CexamEasyness').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CexamEasyness').addClass("veryBad");
    } else if (Lehrveranstaltungen[activeLV].rating[f].difficulty === 2) {
        $('#CexamEasyness').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CexamEasyness').addClass("bad");
    } else if (Lehrveranstaltungen[activeLV].rating[f].difficulty === 3) {
        $('#CexamEasyness').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CexamEasyness').addClass("neutral");
    } else if (Lehrveranstaltungen[activeLV].rating[f].difficulty === 4) {
        $('#CexamEasyness').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CexamEasyness').addClass("good");
    } else if (Lehrveranstaltungen[activeLV].rating[f].difficulty === 5) {
        $('#CexamEasyness').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CexamEasyness').addClass("veryGood");
    } else if (Lehrveranstaltungen[activeLV].rating[f].difficulty === 9) {
        $('#CexamEasyness').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CexamEasyness').addClass("greyTrafficlight");
    }


    if (Lehrveranstaltungen[activeLV].rating[f].overall === 1) {
        $('#CoverallRating').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CoverallRating').addClass("veryBad");
    } else if (Lehrveranstaltungen[activeLV].rating[f].overall === 2) {
        $('#CoverallRating').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CoverallRating').addClass("bad");
    } else if (Lehrveranstaltungen[activeLV].rating[f].overall === 3) {
        $('#CoverallRating').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CoverallRating').addClass("neutral");
    } else if (Lehrveranstaltungen[activeLV].rating[f].overall === 4) {
        $('#CoverallRating').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CoverallRating').addClass("good");
    } else if (Lehrveranstaltungen[activeLV].rating[f].overall === 5) {
        $('#CoverallRating').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CoverallRating').addClass("veryGood");
    } else if (Lehrveranstaltungen[activeLV].rating[f].overall === 9) {
        $('#CoverallRating').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CoverallRating').addClass("greyTrafficlight");
    }

    if (Lehrveranstaltungen[activeLV].rating[f].addValue === 1) {
        $('#CadditionalValueOfAttendance').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CadditionalValueOfAttendance').addClass("veryBad");
    } else if (Lehrveranstaltungen[activeLV].rating[f].addValue === 2) {
        $('#CadditionalValueOfAttendance').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CadditionalValueOfAttendance').addClass("bad");
    } else if (Lehrveranstaltungen[activeLV].rating[f].addValue === 3) {
        $('#CadditionalValueOfAttendance').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CadditionalValueOfAttendance').addClass("neutral");
    } else if (Lehrveranstaltungen[activeLV].rating[f].addValue === 4) {
        $('#CadditionalValueOfAttendance').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CadditionalValueOfAttendance').addClass("good");
    } else if (Lehrveranstaltungen[activeLV].rating[f].addValue === 5) {
        $('#CadditionalValueOfAttendance').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CadditionalValueOfAttendance').addClass("veryGood");
    } else if (Lehrveranstaltungen[activeLV].rating[f].addValue === 9) {
        $('#CadditionalValueOfAttendance').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CadditionalValueOfAttendance').addClass("greyTrafficlight");
    }
    if (Lehrveranstaltungen[activeLV].rating[f].effort === 1) {
        $('#CdemandedEffort').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CdemandedEffort').addClass("veryBad");
    } else if (Lehrveranstaltungen[activeLV].rating[f].effort === 2) {
        $('#CdemandedEffort').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CdemandedEffort').addClass("bad");
    } else if (Lehrveranstaltungen[activeLV].rating[f].effort === 3) {
        $('#CdemandedEffort').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CdemandedEffort').addClass("neutral");
    } else if (Lehrveranstaltungen[activeLV].rating[f].effort === 4) {
        $('#CdemandedEffort').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CdemandedEffort').addClass("good");
    } else if (Lehrveranstaltungen[activeLV].rating[f].effort === 5) {
        $('#CdemandedEffort').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CdemandedEffort').addClass("veryGood");
    } else if (Lehrveranstaltungen[activeLV].rating[f].effort === 9) {
        $('#CdemandedEffort').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#CdemandedEffort').addClass("greyTrafficlight");
    }
    if (Lehrveranstaltungen[activeLV].rating[f].lecturer === 1) {
        $('#ClecturerPerformance').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#ClecturerPerformance').addClass("veryBad");
    } else if (Lehrveranstaltungen[activeLV].rating[f].lecturer === 2) {
        $('#ClecturerPerformance').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#ClecturerPerformance').addClass("bad");
    } else if (Lehrveranstaltungen[activeLV].rating[f].lecturer === 3) {
        $('#ClecturerPerformance').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#ClecturerPerformance').addClass("neutral");
    } else if (Lehrveranstaltungen[activeLV].rating[f].lecturer === 4) {
        $('#ClecturerPerformance').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#ClecturerPerformance').addClass("good");
    } else if (Lehrveranstaltungen[activeLV].rating[f].lecturer === 5) {
        $('#ClecturerPerformance').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#ClecturerPerformance').addClass("veryGood");
    } else if (Lehrveranstaltungen[activeLV].rating[f].lecturer === 9) {
        $('#ClecturerPerformance').removeClass('veryBad bad neutral good veryGood greyTrafficlight');
        $('#ClecturerPerformance').addClass("greyTrafficlight");
    }

    if (Lehrveranstaltungen[activeLV].rating[f].noAverage) {
        $('#CommentAverage').hide();
    } else {
        $('#CommentAverage').show();
        $('#CaverageGrade').html(Lehrveranstaltungen[activeLV].rating[f].averageGrade);
    }





    $('<div>').html('<div class="noPadding">' + Lehrveranstaltungen[activeLV].rating[f].comment + '</div>').addClass('content-block').appendTo('#commentDetailContainer');


    $('#CreditHistoryPOP').hide();
    $('#averagePicker').hide();
    $('#CommentPopupContent').show();
}

function creditPOPUP() {
    $('#CommentPopupContent').hide();
    $('#CreditHistoryPOP').show();
    $('#averagePicker').hide();
    $('.whatCanIAfford').html('That is enough for ' + Math.floor(user.credit / 4) + ' more file-downloads!').addClass("currentCreditText");

}

function reportComment() {
    var myAlert = new Framework7();
    myAlert.alert('We will check this comment soon. Thanks for reporting!', 'Comment reported');
}



function upvote(f) {

    var myAlert = new Framework7();

    for (var i = 0; i < user.upvoted[activeLV].length; i++) {
        if (f != user.upvoted[activeLV][i]) {} else {
            myAlert.alert('You have already voted this comment up', 'Already voted');
            return;
        }
    }
    Lehrveranstaltungen[activeLV].rating[f].upvotes++;
    user.upvoted[activeLV].push(f);
    openDetailscreen(activeLV);
}



//COMMENTSCREEN

//global variables to store the temporary rating of a user before submitting
var overallRating = 9;
var lecturerPerformance = 9;
var demandedEffort = 9;
var testDifficulty = 9;
var additionalValue = 9;
var count = 0;
var clickedProgressbar = 0;


//function stores the user rating in the rating object inside the Lehrveranstalung object
//author: Moritz


function submitRating() {




    var myAlert = new Framework7();


    var rating = new Object();
    rating.upvotes = 0;
    rating.name = user.name;
    rating.semester = user.semester;
    rating.studiengang = user.studiengang;

    rating.overall = overallRating;
    rating.lecturer = lecturerPerformance;
    rating.effort = demandedEffort;
    rating.difficulty = testDifficulty;
    rating.addValue = additionalValue;

    count += clickedProgressbar;

    //checks if optional fields are filled in. if so the function counts the earned points and clears the input field.

    //gibt bisheriger Durchschnittsnote mehr Gewicht wenn kein Schnitt eingetragen
    if (userAverage === 0) {
        rating.averageGrade = 0;
        rating.noAverage = true;
    } else {


        rating.averageGrade = userAverage;

        count += 1;
    }
    if ($('#rateComment').val() == '') {} else {
        count += 2;
    }
    rating.comment = $('#rateComment').val();

    if (count < 1) {

        myAlert.alert('Please evaluate the lecture first', 'Unable to submit');
    } else {

        rating.earnedPoints = count;
        user.credit += count;
        resetRatings();


        clickedProgressbar = 0;



        d = new Date();

        var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];
        if (userAverage === 0 && $('#rateComment').val() === '') {


            $('<div>').html('<div class="timeline-item-date">' + d.getDate() + '<small> ' + monthNames[d.getMonth()] + '</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-time">' + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + '</div><div class="timeline-item-title">' + Lehrveranstaltungen[activeLV].name + '</div><div class="timeline-item-text">Quantitative Rating +' + 1 + '</div></div>').addClass('timeline-item').appendTo('#timelineContainer');
        }

        if (userAverage === 0 && $('#rateComment').val() != '') {


            $('<div>').html('<div class="timeline-item-date">' + d.getDate() + '<small> ' + monthNames[d.getMonth()] + '</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-time">' + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + '</div><div class="timeline-item-title">' + Lehrveranstaltungen[activeLV].name + '</div><div class="timeline-item-text">Quantitative Rating +' + 1 + '</div>' + '<div>Commented +' + 2 + '</div>').addClass('timeline-item').appendTo('#timelineContainer');
        }

        if (userAverage != 0 && $('#rateComment').val() === '') {


            $('<div>').html('<div class="timeline-item-date">' + d.getDate() + '<small> ' + monthNames[d.getMonth()] + '</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-time">' + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + '</div><div class="timeline-item-title">' + Lehrveranstaltungen[activeLV].name + '</div><div class="timeline-item-text">Quantitative Rating +' + 1 + '</div>' + '<div>Average Grade +' + 1 + '</div>').addClass('timeline-item').appendTo('#timelineContainer');
        }
        if ($('#rateComment').val() != '' && userAverage != 0) {


            $('<div>').html('<div class="timeline-item-date">' + d.getDate() + '<small> ' + monthNames[d.getMonth()] + '</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-time">' + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + '</div><div class="timeline-item-title">' + Lehrveranstaltungen[activeLV].name + '</div><div class="timeline-item-text">Quantitative Rating +' + 1 + '</div>' + '<div>Commented +' + 2 + '</div>' + '<div>Average Grade +' + 1 + '</div>').addClass('timeline-item').appendTo('#timelineContainer');
        }

        $('#rateAverageGrade').val('');
        $('#rateComment').val('');

        alreadySaidYes = 0;
        Lehrveranstaltungen[activeLV].rating.push(rating);
        calculateRatingAverage(activeLV);
        user.rated.push(Lehrveranstaltungen[activeLV].num);
        $('#averagePickerNA').prop('checked', true);
        userAverage = 0;

        openDetailscreen(activeLV);

        if (count == 1) {
            myAlert.alert('You earned ' + count + ' credit point', 'Rating submitted');
        } else {
            myAlert.alert('You earned ' + count + ' credit points', 'Rating submitted');
        }
        count = 0;

    }
}


function showAveragePicker() {
    $('#averagePicker').show();
    $('#CommentPopupContent').hide();
    $('#CreditHistoryPOP').hide();
}

// variable for calculating displayed value for test average on detail-screen
var userAverage = 0;

//Gets user input for exam average for further calculations
function getUserAverage(i) {


    $("#buttonAverageGrade").addClass("blue");
    userAverage = i;
    $('#rateAverageGrade').val(i);

    if (i == 0) {
        $("#buttonAverageGrade").removeClass("blue");
        $('#rateAverageGrade').val("N/A");
    }
    if (i == 1.0) {
        $('#rateAverageGrade').val("1.0");
    }
    if (i == 2.0) {
        $('#rateAverageGrade').val("2.0");
    }
    if (i == 3.0) {
        $('#rateAverageGrade').val("3.0");
    }
    if (i == 4.0) {
        $('#rateAverageGrade').val("4.0");
    }
    if (i == 5.0) {
        $('#rateAverageGrade').val("5.0");
    }
}


//calculates new parameters on window onload
function loadRatingValues() {


    for (i = 0; i < Lehrveranstaltungen.length; i++) {
        calculateRatingAverage(i);
    }

}


//author Moritz
//calculates parameters of the lecture objects

function calculateRatingAverage(LV) {

    var c = 0;
    var d = 0;
    var e = 0;
    var f = 0;
    var g = 0;

    var cCount = 0;
    var dCount = 0;
    var eCount = 0;
    var fCount = 0;
    var gCount = 0;

    for (i = 0; i < Lehrveranstaltungen[LV].rating.length; i++) {
        if (Lehrveranstaltungen[LV].rating[i].overall != 9) {
            c += Lehrveranstaltungen[LV].rating[i].overall;
            cCount++;
        }
        if (Lehrveranstaltungen[LV].rating[i].lecturer != 9) {
            d += Lehrveranstaltungen[LV].rating[i].lecturer;
            dCount++;
        }
        if (Lehrveranstaltungen[LV].rating[i].effort != 9) {
            e += Lehrveranstaltungen[LV].rating[i].effort;

            eCount++;
        }
        if (Lehrveranstaltungen[LV].rating[i].difficulty != 9) {
            f += Lehrveranstaltungen[LV].rating[i].difficulty;

            fCount++;
        }
        if (Lehrveranstaltungen[LV].rating[i].addValue != 9) {
            g += Lehrveranstaltungen[LV].rating[i].addValue;

            gCount++;
        }

    }
    Lehrveranstaltungen[LV].overall = c / cCount;
    Lehrveranstaltungen[LV].lecturerperformance = d / dCount;
    Lehrveranstaltungen[LV].effort = e / eCount;
    Lehrveranstaltungen[LV].testdifficulty = f / fCount;
    Lehrveranstaltungen[LV].addvalue = g / gCount;


    //average grade is calculated differently as we use the modal value
    //here we store all average grade values that are different from 0 in an array
    var AVG = [];
    for (var i = 0; i < Lehrveranstaltungen[LV].rating.length; i++) {
        if (Lehrveranstaltungen[LV].rating[i].averageGrade != 0) {
            AVG.push(Lehrveranstaltungen[LV].rating[i].averageGrade);
        }

    }
    Lehrveranstaltungen[LV].average = mode(AVG);

}


//function is used to calculate a modal value of an array. in our case used for the average grade
function mode(array) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
        if (arr[i] === undefined) {
            arr[i] = 0;
        }
        for (var y = 0; y < array.length; y++) {

            if (array[i] === array[y] && i != y) {

                arr[i] += 1;
            }
        }
    }

    var modus = 0;
    var index = 0;
    for (var i = 0; i < arr.length; i++) {
        if (modus < arr[i]) {
            modus = arr[i];
            index = i;

        }
    }

    return array[index];
}

//reset comment screen ratings
function resetRatings() {

    //reset traffic light
    $("#ratingOverall, #ratingLP, #ratingDE, #ratingAV, #ratingED").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180").addClass("greyTrafficlight");


    //Annika: resetting the progressbar 

    $('#five1, #five2, #five3, #five4, #five5, #twentyfive1, #twentyfive2, #twentyfive3, #twentyfive4, #twentyfive5, #fifty1, #fifty2, #fifty3, #fifty4, #fifty5, #seventyfive1, #seventyfive2, #seventyfive3, #seventyfive4, #seventyfive5, #onehundred1, #onehundred2, #onehundred3, #onehundred4, #onehundred5').prop('checked', false);
    //reset badges
    $(".badgeOverall, .badgeLecturer, .badgeValue, .badgeResult, .badgeEasiness").removeClass("color-1 color-2 color-3 color-4 color-5");
    // reset gamification icons
    $('#buttonProgressBar, #buttonAverageGrade, #buttonComment, #buttonURL').removeClass("blue");
    //set values to 3 
    lecturerPerformance = 9;
    overallRating = 9;
    demandedEffort = 9;
    testDifficulty = 9;
    additionalValue = 9;
}

//COMMENTSCREEN

//function lets the arrow_up icon turn with the clicked value of the progress bar
//author: Andi

// -------------------------------------------------------------------------------------- for Overall Rating

function arrowOverall1() {
    $("#ratingOverall").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-180");
    $(".badgeOverall").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge0").addClass("color-1")
    overallRating = 1;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowOverall2() {
    $("#ratingOverall").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-225");
    $(".badgeOverall").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge2").addClass("color-2")
    overallRating = 2;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowOverall3() {
    $("#ratingOverall").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-270");
    $(".badgeOverall").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge3").addClass("color-3")
    overallRating = 3;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowOverall4() {
    $("#ratingOverall").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-315");
    $(".badgeOverall").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge4").addClass("color-4")
    overallRating = 4;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowOverall5() {
    $("#ratingOverall").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-0");
    $(".badgeOverall").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge5").addClass("color-5")
    overallRating = 5;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

// ---------------------------------------------------------------------------------------for Lecturer Performance (LP)

function arrowLP1() {
    $("#ratingLP").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-180");
    $(".badgeLecturer").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge6").addClass("color-1")
    lecturerPerformance = 1;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowLP2() {
    $("#ratingLP").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-225");
    $(".badgeLecturer").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge7").addClass("color-2")
    lecturerPerformance = 2;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowLP3() {
    $("#ratingLP").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-270");
    $(".badgeLecturer").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge8").addClass("color-3")
    lecturerPerformance = 3;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowLP4() {
    $("#ratingLP").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-315");
    $(".badgeLecturer").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge9").addClass("color-4")
    lecturerPerformance = 4;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowLP5() {
    $("#ratingLP").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-0");
    $(".badgeLecturer").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge10").addClass("color-5")
    lecturerPerformance = 5;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

// -------------------------------------------------------------------------------------- for Demanded Effort (DE)

function arrowDE1() {
    $("#ratingDE").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-180");
    $(".badgeResult").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge16").addClass("color-1")
    demandedEffort = 1;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowDE2() {
    $("#ratingDE").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-225");
    $(".badgeResult").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge17").addClass("color-2")
    demandedEffort = 2;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowDE3() {
    $("#ratingDE").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-270");
    $(".badgeResult").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge18").addClass("color-3")
    demandedEffort = 3;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowDE4() {
    $("#ratingDE").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-315");
    $(".badgeResult").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge19").addClass("color-4")
    demandedEffort = 4;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowDE5() {
    $("#ratingDE").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-0");
    $(".badgeResult").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge20").addClass("color-5")
    demandedEffort = 5;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

// ------------------------------------------------------------------------for Exam Easiness (former Difficulty) (ED)

function arrowED1() {
    $("#ratingED").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-180");
    $(".badgeEasiness").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge21").addClass("color-1")
    testDifficulty = 1;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowED2() {
    $("#ratingED").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-225");
    $(".badgeEasiness").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge22").addClass("color-2")
    testDifficulty = 2;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowED3() {
    $("#ratingED").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-270");
    $(".badgeEasiness").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge23").addClass("color-3")
    testDifficulty = 3;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowED4() {
    $("#ratingED").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-315");
    $(".badgeEasiness").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge24").addClass("color-4")
    testDifficulty = 4;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowED5() {
    $("#ratingED").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-0");
    $(".badgeEasiness").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge25").addClass("color-5")
    testDifficulty = 5;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

// --------------------------------------------------------------------------------------for Additional Value (AV)

function arrowAV1() {
    $("#ratingAV").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-180");
    $(".badgeValue").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge11").addClass("color-1")
    additionalValue = 1;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowAV2() {
    $("#ratingAV").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-225");
    $(".badgeValue").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge12").addClass("color-2")
    additionalValue = 2;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowAV3() {
    $("#ratingAV").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-270");
    $(".badgeValue").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge13").addClass("color-3")
    additionalValue = 3;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowAV4() {
    $("#ratingAV").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-315");
    $(".badgeValue").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge14").addClass("color-4")
    additionalValue = 4;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}

function arrowAV5() {
    $("#ratingAV").removeClass("rotate-0 rotate-315 rotate-270 rotate-225 rotate-180 greyTrafficlight").addClass("rotate-0");
    $(".badgeValue").removeClass("color-1 color-2 color-3 color-4 color-5");
    $(".badge15").addClass("color-5")
    additionalValue = 5;
    clickedProgressbar = 1;
    $("#buttonProgressBar").addClass("blue");
}





/*--------------------------------------------------------------------------------------------------------------------------------------------*/

//                                                          SWITCH SCREENS

/*--------------------------------------------------------------------------------------------------------------------------------------------*/


//open Searchscreen vs. Commentscreen on chevron_back-onclick
//chevron status is used to change the reaction when clicking on the back-chevron depending on which screen you currently are - Detailscreen or Commentscreen

//new author: Moritz

var chevron_status = 0;
var lastMainScreen = 1;
var alreadySaidYes = 0;

function chevronClick() {




    if ((clickedProgressbar > 0 || $('#rateComment').val() != '' || userAverage != 0) && alreadySaidYes < 1) {
        var myAlert = new Framework7();

        myAlert.alert('If you leave the comment page without submitting, your rating will be lost!', 'Unsaved Rating');
        alreadySaidYes = 1;
        return;
    }

    if (chevron_status === 1 && lastMainScreen === 1) {
        openSearchScreen();
        $('#TitleText').html("LectureChecker");
        $('#writeComment,#writeComment1,#CommentScreen').hide();
    } else if (chevron_status === 2) {
        openDetailscreen(activeLV);
    } else if (chevron_status === 1 && lastMainScreen === 2) {
        openFavoritesScreen();
    }
}

function openSearchScreen() {

    if ((clickedProgressbar > 0 || $('#rateComment').val() != '' || userAverage != 0) && alreadySaidYes < 1) {
        var myAlert = new Framework7();
        myAlert.alert('If you leave the comment page without submitting, your rating will be lost!', 'Unsaved Rating');
        alreadySaidYes = 1;
        return;
    }




    $('#TitleText').html("Lecture Checker");
    $('#DetailScreen,#chevron_back,#chevron_back1,#FavoritesScreen,#ProfileScreen,#Infoscreen,#CommentScreen, #writeComment, #writeComment1 ').hide();
    $('#SearchScreen').show();
    chevron_status = 0;
    lastMainScreen = 1;
    $('#SearchTab').addClass("active");
    $('#FavoritesTab,#CreditTab,#ProfileTab').removeClass("active");
    resetRatings();
    clickedProgressbar = 0;
    $('#averagePickerNA').prop('checked', true);
    userAverage = 0;
    $('#buttonProgressBar').removeClass("blue");
}
//function that handles the write comment stuff. clicking the write comment icon on a detailscreen triggers this function - autor Moritz
function writeComment() {

    $('#DetailScreen,#writeComment,#writeComment1').hide();
    resetRatings();
    $('#URL').val('');
    $('#rateComment').val('');
    $('#rateAverageGrade').val('');
    clickedProgressbar = 0;
    $('#fifty1, #fifty2, #fifty3, #fifty4, #fifty5').prop('checked', true);
    $('#buttonProgressBar, #buttonAverageGrade, #buttonComment, #buttonURL').removeClass("blue");
    $('#CommentScreen').show();
    chevron_status = 2;
    alreadySaidYes = 0;


}



//this is just a part of openDetailscreen()!
function switchtoDetailscreen() {
    if ((clickedProgressbar > 0 || $('#rateComment').val() != '' || userAverage != 0) && alreadySaidYes < 1) {
        var myAlert = new Framework7();
        myAlert.alert('If you leave the comment page without submitting, your rating will be lost!', 'Unsaved Rating');
        alreadySaidYes = 1;
        return;
    }

    $('#averagePickerNA').prop('checked', true);
    userAverage = 0;
    for (var i = 0; i < user.rated.length; i++) {
        if (activeLV === user.rated[i]) {
            $('#SearchScreen,#CommentScreen,#FavoritesScreen').hide();
            $('#DetailScreen,#chevron_back,#chevron_back1').show();
            $('#SearchTab,#FavoritesTab,#CreditTab,#ProfileTab').removeClass("active");
            chevron_status = 1;
            return
        }
    }


    $('#SearchScreen,#CommentScreen,#FavoritesScreen').hide();
    $('#DetailScreen,#chevron_back,#chevron_back1,#writeComment,#writeComment1').show();
    $('#SearchTab,#FavoritesTab,#CreditTab,#ProfileTab').removeClass("active");
    chevron_status = 1;

}

function shareFiles() {
    var myAlert = new Framework7();

    myAlert.alert('Please come back later!', 'Upload-Function not implemented yet!');
}


function openTUMOnline() {
    var myAlert = new Framework7();
    myAlert.alert('Please come back later!', 'Redirection to TUMOnline not implemented yet!');

}

function openDownloadScreen() {

    var myAlert = new Framework7();
    myAlert.alert('Please come back later!', 'Download-Screen not implemented yet!');
}



function openFavoritesScreen() {
    if ((clickedProgressbar > 0 || $('#rateComment').val() != '' || userAverage != 0) && alreadySaidYes < 1) {
        var myAlert = new Framework7();
        myAlert.alert('If you leave the comment page without submitting, your rating will be lost!', 'Unsaved Rating');
        alreadySaidYes = 1;
        return;
    }


    $('#averagePickerNA').prop('checked', true);
    userAverage = 0;
    listFavorites();
    $('#TitleText').html("Favorites");
    $('#DetailScreen,#SearchScreen,#chevron_back,#chevron_back1,#writeComment,#writeComment1,#CommentScreen,#ProfileScreen,#Infoscreen').hide();
    $('#FavoritesScreen').show();
    $('#FavoritesTab').addClass("active");
    $('#SearchTab,#CreditTab,#ProfileTab').removeClass("active");
    chevron_status = 0;
    lastMainScreen = 2;

}


function openProfileScreen() { //author Steffen
    if ((clickedProgressbar > 0 || $('#rateComment').val() != '' || userAverage != 0) && alreadySaidYes < 1) {
        var myAlert = new Framework7();
        myAlert.alert('If you leave the comment page without submitting, your rating will be lost!', 'Unsaved Rating');
        alreadySaidYes = 1;
        return;
    }


    $('#averagePickerNA').prop('checked', true);
    userAverage = 0;

    $('#TitleText').html("My Profile");
    $('#DetailScreen,#SearchScreen,#chevron_back,#chevron_back1,#writeComment,#writeComment1,#CommentScreen,#FavoritesScreen, #Infoscreen').hide();
    $('#ProfileScreen').show();
    $('#ProfileTab').addClass("active");
    $('#SearchTab,#CreditTab,#FavoritesTab').removeClass("active");
    $('.currentCreditValue').html(user.credit + ' Credit Points');

}


function openInfoScreen() {

    if ((clickedProgressbar > 0 || $('#rateComment').val() != '' || userAverage != 0) && alreadySaidYes < 1) {
        var myAlert = new Framework7();
        myAlert.alert('If you leave the comment page without submitting, your rating will be lost!', 'Unsaved Rating');
        alreadySaidYes = 1;
        return;
    }


    $('#averagePickerNA').prop('checked', true);
    userAverage = 0;
    $('#Infoscreen').show();
    $('#DetailScreen,#SearchScreen,#chevron_back,#chevron_back1,#writeComment,#writeComment1,#CommentScreen,#FavoritesScreen,#ProfileScreen').hide();
    $('#CreditTab').addClass("active");
    $('#SearchTab,#FavoritesTab,#ProfileTab').removeClass("active");
    $('#TitleText').html("Information");
    $('.currentCreditValue').html(user.credit + ' Credit Points');

}