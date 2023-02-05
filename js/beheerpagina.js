/* De functie dialoog gebruiken als een soort alert-functie. Deze functie moet hier staan. */
function openDialoog(id, titel, inhoud, positie, callback) {
    $(id).dialog({
        /* Titel */
        title: titel,
        /* Inhoud */
        content: inhoud,
        /* Modaal dialoogvenster instellen. Hierdoor is het niet mogelijk om de andere handelingen te kunnen doen in een venster (o.a. drukken op een button) tot het dialoogvenster weggeklikt wordt. */
        modal: true,
        /* Het dialoogvenster versleepbaar maken. */
        draggable: true,
        /* Het dialoogvenster oriënteren in de rechterbovenhoek van het venster. */
        position: positie,
        /* De afmetingen van dialoogvenster aanpasbaar maken. */
        resizable: true,
        /* Verschijneffect. Zie de website https://api.jqueryui.com/easings voor verscheidene soorten effecten. */
        show: {
            easing: 'easeOutSine',
            duration: 1000
        },
        /* Verdwijneffect. */
        hide: {
            easing: 'easeOutSine',
            duration: 1000
        },
        /* Als de dialoogvenster gesloten is, dan gaat de volgende procedure van start. */
        close: () => {
            if (callback) {
                callback();
            };
        }
    });
    $(id).dialog('open');
};
/* De script inladen nadat de pagina volledig ingeladen is. */
$(document).ready(() => {
    /* De datum van vandaag wordt alvast als standaard klaargezet. */
    let vandaag = new Date();
    let dag = vandaag.getDate();
    /* Er moet 1 erbij opgeteld worden, want januari staat gelijk aan 0. */
    let maand = vandaag.getMonth() + 1;
    let jaar = vandaag.getFullYear();
    /* De juiste formaat voor zowel dag als maand wordt gegenereerd. */
    if (dag < 10) {
        dag = '0' + dag;
    };
    if (maand < 10) {
        maand = '0' + maand;
    };
    /* De datum wordt in een juiste formaat in elkaar gezet. */
    vandaag = dag + '-' + maand + '-' + jaar;
    /* De standaarddatum wordt nu in een beheerpagina gezet. */
    document.getElementById('datum').value = vandaag;
    /* De button "button_verzenden" koppelen aan de functie. */
    $('#button_verzenden').on('click', () => {
        /* De veelgebruikte variabelen alvast klaarzetten. */
        let compleet = true;
        let blogartikel = "";
        /* Er wordt eerst gecontroleerd of alle velden ingevuld zijn alvorens de procedure verder kan gaan. Deze kan ook: document.getElementsByClassName('invoerveld'). */
        document.querySelectorAll('.invoerveld').forEach((waarde) => {
            /* Het uitroepteken naast een variabele betekent dat de waarde tegenovergesteld is. Dus in dit geval is het false. */
            if (!compleet) {return;};
            /* Als er geen waarde ingevoerd is. */
            if (!waarde.value) {compleet = false;};
        })
        /* De procedure wordt stopgezet. */
        if (!compleet) {openDialoog('#dialoog1', 'Attentie!', $('#dialoog1').html(), {my: "center", at: "center", of: window});}
        /* De procedure wordt voortgezet. */
        else {
            /* Het aantal records dat in de tabel "blogs" staat tellen. */
            const tabel = document.getElementById('database');
            /* Alleen de records die tussen tbody-elementen staan tellen. */
            const record_aantal = tabel.tBodies[0].rows.length;
            const record_nummer = parseInt(record_aantal) + 1;
            /* Er wordt een complete pad als waarde getoond bij "Afbeelding blogartikel". De naam van het bestand moet hieruit gefilterd worden. */
            const tekst = $('#afbeelding').val();
            /* Bij het gebruiken van achterwaartse schuine streep (back slash) als scheidingsteken moet er rekening gehouden dat er tweemaal datzelfde teken gebruikt moet worden bij de functie "split". De andere functie "pop" staat voor een laatste waarde als die nodig is. */
            let splitsen = tekst.split('\\').pop();
            /* Let hier goed op dat er geen spaties aanwezig mogen zijn in de bovenbeschreven waarde. */
            splitsen = splitsen.replaceAll(' ', '_');
            /* Hieronder wordt er een HTML-gedeelte gegenereerd om een nieuw blogartikel zogenaamd toe te voegen aan de database. */
            blogartikel += "<tr id=" + record_nummer + ">\n";
            blogartikel += "\t<td>" + record_nummer + "</td>\n";
            blogartikel += "\t<td>" + $('#titel').val() + "</td>\n";
            blogartikel += "\t<td>" + $('#inhoud').val() + "</td>\n";
            blogartikel += "\t<td>" + $('#naam').val() + "</td>\n";
            blogartikel += "\t<td>" + $('#functie').val() + "</td>\n";
            blogartikel += "\t<td>" + $('#datum').val() + "</td>\n";
            blogartikel += "\t<td>" + splitsen + "</td>\n";
            blogartikel += "\t<td>" + $('#alternatief').val() + "</td>\n";
            blogartikel += "</tr>";
            /* Laten zien hoe de HTML-code speciaal voor blogartikelen opgebouwd is. */
            /* console.log(blogartikel); */
            /* Nu wordt er een nieuwe blogartikel als record toegevoegd aan de database. */
            $('tbody').append(blogartikel)
            /* De invulvelden worden nu opgeschoond. Deze kan ook: document.getElementsByClassName('invoerveld'). */
            document.querySelectorAll('.invoerveld').forEach((waarde) => {
                waarde.value = '';
            })
            /* Nu laten zien dat het record daadwerkelijk toegevoegd is aan de tabel "blogartikelen" door op dit record te focussen op het scherm. En dan weer teruggaan naar de beheerpagina. */
            openDialoog('#dialoog2', 'Attentie!', $('#dialoog2').html(), {my: "center", at: "center", of: window}, () => {
                document.getElementById(record_nummer).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                openDialoog('#dialoog3', 'Attentie!', $('#dialoog3').html(), {my: "center", at: "center", of: "#" + record_nummer, collision: "flip"}, () => {
                    document.getElementById('container_2').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                    /* De standaarddatum wordt nu in een beheerpagina gezet. */
                    document.getElementById("datum").value = vandaag;
                });
            });
        }
    });
    /* De regionale taal instellen op Nederlands bij zelfgekozen datumkiezer. */
    $('#datum').datepicker(
        $.datepicker.regional['nl'],
    );
});