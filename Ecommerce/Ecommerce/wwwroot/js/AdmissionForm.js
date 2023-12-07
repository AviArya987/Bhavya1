var _AdmissionDetails = new Array();
var _ManageAdmission = function () {
    this.hdnRefId = $("#hdnRefId");
    this.btnCancel = $("#btnCancel");
    this.ddlMainAttribute = $("#ddlMainAttribute");
    this.ddlSubAttribute = $("#ddlSubAttribute");
    this.txtPlanName = $("#txtPlanName");
    this.txtPlanAmount = $("#txtPlanAmount");
    this.txtAmount = $("#txtAmount");
    this.btnCreateandClose = $("#btnCreateandClose");
    this.btnCreate = $("#btnCreate");
    this.btnEdit = $("#btnEdit");
    this.btnClose = $("#btnClose");
    this.hdnCompId = $("#hdnCompId");
    this.divCompTbl = $("#divCompTbl");
    this.tbl_Component = $("#tbl_Component");
    this.lstComponents = new Array();
    this.hdnAction = $("#hdnAction");
    this.hdnId = $("#hdnId");
    this.linkFromSubmit = $("#linkFromSubmit");
    this.MainAttribute = new Array();
    this.SubAttribute = new Array();
};

var _Handler;
var errorMsg = ''

$(document).ready(function () {
    _Handler = new _ManageAdmission();
    _Handler.BindEvents();
});
_ManageAdmission.prototype.BindMainAttribute = function () {

    var h = this;
    var items = '<option value="">--Select--</option>';
    
    $.each(h.MainAttribute, function (i, item) {
        items += "<option value='" + item.Id + "' data-value='" + item.Value + "'>" + item.Value + "</option>";
    });
    h.ddlMainAttribute.html(items);
}

_ManageAdmission.prototype.BindSubAttribute = function () {
    var h = this;
    var items = '<option value="">--Select--</option>';
    var pUrl = "/Home/GetGenderList"
    $.each(h.SubAttribute, function (i, item) {
        if(!item.Selected)
            items += "<option value='" + item.Id + "' data-value='"+ item.Value +"' >" + item.Value + "</option>";
    });
    h.ddlSubAttribute.html(items);
}

