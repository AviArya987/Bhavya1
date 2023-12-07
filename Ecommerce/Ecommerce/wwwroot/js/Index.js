$('.addtocart').click(function () {
    alert('Hii');
    $('#divlogin').show();
})



var subarr = [{ Name: "Maths(Hons)", subcode: 1021, Selected: 0, Honssubcode: 1, IsHonors: 1 },
    { Name: "Physics(Hons)", subcode: 1022, Selected: 0, Honssubcode: 2, IsHonors: 1 },
    { Name: "Chemistry(Hons)", subcode: 1023, Selected: 0, Honssubcode: 3, IsHonors: 1 },
    { Name: "Maths(Sub)", subcode: 2021, Selected: 0, Honssubcode: 1, IsHonors: 0 },
    { Name: "Physics(Sub)", subcode: 2022, Selected: 0, Honssubcode: 2, IsHonors: 0 },
    { Name: "Chemistry(Sub)", subcode: 2023, Selected: 0, Honssubcode: 3, IsHonors: 0 },
    { Name: "Hindi(Sub)", subcode: 2024, Selected: 0, Honssubcode: 4, IsHonors: 0 },
    { Name: "English(Sub)", subcode: 2025, Selected: 0, Honssubcode: 5, IsHonors: 0 }]


var idx1 = -1;
var idx2 = -1;
var idx3 = -1;
var idx4 = -1;
var idx5 = -1;

// A $( document ).ready() block.
$(document).ready(function () {
    console.log("ready!");

    var item = '<option selected value="">--select--</option>';
    var itemddl1 = '<option selected value="">--select--</option>';
    console.log(subarr.length);
    $.each(subarr, function (index, element) {
        if (element.Selected == 0 && element.IsHonors == 1)
            itemddl1 += '<option value="' + element.subcode + '" data-id="' + element.subcode + element.Name+'">' + element.Name + element.subcode +'</option>';
    });
    $.each(subarr, function (index, element) {
        if (element.Selected == 0 && element.IsHonors == 0)
            item += '<option value="' + element.subcode + '" data-id="' + element.subcode + element.Name+'">' + element.Name + element.subcode +'</option>';
    });

    $("#ddl1").html(itemddl1);
    $("#ddl2").html(item);
    $("#ddl3").html(item);
    $("#ddl4").html(item);
    $("#ddl5").html(item);
});

function bindddl1() {
    var item = '<option selected value="">--select--</option>';
    $.each(subarr, function (index, element) {
        if (element.Selected == 0 && element.IsHonors==1) {
            item += '<option value="' + element.subcode + '" data-id="' + element.subcode + element.Name+'">' + element.Name + element.subcode + '</option>';
        }
    });
    $("#ddl1").html(item);
}

function bindddl2() {
    var item = '<option selected value="">--select--</option>';
    var selected = parseInt($("#ddl1 option:selected").val());
    var idx = subarr.findIndex(ele => ele.subcode === selected);
    var HonsSubCode = subarr[idx].Honssubcode;
    $.each(subarr, function (index, element) {
        if (element.Selected == 0 && element.IsHonors == 0 && element.Honssubcode != HonsSubCode) {
            item += '<option value="' + element.subcode + '" data-id="' + element.subcode + element.Name+'">' + element.Name + element.subcode + '</option>';
        }
    });
    $("#ddl2").html(item);
}

function bindddl3() {
    var item = '<option selected value="">--select--</option>';
    var selected = parseInt($("#ddl1 option:selected").val());
    var idx = subarr.findIndex(ele => ele.subcode === selected);
    var HonsSubCode = subarr[idx].Honssubcode;
    $.each(subarr, function (index, element) {
        if (element.Selected == 0 && element.IsHonors == 0 && element.Honssubcode != HonsSubCode) {
            item += '<option value="' + element.subcode + '" data-id="' + element.subcode + element.Name+'">' + element.Name + element.subcode + '</option>';
        }
    });
    $("#ddl3").html(item);
}

function bindddl4() {
    var item = '<option selected value="">--select--</option>';
    var selected = parseInt($("#ddl1 option:selected").val());
    var idx = subarr.findIndex(ele => ele.subcode === selected);
    var HonsSubCode = subarr[idx].Honssubcode;
    $.each(subarr, function (index, element) {
        if (element.Selected == 0 && element.IsHonors == 0 && element.Honssubcode != HonsSubCode) {
            item += '<option value="' + element.subcode + '" data-id="' + element.subcode + element.Name+'">' + element.Name + element.subcode + '</option>';
        }
    });
    $("#ddl4").html(item);
}

