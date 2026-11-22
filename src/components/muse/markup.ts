export const museMarkup = `
<nav class="steps" aria-label="Demo steps">
  <button type="button" data-view="capture" class="on"><span>1</span>The page you're browsing</button>
  <button type="button" data-view="muse"><span>2</span>Muse</button>
</nav>
<header class="app-bar">
  <div class="logo notice" id="appLogo"><span class="hl">This is the website you're browsing, not the Muse interface.</span></div>
  <div class="app-right">
    <button class="btn ghost" id="resetBtn" type="button" title="Restore the demo to its starting data">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>Reset demo
    </button>
  </div>
</header>

<!-- STEP 1: CAPTURE -->
<section class="view on" id="view-capture">
  <div class="cap-intro">
    <div>
      <h1>Save anything while you browse</h1>
      <p>Right-click an image, the video, or some selected text and choose <b>Save to Muse</b>. AI adds tags like <b>ux</b> or <b>white space</b> automatically.</p>
    </div>
    <div class="hint-pill hint-desktop"><kbd>Right-click</kbd> on anything in the page below</div>
    <div class="hint-pill hint-mobile"><kbd>Press &amp; hold</kbd> image/video, or <kbd>select text</kbd> then Save</div>
  </div>

  <div class="browser" id="browser">
    <div class="b-top">
      <div class="b-dots"><i></i><i></i><i></i></div>
      <div class="b-tab">Designing for Clarity · Clarity Journal</div>
    </div>
    <div class="b-bar">
      <div class="b-nav">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>
      </div>
      <div class="b-url">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        <span><b>clarity.journal</b>/essays/designing-for-clarity</span>
      </div>
      <button class="ext" id="extBtn" type="button" title="Muse extension"><span class="m"><img src="/logo.png" alt="" /></span><span class="badge" id="extBadge">0</span></button>
    </div>

    <div class="b-page" id="page">
      <article class="site" id="site">
        <div class="site-nav"><strong>Clarity Journal</strong><nav><span>Essays</span><span>UX</span><span>Research</span></nav></div>
        <div class="site-kicker">UX Design · Minimalism · Usability</div>
        <h2>Designing for Clarity: Why Less Is More in User Experience</h2>
        <div class="site-by">By Alex Morgan · UX Design · 8 min read</div>

        <p class="lede">How thoughtful simplicity can create more meaningful digital experiences.</p>

        <figure>
          <div class="saveable" data-save="w-hero" id="w-hero"></div>
          <figcaption>Humane Design — guidance for products that prioritize well-being over noise.</figcaption>
        </figure>

        <p>In today's digital world, users interact with dozens of applications every day. From checking emails to managing projects, every interaction competes for their attention.</p>
        <p>As designers, we often feel the pressure to add more features, more options, and more visual elements. However, a better user experience doesn't always come from adding more. Sometimes, the most effective design decision is knowing what to remove.</p>
        <p>Good UX design is not about making things look simple. It is about making complex things feel effortless.</p>

        <h3>1. Understand What Users Actually Need</h3>
        <p>Before designing an interface, we need to understand the people who will use it. Users don't necessarily want more features. They want to complete their tasks with less effort.</p>
        <p>A useful starting point is to ask three questions: What is the user's primary goal? What prevents them from achieving it? Which features genuinely help them?</p>

        <div class="duo">
          <figure><div class="saveable" data-save="w-side" id="w-side"></div><figcaption>InkWell Books — bold type and clear hierarchy on mobile.</figcaption></figure>
          <figure><div class="saveable" data-save="w-pend" id="w-pend"></div><figcaption>Unique Clay — white space and a focused product page.</figcaption></figure>
        </div>

        <div class="pull">A good interface doesn't ask users to think about the interface. It helps them focus on what they came to do.</div>

        <h3>2. Reduce Cognitive Load</h3>
        <p>When an interface presents too many choices, users need more time to understand what they should do next. Designers can reduce cognitive load through clear visual hierarchy, consistent navigation, meaningful grouping, and progressive disclosure of advanced features.</p>

        <h3>3. White Space Is a Design Tool</h3>
        <p>White space is often misunderstood as empty or wasted space. In reality, it creates visual balance and improves readability. The goal is not to leave as much empty space as possible — it is to give every element enough space to communicate clearly.</p>

        <figure>
          <div class="saveable vid" data-save="w-video" id="w-video"></div>
          <figcaption>Motion study: micro-interactions that guide without shouting</figcaption>
        </figure>

        <h3>4. Design for Consistency</h3>
        <p>Consistency helps users build mental models. A simple design system should define typography scales, color palettes, spacing rules, button styles, icon usage, and interaction states.</p>

        <a class="rel saveable" data-save="w-link" id="w-link" href="#" onclick="return false"><span><small>Related</small>How to run a five-person usability test</span><span>→</span></a>

        <h3>5. Test, Learn, and Improve</h3>
        <p>Even experienced designers cannot predict every user behavior. Instead of asking whether users like the interface, focus on whether they can successfully complete their tasks.</p>

        <p>Simplicity is not the absence of design. It is the result of thoughtful decisions. The best user experience lets people focus less on how a product works and more on what they can accomplish with it.</p>

        <div class="takeaways">
          <strong>Key Takeaways</strong>
          <ol>
            <li>Focus on user needs rather than feature quantity.</li>
            <li>Reduce unnecessary cognitive effort.</li>
            <li>Use white space to improve readability.</li>
            <li>Maintain consistency across the interface.</li>
            <li>Validate design decisions through usability testing.</li>
          </ol>
        </div>
      </article>
    </div>

    <div class="ext-pop" id="extPop" aria-live="polite"></div>
  </div>
</section>

<!-- STEP 2: MUSE -->
<section class="view" id="view-muse">
  <div class="muse-head">
    <div class="search" id="searchBox">
      <svg class="search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
      <div class="search-field">
        <textarea id="q" rows="1" autocomplete="off" placeholder="Search keywords, tags…" aria-label="Search Muse"></textarea>
      </div>
      <div class="search-actions">
        <button type="button" class="voice-btn" id="qVoice" title="Voice search (demo)" aria-label="Voice search demo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><path d="M12 18v3"/></svg>
        </button>
        <button class="icon-x clear" id="qClear" type="button" aria-label="Clear search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="suggest" id="suggest"></div>
    </div>
    <div class="muse-subhead">
      <div class="sum" id="sum"></div>
      <div class="muse-toolbar">
        <div id="browseSwitchHost" class="browse-switch-host"></div>
      </div>
    </div>
  </div>

  <div class="muse-stage">
    <div class="browse-view" id="browseView">
      <div class="browse-filters">
        <label class="browse-filter">
          <span>Canvas</span>
          <div id="browseCanvasHost" class="muse-select-host"></div>
        </label>
        <label class="browse-filter">
          <span>Time</span>
          <div id="browseTimeHost" class="muse-select-host"></div>
        </label>
        <span class="browse-count" id="browseCount"></span>
      </div>
      <div class="browse-scroll"><div class="browse-grid" id="browseGrid"></div></div>
    </div>

  <div class="viewport" id="vp">
    <div class="world" id="world"></div>

    <aside class="floating cv-panel" id="cvPanel"></aside>

    <div class="floating cv-actions">
      <span class="save-state" id="saveState"></span>
      <div class="cv-actions-btns">
        <button class="btn primary" id="saveBtn" type="button">Save</button>
      </div>
    </div>

    <div class="floating tool-dock" id="toolDock">
      <div class="tool-wrap">
        <button type="button" class="tool-btn" id="newCardBtn" title="Add" aria-label="Add" aria-expanded="false" aria-controls="cardMenuPop">
          <svg class="tool-ico tool-ico-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </button>
        <div class="tool-pop tool-pop-wide" id="cardMenuPop" hidden>
          <button type="button" class="btn primary tool-pop-go" id="cardMenuCreate">Create new inspiration</button>
          <button type="button" class="btn tool-pop-go" id="cardMenuAdd">Import your inspiration</button>
        </div>
        <div class="tool-pop tool-pop-wide" id="cardPop" hidden>
          <div class="tool-tabs" role="tablist">
            <button type="button" class="tool-tab on" data-card-tab="photo" role="tab" aria-selected="true">Photo</button>
            <button type="button" class="tool-tab" data-card-tab="video" role="tab" aria-selected="false">Video</button>
            <button type="button" class="tool-tab" data-card-tab="text" role="tab" aria-selected="false">Text</button>
          </div>
          <div class="card-tab-pane on" data-pane="photo">
            <label class="upload-drop" id="photoDrop">
              <input type="file" id="photoFile" accept="image/*" hidden>
              <span>Drop a photo or click to upload</span>
            </label>
            <div class="upload-preview" id="photoPreview" hidden></div>
          </div>
          <div class="card-tab-pane" data-pane="video">
            <label class="upload-drop" id="videoDrop">
              <input type="file" id="videoFile" accept="video/*" hidden>
              <span>Drop a video or click to upload</span>
            </label>
            <div class="upload-preview" id="videoPreview" hidden></div>
          </div>
          <div class="card-tab-pane" data-pane="text">
            <input class="field" id="cardTitle" placeholder="Title" aria-label="Card title">
            <textarea class="field" id="cardBody" rows="4" placeholder="Write your inspiration…" aria-label="Card text"></textarea>
          </div>
          <button type="button" class="btn primary tool-pop-go" id="cardCreate">Create new card</button>
        </div>
      </div>
      <div class="tool-wrap">
        <button type="button" class="tool-btn tool-btn-sticky" id="addStickyBtn" title="Sticky note" aria-label="Add sticky note" aria-expanded="false" aria-controls="stickyPop">
          <img class="tool-ico tool-ico-sticky" src="/sticky-soft-yellow.png?v=3" alt="" width="28" height="28" />
        </button>
        <div class="tool-pop" id="stickyPop" hidden>
          <div class="tool-pop-label">Color</div>
          <div class="swatch-row" id="stickyColors"></div>
          <div class="tool-pop-label">Font</div>
          <div class="chip-row" id="stickyFonts"></div>
          <div class="tool-pop-label">Size</div>
          <div class="chip-row" id="stickySizes"></div>
          <button type="button" class="btn primary tool-pop-go" id="stickyPlace">Place sticky</button>
        </div>
      </div>
      <div class="tool-wrap">
        <button type="button" class="tool-btn tool-btn-object" id="brushBtn" title="Pen" aria-label="Draw on canvas" aria-pressed="false">
          <span class="tool-ico tool-ico-xl tool-ico-mask" style="--tool-mask:url('/pen.png')" aria-hidden="true"></span>
        </button>
        <div class="tool-pop" id="brushPop" hidden>
          <div class="tool-pop-label">Ink</div>
          <div class="swatch-row" id="brushColors"></div>
          <div class="tool-pop-label">Thickness</div>
          <div class="chip-row" id="brushSizes"></div>
        </div>
      </div>
      <div class="tool-wrap">
        <button type="button" class="tool-btn tool-btn-object" id="eraseBtn" title="Eraser" aria-label="Eraser" aria-pressed="false">
          <span class="tool-ico tool-ico-xl tool-ico-mask" style="--tool-mask:url('/eraser.png')" aria-hidden="true"></span>
        </button>
        <div class="tool-pop" id="erasePop" hidden>
          <button type="button" class="btn primary tool-pop-go" id="eraseSelectedBtn">Erase selected drawings</button>
          <button type="button" class="btn tool-pop-go" id="brushClear">Clear all drawings</button>
        </div>
      </div>
    </div>

    <div class="muse-pop" id="musePop" aria-live="polite"></div>

    <div class="floating legend" id="legend">
      <button type="button" class="legend-toggle" id="legendToggle" aria-expanded="true" aria-controls="legendBody" title="Hide tips" aria-label="Hide tips">
        <svg class="legend-ico-help" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4"/><circle cx="12" cy="17" r=".8" fill="currentColor" stroke="none"/></svg>
        <svg class="legend-ico-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <div class="legend-body" id="legendBody">
        <span><i class="lg-n"></i>Has a note</span>
        <span>Drag to arrange</span>
        <span><kbd>Shift</kbd> + click to select</span>
        <span><kbd>Ctrl</kbd> + scroll to zoom</span>
      </div>
    </div>

    <div class="floating zoom">
      <button type="button" id="zOut" aria-label="Zoom out">−</button>
      <span id="zLabel">100%</span>
      <button type="button" id="zIn" aria-label="Zoom in">+</button>
      <button type="button" id="zFit">Fit</button>
    </div>

    <div class="floating selbar" id="selbar"></div>
    <div class="empty" id="empty"><div>
      <h3>A blank canvas</h3>
      <p>Pull in the saves that belong together. You can also select cards on All Inspiration and send them here.</p>
    </div></div>
  </div>
  </div>

  <aside class="side" id="detail" aria-hidden="true">
    <div class="side-head"><h3>Inspiration</h3><button class="icon-x" type="button" data-close="detail" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <div class="side-body" id="detailBody"></div>
  </aside>
  <aside class="side" id="tray" aria-hidden="true">
    <div class="side-head"><h3>Add cards to this canvas</h3><button class="icon-x" type="button" data-close="tray" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <div class="tray-search"><input class="field" id="trayQ" placeholder="Filter by tag or title" aria-label="Filter cards"></div>
    <div class="tray-list" id="trayList"></div>
  </aside>
</section>

<div class="ctx" id="ctx" role="menu"></div>
<button type="button" class="text-save-bar" id="textSaveBar" hidden>
  <span class="m"><img src="/logo.png" alt="" width="16" height="16" /></span>
  Save to Muse
</button>
<div class="picker" id="picker"></div>
<div class="toast" id="toast"><span class="toast-mark" aria-hidden="true"></span><span id="toastMsg"></span><button type="button" id="toastBtn"></button></div>
`.trim();
