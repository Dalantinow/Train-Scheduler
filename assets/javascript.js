var config = {
    apiKey: "AIzaSyAb2bAWCnxv7ICvf0c_mtnVlf91F-vqubM",
    authDomain: "trainscheduler-175bb.firebaseapp.com",
    databaseURL: "https://trainscheduler-175bb.firebaseio.com",
    projectId: "trainscheduler-175bb",
    storageBucket: "trainscheduler-175bb.appspot.com",
    messagingSenderId: "438123037568"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

var name = "";
var destination = "";
var time = ""
var frequency = "";

$("#clear-trains").on("click", function (event) {

    dataRef.ref().remove();

});



$("#add-user").on("click", function (event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
    };

    dataRef.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    $("#name-input").val("");
    $("destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

});



dataRef.ref().on("child_added", function (childSnapshot) {



    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    var nextArrival = moment(time, "hh:mm").add(frequency, "m");
    var now = moment();
    var away = nextArrival.diff(now, "m")

    console.log(nextArrival);
    console.log(away);

    var row = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival.format("hh:mm")),
        $("<td>").text(away),
    );

    $("#train-table > tbody").append(row)
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


