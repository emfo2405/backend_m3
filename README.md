## Moment 2 - Webbtjänster / API
Jag har skapat ett API för att kunna hantera olika arbetslivserfarenheter jag har. API:et är skapat i syfte att kunna använda Create, Read, Update, Delete genom GET, POST, PUT och DELETE.

### Användning
Det här API:et är använt i en webbplats som finns publicerad här: https://backend-m3.netlify.app/. För att använda API:et till andra webbplatser behöver man ansluta till databasen med länken: MONGO_URI=mongodb+srv://emfo2405:<lösenord>@moment3.vwrony7.mongodb.net/experience?retryWrites=true&w=majority&appName=moment3, där lösenordet skrivs in.

### Hur man använder API:et 
Det finns olika sätt att använda API:et för att nå det, nedan finns en tabell över vilka metoder som kan användas och vad de innebär. 

| Metod  | Ändpunkt | Beskrivning | 
| ------------- | ------------- | ------------- |
| GET  | /jobexperiences  | Visar alla arbetslivserfarenheter i databasen |
| POST  | /jobexperiences  | Lagrar en ny arbetslivserfarenhet i databasen. Ett objekt med korrekt information måste skickas med. |
| PUT  | /jobexperiences/:id  | Uppdaterar information för en arbetslivserfarenhet med ett specifikt id-nummer i databasen. Ett objekt med korrekt information måste skickas med. |
| DELETE  | /jobexperiences/:id  | Raderar en arbetslivserfarenhet ur databasen med ett specifikt id-nummer. |

Ett objekt som lägger till korrekt information om arbetslivserfarenheter är uppbyggt så här:
```
{
  "companyName": "Göteborgs Universitet",
  "jobTitle": "Administrativ Assistent",
  "place": "Göteborg",
  "startDate": "2016-09-01",
  "endDate": "2025-05-31",
  "jobDescription": "Arbete med datainmatning och analys av provresultat"
}
```
