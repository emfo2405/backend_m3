## Moment 2 - Webbtjänster / API
Jag har skapat ett API för att kunna hantera olika arbetslivserfarenheter jag har. API:et är skapat i syfte att kunna använda Create, Read, Update, Delete genom GET, POST, PUT och DELETE.

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
