<script>
    document.addEventListener('DOMContentLoaded', function() {
        var currentURL = window.location.href;
        var keywordIndex = currentURL.indexOf('?');

        if (keywordIndex !== -1) {
            var keyword = currentURL.substring(keywordIndex + 1);

            fetch('https://script.google.com/macros/s/AKfycbwJgR1iLkDU-Hly1MHRR4kfUFpkmm27kE9bxwxEMFg0_UpV_moIIhSjR1sWLcNXcIR9bg/exec?keyword=' + keyword)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.href = data.originalLink;
                    } else {
                        console.error('Không tìm thấy link gốc.');
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    });
</script>
