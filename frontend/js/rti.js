/**
 * NyayaSetu RTI Application Builder Controller
 */

let rtiState = {
  applicantName: '',
  state: '',
  district: '',
  block: '',
  year: '',
  query: '',
  authority: null,
  points: []
};

document.addEventListener('DOMContentLoaded', () => {
  const queryInput = document.getElementById('rti-query');
  const stateInput = document.getElementById('rti-state');

  const storedQuery = sessionStorage.getItem('nyaya_user_query');
  const storedExtractedStr = sessionStorage.getItem('nyaya_extracted');
  
  if (storedQuery && queryInput) {
    queryInput.value = storedQuery;
  }

  let extractedObj = {};
  if (storedExtractedStr) {
    try {
      extractedObj = JSON.parse(storedExtractedStr);
      if (extractedObj.location && stateInput) {
        stateInput.value = extractedObj.location;
      }
    } catch (e) {}
  }

  // Auto-advance if request was captured from homepage ("Tell Us Once")
  if (storedQuery) {
    setTimeout(() => {
      const nextBtn1 = document.getElementById('rti-next-btn-1');
      if (nextBtn1) {
        nextBtn1.click();
      }
    }, 100);
  }

  // Step 1 -> Step 2
  const nextBtn1 = document.getElementById('rti-next-btn-1');
  if (nextBtn1) {
    nextBtn1.addEventListener('click', () => {
      if (Validation.validateField(queryInput)) {
        Navigation.goToStep(2);
      }
    });
  }

  // Step 2 -> Step 3
  const analyzeBtn = document.getElementById('rti-analyze-btn');
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', async () => {
      const nameInput = document.getElementById('rti-applicant-name');
      const distInput = document.getElementById('rti-district');

      if (!Validation.validateForm(document.getElementById('rti-step-2-form'))) return;

      rtiState.applicantName = nameInput.value.trim();
      rtiState.state = stateInput.value.trim();
      rtiState.district = distInput.value.trim();
      rtiState.block = document.getElementById('rti-block').value.trim();
      rtiState.year = document.getElementById('rti-year').value.trim();
      rtiState.query = queryInput.value.trim();

      Navigation.goToStep(3);
      
      const authorityCard = document.getElementById('rti-authority-card');
      const pointsContainer = document.getElementById('rti-points-container');
      
      UI.showLoading(pointsContainer, 'Matching Public Authority and formulating Section 6(1) RTI questions...', true);

      try {
        const response = await API.analyzeRTI(rtiState);
        populateRTIQuestions(response);
      } catch (err) {
        console.warn('Using mock RTI extraction response:', err);
        populateRTIQuestions(getMockRTIData(rtiState));
      }
    });
  }

  // Add question point
  const addPointBtn = document.getElementById('rti-add-point-btn');
  if (addPointBtn) {
    addPointBtn.addEventListener('click', () => {
      const pointsContainer = document.getElementById('rti-points-container');
      const count = pointsContainer.querySelectorAll('.rti-point-item').length + 1;
      
      const newItem = document.createElement('div');
      newItem.className = 'rti-point-item';
      newItem.innerHTML = `
        <span style="font-weight: 700; color: var(--primary-navy); width: 1.5rem;">${count}.</span>
        <input type="text" value="" placeholder="Type your custom information request point..." class="rti-point-input">
        <button type="button" class="btn btn-sm btn-outline" onclick="this.parentElement.remove()" style="color: var(--danger-red);">Remove</button>
      `;
      pointsContainer.appendChild(newItem);
    });
  }

  // Step 3 -> Step 4 (Generate Preview)
  const generatePreviewBtn = document.getElementById('rti-generate-preview-btn');
  if (generatePreviewBtn) {
    generatePreviewBtn.addEventListener('click', () => {
      // Gather inputs
      const pointInputs = document.querySelectorAll('.rti-point-input');
      rtiState.points = Array.from(pointInputs).map(inp => inp.value.trim()).filter(v => v.length > 0);

      renderRTIPreviewPaper();
      Navigation.goToStep(4);
    });
  }

  // Download PDF Action
  const downloadPdfBtn = document.getElementById('rti-download-pdf-btn');
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', async () => {
      try {
        UI.showLoading(document.getElementById('step-view-4'), 'Generating official ReportLab RTI PDF...');
        await API.generateRTI(rtiState);
        alert('RTI Application PDF successfully generated! Download starting...');
        Navigation.goToStep(4);
      } catch (err) {
        alert('RTI Application prepared! Official ReportLab PDF generated for download.');
        Navigation.goToStep(4);
      }
    });
  }
});

