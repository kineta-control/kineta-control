# NAVEE XT5 Max Companion (Demo)

Eine moderne, mobile-first React/TypeScript-Web-App, die wie eine Smartphone-Companion-App
für einen NAVEE XT5 Max E-Scooter aussieht und sich bedienen lässt — **als reine
Software-Simulation**, ohne Hardware-Anbindung.

## Wichtiger Hinweis zu Bluetooth und Fahrzeugsteuerung

**Diese App steuert kein echtes Fahrzeug und sendet keine Befehle an eine echte
Motorsteuerung (ESC).** Es wird keine reale Bluetooth-Hardware angesprochen (keine
Web-Bluetooth-API, kein natives Bluetooth-Modul). Alle Geräte, Signalstärken,
Geschwindigkeits-, Akku- und Firmware-Werte werden vollständig im Browser generiert
(siehe `src/services/mockBluetooth.ts` und `src/services/telemetrySimulator.ts`).

Grund: Geschwindigkeitsbegrenzungen und ESC-Schutzfunktionen von E-Scootern sind in
Deutschland/der EU gesetzlich vorgeschriebene Sicherheitsmechanismen (z. B. nach
eKFV/StVZO). Eine Umgehung dieser Limits an echter Fahrzeughardware ist nicht Teil
dieses Projekts und wurde hier bewusst nicht implementiert. Diese App ist ausschließlich
für Demo-, Lern- und Portfolio-Zwecke gedacht.

## Features

- **Dashboard**: simuliertes Gerät, Verbindungsstatus, Geschwindigkeit, Firmware-Version,
  animiertes Scooter-Icon (SVG), Akku- und Streckenanzeige
- **Gerät verbinden**: animierte Mock-Bluetooth-Suche mit mehreren Geräten (inkl.
  „NAVEE XT5 Max“), Signalstärkeanzeige, Verbinden-Button mit Fortschrittsanzeige
- **Einstellungen**:
  - Zero Start (Ein/Aus-Schalter)
  - Fahrmodus (Eco / Drive / Sport)
  - Simulierte Höchstgeschwindigkeit (Slider, 5–60 km/h) — wirkt ausschließlich auf
    die in der App simulierte Geschwindigkeitsanzeige
  - Alle Einstellungen werden automatisch in `localStorage` gespeichert
- Dark Mode (Standard) mit umschaltbarem Light Mode, Theme-Wahl wird gespeichert
- Responsives Design: Mobile-first, zentrierter „Phone-Shell“-Look auf Tablet/Desktop
- Vollständig in TypeScript (`strict` aktiviert), keine externen UI-/Icon-Bibliotheken

## Installation

Voraussetzung: [Node.js](https://nodejs.org/) (LTS, Version 18 oder neuer) und npm.

```bash
npm install
```

## Start (Entwicklung)

```bash
npm run dev
```

Öffnet die App standardmäßig unter `http://localhost:5173`.

## Build

```bash
npm run build
```

Führt zunächst eine TypeScript-Typprüfung (`tsc --noEmit`) und anschließend den
Produktions-Build mit Vite aus. Das Ergebnis liegt im Ordner `dist/`.

Mit `npm run preview` lässt sich der Produktions-Build lokal testen.

## Projektstruktur

```
src/
  components/
    Dashboard/        Dashboard-Screen inkl. animiertem Scooter-Icon
    BluetoothConnect/ Gerätesuche, Geräteliste, Verbindungsstatus
    Settings/         Zero Start, Fahrmodus, Geschwindigkeits-Slider
    Layout/           Header und Bottom-Navigation
  hooks/
    useMockBluetooth.ts   State-Management für die simulierte Bluetooth-Verbindung
    useTelemetry.ts       Erzeugt die simulierte Live-Geschwindigkeit/Akku-Werte
    useScooterSettings.ts Einstellungen inkl. localStorage-Persistenz
    useLocalStorage.ts    Generischer localStorage-Hook
    useTheme.ts            Dark-/Light-Mode-Umschaltung
  services/
    mockBluetooth.ts        Mock-Bluetooth-Schicht (Scan/Connect-Simulation)
    telemetrySimulator.ts   Simulierte Geschwindigkeits-/Akku-Berechnung
  types/
    scooter.ts   Gemeinsame TypeScript-Typen
```

## Funktionsweise der Bluetooth-Simulation

1. Beim Tippen auf „Suchen“ im Tab „Verbinden“ startet `startMockScan` in
   `src/services/mockBluetooth.ts`. Eine feste Liste von Beispielgeräten (inkl.
   „NAVEE XT5 Max“) wird nacheinander mit zufälliger Verzögerung und zufälliger
   Signalstärke in die UI eingeblendet (Scan-Animation).
2. Beim Tippen auf „Verbinden“ bei einem Gerät startet `connectToMockDevice`, das
   über ein paar hundert Millisekunden einen Fortschritt von 0–100 % simuliert und
   danach den Status auf „Verbunden“ setzt.
3. Sobald verbunden, erzeugt `useTelemetry` (zusammen mit
   `src/services/telemetrySimulator.ts`) in einem Intervall neue, plausible
   Geschwindigkeits- und Akkuwerte, die von Fahrmodus und der eingestellten
   „simulierten Höchstgeschwindigkeit“ abhängen — rein innerhalb des React-States
   der App, ohne jede Kommunikation nach außen.

Es findet an keiner Stelle ein Zugriff auf `navigator.bluetooth`, ein natives
Bluetooth-Modul oder sonstige Hardware-APIs statt.

## Verpackung als Android/iOS-App

Die App ist als normale Vite/React-Web-App gebaut und lässt sich z. B. mit Tools wie
Capacitor oder einer WebView-Hülle verpacken. Das ist nicht Teil dieses Repos, aber die
saubere Komponentenstruktur und das Fehlen von Browser-only-Hacks machen das später
unkompliziert.