function bindddl5() {
    var item = '<option selected value="">--select--</option>';
    var selected = parseInt($("#ddl1 option:selected").val());
    var idx = subarr.findIndex(ele => ele.subcode === selected);
    var HonsSubCode = subarr[idx].Honssubcode;
    $.each(subarr, function (index, element) {
        if (element.Selected == 0 && element.IsHonors == 0 && element.Honssubcode != HonsSubCode) {
            item += '<option value="' + element.subcode + '" data-id="' + element.subcode + element.Name+'">' + element.Name + element.subcode + '</option>';
        }
    });
    $("#ddl5").html(item);
}


$("#ddl1").change(function () {
    var selected = parseInt($("#ddl1 option:selected").val());
    var idx = subarr.findIndex(ele => ele.subcode === selected);
    $.each(subarr, function (index, element) {
        element.Selected = 0;
    });
    console.log(idx);
    if (idx >= 0) {
        idx1 = idx;
        subarr[idx].Selected = 1;
        bindddl2();
        bindddl3();
        bindddl4();
        bindddl5();
    }
});

$("#ddl2").change(function () {
    var selected = parseInt($("#ddl2 option:selected").val());
    var idx = subarr.findIndex(ele => ele.subcode === selected);
    console.log(idx);
    $.each(subarr, function (index, element) {
        if (index != idx1)
            element.Selected = 0;
    });
    if (idx >= 0) {
        subarr[idx].Selected = 1;
        idx2 = idx;
        bindddl3();
        bindddl4();
        bindddl5();
    }
});

$("#ddl3").change(function () {
    var selected = parseInt($("#ddl3 option:selected").val());
    var idx = subarr.findIndex(ele => ele.subcode === selected);
    console.log(idx);
    $.each(subarr, function (index, element) {
        if (index != idx1 && index != idx2)
            element.Selected = 0;
    });

    if (idx >= 0) {
        idx3 = idx;
        subarr[idx].Selected = 1;
        bindddl4();
        bindddl5();
    }
});

$("#ddl4").change(function () {
    var selected = parseInt($("#ddl4 option:selected").val());
    var idx = subarr.findIndex(ele => ele.subcode === selected);
    console.log(idx);
    $.each(subarr, function (index, element) {   
        if (index != idx1 && index != idx2 && index != idx3)
            element.Selected = 0;
    });

    if (idx >= 0) {
        idx4 = idx;
        subarr[idx].Selected = 1;
        bindddl5();
    }
});

$("#submitForm").on('click', function (e) {
    e.preventDefault();
    if (validateForm()) {
        InsertSubjectData();
    }
});


function validateForm() {
    var errorMsg = '';
    var error = false;
    if (!$("#ddl1").val()) {
        error = true;
        errorMsg += 'Please Select Subject 1';
    }
    if (!$("#ddl2").val()) {
        error = true;
        errorMsg += 'Please Select Subject 2';
    }
    if (!$("#ddl3").val()) {
        error = true;
        errorMsg += 'Please Select Subject 3';
    }
    if (!$("#ddl4").val()) {
        error = true;
        errorMsg += 'Please Select Subject 4';
    }
    if (!$("#ddl5").val()) {
        error = true;
        errorMsg += 'Please Select Subject 5';
    }
    if (error) {
        alert(errorMsg);
        return false;
    }
    else {
        return true;
    }
}

function InsertSubjectData() {
    var Url = '/Home/SubmitForm';
    var model = {
        Id: $("#hdnId").val() ? parseInt($("#hdnId").val()):0,
        Name:$("#txtName").val(),
        Sub1Id: parseInt($("#ddl1").val()),
        Sub2Id: parseInt($("#ddl2").val()),
        Sub3Id: parseInt($("#ddl3").val()),
        Sub4Id: parseInt($("#ddl4").val()),
        Sub5Id: parseInt($("#ddl5").val()),
        Sub1Name: $("#ddl1 option:selected").attr("data-id"),
        Sub2Name: $("#ddl2 option:selected").attr("data-id"),
        Sub3Name: $("#ddl3 option:selected").attr("data-id"),
        Sub4Name: $("#ddl4 option:selected").attr("data-id"),
        Sub5Name: $("#ddl5 option:selected").attr("data-id"),
    }

    $.ajax({
        url: Url,
        type: "POST",
        data: JSON.stringify(model),
        contentType: 'application/json; charset=utf - 8',
        dataType: "json", 
        success: function (data) {
            //$('#' + $formId + ' :input.form_errors').removeClass('form_errors')
            if (data.responseCode == 200) {
                alert("Saved Successfully");
            }
            else {
                alert(data.responseMessage);
            }

        },
        error: function (data) {
            alert("Some Error Occured");
        }
    });
}

