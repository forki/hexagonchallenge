import { initializeAiSimulator } from './fable/UI.Simulator';

let basicAiJs = function(cells) {
    let maxResourcesDiff = 0;
    let selectedTuple;
    cells.forEach(function(c) {
        c.Neighbours.forEach(function(n) {
            let resourcesDiff = c.Resources - n.Resources;
            if (n.Owner.Case !== "Own" && resourcesDiff > maxResourcesDiff) {
                maxResourcesDiff = resourcesDiff;
                selectedTuple = [c, n];
            }
        });
    });
    return { FromId: selectedTuple[0].Id, ToId: selectedTuple[1].Id, AmountToTransfer: selectedTuple[0].Resources };
}

initializeAiSimulator(basicAiJs);


let createJsObjectFromFields = function() {
    var ai = new Object();
    ai.AiName = "Test";
    ai.UserName = "Test";
    ai.Password = "Test";
    ai.Content = "Content";
    return ai;
}

let submit = function () {
    let url = "http://localhost/8080/ais";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                document.getElementById("myDiv").innerHTML = xhr.responseText;
                alert("AI correctly sended");
            } else {
                alert('An error occured while sending AI ' + xhr.status.toString());
            }
        }
    }

    let data = JSON.stringify(createJsObjectFromFields());
    xhr.send(data);
}

let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", submit);