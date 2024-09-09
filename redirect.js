<script>
document.getElementById('shorten-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const originalLink = document.getElementById('original-link').value;
    const keyword = document.getElementById('keyword').value;

    const formData = new FormData();
    formData.append('originalLink', originalLink);
    formData.append('keyword', keyword);

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwJgR1iLkDU-Hly1MHRR4kfUFpkmm27kE9bxwxEMFg0_UpV_moIIhSjR1sWLcNXcIR9bg/exec', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            Swal.fire({
                title: 'Thành công!',
                html: `<span>Link rút gọn của bạn:</span> <a href="${result.shortLink}">${result.shortLink}</a><br>`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            Swal.fire({
                title: 'Lỗi!',
                text: result.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Lỗi!',
            text: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var keyword = new URLSearchParams(window.location.search).get('keyword');
    var refid = new URLSearchParams(window.location.search).get('refid');

    // Nếu có từ khóa hoặc refid, thực hiện tìm kiếm
    if (keyword || refid) {
        fetchOriginalLink(keyword, refid);
    } else {
        console.error('Không có từ khóa hoặc refid trong URL.');
        alert('Không có từ khóa hoặc refid trong URL.');
    }
});

function fetchOriginalLink(keyword, refid) {
    var encodedKeyword = encodeURIComponent(keyword || '');
    var encodedRefid = encodeURIComponent(refid || '');
    
    // Chọn từ khóa hoặc refid tùy thuộc vào điều kiện
    var url = `https://script.google.com/macros/s/AKfycbwJgR1iLkDU-Hly1MHRR4kfUFpkmm27kE9bxwxEMFg0_UpV_moIIhSjR1sWLcNXcIR9bg/exec?${encodedKeyword ? `keyword=${encodedKeyword}` : ''}${encodedKeyword && encodedRefid ? '&' : ''}${encodedRefid ? `refid=${encodedRefid}` : ''}`;

    fetch(url, {
        method: 'GET',
        cache: 'no-cache'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Phản hồi từ mạng không hợp lệ');
        }
        return response.json();
    })
    .then(data => {
        if (data.success && data.originalLink) {
            // Chuyển hướng đến liên kết gốc
            window.location.href = data.originalLink;
        } else {
            console.error('Không tìm thấy liên kết gốc cho từ khóa hoặc refid:', keyword, refid);
            alert('Không tìm thấy liên kết gốc cho từ khóa hoặc refid.');
        }
    })
    .catch(error => {
        console.error('Lỗi Fetch:', error.message);
        alert('Đã xảy ra lỗi khi lấy liên kết gốc.');
    });
}
</script>
