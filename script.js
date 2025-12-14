//===Part2===
//Task1-GET request with fetch()
document.getElementById('fetchBtn').addEventListener('click', function () {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayData(data);
        })
        .catch(function (error) {
            const outputDiv = document.getElementById('output');
            outputDiv.textContent = 'Error: ' + error.message;
        });
});
//Data display
function displayData(data) {
    const outputDiv = document.getElementById('output');

    // clear previous content
    outputDiv.innerHTML = '';

    const titleElement = document.createElement('h3');
    titleElement.textContent = data.title;

    const bodyElement = document.createElement('p');
    bodyElement.textContent = data.body;

    outputDiv.appendChild(titleElement);
    outputDiv.appendChild(bodyElement);
}
//Task2-GET request with XHR
document.getElementById('xhrBtn').addEventListener('click', function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                document.getElementById('output').innerHTML =
                    '<h2>' + data.title + '</h2>' +
                    '<p>' + data.body + '</p>';
            } else {
                document.getElementById('output').textContent =
                    'Error fetching data. Status code: ' + xhr.status;
            }
        }
    };
    xhr.send();
});
