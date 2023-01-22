/* De script inladen nadat de pagina volledig ingeladen is. */
$(document).ready(() => {
    /* Het lokaal opgeslagen getal wordt weer opgehaald voor de onderstaande procedure. */
    const getal = localStorage.getItem('waarde');
    /* Laten zien dat het getal als waarde reeds lokaal opgeslagen is. */
    /* alert(getal); */
    /* De veelgebruikte variabelen alvast klaarzetten. */
    let blogartikelen = "";
    /* Het alvast vastleggen van een HTML-pagina als een zogenaamde database. */
    const pagina = "blog_database.html";
    /* Het inladen van een zogenaamde tabel vanuit "blog_database.html" in dit HTML-document als een truukje zodat lijkt alsof het altijd deel uitgemaakt heeft van dit document. Dit gebeurt via functie "$.ajax". */
    $.ajax({
        url: pagina,
        type: 'GET',
        beforeSend: () => {
            /* Het laten zien van icon "icon_laden.gif". */
            $('#icon_laden').show();
            /* Het pulseren van icon "icon_laden.gif". Dit is een leuke manier om de pulserende afbeelding te laten zien aan de bezoekers als de inlaadtijd vertraagd is. */
            pulserende_interval = setInterval(() => {
                $('#icon_laden').animate({
                    width: '+=10px',
                    height: '+=10px'
                    }, 1000, 'easeOutElastic', () => {
                    $('#icon_laden').animate({
                        width: '-=10px',
                        height: '-=10px'
                    }, 1000, 'easeInElastic');
                });
            }, 2000);
        },
        success: (data) => {
            /* Het pulseren van icon "icon_laden.gif" weer laten stoppen. */
            clearInterval(pulserende_interval);
            /* Het verbergen van icon "icon_laden.gif". */
            $('#icon_laden').hide();
            /* Het extraheren van tabel uit gevonden "data". */
            const $tabel = $(data).find('table');
            /* Het toevoegen van tabel in het div-element "#tabel". */
            $('#tabel').html($tabel);
            /* Het div-element "#tabel" moet verborgen blijven. */
            $('#tabel').css({'display': 'none'});
            /* Hieronder wordt er alleen een HTML-code speciaal voor gekozen blogartikel gegenereerd. */
            /* Blogartikel */
            blogartikelen += "<div id='blogdetail_" + getal + "' class='achtergrond_roze'>\n";
            /* Afbeelding */
            blogartikelen += "\t<img class='blog_afbeelding_aangepast' src='../img/" + $("#tabel #" + getal + " td:eq(6)").html() + "' title='" + $("#tabel #" + getal + " td:eq(1)").html() + "' alt='" + $("#tabel #" + getal + " td:eq(7)").html() + "'>\n";
            /* Blog */
            blogartikelen += "\t<section class='inhoud_2'>\n";
            /* Titel */
            blogartikelen += "\t\t<h3 class='tekst_links'>" + $("#tabel #" + getal + " td:eq(1)").html() + "</h3>\n";
            /* Inhoud */
            blogartikelen += "\t\t<p class='tekst_links'>" + $("#tabel #" + getal + " td:eq(2)").html() + "</p>\n";
            /* Naam, functie en datum */
            blogartikelen += "\t\t<h6>" + $("#tabel #" + getal + " td:eq(3)").html() + " &#124; " + $("#tabel #" + getal + " td:eq(4)").html() + " &#124; " + $("#tabel #" + getal + " td:eq(5)").html() + "</h6>\n";
            blogartikelen += "\t</section>\n";
            blogartikelen += "</div>\n";
            /* Laten zien hoe de HTML-code speciaal voor blogartikelen opgebouwd is. */
            /* console.log(blogartikelen); */
            /* Voeg de blogartikelen toe aan een section-element "#blog". */
            $('#blog').append(blogartikelen);
            /* De foto vervagen wanneer de muis over de afbeelding ".blog_afbeelding" gaat. */
            $(".blog_afbeelding_aangepast").mouseenter(function () {
                $(this).animate({opacity: '0.1'}, 250);
            });
            /* De foto verscherpen wanneer de muis van de afbeelding ".blog_afbeelding" gaat. */
            $(".blog_afbeelding_aangepast").mouseleave(function () {
                $(this).animate({opacity: '1'}, 250);
            });
        },
        error: (xhr, status, error) => {
            /* Het pulseren van icon "icon_laden.gif" weer laten stoppen. */
            clearInterval(pulserende_interval);
            /* Het verbergen van icon "icon_laden.gif". */
            $("#icon_laden").hide();
            /* Het laten zien van een foutvermelding. */
            console.log('Foutvermelding: ' + error);
        }
    });
});
/* De onderstaande script wordt pas uitgevoerd nadat de bovenstaande procedure uitgevoerd is. Anders wordt het nav-element "groep_links_blog" nog niet gevonden om de berekening te kunnen maken. */
document.addEventListener("DOMContentLoaded", () => {
    /* De hoogte van nav-element "groep_links_blog" berekenen. */
    nav_hoogte_grijs = document.getElementById("groep_links_blog").offsetHeight;
    /* Laten zien wat de hoogte is. */
    /* alert(nav_hoogte_grijs); */
    /* Deze hoogte wordt als CSS-eigenschap vastgelegd om het te kunnen gebruiken voor CSS. Let goed op dat er twee streepjes aan de linkerkant van de JS-variabele aanwezig moeten zijn. Ze kenmerken deze variabele als CSS-variabele.*/
    document.documentElement.style.setProperty('--nav_hoogte_grijs', nav_hoogte_grijs + 'px');
});