<script>
document.addEventListener('DOMContentLoaded', function() {
    var currentURL = window.location.href;
    var keywordIndex = currentURL.indexOf('?');

    if (keywordIndex !== -1) {
        var keyword = currentURL.substring(keywordIndex + 1);

        if (/^\d{6}$/.test(keyword)) {
            // Nếu từ khóa là một chuỗi gồm 6 chữ số, sử dụng trực tiếp
            fetchOriginalLink(keyword);
        } else if (keyword.startsWith('ref=')) {
            // Nếu từ khóa chứa 'ref=', trích xuất phần sau 'ref='
            keyword = keyword.substring(4);
            fetchOriginalLink(keyword);
        } else {
            fetchOriginalLink(keyword);
        }
    }
});

function fetchOriginalLink(keyword) {
    fetch('https://script.google.com/macros/s/AKfycbwJgR1iLkDU-Hly1MHRR4kfUFpkmm27kE9bxwxEMFg0_UpV_moIIhSjR1sWLcNXcIR9bg/exec?keyword=' + keyword)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success && data.originalLink) {
                window.location.href = data.originalLink;
            } else {
                console.error('Không tìm thấy link gốc.');
            }
        })
        .catch(error => console.error('Fetch error:', error));
}
</script>
