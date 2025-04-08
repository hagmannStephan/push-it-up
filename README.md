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

### Reflexion
#### Absicht (SOLL)
Die Rahmenbedingungen, welche ich zwingend für meine App umsetzen muss, sind folgende:

- Sensoren auslesen und Daten verarbeiten
- Aktuator verwenden
- Mehr als eine View verwenden

In den funktionalen und nicht funktionalen Anforderungen habe ich folgende Anforderungen für meine App definiert:

##### Funktional
- Home View
    - Beim öffnen der App sieht der Nutzer die "Home View"
    - Begrüssungstext wird angezeigt
    - Die Übersicht der letzten 7 Tage wird unter der Begrüssung angezeigt
    - «Start the Challenge!»-Button führt zur Workout-View
- Workout View
    - Grosse Zahl zeigt Anzahl geschaffter Push-Ups
    - Sensor zählt Push-Ups
    - Nach 5 Sekunden ohne Bewegung wird die Challenge beendet, das Handy vibriert
- Speicherung der Daten
    - Nach dem Workout Rückkehr zur Home-View
    - Score des Tages wird angezeigt
    - Nur Highscores des Tages werden gespeichert

##### Nicht-Funktional
- Simple und selbsterklährende UI
- Offline-Funktionalität
- Zähler darf max. 20 % Abweichung haben

#### Resultat (IST)
Die drei Rahmenbedingungen konnte ich erfolgreich umsetzen.
- Sensoren (werden verwendet, um die Push-ups zu zählen)
- Aktuator (wird für Hinweise (Counter, Workout beendet) in der Workout-View verwenden)
- Mehr als eine View (Es gibt die Home und die Work-out View)

Zudem habe ich auch noch zusätzliche Rahmenbedingungen umgesetzt:
- Kommunikation zwischen zwei Views (Workout Daten werden in Workout generiert und in Home angezeigt)
- Persistente, lokale Datenablage (via `expo-secure-store`)
- Icon verwenden

Bei den funktionalen und nicht funktionalen Anforderungen sieht es ähnlich aus.

Die `Home View` konnte ich voll und ganz umsetzen.
Die `Workout View` habe ich voll umgesetzt, aber noch zwei Zusatzfeatures implementiert:
- Countdown bevor der Zähler beginnt, um sich parat zu machen
- Möglichkeit, Work-out auch mit einem Abbruch-Knopf zu beenden
Die `Nicht funktionalen Anforderungen` konnten auch erfüllt werden. Die UI ist sehr verständlich, nach dem Testerfeedback. Jedoch kann die Abweichung auch die 20%-Marke überschreiten, je nachdem, wo man das Handy platziert. In der Po-Tasche der Hose werden generell die akkuratesten Resultate gemessen, mit einer sehr kleinen Abweichung von ca. 5 %.


#### Erkenntnis

##### Wo hatte ich Probleme?

**Sensor:** Ein grosses Problem hatte ich damit, dass ich den Proximity-Sensor in Expo nicht verwenden konnte, obwohl meine Planung auf diesem Sensor beruhte.
Ich ging dieses Problem an, indem ich die restlichen Sensoren-Daten auf meinem Bildschirm anzeigen liess und beobachtete, welche sich während eines Push-ups verändern. Ich bekam die besten Resultate mit dem Bewegungssensor und ich entschied mich dann auch für diesen
**Persistente Datenspeicherung:** Ich wollte eigentlich eine SQLite DB machen, da ich davon ausging, dass das Setup davon sehr simpel ist, jedoch wurde es dann schnell kompliziert. Nach einigem informieren fand ich heraus, dass es schon einen Key-Value Store in Expo gibt, welcher schon aufgesetzt ist und sehr einfach zu benutzen ist.

##### Was lief gut?
**Aktuator:** Mit Expo einen Aktuator zu verwenden ist enorm simpel und intuitiv, und ich konnte diese Aufgaben im Handumdrehen erledigen.

**Sensordaten auslesen:** Sobald ich einen passenden Sensor gefunden habe, war es sehr simpel, die Daten auszulesen und zu verarbeiten. Dies lag sicher auch daran, dass ich mich mit der TS-Syntax bereits auskannte.

##### Was würde ich nächstes Mal besser machen?
Es gibt zwei Dinge, welche ich nächstes Mal anders machen würde:
1. Ich würde mir besser überlegen, was für eine Idee ich umsetzen will. Am Wochenende fielen mir noch einige andere tolle App-Ideen ein, aber da ich bereits mit meiner `Push it Up`-App begonnen hatte, konnte ich meine Projektidee nicht mehr wechseln.
2. Ich würde mich vor dem Projektstart kurz informieren, ob alle Ressourcen, welche ich brauche, mit der gewünschten Technologie verfügbar sind. Ich ging davon aus, dass der Sensor sowieso verfügbar ist, jedoch habe ich mich getäuscht.