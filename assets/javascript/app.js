

    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBX4iKIl_grAykjYNdHys4ZUDUHoYtxX7Q",
    authDomain: "train-scheduler-e0c4e.firebaseapp.com",
    databaseURL: "https://train-scheduler-e0c4e.firebaseio.com",
    projectId: "train-scheduler-e0c4e",
    storageBucket: "",
    messagingSenderId: "377857280034"
  };
  firebase.initializeApp(config);

    var database = firebase.database();


  // Variables
  var trainName, destination, firstTrainTime, 
  frequency = 0;

    // Submitting new train button
    $("#addTrainBtn").on("click", add);


      function add (){
         event.preventDefault();


        var newTrain = {
             trainName: $("#trainName").val(),
             destination: $("#destination").val(),
             firstTrainTime: $("#firstTrainTime").val(),
             frequency: $("#frequency").val()

        };
      

        database.ref().push(newTrain);
      };
         

    // Child added
        database.ref().on("child_added", function(snapshot){
        

            console.log(snapshot.val().trainName);
            var myTrainObject = snapshot.val();
            // Calculating minutesAway
            console.log(firstTrainTime);
         var firstTrainTimeConverted = moment (parseInt(myTrainObject.firstTrainTime), "hh:mm")//.subtract(1, "years");
              console.log(firstTrainTimeConverted);
              // Current Time
              var currentTime = moment();
              console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
              // Difference between the times
              var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
              console.log("DIFFERENCE IN TIME: " + diffTime);
              // Time apart (remainder)
              var remainder = diffTime % parseInt(myTrainObject.frequency);
              console.log(remainder);
              // Minute Until Train
              var minutesAway = parseInt(myTrainObject.frequency) - remainder;
              console.log("minutesAway: " + minutesAway);
              // Next Arrival
              var nextArrival = moment().add(minutesAway, "minutes");
              nextArrival = moment(nextArrival).format("hh:mm")
              console.log("nextArrival: " + moment(nextArrival).format("hh:mm"));


        var trainRow = "<tr>" + 
            "<td>" + snapshot.val().trainName + "</td>" +
            "<td>" + snapshot.val().destination + "</td>" +
            // "<td>" + snapshot.val().firstTrainTime + "</td>" +
            "<td>" + snapshot.val().frequency + "</td>" +
            "<td>" + nextArrival + "</td>" +
            "<td>" + minutesAway + "</td>" +


          "</tr>";    

            $("#trainContainer").append(trainRow);       
            
        });
     