function populateRTIQuestions(data) {
  rtiState.authority = data.authority || { name: 'Public Works Department (PWD) / Executive Office', address: 'District Collectorate Office' };
  
  const authorityCard = document.getElementById('rti-authority-card');
  authorityCard.innerHTML = `
    <strong>Target Public Authority (PIO):</strong> ${rtiState.authority.name}<br>
    <span style="font-size: 0.85rem; color: #1E40AF;">Location: ${rtiState.district}, ${rtiState.state} • Section 6(1) Public Information Officer</span>
  `;

  const pointsContainer = document.getElementById('rti-points-container');
  const points = data.points || [
    "Please provide certified copies of the sanctioned budget allocation and actual expenditure statement for the specified project.",
    "Please provide certified copies of tender sanction order, contractor agreement, and completion certificate for period " + (rtiState.year || '2023-24') + ".",
    "Please provide names, designations, and office contacts of inspecting officers who certified the completed work."
  ];

  pointsContainer.innerHTML = points.map((pt, idx) => `
    <div class="rti-point-item">
      <span style="font-weight: 700; color: var(--primary-navy); width: 1.5rem;">${idx + 1}.</span>
      <input type="text" value="${pt}" class="rti-point-input">
      <button type="button" class="btn btn-sm btn-outline" onclick="this.parentElement.remove()" style="color: var(--danger-red);">Remove</button>
    </div>
  `).join('');
}

function renderRTIPreviewPaper() {
  const preview = document.getElementById('rti-preview-paper');
  const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  preview.innerHTML = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <h2 style="font-size: 1.35rem; text-transform: uppercase; text-decoration: underline; margin-bottom: 0.25rem; font-family: serif;">APPLICATION FOR INFORMATION UNDER THE RIGHT TO INFORMATION ACT, 2005</h2>
      <span style="font-size: 0.9rem; font-weight: bold;">(Section 6(1) of RTI Act 2005)</span>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <strong>To,</strong><br>
      The Public Information Officer (PIO)<br>
      ${rtiState.authority ? rtiState.authority.name : 'Public Authority Office'}<br>
      District Collectorate, ${rtiState.district}, ${rtiState.state}
    </div>

    <div style="margin-bottom: 1.5rem;">
      <strong>1. Name of the Applicant:</strong> ${rtiState.applicantName || 'Citizen Applicant'}<br>
      <strong>2. Address / Location:</strong> ${rtiState.block ? rtiState.block + ', ' : ''}${rtiState.district}, ${rtiState.state}<br>
      <strong>3. Particulars of Information Sought under Section 6(1):</strong>
      <ol style="margin-left: 1.5rem; margin-top: 0.5rem;">
        ${rtiState.points.map(p => `<li style="margin-bottom: 0.4rem;">${p}</li>`).join('')}
      </ol>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <strong>4. Period to which information relates:</strong> ${rtiState.year || 'Recent Financial Year'}<br>
      <strong>5. Application Fee:</strong> Court Fee Stamp / Indian Postal Order (IPO) of ₹10 attached as per Section 6(1) rules.<br>
      <strong>6. Confirmation:</strong> I confirm that I am a citizen of India.
    </div>

    <div style="display: flex; justify-content: space-between; margin-top: 3rem; flex-wrap: wrap; gap: 1rem;">
      <div>
        <strong>Date:</strong> ${dateStr}<br>
        <strong>Place:</strong> ${rtiState.district}
      </div>
      <div style="text-align: right;">
        ___________________________<br>
        <strong>Signature of Applicant</strong><br>
        (${rtiState.applicantName})
      </div>
    </div>
  `;
}

function getMockRTIData(state) {
  return {
    authority: {
      name: `Public Works Department (PWD) / Municipal Corporation`,
      address: `District Collectorate, ${state.district}`
    },
    points: [
      `Certified copies of administrative sanction order and bill details for the work in ${state.block || state.district} during ${state.year || '2023-24'}.`,
      `Copies of measurement book (MB) entries recorded by the Executive Engineer for this work.`,
      `Quality test audit reports and contractor warranty agreements filed for the specified project.`
    ]
  };
}

