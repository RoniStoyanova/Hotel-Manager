function CalendarController() {

}

CalendarController.prototype.onCreateView = function (view) {
    ShowBars();
    adminSetup();
    //showNavigation();

    var form = view.querySelector("#calendar-form");

    var theMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    function getFirstDay(theYear, theMonth) {
        var firstDate = new Date(theYear, theMonth, 1);
        return firstDate.getDay();
    }

    function getMonthLen(theYear, theMonth) {
        var oneDay = 1000 * 60 * 60 * 24; //one day in milliseconds
        var thisMonth = new Date(theYear, theMonth, 1);
        var nextMonth = new Date(theYear, theMonth + 1, 1);
        //getTime() - Get the time (milliseconds since January 1, 1970)
        var len = Math.ceil((nextMonth.getTime() - thisMonth.getTime())/oneDay);
        return len;
    }

    function populateTable() {
        var theMonth = form.chooseMonth.selectedIndex;
        var theYear = parseInt(form.chooseYear.options[form.chooseYear.selectedIndex].text);
        // initialize date-dependent variables
        var firstDay = getFirstDay(theYear, theMonth);
        var howMany = getMonthLen(theYear, theMonth);

        // fill in month/year in table header
        view.querySelector("#tableHeader").innerHTML = theMonths[theMonth] + " " + theYear;

        // initialize vars for table creation
        var dayCounter = 0;
        var TBody = view.querySelector("#tableBody");
        // clear any existing rows
        while (TBody.rows.length > 0) {
            TBody.deleteRow(0)
        }
        var newR, newC;
        var done = false;
        while (!done) {
            // create new row at end
            newR = TBody.insertRow(TBody.rows.length);
            for (var i = 0; i < 7; i++) {
                // create new cell at end of row
                newC = newR.insertCell(newR.cells.length);
                if (TBody.rows.length == 1 && i < firstDay) {
                    // no content for boxes before first day
                    newC.innerHTML = "";
                    continue;
                }
                if (dayCounter == howMany) {
                    // no more rows after this one
                    done = true;
                }
                if (dayCounter < howMany) {
                    dayCounter++;
                    newC.innerHTML = dayCounter.toString();
                } else {
                    newC.innerHTML = "";
                }
            }
        }
    }

// set month choice to current month
    function setCurrMonth(today) {
        form.chooseMonth.selectedIndex = today.getMonth();
    }

//// create dynamic list of year choices
    function fillYears() {
        var today = new Date();
        var twoYearsFromCurrentYear = today.getFullYear() - 1;
        var yearChooser = form.chooseYear;
        for (var i = twoYearsFromCurrentYear; i <= twoYearsFromCurrentYear + 2; i++) {
            yearChooser.options[yearChooser.options.length] = new Option(i, i);
        }
        form.chooseYear.selectedIndex = 1;
        setCurrMonth(today);
    }


    fillYears(form);
    populateTable(form);

    view.querySelector("#month").addEventListener("change", function() {
        populateTable(form);
    }, false);
    view.querySelector("#year").addEventListener("change", function() {
        populateTable(form);
    }, false);



    //view.querySelector("#showAllReservations").addEventListener("click", function() {
    //
    //    var url = Application.getConfigValue("dataPath") + '/ReservationServlet';
    //
    //    var params = {
    //
    //    };
    //
    //    var promise = Ajax.postRequest(url, params, true);
    //    promise.setOnSuccess(function(xhr) {
    //        console.log(xhr.responseText);
    //
    //        var response = JSON.parse(xhr.responseText);
    //
    //        var calendarMonth = form.chooseMonth.selectedIndex;
    //        var calendarYear;
    //        var yearIndex = form.chooseYear.selectedIndex;
    //        if (yearIndex == 0) {
    //            calendarYear = 2014;
    //        } else if (yearIndex == 1) {
    //            calendarYear = 2015;
    //        } else {
    //            calendarYear = 2016;
    //        }
    //        for (var i = 0; i < response.length; i++) {
    //
    //            var date = new Date(response[i].dateFrom);
    //            var reservationDay = date.getDate();
    //            var reservationMonth = date.getMonth();
    //            var reservationYear = date.getFullYear();
    //            for (var j=1; j <= 40; j++) {
    //                console.log(view.querySelector("th").innerHTML);
    //                if (view.querySelectorAll("td")[j].innerHTML == reservationDay &&
    //                reservationMonth == calendarMonth && reservationYear == calendarYear) {
    //                    view.querySelector("#tableBody").childNodes[j].style.color = "red"
    //                }
    //            }
    //        }
    //
    //    });
    //    promise.setOnFail(function(xhr) {
    //        console.log(xhr.responseText);
    //
    //    });
    //
    //},false);

    view.querySelector("#showStatistic").addEventListener("click", function() {

        var url = Application.getConfigValue("dataPath") + '/PieChartServletYear';

        var calendarYear;
        var yearIndex = form.chooseYear.selectedIndex;
        if (yearIndex == 0) {
            calendarYear = 2014;
        } else if (yearIndex == 1) {
            calendarYear = 2015;
        } else {
            calendarYear = 2016;
        }
        var params = {
            year : calendarYear
        };
        var promise = Ajax.postRequest(url, params, true);
        promise.setOnSuccess(function(xhr) {
            console.log(xhr.responseText);

            var myColor = ["#390402","#861611","#8E9321","#022E53","#107AD2","#D24309","#6F9E55","#233319","#6B2408","#191C33","#D41500","#A11000"];
            var response = JSON.parse(xhr.responseText);
            console.log(response.year);
            plotData(response.year, myColor);

            view.querySelector("#canvas").style.display = "block";

            var legend = document.createElement("div");
            legend.style.width = "290px";
            legend.style.float = "right";
            legend.style.padding = "40px 0 0 0";
            for ( var i = 0; i< myColor.length; i++) {
                var div = document.createElement("div");
                div.style.width = "290px";
                var spanColor = document.createElement("span");
                spanColor.innerHTML = "";
                var color = myColor[i];
                spanColor.style.backgroundColor = color;
                spanColor.style.display = "inline-block";
                spanColor.style.width = "10px";
                spanColor.style.height = "10px";
                var spanValue = document.createElement("span");
                var month = theMonths[i];
                var value = response.year[i];
                spanValue.innerHTML = "  " + month.toString() + " - " +  value.toString() + " reservations";
                div.appendChild(spanColor);
                div.appendChild(spanValue);
                legend.appendChild(div);
            }

            view.querySelector(".pieChart").appendChild(legend);

            view.querySelector("#showStatistic").disabled = true;

        });
        promise.setOnFail(function(xhr) {
            console.log(xhr.responseText);
        })

    },false);

};
