// Use FETCH to help in this portion (Hint: Edit the code from the lecture slide.)
document.addEventListener("DOMContentLoaded", function () {
    let baseUrl = "https://api.data.gov.sg/v1/environment/psi";

    function getPSI(dateValue) {
        if (!dateValue) {
            dateValue = "";
        }

        let url = baseUrl;

        if (dateValue) {
            url += "?date_time=" + dateValue;
        }

        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.items.length === 0) {
                    alert("No data found for this date.");
                    return;
                }

                let readings = data.items[0].readings;

                // PSI 24 Hour
                let psi24 = readings.psi_twenty_four_hourly;
                let content24 = "";
                for (let key in psi24) {
                    content24 += key + ": " + psi24[key] + "<br/>";
                }
                document.getElementById("psi-twenty-four-hourly").innerHTML = content24;

                // PSI 3 Hour
                let psi3 = readings.psi_three_hourly; 
                let content3 = "";
                
                if (psi3) {
                    for (let key in psi3) {
                        content3 += key + ": " + psi3[key] + "<br/>";
                    }
                } else {
                    content3 = "No 3h Data available";
                }
                document.getElementById("pm10-twenty-four-hourly").innerHTML = content3;
            })
            .catch(function(error) {
                console.error("Error fetching PSI:", error);
            });
    }

    getPSI();

    document.getElementById("btnSubmit").addEventListener("click", function() {
        let dateInput = document.getElementById("txtDate").value;
        getPSI(dateInput);
    });
});