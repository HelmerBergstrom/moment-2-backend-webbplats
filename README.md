### MOMENT 2.2

#### HEMSIDA + WEBBTJÄNST

Denna hemsida/webbapplikation är skapad med HTML, CSS och JavaScript och använder en egentillverkad webbtjänst för att hämta, skriva ut och radera från en databas.

Webbapplikationen hämtar data via Fetch API och visar samt behandlar datan via JavaScript. Webbtjänsten är skapat med databasen MySQL och innehåller det som behövs för att kunna utnyttja den. Denna hemsida är frontend-delen och webbtjänsten blir backend-delen.

Startsidan innehåller en lista på erfarenheter som användaren har skapat. Listan innehåller information om erfarenheten och alla dessa erfarenheter har en knapp för att kunna radera. För att hämta erfarenheter används GET och för att radera erfarenheter används DELETE.

Lägg till-sidan innehåller ett formulär som ger användaren möjlighet att skapa nya erfarenhetsposter till listan på startsidan. Detta görs via POST.

Efter klick på en radera-knapp behöver användare bekräfta raderingen. Detta för att förhindra att erfarenheter raderas av misstag.

Formuläret måste fyllas i helt o hållet för att det ska kunna läggas till i listan på startsidan. Vid klick på "LÄGG TILL" utan att allt fyllts i, kommer ett felmeddelande att skrivas ut.

Varje erfarenhet har ett ID som är primärnyckelattribut i databasen. Dessa ID:n syns inte för användaren, men hjälper till att hålla reda på vad som klickas på och vilken erfarenhet som är i fokus. Radera-knapparna har samma ID som erfarenheterna som radera-knapparna ligger vid.