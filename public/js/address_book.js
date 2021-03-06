/*jslint white: false, onevar: false nomen: false browser: true */
/*global alert, window, AddressList, $ */

$(document).ready(function() {
    $("#address").hide();
    $("#edit-dialog").hide();
    $("#address-list").showAddressList();

    $(".address-link").live("click",function(e){
        $.getJSON($(this).attr("href"), function(json) {
            $("#address").showAddress(json);
        });
        e.preventDefault();
    });

    $(".address-edit-link").live("click",function(e){
        $.getJSON($(this).attr("href"), function(json) {
            $("#edit-address-form").editAddress(json);
        });
        e.preventDefault();
    });

    $(".address-delete-link").live("click",function(e){
        var $this = $(this);
        var url = $this.attr('href');
        var callback = function(data){
            $("#address-list").showAddressList();
        };
         var options = { 
            success:   callback,
            url: url,
            type:     "DELETE",
            dataType: "json"
        }; 
        $(this).ajaxSubmit(options); 
        e.preventDefault();
    });

    $('#address-form').submit(function(event){
        event.preventDefault();
        var $this = $(this);
        var url = $this.attr('action');
        var dataToSend = $this.serialize();
        var callback = function(data){
            $("#address-list").addAddress(data);
        };
        var options = { 
            success:   callback,
            url: url,
            type:     "POST",
            dataType: "json",
            clearForm: true     
        }; 
        $(this).ajaxSubmit(options); 
    }); 

    $("#edit-address-form").live("submit",function(event){
        event.preventDefault();
        var $this = $(this);
        var url = $this.attr('action');
        var dataToSend = $this.serialize();
        var callback = function(data){
            $("#edit-dialog").dialog('close');
            $("#address-list").showAddressList();
        };
        var options = { 
            success:   callback,
            url: url,
            type:     "PUT",
            dataType: "json",
            clearForm: true     
        }; 
        $(this).ajaxSubmit(options); 
    }); 

});

