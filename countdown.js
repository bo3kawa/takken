// カウントダウン機能
function updateCountdown() {
    // 試験日を設定（将来的にはDBから取得）
    const examDate = new Date('2025-08-02'); // 第1次試験日
    const today = new Date();
    
    // 日数の差を計算
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // カウントダウン表示を更新
    const countdownElements = document.querySelectorAll('#countdown .big, #countdown2 .big');
    countdownElements.forEach(element => {
        if (element) {
            element.textContent = diffDays > 0 ? diffDays : 0;
        }
    });
    
    // 試験日が過ぎた場合の処理
    if (diffDays <= 0) {
        const countdownTexts = document.querySelectorAll('#countdown, #countdown2');
        countdownTexts.forEach(element => {
            if (element) {
                element.innerHTML = '中小企業診断士試験の1次試験は<span>2025</span>年<span>8</span>月<span>2</span>日・<span>3</span>日に実施されました。';
            }
        });
    }
}

// ページ読み込み時にカウントダウンを更新
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    
    // 1日1回更新（24時間ごと）
    setInterval(updateCountdown, 24 * 60 * 60 * 1000);
});