_ManageAdmission.prototype.BindEvents = function () {
    var h = this;
    function goToPage() {
        window.location.href = '/Home/Default';
    }

    h.MainAttribute = [
        {Id:1, Value:'MU Fund', Selected:0},
        { Id: 2, Value:'Gen Fund', Selected:0},
        { Id: 3, Value:'Dev Fund', Selected:0},
    ]

    h.SubAttribute = [
        { Id: 1, Value: 'Tution Fee', Selected: 0 },
        { Id: 2, Value: 'Admission Fee', Selected: 0 },
        { Id: 3, Value: 'Electricity', Selected: 0 },
        { Id: 4, Value: 'ID Card', Selected: 0 },
        { Id: 5, Value: 'Reg Fee', Selected: 0 },
    ]

    h.BindMainAttribute();
    h.BindSubAttribute();

    h.btnCreateandClose.off('click').on('click', function (e) {
        if (SubmitValidation()) {
            InsertUpdtAdmDetail();
        }
    });

    h.btnCreate.off('click').on('click', function (e) {
        if (ComponentFirstValidation()) {
            h.AddTempComponent();
            ResetComponent();
        }
    });

    // Insert data
    function InsertUpdtAdmDetail() {
        var model = {
            Id: h.hdnId.val() ? parseInt(h.hdnId.val()):0,
            Plan_Name: h.txtPlanName.val(),
            Plan_Amount: h.txtPlanAmount.val(),
            lstcomp:h.lstComponents
        };
        console.log(JSON.stringify(model));
        var Url = "/Admission/InsertUpdtAdmDetail";
        $.ajax({
            type: "POST",
            url: Url,
            data: JSON.stringify(model),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            async: false,
            success: function (data) {
                alertify.alert('Admission', data.responseMessage, function () {
                    if (data.responseCode == 200 || data.responseCode == 201) {
                        goHomePage();
                    }
                });
                alertify.notify('Admission Detail' + data.responseMessage, 'success', 2, function () {
                    if (data.responseCode == 200 || data.responseCode == 201) {
                        goHomePage();
                    }
                });
            },
            error: function (data) {
            }
        });
    }

    h.btnClose.click(function () {
        alertify.confirm('', 'Are you sure you want to Cancel ?'
            , function () { window.location.href = '/Admission/AdmissionDashboard'; }
            , function () { alertify.error('Close') });
    });

    $(document).on('click', '#tbl_Component .EditComp', function () {
        var id = $(this).data("id");
        UpdateCompById(id);
    });
    function goToPage() {
        window.location.href = '/Home/Home';
    }
    function goToHome() {
        window.location.href = '/Home/Home';
    }

    function ComponentFirstValidation() {
        var IsValid = true;
        var errorMsg = '';

        if (!$('#txtPlanAmount').val()) {
            errorMsg = errorMsg + "Please Enter Plan Amount.<br/>";
            IsValid = false;
        }

        if ($('#ddlMainAttribute').val() == "" || $('#ddlMainAttribute').val() == undefined) {
            errorMsg = errorMsg + "Please Enter Main Attribute.<br/>";
            IsValid = false;
        }
        if (!$('#ddlSubAttribute').val()) {
            errorMsg = errorMsg + "Please Select Sub Attribute.<br/>";
            IsValid = false;
        }
        if (!$('#txtAmount').val()) {
            errorMsg = errorMsg + "Please Enter Amount.<br/>";
            IsValid = false;
        }
        var amount = 0;
        $.each(h.lstComponents, function (i, item) {
            amount += item.Amount;
        });
        if (parseInt($('#txtAmount').val()) + amount > parseInt(h.txtPlanAmount.val())) {
            errorMsg = errorMsg + "Total Component Amount must be less than total Amount.<br/>";
            IsValid = false;
        }
        
        if (!IsValid) {
            alertify.alert("Admission Form", errorMsg);
            return IsValid
        }
        else
            return IsValid
    }

    function SubmitValidation() {
        var IsValid = true;
        var errorMsg = '';

        if (!$('#txtPlanName').val()) {
            errorMsg = errorMsg + "Please Enter Plan Name.<br/>";
            IsValid = false;
        }
        if (!$('#txtPlanAmount').val()) {
            errorMsg = errorMsg + "Please Enter Plan Amount.<br/>";
            IsValid = false;
        }
        if (h.lstComponents.length <= 0) {
            errorMsg = errorMsg + "Please Add Component.<br/>";
            IsValid = false;
        }
        var amount = 0;
        $.each(h.lstComponents, function (i, item) {
            amount += item.Amount;
        });
        if (parseInt(amount) > parseInt(h.txtPlanAmount.val())) {
            errorMsg = errorMsg + "Total Component Amount must be less than total Amount.<br/>";
            IsValid = false;
        }

        if (!IsValid) {
            alertify.alert("Admission Form", errorMsg);
            return IsValid
        }
        else
            return IsValid
    }

    function goHomePage() {
        window.location.href = '/Admission/AdmissionDashboard';
    }

    function ResetComponent() {
        h.ddlMainAttribute.val("");
        h.ddlSubAttribute.val("");
        h.txtAmount.val("");
        h.BindMainAttribute();
        h.BindSubAttribute();
    }

    h.btnEdit.on('click', function () {
        var Id = parseInt(h.hdnCompId.val());
        var comp = h.lstComponents.find(data => data.Id == Id);
        var amt = 0;
        $.each(h.lstComponents, function (idx, item) {
            if (comp.Id != item.Id) {
                amt += item.Amount;
            }
        });

        var isValid = true;
        var errorMsg = '';
        if (!h.ddlMainAttribute.val()) {
            errorMsg += 'Total Select Main Attribute </br>';
            isValid = false;
        }
        if (!h.ddlSubAttribute.val()) {
            errorMsg += 'Total Select Sub Attribute </br>';
            isValid = false;
        }
        if (!h.txtAmount.val()) {
            errorMsg += 'Total enter Amount </br>';
            isValid = false;
        }
        if (h.txtPlanAmount.val()!="" && amt + parseInt(h.txtAmount.val()) > parseInt(h.txtPlanAmount.val())) {
            errorMsg += 'Total Amount must be equal to Plan Amount </br>';
            isValid = false;
        }

        if (!isValid) {
            alertify.alert('Admission Form', errorMsg);
        }
        else {
            Id = h.hdnCompId.val();
            compIdx = h.lstComponents.findIndex(data => data.Id == Id);
            var mainAttrId = h.ddlMainAttribute.val();
            var subAttrId = h.ddlSubAttribute.val();
            h.lstComponents[compIdx].MainAttributeId = parseInt(mainAttrId);
            h.lstComponents[compIdx].MainAttribute = h.MainAttribute.find(dt => dt.Id == mainAttrId).Value;
            h.lstComponents[compIdx].SubAttributeId = parseInt(subAttrId);
            h.lstComponents[compIdx].SubAttribute = h.SubAttribute.find(dt => dt.Id == subAttrId).Value;
            h.lstComponents[compIdx].Amount = parseInt(h.txtAmount.val());
            h.hdnCompId.val(0);
            h.ddlMainAttribute.val("");
            h.ddlSubAttribute.val("");
            h.txtAmount.val("");
            h.txtPlanAmount.prop("disabled", false);
            h.createComponentTable();
            if (h.lstComponents.length > 0) {
                $.each(h.lstComponents, function (i, item) {
                    var idx = h.SubAttribute.findIndex(dt => dt.Id == item.SubAttributeId);
                    if (idx > -1) {
                        h.SubAttribute[idx].Selected = 1;
                    }
                })
            }
            h.BindSubAttribute();
            h.btnEdit.hide();
            h.btnCreate.show();
        }

    })

    function UpdateCompById(elem) {
        var idx = h.lstComponents.findIndex(data => data.Id == elem);
        if (idx > -1) {
            var item = h.lstComponents[idx];
            if (h.lstComponents.length > 0) {
                $.each(h.lstComponents, function (i, item) {
                    var idx = h.SubAttribute.findIndex(dt => dt.Id == item.SubAttributeId);
                    if (idx > -1) {
                        h.SubAttribute[idx].Selected = 1;
                    }
                })
            }

            h.ddlMainAttribute.val(item.MainAttributeId);
            var subAttrIdx = h.SubAttribute.findIndex(data => data.Id == item.SubAttributeId);
            var subIdx = h.SubAttribute.find(data => data.Id == item.SubAttributeId);
            h.SubAttribute[subAttrIdx].Selected = 0;
            h.BindSubAttribute();
            h.ddlSubAttribute.val(subIdx.Id);
            h.txtAmount.val(item.Amount);
            h.btnEdit.show();
            h.btnCreate.hide();
            h.hdnCompId.val(item.Id);
            h.txtPlanAmount.prop('disabled', true);
            //h.createComponentTable();
        }
    }
}

