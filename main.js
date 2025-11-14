/**
 * 宅建試験ドットコム - メインJavaScript
 */

(function($) {
  'use strict';

  // ページ読み込み時の初期化
  $(function() {
    initTheme();
    initShowMore();
    initSelectButtons();
    initTabs();
    initTimeUpdate();
    initMenuButton();
  });

  /**
   * テーマの初期化
   */
  function initTheme() {
    if (typeof localStorage !== 'undefined') {
      const theme = localStorage.getItem('DARK') || 0;
      if (theme == 1) {
        document.body.className += ' dark';
      }
      if (theme == 2) {
        document.body.className += ' beige';
      }
    }
  }

  /**
   * 「すべて表示する」ボタンの初期化
   */
  function initShowMore() {
    $('#showMore').click(function() {
      $(this).hide();
      $('p.info:not("#countdown2"), .divider').show();
    });
  }

  /**
   * 選択ボタンの初期化
   */
  function initSelectButtons() {
    $('.selectBtn > a').click(function(e) {
      e.preventDefault();
      $('.kaisetsu').slideDown(400);
      
      // 正解の選択肢にマークを表示
      $('.selectList > li[data-answer="t"]::after').css('display', 'block');
      
      // 解説までスクロール
      $('html, body').animate({
        scrollTop: $('.kaisetsu').offset().top - 100
      }, 500);
    });
  }

  /**
   * タブの初期化
   */
  function initTabs() {
    $('#tabs > ul li a').click(function(e) {
      e.preventDefault();
      
      const targetId = $(this).attr('href');
      
      // タブの切り替え
      $('#tabs > ul li').removeClass('active');
      $(this).parent().addClass('active');
      
      // コンテンツの切り替え
      $('#tabs > div').hide();
      $(targetId).show();
    });

    // モバイルで過去問題タブを自動選択
    if ($('#countdown2').is(':visible')) {
      $('#tabs [href="#tab2"]').click();
    }
  }

  /**
   * 時刻表示の更新
   */
  function initTimeUpdate() {
    $('[data-update]').each(function() {
      const dayTimeStamp = 86400 * 1000;
      const updateTime = $(this).attr('data-update') * 1000;
      const diff = Date.now() - updateTime;
      
      if (diff < (dayTimeStamp / 24)) {
        // 1時間未満は「○分前」
        $(this).html(Math.ceil(diff / (dayTimeStamp / 24 / 60)) + '分前');
      } else if (diff < dayTimeStamp) {
        // 1日未満は「○時間前」
        $(this).html(Math.ceil(diff / (dayTimeStamp / 24)) + '時間前');
      } else {
        // それ以上は「○日前」
        $(this).html(Math.floor(diff / dayTimeStamp) + '日前');
      }
    });
  }

  /**
   * メニューボタンの初期化（モバイル用）
   */
  function initMenuButton() {
    $('#menuBtn').click(function() {
      $('nav').toggleClass('open');
    });

    $('.menuCloseBtn').click(function() {
      $('nav').removeClass('open');
    });
  }

  /**
   * テーマ切り替え
   */
  window.changeTheme = function(theme) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('DARK', theme);
    }
    
    document.body.classList.remove('dark', 'beige');
    
    if (theme == 1) {
      document.body.classList.add('dark');
    } else if (theme == 2) {
      document.body.classList.add('beige');
    }
  };

  /**
   * カウントダウンの更新
   */
  window.updateCountdown = function(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;
    
    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      return days;
    }
    return 0;
  };

  /**
   * スムーススクロール
   */
  $('a[href^="#"]').click(function(e) {
    const href = $(this).attr('href');
    if (href === '#' || href === '') return;
    
    e.preventDefault();
    const target = $(href);
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 500);
    }
  });

  /**
   * ページトップへ戻るボタン
   */
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      $('#pageTop').addClass('show');
    } else {
      $('#pageTop').removeClass('show');
    }
  });

})(jQuery);
