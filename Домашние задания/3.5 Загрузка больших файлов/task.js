function formReset() {
    document.getElementById('progress').value = .0;
}

window.addEventListener('load', function (ev) {
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const progressBar = document.getElementById('progress');
        progressBar.value = .0;
        const fileInput = document.getElementById('file');
        if (fileInput.files.length === 0) {
            alert('Пожалуйста, выберите файл!');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
    
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    
        xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
                progressBar.value = event.loaded / event.total;
            }
        };
    
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                alert('Файл успешно загружен!');
            } else {
                alert('Ошибка загрузки файла.');
            }
            formReset();
        };
    
        xhr.onerror = function() {
            alert('Ошибка запроса.');
            formReset();
        };
    
        xhr.send(formData);
    });
});