_ManageAdmission.prototype.AddTempComponent = function () {
    var h = this;
    var Id = h.lstComponents.length > 0 ? h.lstComponents[(h.lstComponents.length-1)].Id+1:1;
    var comp = {
        Id:Id,
        MainAttributeId: parseInt(h.ddlMainAttribute.val()),
        SubAttributeId: parseInt(h.ddlSubAttribute.val()),
        MainAttribute:$("#ddlMainAttribute option:selected").attr("data-value"),
        SubAttribute: $("#ddlSubAttribute option:selected").attr("data-value"),
        Amount:parseInt(h.txtAmount.val())
    }
    h.lstComponents.push(comp);
    h.createComponentTable();
    var idx = h.SubAttribute.findIndex(item => item.Id == comp.SubAttributeId);
    if (parseInt(idx) > -1)
        h.SubAttribute[parseInt(idx)].Selected = 1;
}

_ManageAdmission.prototype.createComponentTable = function () {

    var h = this;

    var table = '<table style="width:100%" id="tbl_Component" class="table table-bordered table-hover table-sm dataTable no-footer"><tr class="heading"><th class="cell-title">Sr No.</th><th class="cell-title">Main Attribute</th><th class="cell-title">Sub Attribute</th><th class="cell-title">Amount</th><th class="hdrDelete">Edit</th><th class="hdrDelete">Delete</th></tr>';
    //<th class="cell-title">Contact Person</th ><th class="cell-title">Contact Email</th><th class="cell-title">Contact Phone</th>
    
    $.each(h.lstComponents, function (index, value) {
        table += '<tr class="read">';
        table += '<td>' + (index + 1) + '</td>';
        table += '<td>' + value.MainAttribute + '</td>';
        table += '<td>' + value.SubAttribute + '</td>';
        table += '<td>' + value.Amount + '</td>';
        table += '<td><a style="cursor:pointer;" data-id="' + value.Id + '" tooltip="Edit" class="EditComp" ><i class="fas fa-pencil text-primary"></i></a></td>';
        table += '<td><a style="cursor:pointer;" data-id="' + value.Id + '" tooltip="Delete" class="DeleteComp"><i class="fas fa-trash text-danger"></i></a></td>';
        //onclick = "UpdateCompById(this)"
        table += '</tr>'
    });
    table += '<tr></tr></table>';
    if (h.lstComponents.length > 0) {
        $("#divCompTbl").html(table);
    }
    else {
        $("#divCompTbl").html("");
    }
}
