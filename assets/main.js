/* SLIDER */
const $carousel = $('.slider');

let settings = {
    dots: false,
    arrows: true,
    slide: '.slick-slideshow__slide',
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '60px',
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
};

function setSlideVisibility() {
    const visibleSlides = $carousel.find('.slick-slideshow__slide[aria-hidden="false"]');
    $(visibleSlides).each(function() {
        $(this).css('opacity', 1);
    });
    $(visibleSlides).first().prev().css('opacity', 0);
}

$carousel.slick(settings);
$carousel.slick('slickGoTo', 1);

setSlideVisibility();

$carousel.on('afterChange', function() {
    setSlideVisibility();
});

/* CONTACT FORM */
$(function() {
    $('#contact').click(function() {
        $('#contactForm').fadeToggle();
    })
    $(document).mouseup(function (e) {
        const container = $("#contactForm");
    });
});

function checkContactForm() {
    let isFilled = true;
    $(".checker").each(function() {
        const element = $(this);
        if (element.val() === "") {
            isFilled = false;
        }
    });
    return isFilled;
}

function submitContact() {
    if (!checkContactForm()) {
        alert('Merci de remplir tous les champs du formulaire');
        return;
    }
    getGender();
}

/* API CALL */
function getGender() {
    const name = $("#name").val();
    const url = "https://api.genderize.io?name=" + name;

    $.ajax({
        url: url,
        method: "GET",
        dataType: 'json'
    })
        .done(function(response){
            const popup = $("#myPopup");
            $(popup).removeClass("d-none").addClass("d-block");
            if (response.gender === "male") {
                $(popup).text("Rosebud");
                $(".close-all").removeClass("d-none").addClass("d-block");
            } else if (response.gender === "female") {
                $(popup).text("We rob banks");
                $(".close-all").removeClass("d-none").addClass("d-block");
            } else {
                $(popup).text("It's a trap !");
                $(".close-all").removeClass("d-none").addClass("d-block");
            }
        })
        .fail(function(error){
            const popup = $("#myPopup");
            $(popup).removeClass("d-none").addClass("d-block");
            $(popup).text("It's a trap !");
            console.log("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
        })
        .always(function(){
            console.log("Requête effectuée");
        });

}

/* CLOSE MODAL */
function closeAll() {
    $(".close-all, #myPopup").removeClass("d-block").addClass("d-none");
    $(".form-control").val("");
}
