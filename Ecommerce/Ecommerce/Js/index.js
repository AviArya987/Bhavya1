$('.addtocart').click(function () {
    alert('Hii');
    $('#divlogin').show();
})



// A $( document ).ready() block.
$(document).ready(function () {
    console.log("ready!");


    var subarr = [{ Name: "Maths(Hons)", subcode: 1021, Selected: 0 }, { Name: "Physics(Hons)", subcode: 1021, Selected: 0 },
    { Name: "Chemistry(Hons)", subcode: 1021, Selected: 0 }, { Name: "Maths(Sub)", subcode: 1021, Selected: 0 },
    { Name: "Physics(Sub)", subcode: 1021, Selected: 0 }, { Name: "Chemistry(Sub)", subcode: 1021, Selected: 0 }]


    var item = '<option selected value="">--select--</option>';
    $subarr.each(index, element, function () {
        item += <option selected value="">--select--</option>;
    });


    $("#ddl1").html(item);
});
