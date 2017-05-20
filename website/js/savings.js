// JavaScript Document
(function ($, window) {
    "use strict";

    var savings = {};

    savings.globals = {
        plan: null
    };

    savings.utils = {
        isLoggedIn : function(){
            if($.cookie('account') == undefined){
                $.mobile.navigate('#screen-welcome');
            }
        }
    };

    savings.init = function(){

        $('#delete-account').on('click', function(evt){
            evt.preventDefault();
            $.mobile.navigate('#screen-deleting-account');
        });

        $('body').on('click',".plan-details-link", function(e){
            e.preventDefault();
            savings.globals.plan = this.id;
            $.mobile.navigate('#screen-plan-details');
        });


        var $allForms = $('.form');
        $allForms.on('submit', function(){
            // faking form submission
            //

            if(this.id == 'create-plan-form'){
                if($.cookie('plans') !== undefined ){
                    var plans = parseInt($.cookie('plans'));
                    plans++;
                    $.cookie('plans', plans);
                } else {
                    $.cookie('plans', 1);
                }
            }

            if(this.id == 'friends-family-form'){
                if($.cookie('friends') !== undefined ){
                    var friends = parseInt($.cookie('friends'));
                    friends++;
                    $.cookie('friends', friends);
                } else {
                    $.cookie('friends', 1);
                }
            }

            if(this.id == 'pin-code-form'){
                $.cookie('account', 'true');
            }

            var destination = $(this).attr('action');
            $.mobile.navigate(destination);
            return false;
        });





        //var $logoutButtons = $('.logout-button');
        //$logoutButtons.on('click', function(evt){
        //    evt.preventDefault();
        //    // do some ajax to log user out
        //    //
        //    var destination = $(this).attr('href');
        //    $.mobile.navigate(destination);
        //});
        //
        //var $refreshButtons = $('.page-refresh');
        //$refreshButtons.on('click', function(evt){
        //    evt.preventDefault();
        //    location.reload(); // For standalone browsers
        //});

        //var $closePanelButtons = $('.close-panel');
        //$closePanelButtons.on('click', function(evt){
        //    evt.preventDefault();
        //
        //    var panelID = '#' + $(this).parents('.panel').attr('id');
        //    $(panelID).panel("close");
        //});



    };


    $(document).on("pagebeforeshow", "#screen-saving-plans", function(){

        savings.utils.isLoggedIn();

        var $plansList = $('#plans-list'),
                plans = 0;

        if($.cookie('plans') !== undefined ){
            plans = parseInt($.cookie('plans'));
        }

        if(plans > 0){
            $plansList.empty();
            $('#plans-list-header').removeAttr('class');
            for(var x=0; x<plans; x++){
                $plansList.append('<li><a href="#" class="ui-nodisc-icon ui-alt-icon plan-details-link" id="'+ (x+1) +'">Saving Plan '+ (x+1) +'</a></li>');
            }
            $plansList.listview('refresh');
        }

    });

    $(document).on("pagebeforeshow", "#screen-friends-family", function(){

        savings.utils.isLoggedIn();

        var $friendsList = $('#friends-list'),
                friends = 0;

        if($.cookie('friends') !== undefined ){
            friends = parseInt($.cookie('friends'));
        }

        if(friends > 0){
            $friendsList.empty();
            $('#friends-list-header').removeAttr('class');
            for(var x=0; x<friends; x++){
                $friendsList.append('<li><a href="#" class="ui-nodisc-icon ui-alt-icon">'+ (x+1) +' Adam / 0785 1063 452</a></li>');
            }
            $friendsList.listview('refresh');
        }

    });

    $(document).on("pageshow", "#screen-deleting-account", function(){
        var timer = setTimeout(function(){
            $.mobile.navigate('#screen-welcome');
            $.removeCookie('plans');
            $.removeCookie('friends');
            $.removeCookie('account');
            clearTimeout(timer);
        }, 2000);
    });

    $(document).on("pageshow", "#screen-first-name", function(){
        //console.log($('#phone-number'));
        $('.focus').focus();
    });

    $(document).on("pagebeforeshow", "#screen-welcome", function(){
        if($.cookie('account') !== undefined){
            $('#submit-welcome').addClass('display-none');
            $('#submit-login').removeClass('display-none');
            $('#delete-account').removeClass('display-none');
        } else {
            $('#submit-welcome').removeClass('display-none');
            $('#submit-login').addClass('display-none');
            $('#delete-account').addClass('display-none');
        }
    });

    $(document).on("pagebeforeshow", "#screen-plan-details", function(){
        console.log($('#plan-name'));
        console.log(savings.globals.plan);
        console.log('Saving plan');
        $('#plan-name').empty().html('Saving plan '+savings.globals.plan);



    });


    //$(document).on("pagebeforeshow", "#screen-first-name", function(){
    //    savings.utils.isLoggedIn();
    //});
    //
    //$(document).on("pagebeforeshow", "#screen-last-name", function(){
    //    savings.utils.isLoggedIn();
    //});
    //
    //$(document).on("pagebeforeshow", "#screen-add-saver", function(){
    //    savings.utils.isLoggedIn();
    //});
    //
    $(document).on("pagebeforeshow", "#screen-admin-landing", function(){
        savings.utils.isLoggedIn();
        if($.cookie('friends') !== undefined){
            $('#friends-count').empty().html($.cookie('friends'))
        } else {
            $('#friends-count').empty().html('0');
        }

        if($.cookie('plans') !== undefined){
            $('#plans-count').empty().html($.cookie('plans'))
        } else {
            $('#plans-count').empty().html('0');
        }
    });
    //
    //$(document).on("pagebeforeshow", "#screen-create-plan", function(){
    //    savings.utils.isLoggedIn();
    //});
    //
    //$(document).on("pagebeforeshow", "#screen-friends-family", function(){
    //    savings.utils.isLoggedIn();
    //});
    //
    //$(document).on("pagebeforeshow", "#screen-pin-code", function(){
    //    savings.utils.isLoggedIn();
    //});
    //
    //$(document).on("pagebeforeshow", "#screen-saving-plans", function(){
    //    savings.utils.isLoggedIn();
    //});


    $(document).ready(function () {
        savings.init();
    });

}(jQuery, window));
