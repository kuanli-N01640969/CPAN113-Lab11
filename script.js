//===Part2 Get Request===
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
