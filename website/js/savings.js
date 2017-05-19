// JavaScript Document
(function ($, window) {
    "use strict";

    var savings = {};

    savings.CONSTANTS = {
        strings : {
            clientAccount: "Client account",
            location: "Location",
            cop: "Community of Practice"
        }
    };

    savings.globals = {
        plans: 0,
        friends: 0
    };

    savings.init = function(){

        var $logoutButtons = $('.logout-button');
        $logoutButtons.on('click', function(evt){
            evt.preventDefault();
            // do some ajax to log user out
            //
            var destination = $(this).attr('href');
            $.mobile.navigate(destination);
        });

        var $refreshButtons = $('.page-refresh');
        $refreshButtons.on('click', function(evt){
            evt.preventDefault();
            location.reload(); // For standalone browsers
        });

        var $allForms = $('.form');
        $allForms.on('submit', function(){
            // faking form submission
            //
            if(this.id == 'create-plan-form'){
                savings.globals.plans = savings.globals.plans + 1;
            }

            if(this.id == 'friends-family-form'){
                savings.globals.friends = savings.globals.friends + 1;
            }

            var destination = $(this).attr('action');
            $.mobile.navigate(destination);
            return false;
        });



        var $nameLinks = $('#aListOfNames').find('a');
        $nameLinks.on('click', function(evt){
            evt.preventDefault();

            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("person", $(this).text());
            }
            var destination = $(this).attr('href');
            $.mobile.navigate(destination);
        });

        var $closePanelButtons = $('.close-panel');
        $closePanelButtons.on('click', function(evt){
            evt.preventDefault();

            var panelID = '#' + $(this).parents('.panel').attr('id');
            $(panelID).panel("close");
        });



        var $peopleForm = $('#people-form');
        $peopleForm.on('submit', function(){

            var destination = $(this).attr('action'),
                searchFieldValue = $.trim($('#search', $(this)).val()),
                skills = $('#people-capabilities',$(this)).val(),
                client = $('#people-client',$(this)).val(),
                location = $('#people-location',$(this)).val(),
                cop = $('#people-cop',$(this)).val(),
                terms = {},
                searchTermStrings = '';

            if(searchFieldValue.length > 0){
                terms.field = searchFieldValue;
            }

            if(skills != null){
                terms.skills = skills;
            }

            if(client != savings.CONSTANTS.strings.clientAccount){
                terms.client = client;
            }

            if(location != savings.CONSTANTS.strings.location){
                terms.location = location;
            }

            if(cop != savings.CONSTANTS.strings.cop){
                terms.cop = cop;
            }

            if(!$.isEmptyObject(terms)){
                searchTermStrings = JSON.stringify(terms);
                if (typeof(Storage) !== "undefined") {
                    localStorage.setItem("searchTerms", searchTermStrings);
                }
            } else {
                if (typeof(Storage) !== "undefined") {
                    localStorage.removeItem("searchTerms");
                }
            }

            $.mobile.navigate(destination);
            return false;
        });
    };

    $(document).on("pagebeforecreate", "#people", function(){

        if (typeof(Storage) !== "undefined") {
            var searchTermStrings = localStorage.getItem("searchTerms");
            if(searchTermStrings !== null){
                var termsObj = JSON.parse(searchTermStrings),
                        $peopleForm = $('#people-form');

                if(termsObj.hasOwnProperty('field')){
                    $('#search', $peopleForm).val(termsObj.field);
                }

                if(termsObj.hasOwnProperty('client')){
                    $('#people-capabilities', $peopleForm).val(termsObj.skills);
                }

                if(termsObj.hasOwnProperty('client')){
                    $('#people-client', $peopleForm).val(termsObj.client);
                }

                if(termsObj.hasOwnProperty('location')){
                    $('#people-location', $peopleForm).val(termsObj.location);
                }

                if(termsObj.hasOwnProperty('cop')){
                    $('#people-cop', $peopleForm).val(termsObj.cop);
                }
            }
        }
    });

    $(document).on("pagebeforeshow", "#screen-saving-plans", function(){

        var $plansList = $('#plans-list'),
                plans = savings.globals.plans;

        if(plans > 0){
            $plansList.empty();
            $('#plans-list-header').removeAttr('class');
            for(var x=0; x<plans; x++){
                $plansList.append('<li><a href="#" class="ui-nodisc-icon ui-alt-icon">Saving Plan '+ (x+1) +'</a></li>');
            }
            $plansList.listview('refresh');
        }

    });

    $(document).on("pagebeforeshow", "#screen-friends-family", function(){

        var $friendsList = $('#friends-list'),
                friends = savings.globals.friends;

        if(friends > 0){
            $friendsList.empty();
            $('#friends-list-header').removeAttr('class');
            for(var x=0; x<friends; x++){
                $friendsList.append('<li><a href="#" class="ui-nodisc-icon ui-alt-icon">'+ (x+1) +' Adam / 0785 1063 452</a></li>');
            }
            $friendsList.listview('refresh');
        }

    });

    $(document).on("pageshow", "#screen-create-account", function(){
        var timer = setTimeout(function(){
            $.mobile.navigate('#screen-admin-landing');
            clearTimeout(timer);
        }, 2000);
    });

    $(document).on("pageshow", "#screen-first-name", function(){
        //console.log($('#phone-number'));
        $('.focus').focus();
    });

    $(document).on("pageshow", "#screen-last-name", function(){
        //console.log($('#phone-number'));
        $('.focus').focus();
    });

    $(document).on("pagebeforeshow", "#results", function(){

        if (typeof(Storage) !== "undefined") {
            var searchTermStrings = localStorage.getItem("searchTerms"),
                    $searchTerms = $('#search-terms');

            if(searchTermStrings !== null){
                var termsObj = JSON.parse(searchTermStrings),
                        termsArray = [],
                        termsInWords = '';

                if(termsObj.hasOwnProperty('field')){
                    termsArray.push('\''+termsObj.field+'\'');
                }

                if(termsObj.hasOwnProperty('skills')){
                    for(var x=0; x < termsObj.skills.length; x++){
                        termsArray.push(termsObj.skills[x]);
                    }
                }

                if(termsObj.hasOwnProperty('client')){
                    termsArray.push(termsObj.client);
                }

                if(termsObj.hasOwnProperty('location')){
                    termsArray.push(termsObj.location);
                }

                if(termsObj.hasOwnProperty('cop')){
                    termsArray.push(termsObj.cop);
                }

                if(termsArray.length > 2){
                    var lastWord = termsArray.pop();
                    termsInWords = termsArray.join(', ');
                    termsInWords = termsInWords + ' <span>and</span> ' + lastWord;
                } else if(termsArray.length == 2) {
                    termsInWords = termsArray[0] + ' <span>and</span> ' + termsArray[1];
                } else if(termsArray.length == 1) {
                    termsInWords = termsArray[0];
                }

                termsInWords = '<strong>' + termsInWords + '</strong>';
                $searchTerms.empty().append(termsInWords);

            } else {

                $searchTerms.empty().append($searchTerms.attr("data-reset"));
            }
        }

        $('#listOfNames').parent().find('a').trigger('click'); // causing filter field to empty out
    });

    $(document).on("pagebeforeshow", "#person", function(){

        if (typeof(Storage) !== "undefined") {
            var person = localStorage.getItem("person");
            $('.personName').text(person);
        }

    });


    $(document).ready(function () {
        savings.init();
    });

}(jQuery, window));
