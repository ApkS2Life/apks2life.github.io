<script type="text/javascript">
var currentURL = window.location.href;

// Phân tích URL để trích xuất từ khóa
var keywordIndex = currentURL.indexOf('?');
if (keywordIndex !== -1) {
    var keyword = currentURL.substring(keywordIndex + 1);
    // Sử dụng từ khóa để thực hiện chuyển hướng
    redirectToOriginalLink(keyword);
}

function redirectToOriginalLink(keyword) {
    // Gửi yêu cầu đến Apps Script để lấy link gốc từ từ khóa
    fetch(`https://script.google.com/macros/s/AKfycby-hG4DOBNGpkeRxIMvJLpMUzXYhC6ZqsCjWArL4kN336V_iKekE3iTHgLLc4ywVtHMxQ/exec?keyword=${keyword}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.originalLink;
            }
        })
        .catch(error => console.error('Error:', error));
}
</script>
