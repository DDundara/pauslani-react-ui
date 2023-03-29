## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
Projekt pauslani_react_ui je frontend dio koji konzumira api-e koji se izlozne na backend projketu prevodjenje napisan na springboot tehnologiji. 

Frontend se sastoji od 3 taba: 'Unos Računa' , 'Pretraga' i 'O nama' . Na svakom od tabov-a imamo react komponete. Komponenta MyForm sadrži polja za unos informacija o kupcu , uslugama i računu. Može se dodavati više usluga.

#### Analiza zadatka

```
Obrt koji ima nude usluge su individualne instrukcije, grupne instrukcije do 3 osobe, grupne instrukcije 4-6 osoba, lektoriranje teksta i prevođenje, a cijena je po satu ili po stranici ovisno o vrsti usluge. Kroz aplikaciju ćemo omogućiti unos računa gdje ćemo moći pratiti tko je koju uslugu kupio koja je cijena usluge, koliko smo PDV ( poreza) platili  državi. Uzeti ćemo u obzir da je PDV za navedene djelatnosti 25 posto. 
U aplikaciji ćemo omogućiti pregledavanje računa po osobi ili tvrtki također po tipu usluge i vremenskom razdoblju npr.
Npr. Pretražimo sve račune za Ivo Ivića , ili pretražimo sve račune što je obrt radio za Jamnicu u vremenskom razdoblju od 1.1.2022 do 1.3.20203 samo za usluge lektoriranja ili prevođenja teksta.
Omogućiti izdavanje računa – pdf download 

```
	
## Technogije i alati
Projekt je kreian s:
* nodejs v18.12.0
* react 18.2.0
* vscode
* git
	
## Setup
Za pokrenuti ovaj projekt, treba imati instaliranu verziju nodejs-a

```
$ cd ./pausalni-react-ui
$ npm install
$ npm start


aplikacija je dostupna na: http://localhost:3000/
```