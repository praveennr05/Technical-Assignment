export interface DocumentLine {
  lineNum: number;
  page: number;
  section: string;
  category: 'metadata' | 'context' | 'rule' | 'question' | 'integrity' | 'deliverable' | 'grading' | 'submission';
  importance: 'critical' | 'high' | 'normal';
  text: string;
  annotation?: string;
}

export interface AssignmentSection {
  id: string;
  number: string;
  title: string;
  page: number;
  summary: string;
  keyTakeaways: string[];
}

export const ASSIGNMENT_METADATA = {
  title: "Technical Assignment: AI for Personal Health and Wellness",
  date: "October 5, 2026",
  targetAudience: "All B.E. (AI & ML) candidates",
  deadline: "October 6, 2026, 5:00 PM IST",
  recipientEmail: "mnaveennk@iisc.ac.in",
  ruleSummary: "Answer any 2 out of 4 questions. All 3 levels must be attempted for a question to count.",
  seedRule: "S = Last 4 digits of your USN (random seed in every train/test split & model)",
};

export const SECTIONS_OVERVIEW: AssignmentSection[] = [
  {
    id: "header",
    number: "0",
    title: "Assignment Header & Core Directive",
    page: 1,
    summary: "Establishes candidate group, timed testing format, mandatory 2-of-4 selection, and strict automatic rejection on late delivery.",
    keyTakeaways: [
      "All B.E. (AI & ML) candidates take this same assessment.",
      "Strict cutoff: submissions after window closes are rejected automatically.",
      "Must complete 2 of 4 questions, with all 3 levels per question."
    ]
  },
  {
    id: "sec1",
    number: "1",
    title: "Why this topic",
    page: 1,
    summary: "Rationale derived from screening 12 candidate resumes, mapping resume skill clusters to assignment modules.",
    keyTakeaways: [
      "Designed at the intersection of existing candidate skills and stretch challenges.",
      "Maps 7 resume skill clusters: Data cleaning/XGBoost, Classification metrics, Backend APIs/SQL, Dashboards, GenAI/RAG, Computer Vision, and Health platforms."
    ]
  },
  {
    id: "sec2",
    number: "2",
    title: "How this assignment works & Ground Rules",
    page: 2,
    summary: "Sets the health-tech startup scenario, strict deadline (Oct 6, 5:00 PM IST), 3-level evaluation model, USN seed formula S, and data privacy rule.",
    keyTakeaways: [
      "Scenario: 4 building blocks for a health-tech team.",
      "Deadline: 5:00 PM IST on 6 October 2026 (No extensions).",
      "Rule: Pick 2 questions. All 3 levels (Build, Code it yourself, Reason) are required.",
      "Personal Seed S: Last 4 digits of USN. Identical results across submissions lead to immediate rejection.",
      "Data: Strictly public datasets, public docs, or self-recorded video. NO personal medical records."
    ]
  },
  {
    id: "sec3",
    number: "3",
    title: "The four questions (Answer any two)",
    page: 2,
    summary: "Detailed specification of Questions A, B, C, and D across Level 1 (Build), Level 2 (Scratch Implementation), and Level 3 (Reasoning & Predictive Evaluation).",
    keyTakeaways: [
      "Question A: Risk Prediction (UCI Heart / Pima Diabetes) -> Scikit-learn vs Scratch NumPy Logistic Reg + BCE + Confusion Matrix -> Recall 0.9 threshold tradeoff.",
      "Question B: Usable Model App -> FastAPI/Flask + React/Streamlit -> SQLite/Postgres + raw SQL /stats + input validation + pytest -> Fault injection & concurrency analysis.",
      "Question C: Trusted Health QA Assistant -> RAG + LLM with citations -> Custom TF-IDF & NumPy cosine similarity vs library retriever -> 10 test questions (3 unanswerable) + failure attribution.",
      "Question D: Exercise Tracker Camera -> OpenCV/MediaPipe rep counter -> 3-point vector angle + moving-average smoothing + dual threshold hysteresis -> 3 videos & threshold variance analysis."
    ]
  },
  {
    id: "sec4",
    number: "4",
    title: "Personal intelligence and AI use (Mandatory)",
    page: 4,
    summary: "Mandatory guidelines allowing AI for Level 1 but requiring pure independent mastery, logged decisions, pre-run GitHub prediction commits, and live walkthrough defense.",
    keyTakeaways: [
      "AI tools (ChatGPT, Claude, Gemini, Copilot) are allowed for Level 1, but Levels 2 and 3 test personal comprehension.",
      "Decision Log: 2 decisions per question (chosen vs rejected option + numeric evidence).",
      "PREDICTIONS BEFORE RESULTS: You MUST commit your Level 3 predictions to GitHub BEFORE running tests (commit timestamp serves as proof).",
      "AI Usage Declaration: Tool names, purpose, and one documented AI flaw that you discovered and fixed.",
      "Live walkthrough: Shortlisted candidates must explain code and make a live modification without AI."
    ]
  },
  {
    id: "sec5",
    number: "5",
    title: "Deliverables",
    page: 4,
    summary: "Three mandatory deliverables: Source code repository with specific commit cadences, 3-5 min Google Drive video, and PERSONAL_INTELLIGENCE.md file.",
    keyTakeaways: [
      "Deliverable 1: GitHub Repo (One folder per question, README with Seed S and steps, minimum 4 commits spread across time - no single dump).",
      "Deliverable 2: Demo Video (3-5 min MP4 on Google Drive with 'Anyone with the link can view' permission, your voice explaining Level 2 & 3 numbers).",
      "Deliverable 3: PERSONAL_INTELLIGENCE.md (1-page note with decision log & AI usage declaration)."
    ]
  },
  {
    id: "sec6",
    number: "6",
    title: "How answers will be judged",
    page: 5,
    summary: "Scoring criteria prioritizing depth (Levels 2 & 3 > Level 1), numerical reasoning, code correctness, honest personal intelligence, and video clarity.",
    keyTakeaways: [
      "Depth: Levels 2 and 3 carry significantly higher weight. Level 1 alone is insufficient.",
      "Reasoning: Must be grounded in candidate's unique numbers (seeded by S).",
      "Clarity: Demo video is vital; live walkthrough can override submission if unexplainable."
    ]
  },
  {
    id: "sec7",
    number: "7",
    title: "Submission and rules",
    page: 5,
    summary: "Submission inbox, exact email subject syntax, video MP4 naming format, plagiarism policy, and time management advice.",
    keyTakeaways: [
      "Submission Email: mnaveennk@iisc.ac.in",
      "Email Subject: B.E. Assignment – <Full Name> – <USN>",
      "Video Filename: <FullName>_Assignment_Demo.mp4",
      "Strict Plagiarism Rule: Identical code/results = immediate rejection for both parties.",
      "Advice: A complete answer to 2 questions is far better than partial attempts at 4. Commit early and often."
    ]
  }
];

