(function () {
  const app = document.getElementById("app");
  let answers = []; // indices of chosen options, one per question

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function scoreAnswers() {
    const totals = {};
    RESULT_ORDER.forEach((id) => (totals[id] = 0));
    answers.forEach((choice, qi) => {
      const w = QUESTIONS[qi].a[choice].w;
      Object.keys(w).forEach((id) => (totals[id] += w[id]));
    });
    return totals;
  }

  function winner(totals) {
    return RESULT_ORDER.reduce((best, id) => (totals[id] > totals[best] ? id : best), RESULT_ORDER[0]);
  }

  function renderHome() {
    answers = [];
    app.innerHTML = `
      <section class="card">
        <p class="tag">// Cyberdyne Systems Model 101</p>
        <h1 class="glitch" data-text="Which Terminator Character Are You?">Which Terminator Character Are You?</h1>
        <p>Eight questions. One identity scan. Find out who you'd be in the 1984 original.</p>
        <button class="btn primary" id="start">Initiate Scan</button>
      </section>`;
    document.getElementById("start").addEventListener("click", () => (location.hash = "#/quiz/1"));
  }

  function renderQuestion(n) {
    const idx = n - 1;
    const q = QUESTIONS[idx];
    const pct = Math.round((idx / QUESTIONS.length) * 100);
    app.innerHTML = `
      <section class="card">
        <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div style="width:${pct}%"></div></div>
        <div class="status"><span>SCANNING...</span><span>${n} / ${QUESTIONS.length}</span></div>
        <h2>${esc(q.q)}</h2>
        ${q.a.map((opt, i) => `<button class="btn" data-i="${i}">${esc(opt.t)}</button>`).join("")}
      </section>`;
    app.querySelectorAll("button[data-i]").forEach((b) =>
      b.addEventListener("click", () => {
        answers[idx] = Number(b.dataset.i);
        location.hash = n < QUESTIONS.length ? `#/quiz/${n + 1}` : `#/result/${winner(scoreAnswers())}`;
      })
    );
  }

  function renderResult(id) {
    const r = RESULTS[id];
    // Only show a match percentage if the user actually took the quiz this session.
    let matchHtml = "";
    if (answers.length === QUESTIONS.length) {
      const totals = scoreAnswers();
      const max = QUESTIONS.length * 2;
      matchHtml = `<div class="match">MATCH CONFIDENCE: ${Math.round((totals[id] / max) * 100)}%</div>`;
    }
    app.innerHTML = `
      <section class="card">
        <p class="tag">// Identity confirmed</p>
        <h1>You are ${esc(r.name)}</h1>
        ${matchHtml}
        <p>${esc(r.blurb)}</p>
        <blockquote>"${esc(r.quote)}"</blockquote>
        <div class="row">
          <button class="btn" id="copy">Copy Result Link</button>
          <button class="btn primary" id="retake">Retake Scan</button>
        </div>
        <div class="toast" id="toast" role="status"></div>
      </section>`;
    document.getElementById("retake").addEventListener("click", () => (location.hash = "#/"));
    document.getElementById("copy").addEventListener("click", async () => {
      const toast = document.getElementById("toast");
      try {
        await navigator.clipboard.writeText(location.href);
        toast.textContent = "Link copied.";
      } catch (e) {
        toast.textContent = "Copy failed. Copy the address bar instead.";
      }
    });
  }

  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    if (parts[0] === "quiz") {
      const n = Number(parts[1]);
      // Must answer questions in order; skip ahead -> go to first unanswered.
      if (Number.isInteger(n) && n >= 1 && n <= QUESTIONS.length && n <= answers.length + 1) {
        renderQuestion(n);
      } else {
        location.hash = answers.length ? `#/quiz/${Math.min(answers.length + 1, QUESTIONS.length)}` : "#/quiz/1";
        return;
      }
    } else if (parts[0] === "result" && RESULTS[parts[1]]) {
      renderResult(parts[1]);
    } else if (parts[0] === "" || parts[0] === undefined) {
      renderHome();
    } else {
      location.hash = "#/";
      return;
    }
    window.scrollTo(0, 0);
    app.focus();
  }

  window.addEventListener("hashchange", route);
  route();
})();
