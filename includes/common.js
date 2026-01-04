// 共通部分を読み込む関数
function loadCommonParts() {
    // ヘッダーを読み込み
    fetch('includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            // カウントダウンの更新
            updateCountdown();
        })
        .catch(error => console.error('Header loading error:', error));

    // サイドバーを読み込み
    fetch('includes/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-placeholder').innerHTML = data;
            // 現在のページをハイライト
            highlightCurrentPage();
        })
        .catch(error => console.error('Sidebar loading error:', error));

    // フッターを読み込み
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Footer loading error:', error));
}

// 現在のページをハイライトする関数
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('nav ul li a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('current');
        }
    });
}

// カウントダウンを更新する関数（将来的にDBから取得）
function updateCountdown() {
    const targetDate = new Date('2025-08-02'); // 試験日
    const today = new Date();
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // カウントダウン表示を更新
    const countdownElements = document.querySelectorAll('#countdown .big, #countdown2 .big');
    countdownElements.forEach(element => {
        if (element) {
            element.textContent = diffDays > 0 ? diffDays : 0;
        }
    });
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', function() {
    loadCommonParts();
});