export const RAW_DOCUMENT_LINES: DocumentLine[] = [
  // Page 1
  { lineNum: 1, page: 1, section: "Header", category: "metadata", importance: "normal", text: "Technical Assignment: AI for Personal Health and Wellness", annotation: "Document header / title" },
  { lineNum: 2, page: 1, section: "Header", category: "metadata", importance: "high", text: "Oct 5, 2026", annotation: "Assignment issue date" },
  { lineNum: 3, page: 1, section: "Header", category: "rule", importance: "critical", text: "All B.E. (AI & ML) candidates will complete one common, timed assignment: answer two of four multi-level questions on building practical AI tools for personal health.", annotation: "Target cohort and mandate: 2 of 4 questions" },
  { lineNum: 4, page: 1, section: "Header", category: "rule", importance: "critical", text: "Submissions received after the window closes are rejected automatically.", annotation: "Strict hard deadline cutoff" },
  { lineNum: 5, page: 1, section: "1. Why this topic", category: "context", importance: "normal", text: "1. Why this topic", annotation: "Section 1 heading" },
  { lineNum: 6, page: 1, section: "1. Why this topic", category: "context", importance: "normal", text: "The topic was chosen after screening all twelve candidate resumes. It sits where the most common skills overlap, so every candidate can start from something they already know and still has to stretch.", annotation: "Design rationale across 12 candidate resumes" },
  { lineNum: 7, page: 1, section: "1. Why this topic", category: "context", importance: "normal", text: "Skill cluster seen across resumes | How it appears in this assignment", annotation: "Mapping table header" },
  { lineNum: 8, page: 1, section: "1. Why this topic", category: "context", importance: "normal", text: "Python, Pandas, NumPy, scikit-learn, XGBoost -> Cleaning health data and training prediction models", annotation: "Data cleaning & model training mapping" },
  { lineNum: 9, page: 1, section: "1. Why this topic", category: "context", importance: "normal", text: "ML classification (churn, heart failure, resume screening) -> Predicting a health risk and judging the model honestly", annotation: "Classification & honest evaluation mapping" },
  { lineNum: 10, page: 1, section: "1. Why this topic", category: "context", importance: "normal", text: "Backend APIs (FastAPI, Flask, Django) and databases (MySQL, PostgreSQL, SQLite) -> Serving a model through an API and saving results", annotation: "API serving & persistence mapping" },
  { lineNum: 11, page: 1, section: "1. Why this topic", category: "context", importance: "normal", text: "Frontends and dashboards (React, Streamlit, Power BI) -> A simple screen a user can actually use", annotation: "Frontend UI mapping" },
  { lineNum: 12, page: 1, section: "1. Why this topic", category: "context", importance: "normal", text: "Generative AI (LLMs, prompt engineering, RAG, vector databases) -> A health-information assistant that answers from trusted sources", annotation: "GenAI & trusted RAG mapping" },
  { lineNum: 13, page: 1, section: "1. Why this topic", category: "context", importance: "normal", text: "Computer vision (OpenCV, MediaPipe, YOLO, CNNs) -> Tracking body movement from a camera", annotation: "CV & pose movement mapping" },
  { lineNum: 14, page: 1, section: "1. Why this topic", category: "context", importance: "normal", text: "Health-related projects (heart failure, health platforms, crop disease) -> Personal health and wellness as the shared domain", annotation: "Domain grounding" },
  { lineNum: 15, page: 1, section: "2. How this assignment works", category: "context", importance: "normal", text: "2. How this assignment works", annotation: "Section 2 heading" },
  { lineNum: 16, page: 1, section: "2. How this assignment works", category: "context", importance: "normal", text: "Scenario. A small health-tech team needs four building blocks: a risk predictor, an app that uses it, a trusted question-answering assistant, and an exercise tracker. Each question below is one of these blocks.", annotation: "Health-tech team startup scenario definition" },
  
  // Page 2
  { lineNum: 17, page: 2, section: "2. How this assignment works", category: "rule", importance: "critical", text: "Timing. The clock starts at the timestamp of the group post. Nothing is accepted after 5:00 PM IST on 6 October 2026. There are no extensions.", annotation: "Exact deadline: 5:00 PM IST, 6 Oct 2026" },
  { lineNum: 18, page: 2, section: "2. How this assignment works", category: "rule", importance: "critical", text: "The rule. There are four questions. Answer any two. Each question has three levels, and a question counts only if all three levels are attempted.", annotation: "Mandatory: Answer any 2; all 3 levels must be attempted" },
  { lineNum: 19, page: 2, section: "2. How this assignment works", category: "rule", importance: "high", text: "Level 1: Build | What it tests: Can you get a working result? | Rules: Any library allowed", annotation: "Level 1 criteria (libraries permitted)" },
  { lineNum: 20, page: 2, section: "2. How this assignment works", category: "rule", importance: "critical", text: "Level 2: Code it yourself | What it tests: Do you understand how it works inside? | Rules: Write the named part from scratch; the named libraries are not allowed for that part", annotation: "Level 2 criteria: Scratch implementation requirement" },
  { lineNum: 21, page: 2, section: "2. How this assignment works", category: "rule", importance: "critical", text: "Level 3: Reason with your results | What it tests: Can you think about what your own system did? | Rules: Predict first, then test, then explain using your own numbers", annotation: "Level 3 criteria: Predict-before-run mandate" },
  { lineNum: 22, page: 2, section: "2. How this assignment works", category: "rule", importance: "critical", text: "Your personal seed. Let S be the last four digits of your USN. Use S as the random seed in every train/test split and every model. Your numbers will therefore differ from everyone else's. Identical results in two submissions will lead to both being rejected.", annotation: "Formula for S: Last 4 digits of USN. Anti-copy mechanism" },
  { lineNum: 23, page: 2, section: "2. How this assignment works", category: "rule", importance: "high", text: "Data. Use only public datasets, public documents or your own recordings. Do not use anyone's personal health records.", annotation: "Data privacy & ethics boundary" },
  { lineNum: 24, page: 2, section: "2. How this assignment works", category: "rule", importance: "normal", text: "Suggested time plan. About 1 hour 45 minutes per question, and 30 minutes for the video and submission.", annotation: "Recommended pacing (~4 hours total)" },
  { lineNum: 25, page: 2, section: "3. The four questions", category: "question", importance: "high", text: "3. The four questions (answer any two)", annotation: "Section 3 heading" },
  { lineNum: 26, page: 2, section: "Question A", category: "question", importance: "high", text: "Question A: Predict a health risk", annotation: "Question A title: ML classification & risk estimation" },
  { lineNum: 27, page: 2, section: "Question A", category: "question", importance: "high", text: "• Level 1 – Build. Using UCI Heart Disease, Heart Failure Clinical Records or Pima Indians Diabetes, clean the data and train Logistic Regression and Random Forest (split with seed S). Report accuracy, precision and recall for both.", annotation: "Q-A Level 1: Public dataset + LR & RF + Seed S split + Metrics" },
  { lineNum: 28, page: 2, section: "Question A", category: "question", importance: "critical", text: "• Level 2 – Code it yourself. Write logistic regression from scratch with NumPy: the sigmoid, the loss and gradient descent. No scikit-learn for this part. Also write your own confusion-matrix function. Show that your model's accuracy is close to scikit-learn's, and compare the weights of the top three features.", annotation: "Q-A Level 2: NumPy scratch LR, sigmoid, loss, gradient descent, scratch confusion matrix, compare top-3 feature weights" },
  { lineNum: 29, page: 2, section: "Question A", category: "question", importance: "critical", text: "• Level 3 – Reason. Before running, predict what happens to precision if you lower the decision threshold until recall reaches 0.9. Then do it and report the real numbers. State which threshold you would use for a real screening tool, and why accuracy alone would mislead.", annotation: "Q-A Level 3: Predict precision drop under 0.9 recall; run test; screening threshold rationale; accuracy trap" },

  // Page 3
  { lineNum: 30, page: 3, section: "Question B", category: "question", importance: "high", text: "Question B: Turn a model into a usable app", annotation: "Question B title: Full-stack serving & persistence" },
  { lineNum: 31, page: 3, section: "Question B", category: "question", importance: "high", text: "• Level 1 – Build. Serve a trained model (from Question A or any simple model) through a FastAPI or Flask /predict endpoint, with a small front end (Streamlit, React or HTML) that shows the risk in plain words.", annotation: "Q-B Level 1: FastAPI/Flask /predict API + Streamlit/React/HTML frontend" },
  { lineNum: 32, page: 3, section: "Question B", category: "question", importance: "critical", text: "• Level 2 – Code it yourself. Save every request and result in SQLite, MySQL or PostgreSQL. Add a /stats endpoint that uses hand-written SQL (no ORM) to return the total requests, the average predicted risk and the share of high-risk results. Validate every input with clear error messages (for example, age must be 1 to 120). Write three automated tests with pytest, including one for bad input.", annotation: "Q-B Level 2: DB logging + raw hand-written SQL /stats + input validation + 3 pytest tests" },
  { lineNum: 33, page: 3, section: "Question B", category: "question", importance: "critical", text: "• Level 3 – Reason. Break your own app on purpose in two ways (for example, a missing model file, or text where a number is expected). Show what happened before and after your fix, and explain how you would make the app safe for 100 users at once.", annotation: "Q-B Level 3: 2 intentional failure modes + fix diffs + concurrency/scalability strategy" },
  { lineNum: 34, page: 3, section: "Question C", category: "question", importance: "high", text: "Question C: Build a trusted health-information assistant", annotation: "Question C title: RAG & retrieval assistant" },
  { lineNum: 35, page: 3, section: "Question C", category: "question", importance: "high", text: "• Level 1 – Build. Collect 5 to 10 public health documents (for example, WHO fact sheets on diabetes, hypertension and physical activity). Build a question-answering assistant using retrieval (RAG) and an LLM of your choice. Every answer must show its source.", annotation: "Q-C Level 1: 5-10 WHO fact sheets + RAG pipeline + mandatory source citation" },
  { lineNum: 36, page: 3, section: "Question C", category: "question", importance: "critical", text: "• Level 2 – Code it yourself. Write the retrieval step yourself: split the documents into chunks, build TF-IDF vectors and rank chunks by cosine similarity using NumPy. No vector database or retriever library for this part. Compare your top-3 chunks with a library retriever on three questions.", annotation: "Q-C Level 2: Scratch chunking, scratch TF-IDF, NumPy cosine sim (NO vector DB) + compare with library retriever" },
  { lineNum: 37, page: 3, section: "Question C", category: "question", importance: "critical", text: "• Level 3 – Reason. Write 10 test questions of your own, including 3 that the documents cannot answer. Before running, predict which ones will fail. Report the results in a table, then pick one wrong answer and show, with evidence, whether retrieval or the LLM caused it.", annotation: "Q-C Level 3: 10 test questions (3 unanswerable), pre-run failure predictions, failure analysis (retrieval vs LLM)" },
  { lineNum: 38, page: 3, section: "Question D", category: "question", importance: "high", text: "Question D: Track an exercise with a camera", annotation: "Question D title: Computer vision pose tracker" },
  { lineNum: 39, page: 3, section: "Question D", category: "question", importance: "high", text: "• Level 1 – Build. Using OpenCV and MediaPipe (or a similar pose tool), count repetitions of one exercise (squats, push-ups or one yoga pose) from a webcam or a recorded video.", annotation: "Q-D Level 1: OpenCV + MediaPipe pose rep counter" },
  { lineNum: 40, page: 3, section: "Question D", category: "question", importance: "critical", text: "• Level 2 – Code it yourself. Write your own joint-angle function from three body points using vector maths. Write your own moving-average smoothing and a rep counter with two thresholds (one to enter the down position, one to leave it) so that small shakes are not counted twice. Give live feedback such as 'go lower'.", annotation: "Q-D Level 2: Scratch vector 3-point angle, moving average smoothing, dual-threshold hysteresis, live feedback" },
  { lineNum: 41, page: 3, section: "Question D", category: "question", importance: "critical", text: "• Level 3 – Reason. Record three short videos of yourself, including one done with wrong form. Before running, predict the count for each. Report predicted, counted and actual reps, explain one error, and show how changing a threshold changed the result.", annotation: "Q-D Level 3: 3 short self-recorded videos (1 wrong form), pre-run rep predictions, discrepancy analysis & threshold tuning" },

  // Page 4
  { lineNum: 42, page: 4, section: "4. Personal intelligence and AI use", category: "integrity", importance: "critical", text: "4. Personal intelligence and AI use (mandatory)", annotation: "Section 4 heading" },
  { lineNum: 43, page: 4, section: "4. Personal intelligence and AI use", category: "integrity", importance: "high", text: "You may use AI tools such as ChatGPT, Claude, Gemini or GitHub Copilot. AI can help you write Level 1 quickly. Levels 2 and 3 depend on your own data, your own numbers and your own understanding, and that is what is being assessed.", annotation: "AI permissible scope vs personal understanding in Levels 2 & 3" },
  { lineNum: 44, page: 4, section: "4. Personal intelligence and AI use", category: "integrity", importance: "critical", text: "1. Decision log. For each question, record two decisions: what you chose, one option you rejected, and why, using your own results as evidence.", annotation: "Decision log rule: 2 decisions/question + rejected alternatives + data evidence" },
  { lineNum: 45, page: 4, section: "4. Personal intelligence and AI use", category: "integrity", importance: "critical", text: "2. Predictions before results. Commit each Level 3 prediction to GitHub before you run the test. The commit time is your proof.", annotation: "MANDATORY: Prediction commit timestamp must precede test execution!" },
  { lineNum: 46, page: 4, section: "4. Personal intelligence and AI use", category: "integrity", importance: "high", text: "3. AI usage declaration. Name the AI tools you used and what for. Describe one place where the AI was wrong or weak, and how you found and fixed it.", annotation: "AI declaration: specify tools, roles, and a concrete AI hallucination/bug you fixed" },
  { lineNum: 47, page: 4, section: "4. Personal intelligence and AI use", category: "integrity", importance: "critical", text: "4. Live walkthrough. Shortlisted candidates will be asked to explain their code and make a small change to it live, without AI help. Any part you cannot explain or change will not be counted.", annotation: "Live defense interview hurdle" },
  { lineNum: 48, page: 4, section: "4. Personal intelligence and AI use", category: "integrity", importance: "critical", text: "Copy-pasted AI output with no reasoning of your own will be treated as incomplete, even if the code runs.", annotation: "Strict penalty on thoughtless copying" },
  { lineNum: 49, page: 4, section: "5. Deliverables", category: "deliverable", importance: "critical", text: "5. Deliverables", annotation: "Section 5 heading" },
  { lineNum: 50, page: 4, section: "5. Deliverables", category: "deliverable", importance: "critical", text: "Submit all three items within the window. A missing item means the submission will not be evaluated.", annotation: "All 3 items are mandatory; missing any one invalidates evaluation" },
  { lineNum: 51, page: 4, section: "5. Deliverables", category: "deliverable", importance: "high", text: "Source code and files | Format: A new GitHub repository created after the assignment is posted (public, or shared with the reviewer)", annotation: "Repo creation requirement" },
  { lineNum: 52, page: 4, section: "5. Deliverables", category: "deliverable", importance: "critical", text: "Source code and files | What it must contain: One folder per question with Levels 1 to 3, and a README stating your seed S and the run steps. At least four commits spread across the window. A single upload at the end will be flagged.", annotation: "Repo structure & Git commit history rule: >=4 commits across time" },
  { lineNum: 53, page: 4, section: "5. Deliverables", category: "deliverable", importance: "high", text: "Demo video | Format: Screen recording, 3 to 5 minutes, uploaded to Google Drive. Set sharing to 'Anyone with the link can view'", annotation: "Video format: 3-5 min, Google Drive public link" },
  { lineNum: 54, page: 4, section: "5. Deliverables", category: "deliverable", importance: "critical", text: "Demo video | What it must contain: Your two questions shown running, with your own numbers explained in your own voice; focus on Levels 2 and 3", annotation: "Video content: Candidate's own voice, demonstrating live code & specific numbers" },
  { lineNum: 55, page: 4, section: "5. Deliverables", category: "deliverable", importance: "high", text: "Personal intelligence note | Format: A one-page PERSONAL_INTELLIGENCE.md file in the repository", annotation: "Filename: PERSONAL_INTELLIGENCE.md" },
  { lineNum: 56, page: 4, section: "5. Deliverables", category: "deliverable", importance: "critical", text: "Personal intelligence note | What it must contain: Decision log and AI usage declaration (Section 4)", annotation: "Note contents: Decisions + AI usage + bug fix" },

  // Page 5
  { lineNum: 57, page: 5, section: "5. Deliverables", category: "deliverable", importance: "critical", text: "A Drive link that cannot be opened will be treated as a missing item.", annotation: "FATAL PITFALL: Check Google Drive share permissions before submitting!" },
  { lineNum: 58, page: 5, section: "6. How answers will be judged", category: "grading", importance: "high", text: "6. How answers will be judged", annotation: "Section 6 heading" },
  { lineNum: 59, page: 5, section: "6. How answers will be judged", category: "grading", importance: "critical", text: "• Depth: Levels 2 and 3 carry more weight than Level 1. A working Level 1 alone is not enough.", annotation: "Grading weight: Scratch code and reasoning outweigh basic library usage" },
  { lineNum: 60, page: 5, section: "6. How answers will be judged", category: "grading", importance: "high", text: "• Correctness: the code runs and gives sensible results.", annotation: "Code execution requirement" },
  { lineNum: 61, page: 5, section: "6. How answers will be judged", category: "grading", importance: "critical", text: "• Reasoning: predictions, explanations and decisions are backed by your own numbers.", annotation: "Quantitative backing from seed S" },
  { lineNum: 62, page: 5, section: "6. How answers will be judged", category: "grading", importance: "high", text: "• Personal intelligence: your own thinking is visible, and AI use is declared honestly.", annotation: "Integrity and transparency" },
  { lineNum: 63, page: 5, section: "6. How answers will be judged", category: "grading", importance: "high", text: "• Clarity: the demo video is clear and easy to follow.", annotation: "Communication quality" },
  { lineNum: 64, page: 5, section: "6. How answers will be judged", category: "grading", importance: "critical", text: "The live walkthrough can change the assessment if the work cannot be explained.", annotation: "Overriding clause: Ability to explain your code live" },
  { lineNum: 65, page: 5, section: "7. Submission and rules", category: "submission", importance: "critical", text: "7. Submission and rules", annotation: "Section 7 heading" },
  { lineNum: 66, page: 5, section: "7. Submission and rules", category: "submission", importance: "critical", text: "The window closes at 5:00 PM IST on 6 October 2026, whichever comes first. Any submission received after that is rejected automatically, with no exceptions. The time on your email is the time of submission. Commits made after the window closes will be ignored.", annotation: "Strict deadline & cutoff rules" },
  { lineNum: 67, page: 5, section: "7. Submission and rules", category: "submission", importance: "critical", text: "Submit to: mnaveennk@iisc.ac.in. Include the GitHub link and the Google Drive link to your demo video.", annotation: "Target submission email address" },
  { lineNum: 68, page: 5, section: "7. Submission and rules", category: "submission", importance: "critical", text: "Email subject: B.E. Assignment – <Full Name> – <USN>", annotation: "Exact required email subject pattern" },
  { lineNum: 69, page: 5, section: "7. Submission and rules", category: "submission", importance: "critical", text: "File name: <FullName>_Assignment_Demo.mp4", annotation: "Exact required demo video filename" },
  { lineNum: 70, page: 5, section: "7. Submission and rules", category: "submission", importance: "critical", text: "Individual work only. Sharing code, data or answers is not allowed. If two candidates submit identical results, both submissions will be rejected.", annotation: "Zero tolerance for collusion / duplicate results" },
  { lineNum: 71, page: 5, section: "7. Submission and rules", category: "submission", importance: "high", text: "Credit your sources. Name every dataset, document, library and code snippet you reused.", annotation: "Academic attribution requirement" },
  { lineNum: 72, page: 5, section: "7. Submission and rules", category: "submission", importance: "normal", text: "Questions: email the same address within the first 30 minutes of the window.", annotation: "Clarification request window (first 30 min)" },
  { lineNum: 73, page: 5, section: "7. Submission and rules", category: "submission", importance: "high", text: "Advice: a complete answer to two questions is better than partial answers to four. Commit early and often.", annotation: "Strategic advice from examiner" }
];

