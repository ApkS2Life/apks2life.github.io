<script>
document.addEventListener('DOMContentLoaded', function() {
    var currentURL = window.location.href;
    var keywordIndex = currentURL.indexOf('?');

    if (keywordIndex !== -1) {
        var keyword = currentURL.substring(keywordIndex + 1);
        fetchOriginalLink(keyword);
    }
});

function fetchOriginalLink(keyword) {
    fetch('https://script.google.com/macros/s/AKfycbwJgR1iLkDU-Hly1MHRR4kfUFpkmm27kE9bxwxEMFg0_UpV_moIIhSjR1sWLcNXcIR9bg/exec?keyword=' + keyword)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Trả về dữ liệu dưới dạng văn bản
        })
        .then(data => {
            var jsonData = JSON.parse(data); // Chuyển đổi văn bản JSON thành đối tượng JavaScript
            if (jsonData.success && jsonData.originalLink) {
                window.location.href = jsonData.originalLink;
            } else {
                console.error('Không tìm thấy link gốc.');
            }
        })
        .catch(error => console.error('Fetch error:', error.message)); // Hiển thị thông báo lỗi
}
</script>
