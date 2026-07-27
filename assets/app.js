(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  const lanterns = [...document.querySelectorAll('.lantern-button')];
  const lanternResult = document.querySelector('.lantern-result');
  lanterns.forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.toggle('is-lit');
      button.setAttribute('aria-pressed', button.classList.contains('is-lit') ? 'true' : 'false');
      const lit = lanterns.filter((item) => item.classList.contains('is-lit')).length;
      if (lanternResult) {
        lanternResult.textContent = lit === 9
          ? '九つの灯りがそろいました。祭りの輪へ。'
          : `${lit} / 9 の灯りが点灯中`;
      }
    });
  });

  const moon = document.querySelector('.moon-sticky');
  if (moon && !reduced) {
    const onScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(window.scrollY / max, 1);
      moon.style.transform = `translateY(${progress * 34}vh) scale(${1 - progress * .18})`;
      moon.style.opacity = String(Math.max(.28, 1 - progress * .55));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const quizButtons = [...document.querySelectorAll('.quiz-option')];
  const quizTitle = document.querySelector('[data-quiz-title]');
  const quizText = document.querySelector('[data-quiz-text]');
  const plans = {
    family: ['親子でゆったり月夜コース', '縁日ブース → キッチンカー → 伝統芸能 → 浦和おどりを見学 → 入場'],
    dance: ['輪の真ん中へコース', '演舞を観る → 30秒振り付け予習 → 櫓へ集合 → みんなで浦和おどり → 試合'],
    food: ['月見グルメコース', 'キッチンカーを巡る → 月夜の撮影 → 和太鼓 → 夕食を持って入場'],
    first: ['初めての埼スタ安心コース', '総合案内 → 縁日 → 早めに入場 → スタジアム散策 → 東京V戦']
  };
  quizButtons.forEach((button) => {
    button.addEventListener('click', () => {
      quizButtons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      const plan = plans[button.dataset.plan];
      if (plan && quizTitle && quizText) {
        quizTitle.textContent = plan[0];
        quizText.textContent = plan[1];
      }
    });
  });

  const chips = [...document.querySelectorAll('.chip[data-plan-item]')];
  const planList = document.querySelector('[data-plan-list]');
  const basePlan = ['14:30 埼スタ到着', '17:30 スタジアム入場', '18:30 キックオフ'];
  const chipPlans = {
    dance: '16:40 櫓で浦和おどり',
    performance: '15:20 伝統芸能を観覧',
    food: '14:50 キッチンカー巡り',
    family: '15:00 縁日ブースへ'
  };
  const renderPlan = () => {
    if (!planList) return;
    const chosen = chips.filter((chip) => chip.classList.contains('is-active')).map((chip) => chipPlans[chip.dataset.planItem]);
    const items = [basePlan[0], ...chosen, ...basePlan.slice(1)];
    planList.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
  };
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('is-active');
      chip.setAttribute('aria-pressed', chip.classList.contains('is-active') ? 'true' : 'false');
      renderPlan();
    });
  });
  renderPlan();

  const nodes = [...document.querySelectorAll('.group-node')];
  const groupTitle = document.querySelector('[data-group-title]');
  const groupText = document.querySelector('[data-group-text]');
  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      nodes.forEach((item) => item.classList.remove('is-active'));
      node.classList.add('is-active');
      if (groupTitle) groupTitle.textContent = node.dataset.title || node.textContent.trim();
      if (groupText) groupText.textContent = node.dataset.text || '';
    });
  });

  const joinButton = document.querySelector('[data-join-button]');
  const joinCount = document.querySelector('[data-join-count]');
  const joinStatus = document.querySelector('[data-join-status]');
  if (joinButton && joinCount) {
    joinButton.addEventListener('click', () => {
      const current = Number(joinCount.textContent.replace(/[^0-9]/g, '')) || 919;
      joinCount.textContent = String(current + 1);
      joinButton.disabled = true;
      joinButton.textContent = '輪に加わりました';
      if (joinStatus) joinStatus.textContent = 'モック上の演出です。実際の参加登録ではありません。';
    });
  }

  const rows = [...document.querySelectorAll('.live-row')];
  if (rows.length) {
    const hour = new Date().getHours() + new Date().getMinutes() / 60;
    let chosen = rows[0];
    rows.forEach((row) => {
      const value = Number(row.dataset.hour || 0);
      if (hour >= value) chosen = row;
    });
    rows.forEach((row) => row.classList.toggle('is-now', row === chosen));
  }
})();
