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
            displayData(data);
        })
        .catch(function (error) {
            document.getElementById('output').textContent = 'Network Error: ' + error.message;
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
                displayData(data);
            } else {
                document.getElementById('output').textContent = 'Error fetching data. Status code: ' + xhr.status;
            }
        }
    };
        xhr.onerror = function() {
        document.getElementById('output').textContent = 'Network Error: Request failed';
    };
    xhr.send();
});
//Task3-Send data with POST
//Task4-Update data with PUT
document.getElementById('postForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var title = document.getElementById('postTitle').value;
    var body = document.getElementById('postBody').value;
    var messageDiv = document.getElementById('postMessage');
    var id = document.getElementById('postId').value;
    //Combined POST and PUT since update data input uses the same form as POST
    if (id) {
        // PUT request to update existing post using XHR
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'https://jsonplaceholder.typicode.com/posts/' + id, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    messageDiv.textContent = 'Post updated! ID: ' + data.id + ', Title: ' + data.title;
                } else {
                     messageDiv.textContent = 'Server Error: ' + xhr.status;
                }
            }
        };
        xhr.onerror = function() {
            messageDiv.textContent = 'Network Error: Request failed';
        };
        xhr.send(JSON.stringify({ title: title, body: body }));
    } else {
        // POST request to create new post using fetch
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, body: body })
        })
        .then(function(response) {
            if (!response.ok) throw new Error('Server response not ok');
            return response.json();
        })
        .then(function(data) {
            messageDiv.textContent = 'Post created! ID: ' + data.id;
        })
        .catch(function(error) {
            messageDiv.textContent = 'Network Error: ' + error.message;
        });
    }
});