export const QUESTION_DETAILS = {
  A: {
    id: "A",
    title: "Question A: Predict a health risk",
    subtitle: "Classification, Scratch Math & Threshold Tradeoffs",
    datasets: ["UCI Heart Disease", "Heart Failure Clinical Records", "Pima Indians Diabetes"],
    level1: {
      title: "Level 1 – Build",
      rules: "Any library allowed (scikit-learn, xgboost, pandas)",
      tasks: [
        "Select dataset (e.g. Heart Failure Clinical Records)",
        "Clean dataset and handle missing values / feature scaling",
        "Split dataset into Train/Test using seed S (S = last 4 digits of USN)",
        "Train Logistic Regression model",
        "Train Random Forest model",
        "Calculate and report Accuracy, Precision, and Recall for both models"
      ]
    },
    level2: {
      title: "Level 2 – Code it yourself",
      rules: "No scikit-learn for model math or confusion matrix! Pure NumPy.",
      tasks: [
        "Implement sigmoid function: σ(z) = 1 / (1 + exp(-z)) with numerical clipping",
        "Implement Binary Cross-Entropy loss: -1/m Σ [y log(p) + (1-y) log(1-p)]",
        "Implement Gradient Descent: dw = 1/m X^T (p - y), db = 1/m Σ (p - y)",
        "Implement custom confusion matrix function: returns TP, FP, TN, FN",
        "Verify scratch model accuracy is within ±1-2% of scikit-learn",
        "Extract weights, sort by magnitude, and compare top-3 most influential features"
      ]
    },
    level3: {
      title: "Level 3 – Reason",
      rules: "Commit your prediction to GitHub BEFORE running the threshold experiment!",
      tasks: [
        "PREDICTION COMMIT: Write and commit prediction of what will happen to Precision when threshold is lowered to achieve Recall >= 0.90",
        "Compute precision-recall curve / sweep threshold from 0.5 down to target",
        "Identify exact threshold where recall reaches >= 0.90 and record resulting precision",
        "Explain tradeoff: Why screening tools demand high recall over precision (cost of false negative vs false positive)",
        "Explain why accuracy alone would be misleading (class imbalance & unequal error costs)"
      ]
    }
  },
  B: {
    id: "B",
    title: "Question B: Turn a model into a usable app",
    subtitle: "API Engineering, Raw SQL, Persistence & Concurrency",
    datasets: ["Model from Question A or trained health risk classifier"],
    level1: {
      title: "Level 1 – Build",
      rules: "FastAPI / Flask + Streamlit / React / HTML",
      tasks: [
        "Package model pipeline (joblib/pickle)",
        "Implement POST /predict endpoint returning numeric score and plain-English risk label (Low / Moderate / High)",
        "Build frontend UI (Streamlit or React) taking health metrics and presenting output clearly to a non-technical patient"
      ]
    },
    level2: {
      title: "Level 2 – Code it yourself",
      rules: "SQLite/MySQL/PostgreSQL. NO ORM (no SQLAlchemy/Tortoise/Prisma) for /stats. Raw SQL only!",
      tasks: [
        "Create database table for logging: id, timestamp, input_features, predicted_prob, risk_category",
        "Save every incoming prediction request and result to the database",
        "Implement GET /stats endpoint using hand-written SQL (COUNT, AVG(predicted_prob), SUM(CASE WHEN risk='High' THEN 1 ELSE 0 END) * 100.0 / COUNT(*))",
        "Add explicit input validation rules with descriptive error responses (e.g., age 1-120, blood pressure > 0)",
        "Write 3 automated tests with pytest (valid input, edge case, and bad input validation test)"
      ]
    },
    level3: {
      title: "Level 3 – Reason",
      rules: "Commit predictions before breaking; demonstrate before/after behavior",
      tasks: [
        "Break app mode 1 (e.g., simulate missing model weights / corrupt artifact on boot): observe 500 error vs graceful startup fallback",
        "Break app mode 2 (e.g., payload type mismatch such as string passed for numeric systolic BP): observe unhandled exception vs 422 schema validation",
        "Provide code diffs showing before and after fixes",
        "Explain architectural plan to scale app for 100 concurrent users (connection pooling, worker processes Gunicorn/Uvicorn, async I/O, rate limiting)"
      ]
    }
  },
  C: {
    id: "C",
    title: "Question C: Build a trusted health-information assistant",
    subtitle: "RAG Architecture, Scratch Vector Math & Failure Attribution",
    datasets: ["5 to 10 Public Health Factsheets (WHO, CDC on diabetes, hypertension, diet)"],
    level1: {
      title: "Level 1 – Build",
      rules: "RAG pipeline + LLM of choice. Mandatory explicit source attribution.",
      tasks: [
        "Curate 5-10 authoritative WHO/CDC documents (PDF/Markdown)",
        "Build baseline RAG system connecting chunked docs to an LLM",
        "Enforce citation format: every generated statement must cite doc name & section/paragraph"
      ]
    },
    level2: {
      title: "Level 2 – Code it yourself",
      rules: "NO vector DB (FAISS/Chroma/Pinecone) and NO retriever library! Pure NumPy & TF-IDF math.",
      tasks: [
        "Implement custom text chunking with fixed window & sliding overlap",
        "Build TF-IDF vocabulary, compute Term Frequency (TF) and Inverse Document Frequency (IDF) from scratch",
        "Compute Cosine Similarity between query vector and chunk vectors using NumPy: dot(q, c) / (norm(q) * norm(c))",
        "Rank chunks and extract top-3 relevant context chunks",
        "Run 3 benchmark questions and compare top-3 retrieved chunks from your scratch TF-IDF against an off-the-shelf retriever (e.g., LangChain/BM25/Chroma)"
      ]
    },
    level3: {
      title: "Level 3 – Reason",
      rules: "Commit test question predictions to GitHub BEFORE running evaluations!",
      tasks: [
        "Formulate 10 specific test questions (7 answerable from docs, 3 deliberately out-of-scope / unanswerable)",
        "PREDICTION COMMIT: Predict ahead of time which questions will fail and why",
        "Execute the evaluation run and compile results into a structured verification table",
        "Select one failure case and perform root-cause attribution: prove whether retrieval failed (relevant chunk wasn't in top-3) or the LLM failed (hallucinated despite context or ignored context)"
      ]
    }
  },
  D: {
    id: "D",
    title: "Question D: Track an exercise with a camera",
    subtitle: "Pose Estimation, Vector Geometry & Hysteresis Smoothing",
    datasets: ["Webcam live feed or recorded exercise video clips (squats, pushups, yoga)"],
    level1: {
      title: "Level 1 – Build",
      rules: "OpenCV + MediaPipe Pose (or similar framework)",
      tasks: [
        "Set up camera video capture and extract 33 pose landmark coordinates",
        "Track rep progression of chosen exercise (e.g., squats using hip, knee, ankle)",
        "Render visual rep counter on the live video stream"
      ]
    },
    level2: {
      title: "Level 2 – Code it yourself",
      rules: "No prebuilt angle helpers. Scratch vector algebra + smoothing + dual threshold hysteresis.",
      tasks: [
        "Implement 3-point angle function using vector dot product: θ = arccos((BA · BC) / (|BA| * |BC|)) * (180/π)",
        "Implement moving-average filter over a sliding window (e.g., 5-7 frames) to eliminate high-frequency camera jitter",
        "Implement state-machine rep counter with dual hysteresis thresholds (e.g., enter 'down' at <90°, return 'up' at >160°) to prevent double-counting shakes",
        "Implement real-time visual coaching cues (e.g. 'Go lower', 'Form OK', 'Chest up')"
      ]
    },
    level3: {
      title: "Level 3 – Reason",
      rules: "Record 3 self videos (including 1 bad form); commit predicted counts first!",
      tasks: [
        "Record 3 short videos: Video 1 (Standard form), Video 2 (Fast tempo), Video 3 (Intentionally poor/shallow form)",
        "PREDICTION COMMIT: Commit predicted rep counts for all 3 videos before running code",
        "Run detector and record: Predicted, Computer-Counted, and Ground-Truth Actual reps",
        "Analyze a specific error (e.g., why shallow reps were ignored or counted)",
        "Demonstrate how adjusting threshold parameters (e.g. down threshold from 90° to 105°) changes the outcome"
      ]
    }
  }
};
