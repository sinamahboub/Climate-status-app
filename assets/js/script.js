/* -------------------------------------------------------------------------- */
/*                                sina mahboub                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                        Get information from the api                        */
/* -------------------------------------------------------------------------- */

const GetLoc = async() => {
    const Lurl = "http://ip-api.com/json/?fields=country,city,lat,lon,timezone";

    const Response = await fetch(Lurl);
    const data = await Response.json();

    return data;
};

const GetWeather = async(lat, lon) => {
    const Wurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=34cf27177ff80753cbbdfb9fdf5a2f19`;

    const Response = await fetch(Wurl);
    const data = await Response.json();

    return data;
};

/* -------------------------------------------------------------------------- */
/*                              Get day or night                              */
/* -------------------------------------------------------------------------- */

function GetDayOrNight() {
    let DayOrNight;
    let d = new Date();

    if (d.getHours() >= 6 && d.getHours() <= 19) {
        DayOrNight = "Day";
    } else {
        DayOrNight = "Night";
    }
}

/* -------------------------------------------------------------------------- */
/*                                Weather icon                                */
/* -------------------------------------------------------------------------- */

/**
 * ! Error
 */
function GetIcon(weMain) {
    let icon;
    switch (weMain) {
        case "storm":
            icon = `${weMain}.gif`;
            break;

        case "drizzle":
            icon = `${weMain}.gif`;
            break;

        case "rain":
            icon = `${weMain}.gif`;
            break;

        case "snow":
            icon = `${weMain}.gif`;
            break;

        case "clear":
            const DayOrNight = GetDayOrNight();
            icon = `${weMain}-${DayOrNight}.gif`;
            break;

        case "Clouds":
            icon = `${weMain}.gif`;
            break;

        case "atmosphere":
            icon = `${weMain}.gif`;
            break;

            return icon;
    }
}

/* -------------------------------------------------------------------------- */
/*                              Convert temppers                              */
/* -------------------------------------------------------------------------- */

function GetTemp(weTemp) {
    const k = weTemp;
    const f = ((k - 273.15) * 9) / 5 + 32;
    const c = k - 273.15;

    return (temp = {
        kel: Math.floor(k),
        far: Math.floor(f),
        can: Math.floor(c),
    });
}

/* -------------------------------------------------------------------------- */
/*                              html code backend                             */
/* -------------------------------------------------------------------------- */

const loti = document.querySelector(".timezone");
const icon = document.querySelector(".icon");
const dese = document.querySelector(".degree-section");
const deg = document.querySelector(".degree");
const unit = document.querySelector(".degree-section span");
const tede = document.querySelector(".temperature-description");

GetLoc()
    .then((locData) => {
        const timeZone = locData.timezone;
        // console.log(timeZone);
        loti.textContent = timeZone;
        return GetWeather(locData.lat, locData.lon);
    })
    .then((weData) => {
        const weTemp = weData.main.temp;
        const weMain = weData.weather[0].main;
        const weDes = weData.weather[0].description;

        // console.log(weTemp, weMain, weDes);

        /**
         * ! Error
         */
        try {
            const iconName = GetIcon(weMain);
            icon.innerHTML = `<img src="icons/${iconName}"></img>`;
        } catch (error) {
            console.log(
                `-- error name : ${error.name}  &&  -- error message : ${error.message}`
            );
        }

        deg.textContent = Math.floor(weTemp);
        unit.textContent = "K";

        dese.addEventListener("click", function(e) {
            if (unit.textContent == "K") {
                deg.textContent = GetTemp(weTemp).far;
                unit.textContent = "F";
            } else if (unit.textContent == "F") {
                deg.textContent = GetTemp(weTemp).can;
                unit.textContent = "C";
            } else {
                deg.textContent = GetTemp(weTemp).kel;
                unit.textContent = "K";
            }
        });

        tede.textContent = weDes;
    });

document.addEventListener("contextmenu", (event) => event.preventDefault());

/* -------------------------------------------------------------------------- */
/*                                sina mahboub                                */
/* -------------------------------------------------------------------------- */