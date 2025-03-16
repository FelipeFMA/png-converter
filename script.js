document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('image-input');
    const canvas = document.getElementById('canvas');
    const downloadLink = document.getElementById('download-link');
    const chooseFileButton = document.getElementById('choose-file-button');

    const dropArea = document.getElementById('drop-area');

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    dropArea.addEventListener('click', () => {
        imageInput.click();
    });

    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];
        handleFile(file);
    });

    function handleFile(file) {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    const dataURL = canvas.toDataURL('image/png');
                    downloadLink.href = dataURL;
                    canvas.style.display = 'block';
                    downloadLink.style.display = 'block';
                    chooseFileButton.textContent = 'Choose another image';
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }
});
