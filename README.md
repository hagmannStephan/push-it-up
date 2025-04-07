# Push it Up

Herzlich willkommen zum `Read Me` meines Abschlussprojektes im ÜK 335 (Mobile Apps entwickeln).

## App starten
1. Wenn noch nie eine Expo-App auf dem System gestartet wurde, folgen Sie [diesem Tutorial](https://docs.expo.dev/get-started/create-a-project/). Es ist sehr leicht verständlich
2. In den Projekt Root Ordner mit `cd` wechseln
3. Folgende Befehle ausführen:
```sh
npm install
npx expo start
```
4. Den Anweisungen im Terminal zur Emulation des Gerätes folgen (variiert je nach Emulator, jedoch Anweisungen dazu im Terminal)

## Projektdoku

### Projekt-Pitch
Laut der WHO bewegen sich über **1,4 Milliarden Menschen nicht genug**, was zu **gesundheitlichen Problemen** führt. Meine App will dieses Problem bekämpfen und versuchen, Personen zu motivieren, sich sportlich herauszufordern.

Meine App zählt die Push-ups eines Nutzers und speichert die Bestzahl jedes Tages. Dies ermöglicht dem Nutzenden, seinen **Fortschritt zu verfolgen**.

### Anforderungen

#### Funktional

##### Home View
- Wenn der Nutzer die App öffnet, so sieht er die Home-View.
- Auf der Home-View wird der Nutzer begrüsst.
- Auf der Home-View, unter der Begrüssung, sieht der Nutzer eine Übersicht seiner Resultate in den letzten 7 Tagen.
- Auf der Home-View, unter der Übersicht, sieht der Nutzer einen Knopf mit dem Titel - «Start the Challange!». Der Nutzer kann auf diesen Knopf drücken.
- Wenn der Nutzer auf den «Start the Challange!»-Knopf drückt, so wird er auf die Workout-View weitergeleitet.

##### Workout View
- In der Workout-View sieht der Nutzer eine grosse Zahl in der Mitte der Applikation, diese Zahl sind die bis jetzt geschafften Push Up’s.
- Wenn der Sensor eine Bewegung bestimmt, welche sich wie ein Push Up verhält, so zählt diese 
als einen Push Up.
- Wenn der Sensor innerhalb von 5 Sekunden keinen Push Up mehr registriert, so wird die 
Challenge automatisch beendet und das Handy vibriert, um den Nutzer zu informieren.

#### Nicht Funktional
- Die UI der App ist ohne Erklärung bedienbar und kann ohne Probleme von einem neuen Nutzer verstanden werden.
- Ein neuer Nutzer kann den App Workflow ohne Hilfe und ohne grosse Verzögerung beenden.
- Die App kann jede Funktion auch ohne Internetverbindung vollständig ausführen. Alle notwendigen Daten werden lokal gespeichert.
- Die Zähler Funktion der App hat einen erlaubten Fehlerbereich von grösser-gleich 20 Prozent. Bei 20 Push Ups’s darf es beim Counter maximal eine Abweichung von 4 geben.


### Implementierung - Key Decisions
#### Sensordaten auslesen
Sobald ich die Sensordaten des `Proximity`-Sensors auslesen wollte, merkte ich, dass ich ein grosses Problem habe. **<span style="text-decoration: underline; text-decoration-color: red;">Der `Proximity`-Sensor ist nicht verfügbar</span>** auf expo (siehe [doku](https://docs.expo.dev/versions/latest/sdk/sensors/)). Meine Optionen waren nun:

1. Auf Flutter wechseln, da dort `Proximity`-Sensoren verfügbar sind
2. Projekt abbrechen und ein neues starten
3. Mit anderen Sensoren, die Push-ups zählen

Ich entschied mich gegen Variante 1, da ich in den letzten drei Tagen nur mit Expo gearbeitet habe. All dieses Know-how nun wegzuwerfen und von null zu starten, konnte ich mir nicht leisten.

Variante 2 war auch nicht wählbar für mich, da ich bereits viel in die Planung investiert habe, das alles neu zu machen hätte meinen Zeitplan pulverisiert.

Variante 3 war auch nicht perfekt, da ich beispielsweise in meinem Storyboard und in den Anforderungen davon ausgegangen bin, dass ich den Proximity Sensor verwenden kann. Jedoch war dies die einzige übriggebliebene Option.

Ich startete die Daten von drei Sensoren (Gyroskop, Beschleunigungsmesser, Bewegungsmesser), um zu sehen, wie sie sich während der Bewegungen eines Push-ups verhalten. Ich fand heraus, dass der Bewegungsmesser die besten Daten lieferte, ich musste jetzt einfach mein Handy während des Push-ups in der Hosentasche haben.

#### Datenspeicherung
Für die persistente Datenspeicherung nutze ich `expo-secure-store` die integrierte Key-Value-Store-Lösung von expo, da diese sehr einfach zu verwenden ist. Als Schlüssel benutze ich das Datum des heutigen Tages, als Wert die erreichte Zahl Push-ups.

#### Namensgebung
Ich wollte zuerst die App 'Pump it Up' nennen, wegen des EDM-Lieds, jedoch entschied ich mich später in meinem Projekt dazu, den Namen auf 'Push it Up' zu ändern, da dies auch noch einen Zusammenhanf zum Nutzen der App erstellt.

### Paketdiagramm
Nachfolgend ist ein Paketdiagramm aufgeführt, um die Projektstruktur zu visualisieren:

![Paketdiagramm](/assets/images/paketdiagramm.drawio.png)